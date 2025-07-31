import React, { useEffect } from 'react';
import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  Image,
  StyleSheet,
  Text,
  View,
  StatusBar,
  Platform,
  PermissionsAndroid,
  SafeAreaView,
} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import LoginScreen from './src/screens/LoginScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import HomeScreen from './src/screens/HomeScreen';
import Homecleaning from './src/screens/Homecleaning';
import { RootStackParamList } from './src/types';
import AppStack from './src/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

const loginHeader = () => (
  <View>
    <View style={styles.row}>
      <Image source={require('./src/assets/login.png')} style={styles.Image} />
      <Text style={styles.title}>Login</Text>
    </View>
  </View>
);

export default function App() {
  const getFCMToken = async () => {
    try {
      const token = await messaging().getToken();
      if (token) {
        console.log('✅ FCM Token:', token);
      } else {
        console.log('❌ Failed to get FCM token');
      }
    } catch (error) {
      console.log('❌ Error in FCM token:', error);
    }
  };

  useEffect(() => {
    if (Platform.OS === 'android') {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );
    }
    getFCMToken();
  }, []);

  return (
    <View style={{ backgroundColor: '#e2e3e4ff', flex: 1 }}>
      <StatusBar
        translucent
        backgroundColor="#e4eaff"
        barStyle="dark-content"
      />
      <AppStack />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  Image: {
    width: 28,
    height: 20,
    marginRight: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
  },
});
