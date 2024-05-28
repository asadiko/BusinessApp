import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, TextInput } from 'react-native';
import FloatingBar from './FloatingBar'; // Import the FloatingBar component

const RewardsScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentDate, setCurrentDate] = useState(new Date());

  const coupons = [
    { text: "Circle K %25 Discount Coupon!", points: 38 },
    { text: "Rimi %10 Discount Coupon!", points: 38 },
    { text: "Costa ONE BY GET ONE Coupon!", points: 38 },
    { text: "NARVESEN %10 Discount Coupon!", points: 38 },
    { text: "Example Coupon 1!", points: 38 },
    { text: "Example Coupon 2!", points: 38 },
    { text: "Example Coupon 3!", points: 38 },
  ];

  const filteredCoupons = coupons.filter(coupon => 
    coupon.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderCoupon = (coupon, index) => {
    return (
      <View style={styles.couponContainer} key={index}>
        <Text style={styles.couponText}>{`< ${coupon.text}`}</Text>
        <View style={styles.couponPointsContainer}>
          <Text style={styles.couponPoints}>{coupon.points}</Text>
          <Image source={require('../assets/images/star.png')} style={styles.couponStarIcon} />
        </View>
      </View>
    );
  };

  const handlePrevDay = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - 1);
    setCurrentDate(newDate);
  };

  const handleNextDay = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 1);
    setCurrentDate(newDate);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handlePrevDay}>
          <Text style={styles.navButton}>{"<"}</Text>
        </TouchableOpacity>
        <Text style={styles.date}>{currentDate.toDateString()}</Text>
        <TouchableOpacity onPress={handleNextDay}>
          <Text style={styles.navButton}>{">"}</Text>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.pointsContainer}>
          <Image source={require('../assets/images/star.png')} style={styles.couponStarIcon} />
          <Text style={styles.points}>78</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Collecting the Awards!"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity>
            <Image source={require('../assets/images/search.png')} style={styles.searchIcon} />
          </TouchableOpacity>
        </View>
        {filteredCoupons.map((coupon, index) => renderCoupon(coupon, index))}
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
    marginBottom: 10,
    marginTop: 50,
  },
  navButton: {
    fontSize: 20,
    color: '#fff',
  },
  date: {
    fontSize: 18,
    color: '#fff',
  },
  contentContainer: {
    padding: 10,
  },
  pointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  starIcon: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  points: {
    fontSize: 24,
    color: '#FFD700',
    fontWeight: 'bold',
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: '#CCCCCC',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: '#FFF',
    marginLeft: 10,
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginLeft: 10,
  },
  couponContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#3498DB',
    borderRadius: 20,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  couponText: {
    fontSize: 16,
    color: '#FFF',
  },
  couponPointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  couponPoints: {
    fontSize: 18,
    color: '#FFD700',
    marginRight: 5,
  },
  couponStarIcon: {
    width: 20,
    height: 20,
  },
});

export default RewardsScreen;
