import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  ImageBackground,
  FlatList,
  Image,
} from 'react-native';
import AppHeader from '../components/common/AppHeader';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const maids: Maid[] = [
  {
    id: '1',
    name: 'Deep Cleaning',
    price: 499,
    available: true,
    image: require('../assets/ToiletCleaning/toilet1.jpg'),
  },
  {
    id: '2',
    name: '2 Bathrooms Cleaning',
    price: 799,
    available: true,
    image: require('../assets/ToiletCleaning/toilet2.jpg'),
  },
  {
    id: '3',
    name: 'Stain Removal',
    price: 399,
    available: false,
    image: require('../assets/ToiletCleaning/toilet3.jpg'),
  },
];

interface Maid {
  id: string;
  name: string;
  price: number;
  available: boolean;
  image: any;
}

const ToiletCleaningScreen = () => {
  const insets = useSafeAreaInsets();

  const renderItem = ({ item }: { item: Maid }) => (
    <View style={styles.card}>
      <Image
        source={item.image}
        style={{ height: 100, width: '100%', borderRadius: 10 }}
        resizeMode="cover"
      />
      <Text style={styles.maidname}>{item.name}</Text>
      <Text style={styles.price}>₹{item.price} / service</Text>
      <Text
        style={[styles.status, { color: item.available ? 'green' : 'red' }]}
      >
        {item.available ? 'Available' : 'Unavailable'}
      </Text>
    </View>
  );

  return (
    <ImageBackground
      source={require('/Users/piyush/Projects/clean-buddy/src/assets/backgroundappimage/gradient1.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <AppHeader
        title={'Toilet Cleaning'}
        leftIcon={require('../assets/back.png')}
      />
      
      <View style={styles.offerBanner}>
        <Text style={styles.offerText}>🔥 20% OFF on 2 Bathroom Cleaning 🔥</Text>
      </View>

      <View style={[styles.container]}>
        <FlatList
          data={maids}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 50, paddingTop: insets.top + 60 }}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  offerBanner: {
    backgroundColor: '#fff',
    padding: 10,
    margin: 15,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
  },
  offerText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF5722',
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 16,
    padding: 16,
    marginVertical: 10,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 10, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  maidname: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },
  price: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  status: {
    marginTop: 6,
    fontWeight: '600',
    fontSize: 14,
  },
});

export default ToiletCleaningScreen;
