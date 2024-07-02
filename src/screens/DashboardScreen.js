import React, { useContext } from 'react';
import { View, ScrollView } from 'react-native';
import { Text } from 'react-native-paper';
import { AuthContext } from '../Context/AuthContext';
import HeaderNav from '../components/HeaderNav';
import styles from './styles';
import { LinearGradient } from 'expo-linear-gradient';
import DashboardButton from '../components/DashboardButton';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook

const DashboardScreen = () => {
  const { state, logout, setUserMode } = useContext(AuthContext);
  const { userData } = state;
  const navigation = useNavigation(); // Get navigation object

  const handleInventory = () => {
    navigation.navigate('Inventory'); // Navigate to InventoryScreen
    setUserMode('Inventory');
  };

  const handleHandover = () => {
    console.log('Handover button pressed');
    console.log(userData.User_ID);
  };

  const handleRequests = () => {
    console.log('Requests button pressed');
  };

  const handleReturn = () => {
    console.log('Return button pressed');
  };

  const handleLogsInventory = () => {
    console.log('Logs Inventory button pressed');
  };

  const handleLogsHandover = () => {
    console.log('Logs Handover button pressed');
  };

  return (
    <LinearGradient
      colors={['#242A3E', '#191D2B', '#0F1016']}
      style={styles.flexview}
    >
      <HeaderNav />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            flex: 1,
            borderRadius: 30,
          }}
        >
          <View style={{ alignItems: 'center', margin: 20 }}>
            <Text variant='headlineMedium' style={{ color: 'white' }}>
              Dashboard
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-evenly',
            }}
          >
            <DashboardButton
              icon='toolbox'
              IconLabel='Inventory'
              onPress={handleInventory}
            />

            <DashboardButton
              icon='logout'
              IconLabel='Requests'
              onPress={handleRequests}
            />
            <DashboardButton
              icon='login'
              IconLabel='Return'
              onPress={handleReturn}
            />
            <DashboardButton
              icon='login'
              IconLabel='Lab Supply'
              onPress={handleReturn}
            />
          </View>
          <View style={{ alignItems: 'center', margin: 20 }}>
            <Text variant='headlineMedium' style={{ color: 'white' }}>
              Logs
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-evenly',
            }}
          >
            <DashboardButton
              icon='calendar'
              IconLabel='Inventory'
              onPress={handleLogsInventory}
            />
            <DashboardButton
              icon='history'
              IconLabel='Handover'
              onPress={handleLogsHandover}
            />
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

export default DashboardScreen;
