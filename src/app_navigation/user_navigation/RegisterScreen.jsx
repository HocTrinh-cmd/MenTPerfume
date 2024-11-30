import { Image, Text, ToastAndroid, TouchableOpacity, View, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import Textcom from '../../commons/Textcom';
import Textinput from '../../commons/Textinput';
import ButtonCompo from '../../commons/ButtonCompo';
import { register } from '../../redux/UserAPI';
import { useDispatch, useSelector } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const RegisterScreen = (props) => {
    const [Name, setName] = useState('');
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const [Repassword, setRepassword] = useState('');

    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');

    const { navigation } = props;
    const dispatch = useDispatch();

    const handleRegister = async () => {
        let hasError = false;

        if (!Name) {
            setNameError('* Tên không được để trống');
            hasError = true;
        } else {
            setNameError('');
        }

        if (!Email) {
            setEmailError('* Email không được để trống');
            hasError = true;
        } else {
            setEmailError('');
        }

        if (!Password) {
            setPasswordError('* Mật khẩu không được để trống');
            hasError = true;
        } else {
            setPasswordError('');
        }

        if (Password !== Repassword) {
            setConfirmPasswordError('* Mật khẩu xác nhận không khớp');
            hasError = true;
        } else {
            setConfirmPasswordError('');
        }

        if (hasError) return;

        try {
            const body = {
                email: Email,
                password: Password,
                username: Name
            };

            const actionResult = await dispatch(register(body));
            if (actionResult.type === register.fulfilled.type) {
                navigation.navigate('VerifyOTP', { email: Email });
            } else {
                ToastAndroid.show('Đăng ký thất bại', ToastAndroid.SHORT);
            }
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

            <Textcom text={'Tạo một tài khoản'} styles={{ text: styles.title }} />

            <View style={styles.subtitleContainer}>
                <Textcom
                    text={'Chào bạn, hãy nhập thông tin của bạn để bắt đầu đặt hàng.'}
                    styles={{ text: styles.subtitle }}
                />
            </View>

            <View style={styles.inputContainer}>
                <Textcom text={'User Name'} styles={{ text: styles.label }} />
                <Textinput
                    styles={{ container: styles.inputBox, input: styles.input }}
                    placeholder={'Enter User Name'}
                    value={Name}
                    onChange={setName}
                />
                {nameError ? <Text style={styles.errorText}>{nameError}</Text> : null}

                <Textcom text={'Email Address'} styles={{ text: styles.label }} />
                <Textinput
                    styles={{ container: styles.inputBox, input: styles.input }}
                    placeholder={'Enter Email'}
                    value={Email}
                    onChange={setEmail}
                />
                {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

                <Textcom text={'Password'} styles={{ text: styles.label }} />
                <Textinput
                    styles={{ container: styles.inputBox, input: styles.input }}
                    placeholder={'Enter Password'}
                    value={Password}
                    onChange={setPassword}
                    security={true}
                />
                {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

                <Textcom text={'Confirm Password'} styles={{ text: styles.label }} />
                <Textinput
                    styles={{ container: styles.inputBox, input: styles.input }}
                    placeholder={'Confirm Password'}
                    value={Repassword}
                    onChange={setRepassword}
                    security={true}
                />
                {confirmPasswordError ? <Text style={styles.errorText}>{confirmPasswordError}</Text> : null}
            </View>

            <TouchableOpacity style={styles.googleButton}>
                <Image
                    source={require('../../resources/images/Google.png')}
                    style={styles.googleIcon}
                />
                <Text style={styles.googleText}>Signin with Google</Text>
            </TouchableOpacity>

            <ButtonCompo
                styles={{ Buttonstyle: styles.registerButton, title: styles.registerButtonText }}
                title={'Đăng Ký'}
                press={handleRegister}
            />

            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Textcom
                    text={'Đăng nhập vào tài khoản của tôi'}
                    styles={{ text: styles.loginLink }}
                />
            </TouchableOpacity>
        </KeyboardAwareScrollView>
    );
};

export default RegisterScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F8FBFF',
        paddingHorizontal: 24,
        flex: 1,
    },
    logo: {
        alignSelf: 'center',
        marginTop: 10,
        width: 68,
        height: 46.5,
    },
    title: {
        fontSize: 30,
        fontWeight: '700',
        color: 'black',
        marginTop: 30,
        marginLeft: 20,
    },
    subtitleContainer: {
        width: 357,
        alignSelf: 'center',
    },
    subtitle: {
        paddingLeft: 16,
        fontSize: 14,
        color: 'black',
    },
    inputContainer: {
        marginTop: 30,
    },
    label: {
        fontSize: 20,
        color: 'black',
        marginLeft: 20,
        marginTop: 15,
    },
    inputBox: {
        width: 360,
        height: 60,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: '#AAACAE',
        alignSelf: 'center',
        marginTop: 10,
    },
    input: {
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
    googleButton: {
        width: 204,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 50,
        borderRadius: 20,
        elevation: 1,
        alignSelf: 'center',
    },
    googleIcon: {
        width: 40,
        height: 40,
    },
    googleText: {
        color: '#000000',
    },
    registerButton: {
        width: 360,
        height: 50,
        borderRadius: 15,
        backgroundColor: '#F9881F',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: 20,
    },
    registerButtonText: {
        fontSize: 14,
        color: 'white',
    },
    loginLink: {
        fontSize: 16,
        color: '#FE554A',
        fontWeight: 'bold',
        alignSelf: 'center',
        marginTop: 30,
        marginBottom: 30,
    },
});
