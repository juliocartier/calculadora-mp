import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Slider from './components/Slider';
import FormularioInicial from './components/FormularioInicial';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Slider">
        <Stack.Screen name="Slider" component={Slider} />
        <Stack.Screen name="FormularioInicial" component={FormularioInicial} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
