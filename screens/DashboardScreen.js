import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Alert, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import MapView, { Polyline } from 'react-native-maps';
import * as Location from 'expo-location';
import { LineChart } from 'react-native-chart-kit';
import * as FileSystem from 'expo-file-system';
import { Picker } from '@react-native-picker/picker';
import FloatingBar from './FloatingBar'; // Import the FloatingBar component
import { useNavigation } from '@react-navigation/native';

const DashboardScreen = () => {
  const [location, setLocation] = useState(null);
  const [path, setPath] = useState([]);
  const [distance, setDistance] = useState(0);
  const [goal, setGoal] = useState(5);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [prevResults, setPrevResults] = useState([]);
  const [calories, setCalories] = useState(0);
  const [averageCalories, setAverageCalories] = useState(0);
  const [averageKm, setAverageKm] = useState(0);

  const navigate = useNavigation();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);

      Location.watchPositionAsync({ accuracy: Location.Accuracy.Highest, distanceInterval: 1 }, (newLocation) => {
        const { latitude, longitude } = newLocation.coords;
        if (path.length > 0) {
          const prevLocation = path[path.length - 1];
          const distanceIncrement = getDistanceFromLatLonInKm(prevLocation.latitude, prevLocation.longitude, latitude, longitude);
          setDistance(prevDistance => prevDistance + distanceIncrement);
        }
        setPath((prevPath) => [...prevPath, { latitude, longitude }]);
      });
    })();

    loadPrevResults();
  }, []);

  useEffect(() => {
    updateStats();
  }, [prevResults, distance]);

  const loadPrevResults = async () => {
    const fileUri = FileSystem.documentDirectory + 'results.json';
    try {
      const fileInfo = await FileSystem.getInfoAsync(fileUri);
      if (fileInfo.exists) {
        const resultsData = await FileSystem.readAsStringAsync(fileUri);
        setPrevResults(JSON.parse(resultsData));
      } else {
        const mockData = generateMockData();
        setPrevResults(mockData);
        await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(mockData));
      }
    } catch (error) {
      console.error('Failed to load previous results', error);
    }
  };

  const generateMockData = () => {
    const mockData = [];
    for (let i = 0; i < 10; i++) {
      const date = new Date();
      date.setDate(date.getDate() - (10 - i));
      mockData.push({ date: date.toISOString(), distance: 5 + Math.random() * 5, goal: 5 + Math.random() * 5 });
    }
    return mockData;
  };

  const saveResult = async () => {
    const result = { date: currentDate.toISOString(), distance, goal };
    const fileUri = FileSystem.documentDirectory + 'results.json';

    try {
      const fileInfo = await FileSystem.getInfoAsync(fileUri);
      let results = [];
      if (fileInfo.exists) {
        const resultsData = await FileSystem.readAsStringAsync(fileUri);
        results = JSON.parse(resultsData);
      }
      results.push(result);
      await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(results));
      setPrevResults(results);
      Alert.alert('Success', 'Results saved successfully');
    } catch (error) {
      Alert.alert('Error', 'Failed to save results');
    }
  };

  const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in km
    return distance;
  };

  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };

  const updateStats = () => {
    const totalCalories = prevResults.reduce((sum, result) => sum + result.distance * 60, 0); // Assuming 60 kcal per km
    const avgCalories = totalCalories / prevResults.length;
    const avgKm = prevResults.reduce((sum, result) => sum + result.distance, 0) / prevResults.length;
    setCalories(distance * 60);
    setAverageCalories(avgCalories);
    setAverageKm(avgKm);
  };

  const handlePrevDay = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - 1);
    setCurrentDate(newDate);
    loadPrevResults();
  };

  const handleNextDay = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 1);
    setCurrentDate(newDate);
    loadPrevResults();
  };

  const chartColors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'];

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handlePrevDay}>
            <Text style={styles.navButton}>{"<"}</Text>
          </TouchableOpacity>
          <Text style={styles.date}>{currentDate.toDateString()}</Text>
          <TouchableOpacity onPress={handleNextDay}>
            <Text style={styles.navButton}>{">"}</Text>
          </TouchableOpacity>
        </View>
        <MapView
          style={styles.map}
          customMapStyle={mapStyle}
          initialRegion={{
            latitude: 56.9496, // Riga, Latvia
            longitude: 24.1052, // Riga, Latvia
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Polyline coordinates={path} strokeWidth={5} />
        </MapView>
        <View style={styles.infoContainer}>
          <View style={styles.goalContainer}>
            <Text style={styles.goalText}>{distance.toFixed(1)} km</Text>
            <Text style={styles.goalLabel}>DAILY GOAL: {goal} km</Text>
          </View>
          <View style={styles.statsContainer}>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>{calories.toFixed(1)}</Text>
              <Text style={styles.statLabel}>Kcal</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>Average</Text>
              <Text style={styles.statValue}>{averageCalories.toFixed(1)}</Text>
              <Text style={styles.statLabel}>Calorie</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>{averageKm.toFixed(1)}</Text>
              <Text style={styles.statLabel}>Km</Text>
            </View>
          </View>
          <View style={styles.goalPickerContainer}>
            <Picker
              selectedValue={goal}
              style={styles.goalPicker}
              onValueChange={(itemValue) => setGoal(itemValue)}
            >
              {[...Array(31).keys()].slice(1).map(value => (
                <Picker.Item key={value} label={`${value} km`} value={value} />
              ))}
            </Picker>
          </View>
          <TouchableOpacity style={styles.saveButton} onPress={saveResult}>
            <Text style={styles.saveButtonText}>Save Result</Text>
          </TouchableOpacity>
          <LineChart
            data={{
              labels: prevResults.map(result => new Date(result.date).toLocaleDateString()),
              datasets: [
                {
                  data: prevResults.map(result => result.distance),
                  color: (opacity = 1, index) => chartColors[index % chartColors.length], // custom colors for each line
                },
              ],
            }}
            width={Dimensions.get('window').width - 20}
            height={220}
            chartConfig={{
              backgroundColor: '#e26a00',
              backgroundGradientFrom: '#fb8c00',
              backgroundGradientTo: '#ffa726',
              decimalPlaces: 1,
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: '6',
                strokeWidth: '2',
                stroke: '#ffa726',
              },
            }}
            style={styles.chart}
          />
        </View>
      </ScrollView>
      <FloatingBar navigation={navigate} />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8EE3EC',
  },
  contentContainer: {
    paddingTop: 50, // Add padding to avoid overlap with the status bar
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#8BC34A',
    borderRadius: 10, // Rounded corners
    marginHorizontal: 10,
    marginBottom: 10,
  },
  navButton: {
    fontSize: 20,
    color: '#fff',
  },
  date: {
    fontSize: 18,
    color: '#fff',
  },
  map: {
    height: 300, // Adjust height to fit the screen better
    marginHorizontal: 10,
    borderRadius: 10, // Rounded corners for the map
    overflow: 'hidden', // Ensure the corners are rounded
  },
  infoContainer: {
    alignItems: 'center',
    padding: 10,
  },
  goalContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  goalText: {
    fontSize: 40,
    color: '#FF4081',
  },
  goalLabel: {
    fontSize: 18,
    color: '#FF4081',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginVertical: 10,
  },
  statBox: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    color: '#fff',
  },
  statLabel: {
    fontSize: 16,
    color: '#fff',
  },
  goalPickerContainer: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 5,
    marginBottom: 10,
    borderWidth: 0,
    overflow: 'hidden',
  },
  goalPicker: {
    height: 135,
    color: '#000',
  },
  saveButton: {
    backgroundColor: '#62B1F6',
    padding: 10,
    borderRadius: 35,
    marginVertical: 5,
    width: '35%',
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  chart: {
    marginVertical: 20,
    borderRadius: 16,
  },
});

const mapStyle = [
  {
    elementType: 'geometry',
    stylers: [{ color: '#ebe3cd' }],
  },
  {
    elementType: 'labels.text.fill',
    stylers: [{ color: '#523735' }],
  },
  {
    elementType: 'labels.text.stroke',
    stylers: [{ color: '#f5f1e6' }],
  },
  {
    featureType: 'administrative',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#c9b2a6' }],
  },
  {
    featureType: 'administrative.land_parcel',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#dcd2be' }],
  },
  {
    featureType: 'administrative.land_parcel',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#ae9e90' }],
  },
  {
    featureType: 'landscape.natural',
    elementType: 'geometry',
    stylers: [{ color: '#dfd2ae' }],
  },
  {
    featureType: 'poi',
    elementType: 'geometry',
    stylers: [{ color: '#dfd2ae' }],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#93817c' }],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry.fill',
    stylers: [{ color: '#a5b076' }],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#447530' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{ color: '#f5f1e6' }],
  },
  {
    featureType: 'road.arterial',
    elementType: 'geometry',
    stylers: [{ color: '#fdfcf8' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{ color: '#f8c967' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#e9bc62' }],
  },
  {
    featureType: 'road.highway.controlled_access',
    elementType: 'geometry',
    stylers: [{ color: '#e98d58' }],
  },
  {
    featureType: 'road.highway.controlled_access',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#db8555' }],
  },
  {
    featureType: 'road.local',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#806b63' }],
  },
  {
    featureType: 'transit.line',
    elementType: 'geometry',
    stylers: [{ color: '#dfd2ae' }],
  },
  {
    featureType: 'transit.line',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#8f7d77' }],
  },
  {
    featureType: 'transit.line',
    elementType: 'labels.text.stroke',
    stylers: [{ color: '#ebe3cd' }],
  },
  {
    featureType: 'transit.station',
    elementType: 'geometry',
    stylers: [{ color: '#dfd2ae' }],
  },
  {
    featureType: 'water',
    elementType: 'geometry.fill',
    stylers: [{ color: '#b9d3c2' }],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#92998d' }],
  },
];

export default DashboardScreen;
