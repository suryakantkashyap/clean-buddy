import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import { getAuth, createUserWithEmailAndPassword } from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';

function SignUpScreen({navigation}) {
  // const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSignUp = async () => {
    if (!validateEmail(email) || password.length < 6) {
      Alert.alert('Invalid Input', 'Enter a valid email and password (min 6 characters).');
      return;
    }

    setLoading(true);
    try {
      await createUserWithEmailAndPassword(getAuth(), email, password);
      Alert.alert('Account Created', 'You can now log in with your credentials');
      navigation.replace('Login');
    } catch (error) {
      console.log('Signup Error:', error.message);
      Alert.alert('Signup Failed', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fbf5f5ff" />
      <View style={styles.container}>
        <Image
          source={require('../assets/cleanbuddy.png')}
          style={styles.logo}
        />

        <TextInput
          placeholder="Enter your EMAIL"
          placeholderTextColor="#999999"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />

        <TextInput
          placeholder="Create PASSWORD"
          placeholderTextColor="#999999"
          secureTextEntry
          autoCapitalize="none"
          value={password}
          onChangeText={setPassword}
          style={styles.input}
        />

        <TouchableOpacity
          onPress={handleSignUp}
          style={styles.signupButton}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.signupButtonText}>Sign Up</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.loginLink}>Already have an account? Login</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 60,
    alignItems: 'center',
    backgroundColor: '#e4eaff',
  },
  logo: {
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
  signupButton: {
    marginTop: 30,
    backgroundColor: '#007bff',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 40,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },
  signupButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  loginLink: {
    marginTop: 20,
    color: '#28a745',
    fontSize: 14,
  },
});

export default SignUpScreen;
