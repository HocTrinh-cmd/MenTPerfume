import { View, Text, Image, TouchableOpacity, ToastAndroid, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import Textcom from '../../commons/Textcom';
import ButtonCompo from '../../commons/ButtonCompo';
import Textinput from '../../commons/Textinput';
import { forgetPassword } from '../../redux/UserAPI';
import { useDispatch, useSelector } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const ForgetPassword = (props) => {
    const { navigation } = props;
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');

    const dispatch = useDispatch();
    const appState = useSelector((state) => state.app);

    const handleForgetPassword = async () => {
        let hasError = false;

        if (!email) {
            setEmailError('* Email không được để trống');
            hasError = true;
        } else {
            setEmailError('');
        }

        if (hasError) return;

        try {
            const body = { email };
            const result = await dispatch(forgetPassword(body));
            ToastAndroid.show('Mật khẩu mới đã gửi về email.', ToastAndroid.SHORT);
            return result;
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <KeyboardAwareScrollView style={styles.container}>
            <Image
                source={require('../../resources/images/MenT_Perfume_2.png')}
                style={styles.logo}
            />

            <Textcom text="Quên mật khẩu" styles={{ text: styles.title }} />
            <View style={styles.textContainer}>
                <Textcom
                    text="Nhập địa chỉ email của bạn để yêu cầu đặt lại mật khẩu."
                    styles={{ text: styles.subtitle }}
                />
            </View>

            <View style={styles.inputContainer}>
                <Textcom text="Email Address" styles={{ text: styles.label }} />
                <Textinput
                    styles={{
                        container: styles.inputContainerStyle,
                        input: styles.inputStyle,
                    }}
                    placeholder="Enter Email"
                    value={email}
                    onChange={setEmail}
                    iconRight={null}
                />
                {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
            </View>

            <ButtonCompo
                styles={{
                    Buttonstyle: styles.submitButton,
                    title: styles.buttonTitle,
                }}
                title="Forgot Password"
                press={handleForgetPassword}
            />

            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Textcom text="Đăng nhập tài khoản" styles={{ text: styles.loginText }} />
            </TouchableOpacity>
        </KeyboardAwareScrollView>
    );
};

export default ForgetPassword;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FBFF',
    },
    logo: {
        marginTop: 10,
        width: 68,
        height: 46.5,
        alignSelf: 'center',
    },
    title: {
        width: 250,
        height: 45,
        marginTop: 100,
        fontSize: 30,
        fontFamily: 'Poppins',
        fontWeight: '700',
        color: 'black',
        marginLeft: 20,
        alignSelf: 'center'
    },
    textContainer: {
        width: 337,
        marginLeft: 20,
        alignItems: 'center'
    },
    subtitle: {
        paddingLeft: 20,
        fontSize: 14,
        color: 'black',
    },
    inputContainer: {
        marginTop: 30,
        marginLeft: 20,
    },
    label: {
        fontSize: 20,
        color: 'black',
        marginTop: 15,
        marginLeft: 20
    },
    inputContainerStyle: {
        width: 360,
        height: 60,
        borderRadius: 20,
        borderWidth: 2,
        alignSelf: 'center',
        marginTop: 10,
        borderColor: '#AAACAE',
    },
    inputStyle: {
        color: 'gray',
        backgroundColor: 'white',
        width: 357,
        height: 57,
        borderRadius: 20,
        paddingLeft: 20,
    },
    errorText: {
        color: 'red',
        marginLeft: 20,
    },
    submitButton: {
        width: 360,
        height: 50,
        borderRadius: 15,
        backgroundColor: '#F9881F',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: 20,
    },
    buttonTitle: {
        fontSize: 14,
        fontFamily: 'Poppins',
        color: 'black',
    },
    loginText: {
        fontSize: 16,
        color: '#FE554A',
        marginTop: 30,
        justifyContent: 'center',
        alignSelf: 'center',
        fontWeight: 'bold',
    },
});
