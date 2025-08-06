import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  FlatList
} from 'react-native';
import React from 'react';
import AppHeader from '../components/common/AppHeader';
import Icon from 'react-native-vector-icons/Ionicons';
import { Image } from 'react-native';

const data = [
  {
    id: '1',
    title: 'Deep tissue pain relief massage',
    tagline: 'Muscle pain? Knot anymore.',
    type: 'High pressure',
    duration: '60 / 90 mins • Full body',
    bestseller: true,
    rating: '4.86',
    reviews: '89K reviews',
    price: '₹1,399',
    options: '2 options',
    description:
      'High-pressure palm movements to relieve muscle tension & soreness',
    image: require('../assets/massage/painrelief.png'),
  },
  {
    id: '2',
    title: 'Swedish relaxation massage',
    tagline: 'Relax, unwind, and recharge.',
    type: 'Light pressure',
    duration: '45 / 60 mins • Full body',
    bestseller: false,
    rating: '4.75',
    reviews: '62K reviews',
    price: '₹1,199',
    options: '3 options',
    description:
      'Smooth, gentle strokes to promote relaxation and reduce stress.',
    image: require('../assets/massage/postworkoutmassage.png'),
  },
  {
    id: '3',
    title: 'Ayurvedic Abhyanga massage',
    tagline: 'Ancient healing for modern stress.',
    type: 'Medium pressure',
    duration: '60 mins • Full body',
    bestseller: true,
    rating: '4.92',
    reviews: '48K reviews',
    price: '₹1,499',
    options: '2 options',
    description:
      'A traditional oil massage that detoxifies and rejuvenates.',
    image: require('../assets/massage/stressrelief.png'),
  },
  {
    id: '4',
    title: 'Sports recovery massage',
    tagline: 'Bounce back stronger.',
    type: 'High pressure',
    duration: '30 / 60 mins • Targeted areas',
    bestseller: false,
    rating: '4.80',
    reviews: '53K reviews',
    price: '₹1,299',
    options: '2 options',
    description:
      'Ideal for muscle recovery post workouts or physical activity.',
    image: require('../assets/massage/massage.png'),
  },
];
const MassageScreen = () => {
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={item.image} style={styles.cardImage} />
      <View style={styles.cardText}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardDescription}>{item.description}</Text>
      </View>
    </View>
  );
 

  return (
    <ImageBackground
      // source={require('/Users/piyush/Projects/clean-buddy/src/assets/backgroundappimage/gradient1.png')}
      style={[styles.background, { backgroundColor: '#efefefff' }]}
      resizeMode="cover"
    >
      <AppHeader
        title={'Massage for Men'}
        leftIcon={require('../assets/back.png')}
      />
<ScrollView>
      <View style={styles.container}>
        <View
          style={{ backgroundColor: '#F9F9F9', padding: 10, borderRadius: 10 }}
        >
          <Text style={styles.title}>Massage for Men</Text>
          <View style={styles.reviewsRow}>
            <Icon name="star" size={16} color="black" />
            <Text style={styles.reviewText}> 4.85 (2.3M bookings)</Text>
          </View>
        </View>

        <View
          style={[
            styles.typeofmsg,
            { backgroundColor: '#F9F9F9', borderRadius: 10, marginTop: 10 },
          ]}
        >
          <View style={styles.massages}>
            <TouchableOpacity title="this" style={styles.massages1}>
              <Image
                style={styles.image}
                source={require('../assets/massage/massage.png')}
              ></Image>
              <Text style={{ textAlign: 'center' }}>Pain relief</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.massages}>
            <TouchableOpacity title="this" style={styles.massages1}>
              <Image
                style={styles.image}
                source={require('../assets/massage/painrelief.png')}
              ></Image>
              <Text style={{ textAlign: 'center' }}>post workout</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.massages}>
            <TouchableOpacity title="this" style={styles.massages1}>
              <Image
                style={styles.image}
                source={require('../assets/massage/postworkoutmassage.png')}
              ></Image>
              <Text style={{ textAlign: 'center' }}> stress relief</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.massages}>
            <TouchableOpacity title="this" style={styles.massages1}>
              <Image
                style={styles.image}
                source={require('../assets/massage/stressrelief.png')}
              ></Image>
              <Text style={{ textAlign: 'center' }}>Add-ons</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      
    <FlatList
  data={data}
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => (
    <View style={styles.card}>
      <Image source={item.image} style={styles.cardImage} />
      <View style={styles.cardText}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardTagline}>{item.tagline}</Text>
        <Text style={styles.cardDetail}>Type: {item.type}</Text>
        <Text style={styles.cardDetail}>Duration: {item.duration}</Text>
        {item.bestseller && (
          <Text style={styles.cardBestseller}>★ Bestseller</Text>
        )}
        <Text style={styles.cardDetail}>Rating: {item.rating} ({item.reviews})</Text>
        <Text style={styles.cardPrice}>{item.price} • {item.options}</Text>
        <Text style={styles.cardDescription}>{item.description}</Text>
      </View>
    </View>
  )}
  contentContainerStyle={{ paddingTop:10}}
/>

      </ScrollView>
      
    </ImageBackground>
  );
};

export default MassageScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 100,
    padding: 0,
  },
  title: {
    fontSize: 28,
    fontWeight: '400', // corrected
    paddingBottom: 10,
  },
  background: {
    flex: 1,
  },
  reviews: {
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    borderStyle: 'dashed',
    paddingBottom: 4,
    marginBottom: 10,
    width: '60%', // or '100%' if you prefer full-width
  },
  reviewsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    borderStyle: 'dashed',
    paddingBottom: 4,
    marginBottom: 10,
    width: '60%',
  },
  reviewText: {
    fontSize: 12,
    color: '#000',
    fontWeight: '300',
  },
  massages: {
    marginTop: 50,
    marginBottom: 50,
  },
  massages1: {
    backgroundColor: 'black',
    width: 80,
    height: 80,
    borderRadius: 20,
  },
  typeofmsg: {
    flexDirection: 'row',
    gap: 10,
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 20,
  },
  sectionTitle: {
  fontSize: 25,
  fontWeight: '500',
  marginVertical: 10,
},

card: {
  flexDirection: 'row',
  backgroundColor: '#fff',
  borderRadius: 12,
  padding: 12,
  marginBottom: 12,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
  elevation: 2,
   width: '100%',
     alignSelf: 'stretch',
},

cardImage: {
  width: 80,
  height: 80,
  borderRadius: 12,
  marginRight: 12,
},

cardText: {
  flex: 1,
  justifyContent: 'center',
},

cardTitle: {
  fontSize: 16,
  fontWeight: '600',
  marginBottom: 4,
},

cardDescription: {
  fontSize: 14,
  color: '#555',
},

card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
   
  },
  cardImage: {
    width: '100%',
    height: 180,
    borderRadius: 10,
    marginBottom: 10,
  },
  cardText: {
    flexDirection: 'column',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  cardTagline: {
    fontSize: 14,
    fontStyle: 'italic',
    marginBottom: 6,
    color: '#555',
  },
  cardDetail: {
    fontSize: 14,
    color: '#444',
    marginBottom: 2,
  },
  cardBestseller: {
    fontSize: 13,
    color: '#d2691e',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  cardPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#008080',
    marginVertical: 6,
  },
  cardDescription: {
    fontSize: 13,
    color: '#666',
    marginTop: 4,
  },

});
