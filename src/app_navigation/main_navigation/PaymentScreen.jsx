import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons';

const PaymentScreen = () => {
  return (
<View style={styles.container}>
      {/* Header */}
      <TouchableOpacity style={styles.header}>
        <Icon name="arrow-back" size={24} color="#000" />
        <Text style={styles.headerTitle}>Payment</Text>
      </TouchableOpacity>

      {/* Card Details Input */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Card details</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter card details"
          placeholderTextColor="#aaa"
        />
      </View>

      {/* Exp Date and CVV */}
      <View style={styles.row}>
        <View style={styles.inputGroupSmall}>
          <Text style={styles.label}>Exp date</Text>
          <TextInput
            style={styles.input}
            placeholder="DD/MM"
            placeholderTextColor="#aaa"
          />
        </View>
        <View style={styles.inputGroupSmall}>
          <Text style={styles.label}>CVV</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter CVV"
            placeholderTextColor="#aaa"
            secureTextEntry
          />
        </View>
      </View>

      {/* Pay Now Button */}
      <TouchableOpacity style={styles.payButton}>
        <Text style={styles.payButtonText}>Pay now</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PaymentScreen

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f7f8fc',
      padding: 16,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 16,
    },
    headerTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      marginLeft: 10,
    },
    inputGroup: {
      marginBottom: 24,
    },
    label: {
      fontSize: 16,
      color: '#555',
      marginBottom: 8,
    },
    input: {
      height: 50,
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 10,
      paddingHorizontal: 16,
      fontSize: 16,
      backgroundColor: '#fff',
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    inputGroupSmall: {
      flex: 1,
      marginRight: 8,
    },
    payButton: {
      marginTop: 32,
      backgroundColor: '#ff7e5e',
      paddingVertical: 16,
      borderRadius: 30,
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    payButtonText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
    },
  });