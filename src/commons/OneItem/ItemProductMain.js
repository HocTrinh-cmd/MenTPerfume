import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ItemProductMain = ({ data }) => {
    const [liked, setLiked] = useState(data.liked);
    const navigation = useNavigation();

    const toggleLike = () => {
        setLiked(!liked);
    };

    return (
        <TouchableOpacity onPress={() => navigation.navigate('Detail', { id: data._id })}>
            <View style={styles.card}>
                {/* Product Image */}
                <Image source={data.images ? { uri: `${data.images}` } : require('../../resources/images/error404.jpg')}
                    style={styles.image}
                    resizeMode="cover"
                />

                {/* Product Info */}
                <View style={styles.productInfo}>
                    <Text style={styles.brand}>{data.category.category_brand}</Text>
                    <Text style={styles.productName}>{data.name}</Text>
                    <Text style={styles.price}>{(data.price).toLocaleString('vi-VN')} VND</Text>
                </View>


                {/* Footer Section with Rating and Like */}
                <View style={styles.footer}>
                    <Text style={styles.rating}>⭐ 4+ </Text>
                    {/* {data.rating} */}
                    {/* Like Button */}
                    <TouchableOpacity onPress={toggleLike}>
                        <Text style={styles.heart}>{liked ? '❤️' : '🤍'}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default ItemProductMain;

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#FFE6E6', // Light pink background
        borderRadius: 30,
        paddingHorizontal: 15,
        width: 175,
        height: 280,
        alignItems: 'center',
        marginVertical: 6
    },
    image: {
        width: 140,
        height: 140,
        resizeMode: 'stretch',
        marginBottom: 10,
        marginTop: 8,
        borderRadius: 80
    },
    productInfo: {
        width: 160,
        height: 'auto'
    },
    brand: {
        fontSize: 16,
        color: '#3D3D3D',
        fontWeight: 'bold',

    },
    productName: {
        fontSize: 14,
        color: '#3D3D3D',
        marginBottom: 5,
    },
    price: {
        fontSize: 16,
        color: '#3D3D3D',
        fontWeight: 'bold',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 1,
        alignItems: 'center',
    },
    rating: {
        fontSize: 14,
        color: 'gray',
    },
    heart: {
        fontSize: 18,
        marginLeft: 5,
    },
});
