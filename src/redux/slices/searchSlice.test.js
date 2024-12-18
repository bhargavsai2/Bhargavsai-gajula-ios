import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import searchReducer, { 
  fetchUsers, 
  fetchMoreUsers, 
  setQuery, 
  resetSearch 
} from '../redux/slices/searchSlice';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const mockAxios = new MockAdapter(axios);

describe('searchSlice', () => {
  afterEach(() => {
    mockAxios.reset();
  });

  const initialState = {
    query: '',
    users: [],
    page: 1,
    isLoading: false,
  };

  it('should return initial state', () => {
    expect(searchReducer(undefined, {})).toEqual(initialState);
  });

  it('sets query correctly', () => {
    const nextState = searchReducer(initialState, setQuery('testuser'));
    expect(nextState.query).toBe('testuser');
  });

  it('resets search state', () => {
    const prevState = {
      ...initialState,
      query: 'testuser',
      users: [{ id: 1, login: 'test' }],
      page: 2,
      isLoading: true,
    };

    const nextState = searchReducer(prevState, resetSearch());
    expect(nextState).toEqual(initialState);
  });

  describe('async actions', () => {
    let store;

    beforeEach(() => {
      store = mockStore(initialState);
    });

    it('creates FETCH_USERS_FULFILLED when fetching users', async () => {
      const mockUsers = [
        { id: 1, login: 'testuser' },
        { id: 2, login: 'anotheruser' },
      ];

      mockAxios.onGet(/api.github.com\/search\/users/).reply(200, {
        items: mockUsers,
      });

      const expectedActions = [
        { type: fetchUsers.pending.type },
        { 
          type: fetchUsers.fulfilled.type, 
          payload: mockUsers 
        },
      ];

      await store.dispatch(fetchUsers('testuser'));
      const actions = store.getActions();

      expect(actions[0].type).toEqual(expectedActions[0].type);
      expect(actions[1].type).toEqual(expectedActions[1].type);
      expect(actions[1].payload).toEqual(mockUsers);
    });

    it('creates FETCH_MORE_USERS_FULFILLED when loading more users', async () => {
      const mockMoreUsers = [
        { id: 3, login: 'newuser1' },
        { id: 4, login: 'newuser2' },
      ];

      const initialStateWithQuery = {
        ...initialState,
        query: 'testuser',
        page: 1,
      };

      store = mockStore(initialStateWithQuery);

      mockAxios.onGet(/api.github.com\/search\/users/).reply(200, {
        items: mockMoreUsers,
      });

      const expectedActions = [
        { 
          type: fetchMoreUsers.fulfilled.type, 
          payload: { data: mockMoreUsers, page: 2 } 
        },
      ];

      await store.dispatch(fetchMoreUsers());
      const actions = store.getActions();

      expect(actions[0].type).toEqual(expectedActions[0].type);
      expect(actions[0].payload.data).toEqual(mockMoreUsers);
      expect(actions[0].payload.page).toEqual(2);
    });
  });
});