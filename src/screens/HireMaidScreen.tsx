import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import AppHeader from '../components/common/AppHeader';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface Maid {
  id: string;
  name: string;
  price: number;
  available: boolean;
  image: any;
}

const maids: Maid[] = [
  {
    id: '1',
    name: 'Rekha Sharma',
    price: 300,
    available: true,
    image: require('../assets/maid1.jpg'),
  },
  {
    id: '2',
    name: 'Sunita Verma',
    price: 400,
    available: false,
    image: require('../assets/maid2.png'),
  },
  {
    id: '3',
    name: 'Kiran Devi',
    price: 250,
    available: true,
    image: require('../assets/maid3.png'),
  },
  {
    id: '4',
    name: 'Geeta Kumari',
    price: 350,
    available: false,
    image: require('../assets/maid4.jpg'),
  },
];

const HireMaid = () => {
  const insets = useSafeAreaInsets();

  const renderItem = ({ item }: { item: Maid }) => (
    <View style={styles.card}>
      <Image source={item.image} style={styles.image} resizeMode="cover" />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>₹{item.price} / visit</Text>
        <Text style={[styles.status, { color: item.available ? 'green' : 'red' }]}>
          {item.available ? 'Available' : 'Unavailable'}
        </Text>
        {item.available && (
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Book Now</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  return (
   
    <ImageBackground source={require('/Users/piyush/Projects/clean-buddy/src/assets/backgroundappimage/gradient1.png')}style={styles.container}>
       
      <AppHeader
        title="Home Cleaning"
        leftIcon={require('../assets/back.png')}
      />
      <FlatList
        data={maids}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          paddingTop: insets.top + 50,
          paddingBottom: 20,
        }}
      />
       
    </ImageBackground>
   
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginHorizontal: 16,
    marginVertical: 10,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    height: 90,
    width: 90,
    borderRadius: 10,
  },
  infoContainer: {
    marginLeft: 16,
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  price: {
    marginTop: 4,
    color: '#555',
  },
  status: {
    marginTop: 4,
    fontWeight: '600',
    fontSize: 14,
  },
  button: {
    marginTop: 8,
    backgroundColor: '#007AFF',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default HireMaid;
