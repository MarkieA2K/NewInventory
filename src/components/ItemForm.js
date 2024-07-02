import React, { useState } from 'react';
import { View, ScrollView, Modal, Image } from 'react-native';
import { Divider, Button, TextInput, Text } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import DropDown from 'react-native-paper-dropdown';
import styles from '../screens/styles';
import DropDownPicker from 'react-native-dropdown-picker';

const ItemForm = () => {
  const facilityList = [
    { label: 'Facility 1', value: 'facility1' },
    { label: 'Facility 2', value: 'facility2' },
    { label: 'Facility 3', value: 'facility3' },
  ];

  const categoryList = [
    { label: 'Category 1', value: 'category1' },
    { label: 'Category 2', value: 'category2' },
    { label: 'Category 3', value: 'category3' },
  ];

  const subCategoryList = [
    { label: 'Sub Category 1', value: 'subCategory1' },
    { label: 'Sub Category 2', value: 'subCategory2' },
    { label: 'Sub Category 3', value: 'subCategory3' },
  ];

  return (
    <LinearGradient
      colors={['#242A3E', '#191D2B', '#0F1016']}
      style={styles.flexview}
    >
      <ScrollView style={styles.modalContent}>
        <View style={styles.modalBox}>
          <Text
            variant='headlineMedium'
            style={[
              styles.modalHeaderText,
              { textAlign: 'center', color: '#FFFFFF' },
            ]}
          >
            Add item
          </Text>
          <Divider />
          <TextInput mode='flat' label='ID' style={styles.input} />
          <TextInput mode='flat' label='Equipment Name' style={styles.input} />
          <TextInput mode='flat' label='Brand' style={styles.input} />
          <TextInput mode='flat' label='Model' style={styles.input} />
          <TextInput mode='flat' label='Description' style={styles.input} />
          <TextInput
            mode='flat'
            label='Quantity'
            style={styles.input}
            keyboardType='numeric'
          />

          <View>
            <Text style={styles.whiteText}>Attach Image</Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
              }}
            >
              <View style={styles.imageContainer}>
                <MaterialCommunityIcons name='image' size={100} color='white' />
              </View>
              <View style={styles.imageContainer}>
                <MaterialCommunityIcons
                  name='camera'
                  size={100}
                  color='white'
                />
              </View>
            </View>
          </View>
          <Divider />
          <Button style={styles.closeButton} mode='contained'>
            Add Item
          </Button>
          <Button style={styles.closeButton} mode='contained'>
            Close
          </Button>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

export default ItemForm;
