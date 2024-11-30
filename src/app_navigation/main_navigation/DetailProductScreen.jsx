import { Image, Pressable, StyleSheet, Text, TouchableOpacity, ScrollView, View, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../../commons/Header'
import ButtonCompo from '../../commons/ButtonCompo'
import AxiosInstance from '../../helper/AxiosInstance'
import { addItemToCart, increaseItemDetial, decreaseItemDetial } from '../../redux/Reducer'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native';
import Header2 from '../../commons/Header2'
import ItemFeedback from '../../commons/OneItem/ItemFeedback'

const DetailProductScreen = (props) => {
    const navigation = useNavigation();
    const { route } = props;
    const id = route?.params?.id;

    const useAppDispatch = () => useDispatch();
    const dispatch = useAppDispatch();
    const useAppSelector = useSelector;
    const appState = useAppSelector((state) => state.app);

    const [totalPrice, setTotalPrice] = useState(0);
    const [product, setProduct] = useState({});
    const [refreshing, setRefreshing] = useState(false);
    const [feedbacks, setFeedbacks] = useState([]);
    const [totalRatings, setTotalRatings] = useState(0);
    const [averageRating, setAverageRating] = useState(0);


    const fetchProduct = async () => {
        try {
            const response = await AxiosInstance().post(`/products/getproductID/${id}`);
            if (response.status) {
                setProduct(response.data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchProduct();
    }, []);

    const addItem = () => {
        const item = {
            _id: product._id,
            name: product.name,
            price: product.price,
            images: product.images,
            quantity: appState.count,
        }
        dispatch(addItemToCart(item));
    }

    useEffect(() => {
        setTotalPrice(product.price * appState.count);
    }, [appState.count]);

    const fetchFeedback = async () => {
        try {
            setRefreshing(true);
            const response = await AxiosInstance().get(`/feedbacks/getfeedback/${id}`);
            if (response.status) {
                const feedbackList = response.data.feedbacks;
                setFeedbacks(feedbackList);
                

                setTotalRatings(feedbackList.length);

                const totalRatingValue = feedbackList.reduce((sum, feedback) => sum + feedback.rating, 0);
                const average = feedbackList.length > 0 ? totalRatingValue / feedbackList.length : 0;
                setAverageRating(average.toFixed(1)); 

            }
            setRefreshing(false);
        } catch (error) {
            console.log("Hiện không có đánh giá cho sản phẩm", error);
            setRefreshing(false);
        }
    }


    useEffect(() => {
        fetchFeedback();
        return () => { }
    }, [])



    return (
        <View style={styles.container}>
            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                <Header2
                    imgIconleft={require('../../resources/images/chevron-left.png')}
                    backto={() => navigation.goBack()}
                />

                <View style={styles.body}>
                    <Image 
                        source={product.images ? { uri: `${product.images}` } : require('../../resources/images/error404.jpg')}
                        style={styles.mainIMG}
                        resizeMode="cover"
                    />

                    <View style={styles.ButtonQuantity}>
                        <TouchableOpacity
                            onPress={() => { dispatch(decreaseItemDetial()) }}
                            style={styles.buttonitem}
                        >
                            <Text style={styles.ButtonQuantityText}>-</Text>
                        </TouchableOpacity>
                        <Text style={styles.ButtonQuantityText}>{appState.count}</Text>
                        <TouchableOpacity
                            onPress={() => { dispatch(increaseItemDetial()) }}
                            style={styles.buttonitem}
                        >
                            <Text style={styles.ButtonQuantityText}>+</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.Brandstyle}>
                        <Text style={styles.brand}>{product.category ? product.category.category_brand : 'Đang cập nhật'}</Text>
                        <View style={styles.ChildBrandstyle}>
                            <Text style={styles.rating}>⭐ {averageRating}+</Text>
                            <Text style={styles.clock}>⏰ 5-10hour</Text>
                        </View>
                    </View>

                    <View style={styles.productInfo}>
                        <Text style={styles.productName}>{product.name}</Text>
                        <Text style={styles.productQuantity}>Số lượng tồn kho: {product.quantity ? product.quantity : 'Đang cập nhật'}</Text>
                        <Text style={styles.productPrice}>{product.price ? product.price.toLocaleString('vi-VN') : 'Đang cập nhật'} VND</Text>
                    </View>
                </View>

                <View style={styles.productReview}>
                    <Text style={styles.TextproductReview}>Đánh giá sản phẩm</Text>
                    <Text style={styles.rating}>⭐ {averageRating} ({totalRatings} đánh giá)</Text>

                    <FlatList
                        data={feedbacks}
                        style={styles.flaslist}
                        renderItem={({ item }) => <ItemFeedback data={item} />}
                        keyExtractor={(item) => item._id.toString()}
                        showsVerticalScrollIndicator={false}
                        scrollEnabled={false}
                        refreshing={refreshing}
                        onRefresh={fetchFeedback}
                    />
                </View>
            </ScrollView>

            <TouchableOpacity
                style={styles.ButtonAddCart}
                onPress={() => addItem()}
            >
                <Text style={styles.ButtonAddCartText}>Add to cart</Text>
            </TouchableOpacity>
        </View>
    )
}

export default DetailProductScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
        paddingBottom: 20,
        backgroundColor: '#EEEEEE'
    },
    content: {
        flexGrow: 1,
    },
    body: {
        alignItems: 'center',
        marginTop: 10
    },
    mainIMG: {
        width: 233,
        height: 253,
        borderRadius: 10
    },
    ButtonQuantity: {
        width: 100,
        height: 50,
        backgroundColor: 'rgba(249, 136, 31, 1)',
        borderRadius: 30,
        marginTop: 23,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    ButtonQuantityText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold'
    },
    buttonitem: {
        width: '30%',
        alignItems: 'center',
        justifyContent: 'center',
        height: "100%"
    },
    Brandstyle: {
        width: 225,
        height: 59,
        marginTop: 35,
    },
    brand: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#3D3D3D',
        fontFamily: 'DMSans-Regular'
    },
    ChildBrandstyle: {
        width: 225,
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    rating: {
        fontSize: 14,
        color: '#3D3D3D',
    },
    clock: {
        fontSize: 14,
        color: '#3D3D3D',
    },
    productInfo: {
        marginTop: 20,
        width: '100%',
        height: 110,
        backgroundColor: 'white',
        paddingHorizontal: 31,
        borderRadius: 15
    },
    productName: {
        height: 60,
        fontSize: 20,
        color: '#3D3D3D',
        fontFamily: 'DMSans-Regular'
    },
    productPrice: {
        fontSize: 20,
        color: '#CC0033',
        fontFamily: 'DMSans-Regular'
    },
    productQuantity: {
        fontSize: 16,
        color: '#3D3D3D',
        fontFamily: 'DMSans-Regular'
    },
    ButtonAddCart: {
        width: '100%',
        height: 51,
        backgroundColor: 'rgba(249, 136, 31, 1)',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 2,
        position: 'absolute',
        bottom: 20,
        left: 24,
        right: 24,
    },
    ButtonAddCartText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#FFFFFF'
    },
    productReview: {
        width: '100%',
        height: 'auto',
        marginTop: 30,
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 10,
        marginBottom: 60
    },
    TextproductReview: {
        fontSize: 18,
        color: 'black'
    },
    flaslist: {
        marginTop: 10
    }
});


const datatest = [
    {
        id: 1,
        quality: "Tot",
        rating: 5,
        content: "San pham tot"
    },
    {
        id: 2,
        quality: "Tot",
        rating: 5,
        content: "San pham tot"
    },
    {
        id: 3,
        quality: "Tot",
        rating: 5,
        content: "San pham tot"
    },
    {
        id: 4,
        quality: "Tot",
        rating: 5,
        content: "San pham tot"
    },
];
