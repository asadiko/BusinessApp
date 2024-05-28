import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const AuthScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/bicycle.jpg')} style={styles.icon} />
      <Text style={styles.title}>HealthToGo</Text>
      <Text style={styles.subtitle}>
        Welcome to <Text style={styles.bold}>HealthToGo</Text>, where you can track, compete, and earn rewards as you cycle!
      </Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SignIn')}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, styles.signUpButton]} onPress={() => navigation.navigate('SignUp')}>
        <Text style={[styles.buttonText, styles.signUpButtonText]}>Sign Up</Text>
      </TouchableOpacity>
      <Text style={styles.socialText}>Sign up using</Text>
      <View style={styles.socialIconsContainer}>
        <TouchableOpacity>
          <Image source={require('../assets/images/facebook.png')} style={styles.socialIcon} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={require('../assets/images/google.png')} style={styles.socialIcon} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={require('../assets/images/apple.png')} style={styles.socialIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#8EE3EC', // Lightened background color
    paddingTop: 120,
  },
  icon: {
    width: 150,
    height: 150,
    marginBottom: 30,
    borderRadius: 75,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#FFFFFF',
  },
  subtitle: {
    textAlign: 'center',
    marginHorizontal: 20,
    fontSize: 16,
    marginBottom: 30,
    color: '#FFFFFF',
  },
  bold: {
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#62B1F6', // Lightened button color
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20, // More rounded buttons
    marginVertical: 5,
    alignItems: 'center',
  },
  signUpButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#62B1F6', // Lightened border color
    borderRadius: 20, // More rounded buttons
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
  signUpButtonText: {
    color: '#62B1F6', // Lightened text color
  },
  socialText: {
    marginTop: 40,
    marginBottom: 10,
    fontSize: 16,
    color: '#FFFFFF',
  },
  socialIconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
  },
  socialIcon: {
    width: 40,
    height: 40,
  },
});

export default AuthScreen;
