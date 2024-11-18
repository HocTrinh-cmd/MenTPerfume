import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Alert, Image } from 'react-native';
import AxiosInstance from '../../helper/AxiosInstance';
import { useDispatch, useSelector } from 'react-redux';
import Header2 from '../../commons/Header2';
import { launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';

const EditUserScreen = (props) => {
  const { navigation } = props;

  const useAppDispatch = () => useDispatch();
  const dispatch = useAppDispatch();
  const useAppSelector = useSelector;
  const appState = useAppSelector((state) => state.app);

  const user = appState.user;

  const [email, setEmail] = useState(user.email || '');
  const [username, setUsername] = useState(user.username || '');
  const [phonenumber, setPhoneNumber] = useState(user.phonenumber || '');
  const [address, setAddress] = useState(user.address || '');
  const [avatar, setAvatar] = useState(user.avatar || ''); // Thêm avatar

  const handleSave = async () => {
    try {
      const response = await AxiosInstance().put(`/users/update_profile/${user._id}`, {
        username,
        phonenumber,
        address,
        avatar,
      });

      if (response.status === true) {
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

  const handlePickImage = async () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
      cameraType: 'back',
      saveToPhotos: true,
    }
    try {
      launchImageLibrary(options, async (response) => {
        console.log('Response = ', response);
        if (response.didCancel) {
          console.log('User cancelled photo picker');
        } else if (response.errorCode) {
          console.log('ImagePicker Error: ', response.errorMessage);
        } else {
          console.log('response', response);
          // hiện ảnh vừa chụp lên giao diện
          setAvatar(response.assets[0].uri);
          // upload ảnh lên server (nodeJS/firebase/cloudinary,...)
          try {
            const formData = new FormData();
            formData.append('file', {
              name: response.assets[0].fileName,
              type: response.assets[0].type,
              uri: response.assets[0].uri,
            });
            formData.append('upload_preset', 'ml_default');

            // Tạo instance từ AxiosInstance
            const axiosInstance = AxiosInstance('multipart/form-data'); // Sử dụng content-type phù hợp
            const result = await axiosInstance.post(
              'https://api.cloudinary.com/v1_1/drp4ife6u/image/upload',
              formData
            );
            console.log('Kết quả upload:', result);
          } catch (error) {
            console.error('Lỗi upload ảnh:', error.message);
          }
        }
      })
    } catch (error) {
      console.log('error', error)
    }
  };

  return (
    <View style={styles.container}>
      <Header2
        imgIconleft={require('../../resources/images/chevron-left.png')}
        backto={() => navigation.goBack()}
      />
      <Text style={styles.title}>Chỉnh sửa thông tin cá nhân</Text>

      {/* Hiển thị ảnh đại diện */}
      <TouchableOpacity style={styles.avatarform} onPress={handlePickImage}>
        <Image
          source={avatar ? { uri: avatar } : { uri: 'https://i.pinimg.com/736x/cd/4b/d9/cd4bd9b0ea2807611ba3a67c331bff0b.jpg' }}
          style={styles.avatar}
          resizeMode='cover'
        />
      </TouchableOpacity>
      <Text style={styles.label}>Nhấn vào ảnh để thay đổi</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
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

      <TouchableOpacity style={styles.changePasswordButton} onPress={() => navigation.navigate('ChangePassword')}>
        <Text style={styles.changePasswordButtonText}>Đổi mật khẩu</Text>
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
    marginTop: 10,
    alignSelf: 'center'
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  avatarform: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginBottom: 15,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginBottom: 15,
  },
  label: {
    textAlign: 'center',
    marginBottom: 15,
    color: '#007BFF',
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
  changePasswordButton: {
    marginTop: 10,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#007BFF',
  },
  changePasswordButtonText: {
    color: '#007BFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
