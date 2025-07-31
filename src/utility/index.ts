import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveLoginSession = async (token: string) => {
  try {
    await AsyncStorage.setItem('@user_token', token);
    console.log('Token saved');
  } catch (e) {
    console.error('Failed to save token.', e);
  }
}

export const getLoginSession = async () => {
  try {
    const token = await AsyncStorage.getItem('@user_token');
    if (token !== null) {
      // Token exists, user is logged in
      console.log('Token found:', token);
      return token;
    } else {
      // No token, user is logged out
      return null;
    }
  } catch (e) {
    console.error('Failed to fetch token.', e);
    return null;
  }
}


export const removeLoginSession = async () => {
  try {
    await AsyncStorage.removeItem('@user_token');
    console.log('Logged out');
  } catch (e) {
    console.error('Failed to logout.', e);
  }
}


export const reverseGeocode = async (latitude: number, longitude: number) => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
    );
    const data = await response.json();

    if (data?.address) {
      console.log('City:', data.address.city || data.address.town);
      console.log('Road:', data.address.road);
      console.log('Full Address:', data.display_name);
      return data.display_name
    } else {
      console.warn('No address found');
      return ''
    }
  } catch (error) {
    console.error('Nominatim error:', error);
    return ''
  }
};