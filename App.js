import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Slider from './components/Slider';
import MaquinaPoint from './components/MaquinaPoint';
import MaquinaPointTap from './components/MaquinaPointTap';
import ResultadoCalculo from './components/ResultadoCalculo';
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
          name="MaquinaPoint" 
          component={MaquinaPoint} 
          options={{
            title: 'Calculadora de taxas', // Título para a tela de FormularioInicial no header
          }}
        />
        <Stack.Screen 
          name="MaquinaPointTap" 
          component={MaquinaPointTap} 
          options={{
            title: 'Calculadora de taxas', // Título para a tela de Maquina Point Tap no header
          }}
        />
        <Stack.Screen 
          name="ResultadoCalculo" 
          component={ResultadoCalculo} 
          options={{
            title: 'Resultado de Calculos',
          }}
        />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
