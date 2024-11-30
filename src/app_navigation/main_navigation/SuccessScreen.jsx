import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import LottieView from 'lottie-react-native';

const SuccessScreen = ({ route, navigation }) => {
  const { message } = route.params;

  return (
    <View style={styles.container}>
      <Image
        source={require('../../resources/images/check.png')}
        style={{width: 185, height: 165}}
      />
      <Text style={styles.title}>{message}</Text>
      <Text style={styles.subtitle}>Hãy ngồi thư giãn trong khi đơn hàng của bạn đang được xử lý. Sẽ mất khoảng nhiều ngày trước khi bạn nhận được.</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.buttonText}>Go back to home</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  animation: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 32,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#F9881F',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SuccessScreen;
