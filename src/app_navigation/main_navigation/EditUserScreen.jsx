import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import AxiosInstance from '../../helper/AxiosInstance';
import { useDispatch, useSelector } from 'react-redux';

const EditUserScreen = (props) => {
  const {navigation} = props;

  const useAppDispatch = () => useDispatch();
  const dispatch = useAppDispatch();
  const useAppSelector = useSelector;
  const appState = useAppSelector((state) => state.app);

  const  user  = appState.user; 

  
  const [email, setEmail] = useState(user.email || '');
  const [username, setUsername] = useState(user.username || '');
  const [phonenumber, setPhoneNumber] = useState(user.phonenumber || '');
  const [address, setAddress] = useState(user.address || '');

  const handleSave = async () => {
    try {
      const response = await AxiosInstance.put(`/users/update_profile/${user._id}`, {
        email,
        username,
        phonenumber,
        address,
      });

      if (response.data.status) {
        Alert.alert('Thành công', 'Thông tin người dùng đã được cập nhật!');
        navigation.goBack(); // Quay lại màn hình trước
      } else {
        Alert.alert('Lỗi', response.data.message);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Lỗi', 'Không thể cập nhật thông tin!');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chỉnh sửa thông tin cá nhân</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Tên người dùng"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Số điện thoại"
        value={phonenumber}
        onChangeText={setPhoneNumber}
      />
      <TextInput
        style={styles.input}
        placeholder="Địa chỉ"
        value={address}
        onChangeText={setAddress}
      />
      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Lưu</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EditUserScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
