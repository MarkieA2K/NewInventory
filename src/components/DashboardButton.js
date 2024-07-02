import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, IconButton } from 'react-native-paper'; // Assuming IconButton is imported correctly

export default class DashboardButton extends Component {
  render() {
    const { icon, IconLabel, onPress } = this.props; // Destructure props
    return (
      <View style={styles.column}>
        <IconButton
          icon={icon}
          size={100}
          style={[styles.modalButton, styles.inventoryButton]}
          onPress={onPress} // Use onPress handler from props
        />
        <Text variant='headlineSmall' style={styles.whiteText}>
          {IconLabel}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  column: { alignItems: 'center', marginHorizontal: 20 },
  modalButton: {
    marginBottom: 10,
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: 'white',
    elevation: 2,
  },
  inventoryButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)', // Example background color for inventory button
  },
  whiteText: {
    color: 'white',
  },
});
