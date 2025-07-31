import React from 'react';
import { Text, View } from 'react-native';

import { colors } from '../utility/constants';

type Props = {
  navigation: any;
};

const OrderScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.background,
      }}
    >
      <Text>My Order Screen</Text>
    </View>
  );
};

export default OrderScreen;
