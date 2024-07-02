import React, { useContext } from 'react';
import { View, ScrollView, Image } from 'react-native';
import { Text, Divider, Button, Paragraph } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import styles from '../screens/styles';
import { InventoryContext } from '../Context/InventoryContext';

const ItemInfo = () => {
  const {
    state: { selectedItem },
    closeModal,
  } = useContext(InventoryContext);

  //   if (!selectedItem) return null; // Ensure selectedItem exists before rendering

  return (
    <LinearGradient
      colors={['#242A3E', '#191D2B', '#0F1016']}
      style={styles.flexview}
    >
      <ScrollView style={styles.modalContent}>
        <View style={styles.imageView}>
          <Image
            source={
              selectedItem.Image_URL
                ? { uri: selectedItem.Image_URL }
                : require('../../assets/A2K-LOGO.png')
            }
            style={styles.imageFrame}
          />
        </View>

        <View style={styles.modalBox}>
          <Text
            variant='headlineMedium'
            style={[
              styles.modalHeaderText,
              { textAlign: 'center', color: '#FFFFFF' },
            ]}
          >
            {selectedItem.Item_Name}
          </Text>
          <Divider />
          <Text style={styles.whiteText}>ID: {selectedItem.Item_Id}</Text>
          <Text style={styles.whiteText}>Brand: {selectedItem.Item_Brand}</Text>
          <Text style={styles.whiteText}>Model: {selectedItem.Item_Model}</Text>
          <Text style={styles.whiteText}>
            Facility: {selectedItem.Item_Facility}
          </Text>
          <Text style={styles.whiteText}>
            Category: {selectedItem.Item_Category}
          </Text>
          <Text style={styles.whiteText}>
            Sub Category: {selectedItem.Item_SubCategory}
          </Text>
          <Text style={styles.whiteText}>
            Quantity: {selectedItem.Item_Quantity}
          </Text>

          <Text style={styles.whiteText}>Description:</Text>
          <Paragraph style={styles.whiteText}>
            {selectedItem.Item_Description}
          </Paragraph>

          {/* Implement your edit and delete functionality */}
          <Divider />
          <View style={{ flexDirection: 'row', flex: 1 }}>
            <Button
              icon='briefcase-edit'
              mode='contained'
              style={styles.optionButton}
            >
              Edit
            </Button>
            <Button icon='delete' mode='contained' style={styles.optionButton}>
              Delete
            </Button>
          </View>
          <Button
            mode='contained'
            onPress={closeModal}
            style={styles.closeButton}
          >
            Close
          </Button>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

export default ItemInfo;
