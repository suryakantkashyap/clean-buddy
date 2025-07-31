import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import AccountScreen from '../screens/AccountScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AccountStack = () => {
  return (
    <Stack.Navigator initialRouteName="AccountScreen">
      <Stack.Screen
        name="AccountScreen"
        component={AccountScreen}
        options={{
          headerTransparent: true,
          headerBlurEffect: 'regular',
          title: 'hello',
        }}
      />
    </Stack.Navigator>
  );
};


export default AccountStack;
