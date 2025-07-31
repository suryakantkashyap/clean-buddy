import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { colors } from '../utility/constants';
import { removeLoginSession } from '../utility';
import { CommonActions } from '@react-navigation/native';
import { navigationRef } from '../navigation';

type Props = {
  navigation: any;
};

const logoutPressHandle = async () => {
  await removeLoginSession();
  if (navigationRef.isReady()) {
    navigationRef.reset({
      index: 0,
      routes: [{ name: 'LoginScreen' }],
    });
  }
};
const AccountScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.background,
      }}
    >
      <Text>Account Screen</Text>

      <TouchableOpacity
        onPress={logoutPressHandle}
        style={{
          paddingHorizontal: 40,
          paddingVertical: 10,
          backgroundColor: colors.primary,
          borderRadius: 10,
          marginTop: 40,
        }}
      >
        <Text style={{ color: 'white' }}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AccountScreen;
