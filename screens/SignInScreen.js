import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert, ImageBackground } from 'react-native';
import * as FileSystem from 'expo-file-system';

const SignInScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {
    try {
      const fileUri = FileSystem.documentDirectory + 'users.json';
      const fileInfo = await FileSystem.getInfoAsync(fileUri);
      if (!fileInfo.exists) {
        Alert.alert('Error', 'No users found. Please sign up first.');
        return;
      }
      const usersData = await FileSystem.readAsStringAsync(fileUri);
      const users = JSON.parse(usersData);

      const user = users.find(u => u.username === username && u.password === password);
      if (user) {
        Alert.alert('Success', `Welcome back, ${user.name}!`);
        navigation.navigate('Dashboard');
      } else {
        Alert.alert('Error', 'Invalid username or password');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to sign in');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('/Users/asadullaravshanbekov/Downloads/BusinessAPP/MyApp/assets/images/user-icon.png')} style={styles.faceIdIcon} />
      <View style={styles.overlay}>
        <View style={styles.inputContainer}>
          <Image source={require('/Users/asadullaravshanbekov/Downloads/BusinessAPP/MyApp/assets/images/username.png')} style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor="#FFFFFF"
            onChangeText={setUsername}
          />
        </View>
        <View style={styles.inputContainer}>
          <Image source={require('/Users/asadullaravshanbekov/Downloads/BusinessAPP/MyApp/assets/images/password.png')} style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#FFFFFF"
            secureTextEntry
            onChangeText={setPassword}
          />
        </View>
        <TouchableOpacity onPress={() => Alert.alert('Forgot Password')}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleSignIn}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
        <View style={styles.mockButtonContainer}>
          <Image source={require('/Users/asadullaravshanbekov/Downloads/BusinessAPP/MyApp/assets/images/apple.png')} style={styles.appleIcon} />
          <Text style={styles.appleButtonText}>Sign In with Apple</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.linkText}>Create New Account.</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.bottomImageContainer}>
        <Image source={require('/Users/asadullaravshanbekov/Downloads/BusinessAPP/MyApp/assets/images/without-bicycle.jpeg')} style={styles.backgroundImage} />
        <Text style={styles.welcomeText}>Welcome Back to HealthToGo!</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8EE3EC', // Lighter background color
  },
  faceIdIcon: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginTop: 120, // Increased margin to push the user icon lower
    marginBottom: 20,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -350, // Raised input area
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#62B1F6',
    borderRadius: 25,
    width: '80%',
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginVertical: 5,
  },
  input: {
    flex: 1,
    color: '#FFFFFF',
    paddingLeft: 10,
  },
  inputIcon: {
    width: 24,
    height: 24,
  },
  forgotPasswordContainer: {
    width: '80%', // same as inputContainer width
    alignSelf: 'center', // center the container
    alignItems: 'flex-end', // align text to the right
    marginTop: -10, // adjust as needed
  },

  forgotPasswordText: {
    color: '#0000FF',
    fontSize: 12,
    textDecorationLine: 'underline',
  },
  button: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginVertical: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#316FF6',
    fontSize: 18,
  },
  mockButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000000',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginVertical: 10,
  },
  appleIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  appleButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
  linkText: {
    color: '#FFFFFF',
    marginTop: 10,
    textDecorationLine: 'underline',
  },
  bottomImageContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
  welcomeText: {
    color: '#000000',
    fontSize: 24,
    fontWeight: 'bold',
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    textAlign: 'center',
  },
});

export default SignInScreen;
