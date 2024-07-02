import React, { useContext } from 'react';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { AuthContext } from '../Context/AuthContext';
import { Text, View, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const CustomDrawerContent = (props) => {
  const { state, logout } = useContext(AuthContext);
  const { userData } = state;

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.header}>
        <MaterialIcons name='account-circle' size={50} color='#000' />
        <Text style={styles.username}>{userData?.User_DisplayName}</Text>
        <Text style={styles.userLevel}>{userData?.User_Level}</Text>
      </View>
      <DrawerItem
        label='Dashboard'
        onPress={() => props.navigation.navigate('Dashboard')}
      />
      <DrawerItem label='Logout' onPress={logout} />
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    alignItems: 'center',
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  userLevel: {
    fontSize: 16,
    color: '#888',
  },
});

export default CustomDrawerContent;
