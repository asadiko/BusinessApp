import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert, ImageBackground } from 'react-native';
import * as FileSystem from 'expo-file-system';

const SignUpScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    const user = { name, username, email, password };
    const fileUri = FileSystem.documentDirectory + 'users.json';

    try {
      const fileInfo = await FileSystem.getInfoAsync(fileUri);
      let users = [];
      if (fileInfo.exists) {
        const usersData = await FileSystem.readAsStringAsync(fileUri);
        users = JSON.parse(usersData);
      }

      if (users.some(u => u.username === username)) {
        Alert.alert('Error', 'Username already exists');
        return;
      }

      users.push(user);
      await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(users));
      Alert.alert('Success', 'Account created successfully');
      navigation.navigate('SignIn');
    } catch (error) {
      Alert.alert('Error', 'Failed to create account');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.overlay}>
        <Image source={require('/Users/asadullaravshanbekov/Downloads/BusinessAPP/MyApp/assets/images/user-icon.png')} style={styles.icon} />
        <View style={styles.inputContainer}>
          <Image source={require('/Users/asadullaravshanbekov/Downloads/BusinessAPP/MyApp/assets/images/username.png')} style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Name, Surname"
            placeholderTextColor="#fff"
            onChangeText={setName}
          />
        </View>
        <View style={styles.inputContainer}>
          <Image source={require('/Users/asadullaravshanbekov/Downloads/BusinessAPP/MyApp/assets/images/user-id.png')} style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor="#fff"
            onChangeText={setUsername}
          />
        </View>
        <View style={styles.inputContainer}>
          <Image source={require('/Users/asadullaravshanbekov/Downloads/BusinessAPP/MyApp/assets/images/email.png')} style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#fff"
            keyboardType="email-address"
            onChangeText={setEmail}
          />
        </View>
        <View style={styles.inputContainer}>
          <Image source={require('/Users/asadullaravshanbekov/Downloads/BusinessAPP/MyApp/assets/images/password.png')} style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#fff"
            secureTextEntry
            onChangeText={setPassword}
          />
        </View>
        <View style={styles.inputContainer}>
          <Image source={require('/Users/asadullaravshanbekov/Downloads/BusinessAPP/MyApp/assets/images/password.png')} style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            placeholderTextColor="#fff"
            secureTextEntry
            onChangeText={setConfirmPassword}
          />
        </View>
        <TouchableOpacity style={styles.checkboxContainer}>
          <Text style={styles.checkboxText}>Privacy & Policy</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
          <Text style={styles.linkText}>Already have an account? Sign In</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.bottomImageContainer}>
        <Image source={require('/Users/asadullaravshanbekov/Downloads/BusinessAPP/MyApp/assets/images/with-bicycle.jpeg')} style={styles.backgroundImage} />
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
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
  backIcon: {
    width: 24,
    height: 24,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 80, // Adjusted for icon positioning
  },
  icon: {
    width: 120,
    height: 120,
    marginBottom: 20,
    borderRadius: 60,
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
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  checkboxText: {
    color: '#FFFFFF',
    fontSize: 16,
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
  linkText: {
    color: '#FFFFFF',
    marginTop: 10,
    textDecorationLine: 'underline',
  },
  bottomImageContainer: {
    position: 'absolute',
    bottom: 30,
    width: '95%',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 15, // Rounded edges
    overflow: 'hidden',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    borderRadius: 15, // Rounded edges
  },
  welcomeText: {
    color: '#000000',
    fontSize: 24,
    fontWeight: 'bold',
    position: 'absolute',
    textAlign: 'center',
  },
});

export default SignUpScreen;
