import { StyleSheet, Text, TouchableOpacity, Image, View } from 'react-native';
import React from 'react';

const ItemCate = ({ dataCate, isSelected, onSelect }) => {
  return (
    <TouchableOpacity
      style={[
        styles.categoryItem,
        isSelected && styles.selectedBorder,
      ]}
      onPress={onSelect}
    >
      <View style={[
        styles.categoryBack,
        isSelected && styles.selectedBackground,
      ]}>
        <Image
          style={styles.icon}
          source={dataCate.image ? { uri: `${dataCate.image}` } : require('../../resources/images/error404.jpg')}
        />
        <Text style={[
          styles.categoryName,
          isSelected && styles.selectedText,
        ]}>
          {dataCate.name}
        </Text>
      </View>

    </TouchableOpacity>
  );
};

export default ItemCate;

const styles = StyleSheet.create({
  categoryItem: {
    width: 81.75,
    height: 109,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    backgroundColor: '#f8f8f8',
    borderColor: '#ccc',
    borderWidth: 2,
  },
  categoryBack: {
    borderRadius: 50,
    width: 65,
    height: 87,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedBackground: {
    backgroundColor: 'rgba(254, 85, 74, 0.2)', 
    borderRadius: 50,
  },
  selectedBorder: {
    borderColor: '#FE554A', 
  },
  icon: {
    width: 46,
    height: 35,
    marginBottom: 5
  },
  categoryName: {
    marginTop: 7,
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    color: '#333', 
  },
  selectedText: {
    color: '#000000', 
  },
});
