import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import FormularioInicial from './components/FormularioInicial';
import Slider from './components/Slider';

const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Slider">
        <Stack.Screen name="Slider" component={Slider} />
        <Stack.Screen name="FormularioInicial" component={FormularioInicial} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;