import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {
  getAuth,
  createUserWithEmailAndPassword,
} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import { colors } from '../utility/constants';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { alert } from '../../App';
import { DropdownAlertType } from 'react-native-dropdownalert';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

function SignUpScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const [password, setPassword] = useState('');
  const [error, setError] = useState({ email: '', password: '' });

  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = email => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const [ispasswordVisible, setPasswordVisible] = useState(false);

  const handleSignUp = async () => {
    let emailError = '';
    let passwordError = '';

    if (!validateEmail(email)) {
      emailError = 'Invalid email format';
    }
    if (password.length < 6) {
      passwordError = 'Password must be at least 6 characters';
    }

    if (emailError || passwordError) {
      setError({ email: emailError, password: passwordError });
      return;
    }

    setIsLoading(true);
    setError({ email: '', password: '' }); // clear errors before retry

    try {
      const userCredential = await createUserWithEmailAndPassword(
        getAuth(),
        email,
        password,
      );
      const uid = userCredential.user.uid;
      const name = `${firstName.trim()} ${lastName.trim()}`;
      await firestore().collection('users').doc(uid).set({
        email,
        name,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });

      alert({
        type: DropdownAlertType.Success,
        title: 'Success!',
        message:
          'Account created successfully. Now login with your credentials',
      });
      navigation.goBack();
    } catch (error) {
      await alert({
        type: DropdownAlertType.Error,
        title: 'Error',
        message: error.message,
      });
    } finally {
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
      <View style={styles.container}>
        <Image
          source={require('../assets/cleanbuddy.png')}
          style={styles.Image2}
        />

        <TextInput
          placeholder="Enter your first name"
          placeholderTextColor="#999999"
          value={firstName}
          onChangeText={setFirstName}
          autoCapitalize="none"
          style={error.email ? styles.errorInput : styles.input}
        />
        <TextInput
          placeholder="Enter your last name"
          placeholderTextColor="#999999"
          value={lastName}
          onChangeText={setLastName}
          autoCapitalize="none"
          style={error.email ? styles.errorInput : styles.input}
        />
        <TextInput
          placeholder="Enter your email"
          placeholderTextColor="#999999"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          style={error.email ? styles.errorInput : styles.input}
        />
        <View style={styles.passwordContainer}>
          <TextInput
            placeholder="Enter your password"
            placeholderTextColor="#999999"
            secureTextEntry={ispasswordVisible}
            value={password}
            onChangeText={setPassword}
            style={[ { flex: 1 }]}
          />
          <TouchableOpacity
            onPress={() => setPasswordVisible(!ispasswordVisible)}
            style={styles.eyeIcon}
          >
            <Icon
              name={ispasswordVisible ? 'eye-off' : 'eye'}
              size={24}
              color="#555"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={handleSignUp} style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Sign Up</Text>
          {isLoading && <ActivityIndicator size={'small'} color={'white'} />}
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', marginTop: 20 }}>
          <Text>Don’t have an account?</Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.signupText}> Login</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{ position: 'absolute', top: 60, left: 20 }}
      >
        <Image
          source={require('../assets/back.png')}
          style={{ width: 30, height: 30 }}
        />
      </TouchableOpacity>
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
    marginTop:10,
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
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 300,
    height: 50,
    backgroundColor: 'lightgrey',
    borderRadius: 15,
    paddingHorizontal: 10,
    marginTop: 10,
  },
  eyeIcon: {
    paddingHorizontal: 8,
  },
});

export default SignUpScreen;
