import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { ThemeProvider } from './context/ThemeContext';
import React, { useContext, useEffect, useState } from 'react'
import AppContainer from './AppContainer';

export default function App() {

  return (
    <ThemeProvider>
      <AppContainer />
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
