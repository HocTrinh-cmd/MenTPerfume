import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';



const OrderStepItem = (props) => {
    const {icon, label, eventPress} = props;
  return (
    <TouchableOpacity style={styles.container}
        onPress={() => eventPress()}
    >
      <Image source={icon} style={styles.icon} />
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 3,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 8
  },
  icon: {
    width: 32,
    height: 32,
    marginRight: 10
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3D3D3D'
  },
});

export default OrderStepItem;
