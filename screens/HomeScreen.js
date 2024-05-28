import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Animated, Easing } from 'react-native';
import WaveShape from './WaveShape';

const HomeScreen = ({ navigation }) => {
  const [progress] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(progress, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: false,
      easing: Easing.linear,
    }).start(() => {
      navigation.navigate('Auth');
    });
  }, [progress, navigation]);

  return (
    <View style={styles.outerContainer}>
      <WaveShape style={styles.wave} />
      <View style={styles.container}>
        <Image source={require('../assets/images/bicycle.jpg')} style={styles.icon} />
        <Text style={styles.title}>HealthToGo</Text>
        <View style={styles.progressBarContainer}>
          <Animated.View style={[styles.progressBar, { width: progress.interpolate({
            inputRange: [0, 1],
            outputRange: ['0%', '100%']
          })}]} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: '#8EE3EC',
  },
  wave: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 150,
    height: 150,
    marginBottom: 20,
    borderRadius: 75,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#FFFFFF', // Change text color to white
  },
  progressBarContainer: {
    width: '80%',
    height: 10,
    backgroundColor: '#D3D3D3',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 5,
  },
});

export default HomeScreen;
