import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Slider from './components/Slider';
import FormularioInicial from './components/FormularioInicial';
import { StatusBar } from 'expo-status-bar';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Slider">
        <Stack.Screen 
          name="Slider" 
          component={Slider} 
          options={{
            headerShown: false, // Para ocultar o título "Slider" no header
          }}
        />
        <Stack.Screen 
          name="FormularioInicial" 
          component={FormularioInicial} 
          options={{
            title: 'Formulário Inicial', // Título para a tela de FormularioInicial no header
          }}
        />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
