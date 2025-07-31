import React from 'react';

import { View, StyleSheet, Dimensions } from 'react-native';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import { GestureDetector, Gesture } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('window');

export default function PullScreenAnimation() {
  const translateY = useSharedValue(0);

  const pan = Gesture.Pan()

    .onUpdate(e => {
      if (e.translationY < 0) {
        translateY.value = e.translationY;
      }
    })

    .onEnd(() => {
      translateY.value = withSpring(0);
    });

  const animatedScreenStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],

    borderTopLeftRadius: translateY.value < -50 ? 30 : 0,

    borderTopRightRadius: translateY.value < -50 ? 30 : 0,
  }));

  const animatedHandStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: translateY.value },

      { scale: translateY.value < -30 ? 0.95 : 1 },
    ],

    opacity: withTiming(translateY.value < -10 ? 1 : 0),
  }));

  return (
    <View style={styles.container}>
      <GestureDetector gesture={pan}>
        <Animated.View style={[styles.screen, animatedScreenStyle]}>
          {/* Screen content here */}
          <View style={styles.content}>
            <Animated.Image
              // source={require('./hand.jpg')}
              style={[styles.hand, animatedHandStyle]}
              resizeMode="contain"
            />
          </View>
        </Animated.View>
      </GestureDetector>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: '#ddd',
  },

  screen: {
    flex: 1,

    backgroundColor: '#fff',

    overflow: 'hidden',
  },

  content: {
    flex: 1,

    justifyContent: 'flex-start',

    alignItems: 'center',

    paddingTop: 40,
  },

  hand: {
    width: 80,

    height: 80,

    position: 'absolute',

    top: 0,

    zIndex: 100,
  },
});
