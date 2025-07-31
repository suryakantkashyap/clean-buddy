import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import Homecleaning from '../screens/Homecleaning';
import { RootStackParamList } from '../types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const HomeStack = ({ route }: any) => {
  const location = route?.params?.location;
  return (
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        initialParams={{ location }}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="Homecleaning"
        component={Homecleaning}
        options={{
          headerTransparent: true,
          headerBlurEffect: 'regular',
          title: 'hello',
        }}
      />
    </Stack.Navigator>
  );
};


export default HomeStack;
