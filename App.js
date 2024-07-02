import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useContext } from 'react';
import LoginScreen from './src/screens/LoginScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import InventoryScreen from './src/screens/InventoryScreen';
import { AuthProvider, AuthContext } from './src/Context/AuthContext';
import { InventoryProvider } from './src/Context/InventoryContext'; // Assuming you have this context

const AuthStack = createStackNavigator();
const MainStack = createStackNavigator();

// Define the authentication stack
const AuthStackScreen = () => (
  <AuthStack.Navigator screenOptions={{ headerShown: false }}>
    <AuthStack.Screen name='Login' component={LoginScreen} />
  </AuthStack.Navigator>
);

// Define the main stack for authenticated users
const MainStackScreen = () => (
  <MainStack.Navigator
    initialRouteName='Dashboard'
    screenOptions={{ headerShown: false }}
  >
    <MainStack.Screen name='Dashboard' component={DashboardScreen} />
    <MainStack.Screen
      screenOptions={{ headerShown: true }}
      name='Inventory'
      component={InventoryScreen}
    />
  </MainStack.Navigator>
);

// Define the custom theme for react-native-paper
const customTheme = {
  colors: {
    primary: '#606060',
    primaryContainer: '#A9A9A9',
    onPrimary: '#EAEAEA',
    accent: '#FF4081',
    background: '#242A3E',
    surface: '#4D4646',
    error: '#FF0000',
    text: '#333333',
    onSurface: '#000000',
    onSurfaceVariant: '#707070',
    onSurfaceDisabled: '#707070',
    disabled: '#CCCCCC',
    surfaceDisabled: 'rgba(255, 255, 255, 0.7)',
    placeholder: '#CCCCCC',
    backdrop: 'rgba(0, 0, 0, 0.5)',
    notification: '#FFA500',
    backgroundGradient1: '#242A3E',
    backgroundGradient2: '#191D2B',
    backgroundGradient3: '#0F1016',
  },
};

// App navigator that switches between Auth and Main stacks
const AppNavigator = () => {
  const { state } = useContext(AuthContext);

  return (
    <NavigationContainer>
      {state.isLoggedIn ? <MainStackScreen /> : <AuthStackScreen />}
    </NavigationContainer>
  );
};

// Main app component
const App = () => {
  return (
    <PaperProvider theme={customTheme}>
      <AuthProvider>
        <InventoryProvider>
          <AppNavigator />
        </InventoryProvider>
      </AuthProvider>
    </PaperProvider>
  );
};

export default App;
