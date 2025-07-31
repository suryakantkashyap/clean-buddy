import React, { useEffect, useRef, useState } from 'react';
import {
  TextInput,
  View,
  StyleSheet,
  Animated,
  Easing,
  TouchableOpacity,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // or Feather, MaterialIcons

const PLACEHOLDER_OPTIONS = [
  'Search for fruits...',
  'Try vegetables...',
  'What grains do you like?',
  'Type to filter items...',
];

const SearchBar = ({
  value,
  onChangeText,
  onClear,
}: {
  value: string;
  onChangeText: (text: string) => void;
  onClear: () => void;
}) => {
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  // Rotate placeholders every 3.5s
  useEffect(() => {
    const interval = setInterval(() => {
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setPlaceholderIndex(prev => (prev + 1) % PLACEHOLDER_OPTIONS.length);
      });
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

  return (
    <View style={styles.container}>
      <Icon name="search" size={20} color="#888" style={styles.searchIcon} />

      <AnimatedTextInput
        style={styles.input}
        placeholder={PLACEHOLDER_OPTIONS[placeholderIndex]}
        placeholderTextColor="#aaa"
        value={value}
        onChangeText={onChangeText}
      />

      {value.length > 0 && (
        <TouchableOpacity onPress={onClear} style={styles.clearButton}>
          <Icon name="close-circle" size={20} color="#888" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 12,
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 10,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 6,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: '#333',
  },
  clearButton: {
    padding: 4,
  },
});

export default SearchBar;
