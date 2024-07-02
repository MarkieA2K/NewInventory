import React, { useContext, useEffect } from 'react';
import { View, ScrollView, Modal, Image } from 'react-native';
import { List, TouchableRipple, FAB } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import styles from './styles';
import HeaderLabel from '../components/HeaderLabel';
import { InventoryContext } from '../Context/InventoryContext';
import ItemInfo from '../components/ItemInfo';
import ItemForm from '../components/ItemForm';

const InventoryScreen = () => {
  const {
    state: { inventoryData, modalVisible, selectedItem, formVisible },
    dispatch,
    fetchInventoryData,
    setSelectedItem,
    setFormVisible,
  } = useContext(InventoryContext);

  useEffect(() => {
    fetchInventoryData();
  }, [fetchInventoryData]);

  const handleItemPress = (item) => {
    setSelectedItem(item);
  };
  const showForm = () => {
    setFormVisible(true);
  };

  return (
    <LinearGradient
      colors={['#242A3E', '#191D2B', '#0F1016']}
      style={styles.flexview}
    >
      <HeaderLabel />

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <List.Section>
          {inventoryData.length > 0 ? (
            inventoryData.map((item) => (
              <TouchableRipple
                key={item.Item_Id}
                onPress={() => handleItemPress(item)}
              >
                <List.Item
                  title={item.Item_Name}
                  description={item.Item_Description}
                  left={() => (
                    <Image
                      source={{ uri: item.Image_URL }}
                      style={{ width: 100, height: 100, borderRadius: 10 }}
                    />
                  )}
                  style={styles.listItem}
                  titleStyle={styles.title}
                  descriptionStyle={styles.description}
                />
              </TouchableRipple>
            ))
          ) : (
            <List.Item
              title='No equipment available for use'
              description='The list/database is empty.'
              style={styles.emptyList}
              titleStyle={styles.title}
              descriptionStyle={styles.emptyDescription}
            />
          )}
        </List.Section>
      </ScrollView>
      <Modal
        onRequestClose={() => setSelectedItem(null)}
        animationType='fade'
        visible={selectedItem !== null}
        onDismiss={() => setSelectedItem(null)}
        contentContainerStyle={{ backgroundColor: 'white', padding: 20 }}
      >
        {selectedItem && <ItemInfo />}
      </Modal>

      <Modal visible={formVisible}>
        <ItemForm />
      </Modal>
      <FAB style={styles.fab} icon='plus' size='medium' onPress={showForm} />
    </LinearGradient>
  );
};

export default InventoryScreen;
