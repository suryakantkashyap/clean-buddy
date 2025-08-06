import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, StatusBar, SafeAreaView } from 'react-native';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import HomeScreen from '../screens/HomeScreen';
import Homecleaning from '../screens/Homecleaning';
import { RootStackParamList } from '../types';
import {
  createNavigationContainerRef,
  NavigationContainer,
} from '@react-navigation/native';
import LocationScreen from '../screens/LocationScreen';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import { BottomTabNavigator } from './bottomTab';

const Stack = createNativeStackNavigator<RootStackParamList>();
export const navigationRef = createNavigationContainerRef();

const AppStack = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <StatusBar
        translucent
        backgroundColor="#e4eaff"
        barStyle="dark-content"
      />
      <Stack.Navigator initialRouteName="AuthLoading">
        <Stack.Screen
          name="AuthLoading"
          component={AuthLoadingScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{
            title: 'Create Account',
            headerBackTitle: 'back',
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="LocationScreen"
          component={LocationScreen}
          options={{
            headerShown: false,
            presentation: 'modal',
          }}
        />

        <Stack.Screen
          name="BottomTab"
          component={BottomTabNavigator}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppStack;
