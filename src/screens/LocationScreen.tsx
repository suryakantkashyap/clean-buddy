import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  PermissionsAndroid,
  Platform,
  ActivityIndicator,
  Image,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { colors } from '../utility/constants';
import { CommonActions } from '@react-navigation/native';

const LocationScreen = ({ navigation }) => {
  const pinAnim = useRef(new Animated.Value(0)).current;
  const [locationFetched, setLocationFetched] = useState(false);

  useEffect(() => {
    animatePin();
    getLocation();
  }, []);

  const animatePin = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pinAnim, {
          toValue: -20,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(pinAnim, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  };

  const getLocation = async () => {
    if (Platform.OS === 'ios') {
      const auth = await Geolocation.requestAuthorization('whenInUse');
      if (auth !== 'granted') {
        console.warn('Location permission denied');
        return;
      }
    }

    const hasPermission = await requestLocationPermission();
    if (Platform.OS === 'android' && !hasPermission) return;

    Geolocation.getCurrentPosition(
      position => {
        setLocationFetched(true);
        setTimeout(() => {
          navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'BottomTab', params: { location: position.coords} }],
          }),
        );
        }, 3000);
        
      },
      error => {
        console.error('Main error: ', error);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
        forceRequestLocation: true,
      },
    );
  };

  const requestLocationPermission = async () => {
    if (Platform.OS === 'ios') return true; // already handled above

    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Cleaning App Location Permission',
          message: 'We need your location to find nearby cleaners.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      return false;
    }
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.pinContainer, { transform: [{ translateY: pinAnim }] }]}
      >
        <Image
          source={require('../assets/location/pin.png')}
          style={styles.pin}
        />
      </Animated.View>
      <Text style={styles.text}>Fetching your location...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pinContainer: {
    marginBottom: 30,
  },
  pin: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  text: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333',
  },
});

export default LocationScreen;
