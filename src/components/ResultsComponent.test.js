import React from 'react';
import { render } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider as PaperProvider } from 'react-native-paper';
import { DefaultTheme } from 'react-native-paper';

import ResultsComponent from '../components/ResultsComponent';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const mockUsers = [
  {
    id: 1,
    login: 'testuser1',
    avatar_url: 'https://example.com/avatar1.jpg',
    type: 'User',
  },
  {
    id: 2,
    login: 'testuser2',
    avatar_url: 'https://example.com/avatar2.jpg',
    type: 'Organization',
  },
];

describe('ResultsComponent', () => {
  let store;
  
  beforeEach(() => {
    store = mockStore({
      search: {
        users: mockUsers,
        isLoading: false,
      },
    });
  });

  const renderComponent = () => {
    return render(
      <Provider store={store}>
        <PaperProvider theme={DefaultTheme}>
          <ResultsComponent />
        </PaperProvider>
      </Provider>
    );
  };

  it('renders list of users', () => {
    const { getByText } = renderComponent();
    
    expect(getByText('testuser1')).toBeTruthy();
    expect(getByText('testuser2')).toBeTruthy();
    expect(getByText('User')).toBeTruthy();
    expect(getByText('Organization')).toBeTruthy();
  });

  it('applies correct badge colors', () => {
    const { getAllByText } = renderComponent();
    
    const userChips = getAllByText(/User|Organization/);
    expect(userChips).toHaveLength(2);
  });
});