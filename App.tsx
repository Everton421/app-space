import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';


import { MyDrawer } from './src/routes/drawer';
import { Routes } from './src/routes';


export default function App() {
  return (
   <Routes/>
  );
}

