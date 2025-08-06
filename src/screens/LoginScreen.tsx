import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  StatusBar,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {
  getAuth,
  signInWithEmailAndPassword,
} from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from '../types';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { colors } from '../utility/constants';
import { saveLoginSession } from '../utility';
import { alert } from '../../App';
import { DropdownAlertType } from 'react-native-dropdownalert';

function LoginScreen() {
  const navigation = useNavigation<NavigationProps>();
  const [email, setEmail] = useState('suryakantkashyap692@gmail.com'); // default removed
  const [password, setPassword] = useState('123456');
  const [error, setError] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('New Notification', JSON.stringify(remoteMessage));
    });
    return unsubscribe;
  }, []);

  const handleLogin = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email.trim())) {
      setError({
        email: 'Please enter a valid email address',
        password: error.password,
      });
      return;
    }
    if (password.length < 6) {
      setError({
        email: error.email,
        password: 'Please enter a valid password',
      });
      return;
    } else {
      setError({ email: '', password: '' });
    }

    try {
      setIsLoading(true);
      const data = await signInWithEmailAndPassword(getAuth(), email, password);
      const uid = data?.user?._user?.uid || '';
      await saveLoginSession(uid);
      setIsLoading(false);
      navigation.navigate('LocationScreen');
      await alert({
        type: DropdownAlertType.Success,
        title: 'Success!',
        message: 'Logged in successfully',
        interval: 5000
      });

      // navigation.replace('Home'); // Navigate to Home after login
    } catch (error: any) {
      console.log('Login Error:', error.message);
      await alert({
        type: DropdownAlertType.Error,
        title: 'Error',
        message: error.message,
      });
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.mainContainer}
      keyboardShouldPersistTaps="handled"
      enableOnAndroid={true}
      style={styles.mainContainer}
    >
      <StatusBar barStyle="dark-content" backgroundColor="#fbf5f5ff" />
      <View style={styles.container}>
        <Image
          source={require('../assets/cleanbuddy.png')}
          style={styles.Image2}
        />

        <TextInput
          placeholder="Enter your EMAIL"
          placeholderTextColor="#999999"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          style={error.email ? styles.errorInput : styles.input}
        />

        <TextInput
          placeholder="Enter your PASSWORD"
          placeholderTextColor="#999999"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          style={error.password ? styles.errorInput : styles.input}
        />

        <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Login</Text>
          {isLoading && <ActivityIndicator size={'small'} color={'white'} />}
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', marginTop: 20 }}>
          <Text>Don’t have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.signupText}> Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    padding: 60,
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  Image2: {
    marginTop: 100,
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  input: {
    width: 300,
    height: 50,
    backgroundColor: 'lightgrey',
    borderRadius: 15,
    padding: 10,
    marginTop: 10,
  },
  errorInput: {
    width: 300,
    height: 50,
    backgroundColor: 'lightgrey',
    borderRadius: 15,
    padding: 10,
    marginTop: 10,
    borderWidth: 1,
    borderColor: colors.danger,
  },
  loginButton: {
    marginTop: 30,
    backgroundColor: colors.primary,
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    flexDirection: 'row',
    width: 150,
    height: 45,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 10,
  },
  signupText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '600',
  },
});

export default LoginScreen;
