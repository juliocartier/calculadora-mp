import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MaquinaPoint from './components/MaquinaPoint';
import MaquinaPointTap from './components/MaquinaPointTap';
import Slider from './components/Slider';

const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Slider">
        <Stack.Screen name="Slider" component={Slider} />
        <Stack.Screen name="MaquinaPoint" component={MaquinaPoint} />
        <Stack.Screen name="MaquinaPointTap" component={MaquinaPointTap} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;