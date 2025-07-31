import React, { useEffect, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AppHeader from '../components/common/AppHeader';
import {
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  SectionList,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NavigationProps } from '../types';
import PullScreenAnimation from '../components/PullScreenAnimation';
import {
  colors,
  HomeCategories,
  SampleAdvertisements,
} from '../utility/constants';
import SearchBar from '../components/SearchBar';
import { reverseGeocode } from '../utility';
import ImageCarousel from '../components/ImageCarousel';

const DATA = [
  {
    title: 'Search',
    data: ['Search'],
  },
  {
    title: 'Categories',
    data: HomeCategories,
  },
  {
    title: 'Advertisement',
    data: SampleAdvertisements,
  },
];

function HomeScreen() {
  const navigation = useNavigation<NavigationProps>();
  const [searchText, setSearchText] = useState('');
  const [address, setAddress] = useState('');
  const route = useRoute();
  const location = route.params?.location;
  console.log('lcoation====', location);

  useEffect(() => {
    const fetchAddress = async () => {
      const _address = await reverseGeocode(
        location.latitude,
        location.longitude,
      );
      setAddress(_address);
    };
    fetchAddress();
  }, []);

  const renderCategories = ({ section }) => {
    const sectionIndex = DATA.findIndex(s => s.title === section.title);

    switch (sectionIndex) {
      case 0:
        return (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              marginHorizontal: 20,
              marginTop: 10,
            }}
          >
            <Text style={styles.headerTitle}>Home</Text>
            <Text style={styles.header}>{address}</Text>
          </View>
        );
      case 1:
        return null;
      default:
        return null;
    }
  };

  const renderSearchBar = () => {
    return (
      <View style={{ backgroundColor: colors.background }}>
        <SearchBar
          value={searchText}
          onChangeText={setSearchText}
          onClear={() => setSearchText('')}
        />
      </View>
    );
  };

  const renderSectionHeader = ({ section }) => {
    const index = DATA.findIndex(s => s.title === section.title);
    switch (index) {
      case 0:
      case 2:
        return null;
      case 1:
        return <View>{renderSearchBar()}</View>;
      default:
        return null;
    }
  };

  const renderSectionFooter = ({ section }) => {
    const index = DATA.findIndex(s => s.title === section.title);
    switch (index) {
      case 0:
        return null;
      case 2:
        return <ImageCarousel />;
      case 1:
        const categories = DATA[1].data;
        return (
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              paddingHorizontal: 20,
              gap: 20,
              paddingVertical: 15,
            }}
          >
            {categories.map((item, index) => {
              return (
                <TouchableOpacity
                  onPress={() => navigation.navigate('Homecleaning')}
                  style={styles.button}
                >
                  <Text style={[styles.buttonTxt]}>{item.name}</Text>
                  <View
                    style={{
                      alignItems: 'flex-end',
                      position: 'absolute',
                      bottom: 10,
                      right: 10,
                    }}
                  >
                    <Image
                      source={item.image}
                      style={{
                        resizeMode: 'contain',
                        height: index === 3 ? 105 : 85,
                        width: index === 3 ? 95 : 75,
                        paddingTop: index === 3 ? 30 : 0,
                        marginTop: 2,
                        marginLeft: 15,
                      }}
                    ></Image>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <SectionList
        sections={DATA}
        keyExtractor={(item, index) => item + index}
        renderItem={renderCategories}
        renderSectionHeader={renderSectionHeader}
        renderSectionFooter={renderSectionFooter}
        stickySectionHeadersEnabled
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#e4eaff' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerOption: {
    fontSize: 15,
    fontWeight: '600',
    borderWidth: 1,
    padding: 10,
    borderRadius: 20,
    paddingVertical: 20,
    margin: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    textAlign: 'center',
  },
  content: { flex: 1, padding: 10, alignSelf: 'stretch', minHeight: 300 },
  listItem: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
  },
  button: {
    flexBasis: '47%',
    // margin: 5,
    backgroundColor: '#ffffff',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    elevation: 2,
    // borderWidth: 1,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { height: 0, width: 2 },
    height: 160,
    borderColor: 'black',
  },
  listText: { fontSize: 16 },

  filterRow: {
    alignItems: 'flex-end',
    marginBottom: 10,
  },
  filterButton: {
    backgroundColor: '#ffffff',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    elevation: 2,
  },
  wrapper: {
    backgroundColor: 'violet',
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  button3: {
    width: 166,
    marginLeft: '2%',
    backgroundColor: '#bfa6f9ff',
  },
  button1: {
    backgroundColor: '#ffffffff',
  },
  buttonTxt: {
    fontSize: 17,
    // borderWidth: 1,
    // borderRadius: 20,
    // padding: 10,
    // shadowColor: '#000',
    // shadowOffset: { width: 1, height: 2 },
    // shadowOpacity: 0.3,
    // shadowRadius: 2,
    // textAlign: 'center',
    paddingTop: 10,
  },
  filterText: { fontWeight: 'bold', color: '#333' },
  placeholder: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  placeholderText: { fontSize: 16, color: '#333' },
  searchInput: {
    margin: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#f1f1f1',
    fontSize: 16,
  },
});

export default HomeScreen;
