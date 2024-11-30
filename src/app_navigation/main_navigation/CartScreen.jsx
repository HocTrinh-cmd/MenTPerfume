import { FlatList, Image, Pressable, StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import Header from '../../commons/Header'
import ButtonCompo from '../../commons/ButtonCompo'
import CheckBox from 'react-native-check-box'
import { useDispatch, useSelector } from 'react-redux'
import { clearCart } from '../../redux/Reducer'
import AxiosInstance from '../../helper/AxiosInstance'
import Header2 from '../../commons/Header2'
import ItemCarts2 from '../../commons/OneItem/IteamCarts2'



const CartScreen = (props) => {

    const { navigation } = props;

    const useAppDispatch = () => useDispatch();
    const dispatch = useAppDispatch();
    const useAppSelector = useSelector;
    const appState = useAppSelector((state) => state.app);

    const checkout = async () => {
        if (appState.cart.length === 0) {
            // Giỏ hàng đang trống, không thực hiện thanh toán
            alert('Giỏ hàng đang trống');
            return;
        }
        if (appState.cart.length === 0) {
            // Giỏ hàng đang trống, không thực hiện thanh toán
            alert('Giỏ hàng đang trống');
            return;
        }
        try {
            const body = {
                user: {
                    _id: appState.user._id,
                    name: appState.user.username
                },
                products: appState.cart.map((item) => {
                    return {
                        _id: item._id,
                        quantity: item.quantity
                    }
                })
            }
            const result = await AxiosInstance().post('/carts/add', body);
            if (result.status == true) {
                // thông báo thành công
                // quay về màn hình chính
                navigation.navigate('Home');
                // xóa giỏ hàng
                dispatch(clearCart());
            } else {
                alert('Lỗi thanh toán');
            }
            console.log(body);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Header2
                    imgIconleft={require('../../resources/images/chevron-left.png')}
                    backto={() => navigation.goBack()}
                />
                <View style={styles.body}>
                    <Text style={styles.Text1}>Your cart</Text>
                    <FlatList
                        data={appState.cart.filter(item => item && item._id)}
                        style={styles.FlatList}
                        renderItem={({ item }) => <ItemCarts2 data={item} />}
                        keyExtractor={(item) => item._id.toString()}
                        contentContainerStyle={styles.listContainer}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
            </View>

            <View style={styles.PaymentView}>
                <View style={styles.Paymentchild}>
                    <Text style={styles.totalStyle}>Total</Text>
                    <Text style={styles.priceStyle}>{
                        appState.cart.reduce((total, item) => {
                            return total + item.price * item.quantity;
                        }, 0).toLocaleString('vi-VN')} VND</Text>
                </View>

                <Pressable
                    style={styles.ButtonPayment}
                    onPress={() => navigation.navigate('DeliveryMethod')}
                >
                    <Text style={styles.ButtonPaymentText}>Process to payment</Text>
                </Pressable>

            </View>

        </View>
    )
}

export default CartScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        paddingHorizontal: 24,
        paddingBottom: 20
    },
    content: {
        flexGrow: 1,
    },
    body: {
        marginTop: 40
    },
    FlatList: {
        height: 530
    },
    listContainer: {
        paddingBottom: 20,
    },
    Text1: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#3D3D3D',
        marginBottom: 20
    },
    PaymentView: {
        width: '100%',
        height: 128,
    },
    Paymentchild: {
        height: 30,
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 47
    },
    totalStyle: {
        fontSize: 16,
        color: '#3D3D3D'
    },
    priceStyle: {
        fontSize: 24,
        color: '#3D3D3D',
        fontWeight: 'bold'
    },
    ButtonPayment: {
        width: '100%',
        height: 51,
        backgroundColor: 'rgba(249, 136, 31, 1)',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    ButtonPaymentText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#FFFFFF'
    },
})

const cartItems = [
    {
        id: 1,
        brand: 'Jean Paul Gaultier',
        name: 'Chanel Bleu De Chanel Parfum 50ml',
        price: 2229000,
        image: require('../../resources/images/product1.png'),
        quantity: 1,
    },
    {
        id: 2,
        brand: 'Chanel',
        name: 'Classic cheeseburger',
        price: 2229000,
        image: require('../../resources/images/product1.png'),
        quantity: 1,
    },
    {
        id: 3,
        brand: 'The Macdonalds',
        name: 'Classic',
        price: 23.99,
        image: require('../../resources/images/product1.png'),
        quantity: 1,
    },
];