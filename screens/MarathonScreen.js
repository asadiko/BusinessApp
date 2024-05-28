// MarathonScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, TextInput } from 'react-native';
import MapView, { Polyline } from 'react-native-maps';
import FloatingBar from './FloatingBar';

const MarathonScreen = ({ navigation }) => {
  const currentDate = new Date();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredChallenges, setFilteredChallenges] = useState([
    'Upcoming Marathon From Liepaja...',
    'WHEEL WARRIORS! Upcoming marathon...',
    '20m MARATHON FROM RIGA OLDTOWN...',
    '20m MARATHON FROM RIGA OLDTOWN...'
  ]);

  const challenges = [
    'Upcoming Marathon From Liepaja...',
    'WHEEL WARRIORS! Upcoming marathon...',
    '20m MARATHON FROM RIGA OLDTOWN...',
    '20m MARATHON FROM RIGA OLDTOWN...'
  ];

  const routes = [
    {
      coordinates: [
        { latitude: 56.946, longitude: 24.105 },
        { latitude: 56.950, longitude: 24.110 },
        { latitude: 56.955, longitude: 24.115 }
      ],
      color: '#FF0000'
    },
    {
      coordinates: [
        { latitude: 56.946, longitude: 24.105 },
        { latitude: 56.945, longitude: 24.100 },
        { latitude: 56.944, longitude: 24.095 }
      ],
      color: '#0000FF'
    }
  ];

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query) {
      setFilteredChallenges(challenges.filter(challenge => challenge.toLowerCase().includes(query.toLowerCase())));
    } else {
      setFilteredChallenges(challenges);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Text style={styles.navButton}>{"<"}</Text>
        </TouchableOpacity>
        <Text style={styles.date}>{currentDate.toDateString()}</Text>
        <TouchableOpacity>
          <Text style={styles.navButton}>{">"}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="MARATHON"
          value={searchQuery}
          onChangeText={handleSearch}
        />
        <TouchableOpacity style={styles.searchIconContainer}>
          <Image source={require('../assets/images/search.png')} style={styles.searchIcon} />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.challengeContainer}>
          <Image source={require('../assets/images/gobus.png')} style={styles.globusIcon} />
          <View style={styles.locationContainer}>
            <Text style={styles.locationText}>Europe</Text>
            <Text style={styles.cityText}>Riga/Latvia</Text>
          </View>
        </View>
        {filteredChallenges.map((challenge, index) => (
          <TouchableOpacity key={index} style={[styles.challengeButton, index % 2 === 0 ? styles.blueButton : styles.redButton]}>
            <Text style={styles.challengeText}>{challenge}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={styles.routeContainer}>
        <Text style={styles.routeText}>ROUTE</Text>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 56.946,
            longitude: 24.105,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {routes.map((route, index) => (
            <Polyline
              key={index}
              coordinates={route.coordinates}
              strokeColor={route.color}
              strokeWidth={3}
            />
          ))}
        </MapView>
      </View>
      <FloatingBar navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8EE3EC',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#8BC34A',
    borderRadius: 10,
    marginHorizontal: 10,
    marginTop: 40,
  },
  navButton: {
    fontSize: 20,
    color: '#fff',
  },
  date: {
    fontSize: 18,
    color: '#fff',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
    marginTop: 20,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 18,
    color: '#000',
  },
  searchIconContainer: {
    padding: 5,
  },
  searchIcon: {
    width: 24,
    height: 24,
  },
  contentContainer: {
    alignItems: 'center',
    padding: 10,
  },
  challengeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    marginLeft: 10,
  },
  globusIcon: {
    alignSelf: 'flex-start',
    marginLeft: -10,
    width: 40,
    height: 40,
  },
  locationContainer: {
    marginLeft: 10,
  },
  locationText: {
    fontSize: 24,
    color: '#fff',
  },
  cityText: {
    fontSize: 18,
    color: '#fff',
  },
  mapIcon: {
    width: 200,
    height: 200,
    marginVertical: 10,
  },
  challengeButton: {
    width: '90%',
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
  },
  blueButton: {
    backgroundColor: '#4285F4',
  },
  redButton: {
    backgroundColor: '#FF4081',
  },
  challengeText: {
    color: '#fff',
    fontSize: 16,
  },
  routeContainer: {
    alignItems: 'center',
    marginVertical: 110,
  },
  routeText: {
    fontSize: 24,
    color: '#FF4081',
    marginBottom: 10,
  },
  map: {
    width: '90%',
    height: 200,
  },
});

export default MarathonScreen;
