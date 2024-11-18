import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import AxiosInstance from '../../helper/AxiosInstance';
import bcrypt from 'bcryptjs';
import { useDispatch, useSelector } from 'react-redux';
import Header2 from '../../commons/Header2';

const ChangePasswordScreen = ({ navigation }) => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [oldPassworderror, setoldPassworderror] = useState('');
    const [newPassworderror, setnewPasswordderror] = useState('');
    const [confirmPassworderror, setconfirmPassworderror] = useState('');

    const useAppSelector = useSelector;
    const appState = useAppSelector((state) => state.app);

    const user = appState.user;

    const handleChangePassword = async () => {
        let hasError = false;
    
        // Reset all error messages
        setoldPassworderror('');
        setnewPasswordderror('');
        setconfirmPassworderror('');
    
        // Kiểm tra mật khẩu cũ
        if (!oldPassword) {
            setoldPassworderror('* Không được để trống');
            hasError = true;
        } else if (!bcrypt.compareSync(oldPassword, user.password)) {
            setoldPassworderror('* Mật khẩu cũ không đúng');
            hasError = true;
        }
    
        // Kiểm tra mật khẩu mới
        if (!newPassword || newPassword.length < 6) {
            setnewPasswordderror('* Mật khẩu phải dài hơn 6 kí tự');
            hasError = true;
        }
    
        // Kiểm tra xác nhận mật khẩu
        if (!confirmPassword || confirmPassword.length < 6) {
            setconfirmPassworderror('* Mật khẩu phải dài hơn 6 kí tự');
            hasError = true;
        } else if (newPassword !== confirmPassword) {
            setconfirmPassworderror('* Mật khẩu không trùng khớp');
            hasError = true;
        }
    
        if (hasError) return;
    
        // Gọi API đổi mật khẩu
        try {
            const response = await AxiosInstance().put(`/users/update_profile/${user._id}`, {
                password: newPassword,
            });
    
            if (response.status === true) {
                Alert.alert('Thành công', 'Đổi mật khẩu thành công!');
                navigation.goBack();
            } else {
                Alert.alert('Lỗi', response.data.message);
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Lỗi', 'Không thể đổi mật khẩu!');
        }
    };

    return (
        <View style={styles.container}>
            <Header2
                imgIconleft={require('../../resources/images/chevron-left.png')}
                backto={() => navigation.goBack()}
            />
            <Text style={styles.title}>Đổi mật khẩu</Text>
            <TextInput
                style={styles.input}
                placeholder="Mật khẩu cũ"
                value={oldPassword}
                secureTextEntry
                onChangeText={setOldPassword}
            />
            {oldPassworderror ? <Text style={styles.errorText}>{oldPassworderror}</Text> : null}
            <TextInput
                style={styles.input}
                placeholder="Mật khẩu mới"
                value={newPassword}
                secureTextEntry
                onChangeText={setNewPassword}
            />
            {newPassworderror ? <Text style={styles.errorText}>{newPassworderror}</Text> : null}
            <TextInput
                style={styles.input}
                placeholder="Xác nhận mật khẩu mới"
                value={confirmPassword}
                secureTextEntry
                onChangeText={setConfirmPassword}
            />
            {confirmPassworderror ? <Text style={styles.errorText}>{confirmPassworderror}</Text> : null}
            <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
                <Text style={styles.buttonText}>Xác nhận</Text>
            </TouchableOpacity>
        </View>
    );
};

export default ChangePasswordScreen;

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
        alignSelf: 'center'
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 5,
        marginTop: 10
    },
    button: {
        backgroundColor: '#007BFF',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    errorText: {
        color: 'red',
        marginLeft: 20,
    },
});
