import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BlurView } from '@react-native-community/blur';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from '../../types';

interface Props {
  title: string;
  leftIcon?: any;
}

const AppHeader = ({ title, leftIcon }: Props) => {
  const navigation = useNavigation<NavigationProps>();
  const insets = useSafeAreaInsets();
  useEffect(() => {
    StatusBar.setHidden(false);
  }, []);

  return (
    <View
      style={{
        height: insets.top + 30,
        width: '100%',
        backgroundColor: 'rgba(0,0,0,0.5)',
        opacity: 0.95,
        position: 'absolute',
        alignSelf: 'stretch',
        justifyContent: 'flex-end',
      }}
    >
      <BlurView
        style={styles.absolute}
        blurType="light"
        blurAmount={10}
        reducedTransparencyFallbackColor="white"
      />

      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: insets.top - 10,
          marginBottom: 10,
        }}
      >
        {leftIcon && (
          <TouchableOpacity
            onPress={() => {
              console.log('working');
              navigation.goBack();
            }}
            style={[
              {
                flex: 1,
                height: '100%',
                alignSelf: 'flex-start',
                left: 2,
                position: 'absolute',
                justifyContent: 'center',
              },
            ]}
          >
            <Image
              source={leftIcon}
              style={{ resizeMode: 'contain' }}
              height={20}
              width={20}
            />
          </TouchableOpacity>
        )}
        <Text
          style={{
            color: '#000000ff',
            alignSelf: 'center',
            textAlign: 'center',
            textAlignVertical: 'center',
            fontSize: 20,
            fontWeight: 600,
          }}
        >
          {title}
        </Text>
      </View>
    </View>
  );
};

export default AppHeader;

const styles = StyleSheet.create({
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
