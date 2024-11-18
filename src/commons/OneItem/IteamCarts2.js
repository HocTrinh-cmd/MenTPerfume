import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Swipeable } from 'react-native-gesture-handler';
import { decreaseItemQuantity, increaseItemQuantity, removeItemFromCart } from '../../redux/Reducer';

const ItemCarts2 = ({ data }) => {
    const useAppDispatch = () => useDispatch();
    const dispatch = useAppDispatch();

    const renderRightActions = () => (
        <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => dispatch(removeItemFromCart(data._id))} // Xóa item khi nhấn nút
        >
            <Icon name="delete-forever" size={24} color="#EE0000" />
        </TouchableOpacity>
    );

    return (
        <Swipeable renderRightActions={renderRightActions}>
            <View style={styles.cartItem}>
                <View style={styles.body}>
                    <Image
                        source={data.images ? { uri: `${data.images}` } : require('../../resources/images/error404.jpg')}
                        style={styles.image}
                        resizeMode="cover"
                    />
                    <View style={styles.cartInfo}>
                        <Text style={styles.productBrand}>{data.brand}</Text>
                        <Text style={styles.productName}>{data.name}</Text>
                        <Text style={styles.productPrice}>{(data.price).toLocaleString('vi-VN')} VND</Text>
                    </View>
                    <View style={styles.quantity}>
                        <TouchableOpacity
                            style={styles.buttonStyle}
                            onPress={() => dispatch(decreaseItemQuantity(data._id))}
                        >
                            <Text style={styles.textquantity}>-</Text>
                        </TouchableOpacity>
                        <Text style={styles.textquantity2}>{data.quantity}</Text>
                        <TouchableOpacity
                            style={styles.buttonStyle}
                            onPress={() => dispatch(increaseItemQuantity(data._id))}
                        >
                            <Text style={styles.textquantity}>+</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Swipeable>
    );
};

const styles = StyleSheet.create({
    cartItem: {
        width: '100%',
        height: 112,
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        marginTop: 12,
    },
    body: {
        width: '100%',
        height: 112,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    image: {
        width: 80,
        height: 90,
    },
    cartInfo: {
        width: 150,
        height: '90%',
    },
    productBrand: {
        fontSize: 18,
        fontWeight: '400',
        color: '#3D3D3D',
    },
    productName: {
        fontSize: 14,
        color: '#3D3D3D',
        width: 150,
        height: 45,
    },
    productPrice: {
        fontSize: 16,
        color: '#FE554A',
        marginTop: 2,
    },
    quantity: {
        flexDirection: 'row',
        width: 80,
        justifyContent: 'space-between',
        marginHorizontal: 5,
    },
    buttonStyle: {
        width: 26,
        height: 26,
        backgroundColor: 'rgba(249, 136, 31, 1)',
        borderRadius: 30,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textquantity: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    textquantity2: {
        color: 'black',
        fontSize: 20,
        fontWeight: '500',
    },
    deleteButton: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        width: 40,
        height: 40,
        borderRadius: 15,
        backgroundColor: '#FBE7E7',
        marginLeft: 20
    },
});

export default ItemCarts2;
