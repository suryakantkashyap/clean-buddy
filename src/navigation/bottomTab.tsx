import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStack from './home';
import OrderStack from './orders';
import AccountStack from './account';
import Icon from 'react-native-vector-icons/SimpleLineIcons'; // or Ionicons, FontAwesome, etc.
import { colors } from '../utility/constants';

const Tab = createBottomTabNavigator();

export const BottomTabNavigator = ({ route }: any) => {
  const location = route?.params?.location;

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: '#999',
        tabBarStyle: {
          height: 90, // 👈 Increase height here
          paddingBottom: 10, // Optional: adds spacing for icon/label
          paddingTop: 10,
        },
        tabBarIcon: ({ color, size }) => {
          let iconName = '';

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Order') {
            iconName = 'note';
          } else if (route.name === 'Account') {
            iconName = 'user';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
        initialParams={{ location }}
      />
      <Tab.Screen name="Order" component={OrderStack} />
      <Tab.Screen name="Account" component={AccountStack} />
    </Tab.Navigator>
  );
};
