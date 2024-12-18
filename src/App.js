import React from 'react';
import { Provider } from 'react-redux'; 
import { NavigationContainer } from '@react-navigation/native'; 
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import store from './redux/store'; 
import SearchComponent from './components/SearchComponent'; 
import ResultsComponent from './components/ResultsComponent'; 
import { Provider as PaperProvider } from 'react-native-paper';
import { DefaultTheme } from 'react-native-paper';

// Set up navigation
const Stack = createNativeStackNavigator();

const theme = {
  ...DefaultTheme,
  colors: {
      ...DefaultTheme.colors,
      primary: '#6200ee', 
      accent: '#ff8a65', 
      surface: '#ffffff', 
      background: '#e3f2fd', 
      error: '#d32f2f', 
  },
};

const App = () => (
  <Provider store={store}>
      <PaperProvider theme={theme}>
          <NavigationContainer>
              <Stack.Navigator initialRouteName="Search">
                  <Stack.Screen name="Search" component={SearchComponent} />
                  <Stack.Screen name="Results" component={ResultsComponent} />
              </Stack.Navigator>
          </NavigationContainer>
      </PaperProvider>
  </Provider>
);

export default App;

