import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  ImageBackground,
  Platform,
  FlatList,
  Image,
} from 'react-native';
import AppHeader from '../components/common/AppHeader';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
const maids: Maid[] = [
  { id: '1', name: 'Rekha Sharma', price: 300, available: true ,image: require('../assets/maid1.jpg')},
  { id: '2', name: 'Sunita Verma', price: 400, available: false,image: require('../assets/maid2.png') },
  { id: '3', name: 'Kiran Devi', price: 250, available: true ,image: require('../assets/maid3.png')},
  { id: '4', name: 'Geeta Kumari', price: 350, available: false ,image: require('../assets/maid4.jpg')},
];

interface Maid {
  id: string;
  name: string;
  price: number;
  available: boolean;
  image: any;
}
const Homecleaning = () => {
  const insets = useSafeAreaInsets();
  const renderItem = ({ item }: { item: Maid }) => (
    <View style={styles.card}>
       <Image
      source={item.image}
      style={{ height: 100, width: 100, borderRadius: 10 }}
      resizeMode="cover"
    />
      <Text style={styles.maidname}>{item.name}</Text>
      <Text style={styles.price}>₹{item.price} / visit</Text>
      <Text
        style={[styles.status, { color: item.available ? 'green' : 'red' }]}
      >
        {item.available ? 'Available' : 'Unavailable'}
      </Text>
     
    </View>
  );

  return (
    <ImageBackground
      source={require('../assets/celanbuddy1.png')} // your image path here
      style={styles.background}
      resizeMode="cover"
    >
      <StatusBar backgroundColor="transparent" barStyle="light-content" />

      <View style={[styles.conatiner]}>
        <FlatList
          data={maids}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={{ paddingTop: insets.top + 50 }}
        />
      </View>
      <AppHeader
        title={'Home Cleaning'}
        leftIcon={require('../assets/back.png')}
      ></AppHeader>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
  },
  header: {
    padding: 10,
    alignItems: 'center',
  },
  background: {
    flex: 1,
  },
  text: {
    color: 'white',
    fontWeight: '500',
    fontSize: 18,
    borderRadius: 20,
    padding: 10,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // light glassy background
    borderRadius: 16,
    padding: 16,
    marginVertical: 10,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 10, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5, // Android shadow
  },
  maidname: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  price: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  status: {
    marginTop: 1,
    fontWeight: '600',
    fontSize: 14,
    marginLeft: 250,
  },
});

export default Homecleaning;
