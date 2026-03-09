import { Image, Pressable, StyleSheet, Text, View, Modal, Button, ToastAndroid, Animated, Easing, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Textcom from '../../commons/Textcom'
import Textinput from '../../commons/Textinput'
import ButtonCompo from '../../commons/ButtonCompo'
import { login } from '../../redux/UserAPI'
import AxiosInstance from '../../helper/AxiosInstance'
import { useDispatch, useSelector } from 'react-redux'
import PassTextinput from '../../commons/PassTextinput'
import { ViewPropTypes } from 'deprecated-react-native-prop-types';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const LoginScreen = (props) => {
    const { navigation } = props;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [scaleValue] = useState(new Animated.Value(0));

    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const dispatch = useDispatch();

    const handleLogin = async () => {
        let hasError = false;

        if (!email) {
            setEmailError('* Email không được để trống');
            hasError = true;
        } else {
            setEmailError('');
        }

        if (!password) {
            setPasswordError('* Mật khẩu không được để trống');
            hasError = true;
        } else {
            setPasswordError('');
        }

        if (hasError) return;

        try {
            const body = { email, password };
            const result = await dispatch(login(body)).unwrap();
            ToastAndroid.show('Đăng nhập thành công', ToastAndroid.SHORT);
            return result;
        } catch (error) {
            if (error.status === false && error.data === "Tài khoản chưa được xác thực") {
                showAlert();
            } else if (error.status === false && error.data === "Không đúng mật khẩu!") {
                ToastAndroid.show('Mật khẩu không đúng !!!', ToastAndroid.SHORT);
            }
        }
    };

    const showAlert = () => {
        setIsModalVisible(true);
        Animated.timing(scaleValue, {
            toValue: 1,
            duration: 300,
            easing: Easing.out(Easing.exp),
            useNativeDriver: true,
        }).start();
    };

    const handleReOTP = async () => {
        try {
            body = {
                email: email
            }
            const response = await AxiosInstance().post(`/users/ReOTP`, body);
            if (response.status) {
                navigation.navigate('VerifyOTP', { email: email })
            }
            
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <KeyboardAwareScrollView style={styles.container}>
            <Image
                source={require('../../resources/images/MenT_Perfume_2.png')}
                style={styles.logo}
            />
            <Textcom text="Login to your account" styles={{ text: styles.title }} />
            <View style={styles.subtitleContainer}>
                <Textcom text="Good to see you again, enter your details below to continue ordering." styles={{ text: styles.subtitle }} />
            </View>

            <View style={styles.inputContainer}>
                <Textcom text="Email Address" styles={{ text: styles.label }} />
                <Textinput
                    styles={{ container: styles.inputWrapper, input: styles.input }}
                    placeholder="Enter Email"
                    value={email}
                    onChange={setEmail}
                    iconRight={null}
                />
                {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

                <Textcom text="Password" styles={{ text: styles.label }} />
                <Textinput
                    styles={{ container: styles.inputWrapper, input: styles.input }}
                    placeholder="Enter Password"
                    value={password}
                    onChange={setPassword}
                    iconRight={null}
                    security={true}
                />
                {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
            </View>

            <TouchableOpacity style={styles.googleButton}>
                <Image source={require('../../resources/images/Google.png')} style={styles.googleIcon} />
                <Text style={styles.googleText}>Signin with Google</Text>
            </TouchableOpacity>

            <ButtonCompo
                styles={{ Buttonstyle: styles.loginButton, title: styles.loginButtonText }}
                title="Login to my account"
                press={() => handleLogin()}
            />

            <TouchableOpacity onPress={() => navigation.navigate('Forget')}>
                <Textcom text="Quên mật khẩu?" styles={{ text: styles.forgotPassword }} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Regis')}>
                <Textcom text="Tạo tài khoản" styles={{ text: styles.createAccount }} />
            </TouchableOpacity>

            <Modal animationType="none" transparent={true} visible={isModalVisible} onRequestClose={() => setIsModalVisible(false)}>
                <View style={styles.modalOverlay}>
                    <Animated.View style={[styles.modalContent, { transform: [{ scale: scaleValue }] }]}>
                        <Text style={styles.modalTitle}>Tài khoản bạn chưa xác thực</Text>
                        <Text style={styles.modalMessage}>Bạn có chắc chắn muốn tiếp tục để xác thực?</Text>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity 
                                style={styles.yesButton}
                                onPress={() => handleReOTP()}
                            >
                                <Text style={styles.buttonText}>Có</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.noButton} onPress={() => setIsModalVisible(false)}>
                                <Text style={styles.buttonText}>Không</Text>
                            </TouchableOpacity>
                        </View>
                    </Animated.View>
                </View>
            </Modal>
        </KeyboardAwareScrollView>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FBFF',
        paddingHorizontal: 24,
    },
    logo: {
        alignSelf: 'center',
        marginTop: 10,
        width: 68,
        height: 46.5,
    },
    title: {
        width: 350,
        height: 45,
        marginTop: 30,
        fontSize: 30,
        fontWeight: '700',
        color: 'black',
        marginLeft: 20,
    },
    subtitleContainer: {
        width: 357,
    },
    subtitle: {
        justifyContent: 'center',
        alignSelf: 'center',
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
    inputWrapper: {
        width: 360,
        height: 60,
        borderRadius: 20,
        borderWidth: 2,
        alignSelf: 'center',
        marginTop: 10,
        borderColor: '#AAACAE',
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
        marginTop: 170,
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
    loginButton: {
        width: 360,
        height: 50,
        borderRadius: 15,
        backgroundColor: '#F9881F',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: 20,
    },
    loginButtonText: {
        fontSize: 14,
        color: 'white',
    },
    forgotPassword: {
        fontSize: 16,
        color: '#FE554A',
        marginTop: 20,
        justifyContent: 'center',
        alignSelf: 'center',
        fontWeight: 'bold',
    },
    createAccount: {
        fontSize: 16,
        color: '#FE554A',
        marginTop: 20,
        justifyContent: 'center',
        alignSelf: 'center',
        fontWeight: 'bold',
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        elevation: 5,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalMessage: {
        textAlign: 'center',
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    yesButton: {
        flex: 1,
        backgroundColor: '#4CAF50',
        padding: 10,
        borderRadius: 5,
        marginRight: 5,
        alignItems: 'center',
    },
    noButton: {
        flex: 1,
        backgroundColor: '#F44336',
        padding: 10,
        borderRadius: 5,
        marginLeft: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18,
    },
});
