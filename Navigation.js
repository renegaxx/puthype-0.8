// Navigation.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Primeiro from './screens/Primeiro'; // Caminho para a sua tela inicial
import LoadingScreen from './screens/LoadingScreen'; // Caminho para a nova tela de carregamento
import Cadastro from './screens/Cadastro';

const Stack = createStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false, // Remove o cabeçalho branco
        }}
      >
        <Stack.Screen name="Primeiro" component={Primeiro} />
        <Stack.Screen name="LoadingScreen" component={LoadingScreen} />
        <Stack.Screen name="Cadastro" component={Cadastro} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
