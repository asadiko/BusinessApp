import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, TextInput } from 'react-native';
import FloatingBar from './FloatingBar';

const SearchScreen = ({ navigation }) => {
  const currentDate = new Date();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredChallenges, setFilteredChallenges] = useState([
    '< 25m challenge with bicycle!! by...',
    '< 32m challenge until weekend! by...',
    '< 45m walking challenge in one week! by...',
    '< 60m running challenge tomorrow! by...',
    '< 15m swimming challenge next week! by...',
  ]);

  const challenges = [
    '< 25m challenge with bicycle!! by...',
    '< 32m challenge until weekend! by...',
    '< 45m walking challenge in one week! by...',
    '< 60m running challenge tomorrow! by...',
    '< 15m swimming challenge next week! by...',
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
          placeholder="Challenges nearby"
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
        <Image source={require('../assets/images/maps.png')} style={styles.mapIcon} />
        {filteredChallenges.map((challenge, index) => (
          <TouchableOpacity key={index} style={styles.challengeButton}>
            <Text style={styles.challengeText}>{challenge}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
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
    marginLeft: -200,
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
    width: '100%',
    backgroundColor: '#4285F4',
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
  },
  challengeText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default SearchScreen;
