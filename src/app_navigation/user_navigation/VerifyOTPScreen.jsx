import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ToastAndroid } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { verifyOTP } from '../../redux/UserAPI';
import { useDispatch, useSelector } from 'react-redux';

const VerifyOTPScreen = (props) => {
    const [codeArray, setCodeArray] = useState(['', '', '', '']);
    const inputRefs = useRef([]); // Khởi tạo mảng tham chiếu

    const { navigation, route } = props;
    const email = route?.params?.email || '';

    const dispatch = useDispatch();
    const appState = useSelector((state) => state.app);

    const handleVerifyAccount = async () => {
        const code = codeArray.join('');
        if (code.length !== 4) {
            ToastAndroid.show('Vui lòng nhập mã OTP đầy đủ 4 ký tự.', ToastAndroid.SHORT);
            return;
        }

        try {
            const body = { email, otp: code };
            const result = await dispatch(verifyOTP(body));
            console.log('VerifyOTP result:', result);
            if (result.meta.requestStatus === 'fulfilled') {
                ToastAndroid.show('Xác thực tài khoản thành công.', ToastAndroid.SHORT);
                navigation.navigate('Login');
            } else {
                ToastAndroid.show('Xác thực không thành công.', ToastAndroid.SHORT);
            }
            return result;
        } catch (error) {
            console.log(error);
        }
    };

    const handleTextInputChange = (text, index) => {
        if (text.length > 1) {
            return;
        }

        const newCodeArray = [...codeArray];
        newCodeArray[index] = text;
        setCodeArray(newCodeArray);

        // Chuyển sang ô kế tiếp nếu nhập xong ký tự hiện tại
        if (text && index < 3) {
            const nextInput = inputRefs.current[index + 1];
            if (nextInput) nextInput.focus();
        }
    };

    return (
        <KeyboardAwareScrollView style={styles.container}>
            <View style={styles.container1}>
                <View style={styles.header}>
                    <Text style={styles.cancelText}></Text>
                    <Image
                        source={require('../../resources/images/MenT_Perfume_2.png')}
                        style={styles.logo}
                    />
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.cancelText}>Cancel</Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.title}>Verify Account</Text>
                <Text style={styles.subtitle}>An OTP code has been sent to your email</Text>

                <View style={styles.codeContainer}>
                    {codeArray.map((_, index) => (
                        <TextInput
                            key={index}
                            ref={(ref) => (inputRefs.current[index] = ref)}
                            style={styles.codeInput}
                            maxLength={1}
                            keyboardType="number-pad"
                            value={codeArray[index]}
                            onChangeText={(text) => handleTextInputChange(text, index)}
                        />
                    ))}
                </View>

                <TouchableOpacity style={styles.button} onPress={handleVerifyAccount}>
                    <Text style={styles.buttonText}>Verify Account</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAwareScrollView>
    );
};

export default VerifyOTPScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FBFF',
    },
    container1: {
        alignItems: 'center'
    },
    header: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginBottom: 127
    },
    logo: {
        width: 68,
        height: 46.5
    },
    cancelText: {
        width: 50,
        fontSize: 16,
        color: '#FF5A5F',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 20,
    },
    subtitle: {
        fontSize: 16,
        color: '#777',
        marginBottom: 40,
    },
    codeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '60%',
    },
    codeInput: {
        width: 50,
        height: 50,
        borderWidth: 1,
        borderColor: '#ddd',
        textAlign: 'center',
        fontSize: 24,
        borderRadius: 10,
        backgroundColor: '#fff',
    },
    button: {
        width: '80%',
        padding: 15,
        backgroundColor: '#FF5A5F',
        borderRadius: 10,
        marginTop: 30,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
