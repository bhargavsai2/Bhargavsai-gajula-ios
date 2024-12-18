import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import { DefaultTheme } from 'react-native-paper';

import SearchComponent from '../components/SearchComponent';


jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('SearchComponent', () => {
  let store;
  
  beforeEach(() => {
    store = mockStore({
      search: {
        isLoading: false,
      },
    });
  });

  const renderComponent = () => {
    return render(
      <Provider store={store}>
        <PaperProvider theme={DefaultTheme}>
          <NavigationContainer>
            <SearchComponent />
          </NavigationContainer>
        </PaperProvider>
      </Provider>
    );
  };

  it('renders correctly', () => {
    const { getByText, getByLabelText } = renderComponent();
    
    expect(getByText('Search')).toBeTruthy();
    expect(getByLabelText('Enter login')).toBeTruthy();
  });

  it('shows error for empty input', async () => {
    const { getByText } = renderComponent();
    
    const searchButton = getByText('Search');
    fireEvent.press(searchButton);

    await waitFor(() => {
      expect(getByText('Please enter a valid username.')).toBeTruthy();
    });
  });

  it('updates query input', () => {
    const { getByLabelText } = renderComponent();
    
    const input = getByLabelText('Enter login');
    fireEvent.changeText(input, 'testuser');
    
    expect(input.props.value).toBe('testuser');
  });
});