import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ItemDelivery = (props) => {
    const { data } = props;

    return (
        <View style={styles.container}>
            <Image
                source={data.images ? { uri: `${data.images}` } : require('../../resources/images/error404.jpg')}
                style={styles.image}
                resizeMode="cover"
            />
            <View style={styles.infoProduct}>
                <Text style={styles.textname}>{data.name}</Text>
                <Text style={styles.textinfo}>x{data.quantity}</Text>
                <Text style={styles.textinfo}>{data.price.toLocaleString('vi-VN')} VNĐ</Text>
            </View>
        </View>
    )
}

export default ItemDelivery

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 110,
        backgroundColor: '#fff',
        flexDirection: 'row',
        marginVertical: 3,
        elevation: 2,
        padding: 5,
        borderRadius: 10
    },
    image: {
        width: 100,
        height: '100%',
        marginRight: 10
    },
    infoProduct: {
        justifyContent: 'space-around'
    },
    textname: {
        fontSize: 18,
        color: 'black'
    },
    textinfo: {
        fontSize: 16,
        color: '#777777'
    }
})