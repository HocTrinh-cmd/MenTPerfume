import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';


const ItemSearch = (props) => {

    const { data } = props;
    const navigation = useNavigation();


    return (
        <TouchableOpacity
            onPress={() => navigation.navigate('Detail', { id: data._id })}
            style={styles.cartItem}
        >

            <View style={styles.body}>
                <Image source={data.images ? { uri: `${data.images}` } : require('../../resources/images/error404.jpg')}
                    style={styles.image}
                    resizeMode="cover"
                />
                <View style={styles.cartInfo}>
                    <Text style={styles.productBrand}>{data.category.category_name}</Text>
                    <Text style={styles.productName}>{data.name}</Text>
                    <Text style={styles.productQuantity}>SL: {data.quantity} Sản Phẩm</Text>
                    <Text style={styles.productPrice}>Giá: {data.price} VND</Text>
                </View>
            </View>

        </TouchableOpacity>
    )
}

export default ItemSearch

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
        alignItems: 'center'
    },
    image: {
        width: 80,
        height: 90
    },
    cartInfo: {
        width: 200,
        height: "90%"
    },
    productBrand: {
        fontSize: 16,
        fontWeight: '400',
        color: '#3D3D3D'
    },
    productName: {
        fontSize: 18,
        color: '#3D3D3D',
        width: 150,
        marginBottom: 3
    },
    productQuantity: {
        fontSize: 14,
        color: '#3D3D3D',
        width: 200,
    },
    productPrice: {
        fontSize: 16,
        color: '#FE554A',
        marginTop: 2
    },
})