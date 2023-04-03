import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './src/screens/Home';
import NFTPage from './src/screens/NFTPage';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={{ headerTitle: "Explore" }} />
        <Stack.Screen name="NFT Page" component={NFTPage} options={{ headerTitle: "NFT Page" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App
