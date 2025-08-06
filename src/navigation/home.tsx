import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import Homecleaning from '../screens/Homecleaning';
import { RootStackParamList } from '../types';
import HireMaidScreen from '../screens/HireMaidScreen';
import ToiletCleaningScreen from '../screens/ToiletCleaningScreen';
import MassageScreen from '../screens/MassageScreen';
import Icon from 'react-native-vector-icons/MaterialIcons'; // or Ionicons, FontAwesome, etc.
import { TouchableOpacity } from 'react-native';
import { colors } from '../utility/constants';

const Stack = createNativeStackNavigator<RootStackParamList>();
const renderBack = navigation => {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.goBack();
      }}
    >
      <Icon name={'arrow-back-ios'} size={20} color={colors.primary} />
    </TouchableOpacity>
  );
};

const HomeStack = ({ route }: any) => {
  const location = route?.params?.location;
  return (
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        initialParams={{ location }}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Homecleaning"
        component={Homecleaning}
        options={({ navigation }) => {
          return {
            headerTransparent: true,
            headerBlurEffect: 'regular',
            title: 'Home Cleaning',
            headerLeft: () => renderBack(navigation),
          };
        }}
      />
      <Stack.Screen
        name="HireMaid"
        component={HireMaidScreen}
         options={({ navigation }) => {
          return {
            headerTransparent: true,
            headerBlurEffect: 'regular',
            title: 'Hire Maid',
            headerLeft: () => renderBack(navigation),
          };
        }}
      />
      <Stack.Screen
        name="ToiletCleaning"
        component={ToiletCleaningScreen}
         options={({ navigation }) => {
          return {
            headerTransparent: true,
            headerBlurEffect: 'regular',
            title: 'Toilet Cleaning',
            headerLeft: () => renderBack(navigation),
          };
        }}
      />
      <Stack.Screen
        name="Massage"
        component={MassageScreen}
         options={({ navigation }) => {
          return {
            headerTransparent: true,
            headerBlurEffect: 'regular',
            title: 'Massage',
            headerLeft: () => renderBack(navigation),
          };
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
