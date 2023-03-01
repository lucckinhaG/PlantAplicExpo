import React from 'react';
import { StatusBar } from 'react-native';
import 'react-native-gesture-handler'

import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/routes';

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#8A8A8A" barStyle="light-content" />
      <Routes />
    </NavigationContainer>
  )
}