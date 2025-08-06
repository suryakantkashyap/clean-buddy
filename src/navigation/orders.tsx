import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import OrderScreen from '../screens/OrderScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const OrderStack = () => {
  return (
    <Stack.Navigator initialRouteName="OrderScreen">
      <Stack.Screen
        name="OrderScreen"
        component={OrderScreen}
        options={{
          headerTransparent: true,
          headerBlurEffect: 'regular',
          title: 'Orders',
        }}
      />
    </Stack.Navigator>
  );
};


export default OrderStack;
