import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from '@react-navigation/native';
import { getLoginSession } from '../utility';
import { colors } from '../utility/constants';

type Props = {
  navigation: any;
};

const AuthLoadingScreen = ({ navigation }: Props) => {
  useEffect(() => {
    const checkLogin = async () => {
      try {
        const token = await getLoginSession();
                  console.log('token=', token);

        if (token) {
          // Token found → redirect to LocationScreen
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: 'LocationScreen' }],
            }),
          );
        } else {
          // No token → redirect to Login
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: 'LoginScreen' }],
            }),
          );
        }
      } catch (error) {
        // On error, go to Login as fallback
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'LoginScreen' }],
          }),
        );
      }
    };

    checkLogin();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background }}>
      {/* <ActivityIndicator size="large" /> */}
    </View>
  );
};

export default AuthLoadingScreen;
