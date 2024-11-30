import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ToastAndroid, FlatList } from 'react-native';
import AxiosInstance from '../../helper/AxiosInstance';
import { useSelector } from 'react-redux';

const ReviewScreen = ({ route, navigation }) => {
    const { products } = route.params;

    const useAppSelector = useSelector;
    const appState = useAppSelector((state) => state.app);

    const id = appState.user._id;

    // State lưu thông tin đánh giá cho mỗi sản phẩm
    const [reviews, setReviews] = useState(
        products.map((product) => ({
            productId: product._id,
            rating: 0,
            quality: '',
            content: '',
        }))
    );

    // Hàm cập nhật đánh giá cho mỗi sản phẩm
    const updateReview = (index, key, value) => {
        const updatedReviews = [...reviews];
        updatedReviews[index][key] = value;
        setReviews(updatedReviews);
    };

    // Hàm gửi đánh giá
    const handleSubmitReview = async () => {
        const invalidReviews = reviews.filter(
            (review) => !review.rating || !review.content || !review.quality
        );

        if (invalidReviews.length > 0) {
            ToastAndroid.show('Vui lòng điền đầy đủ thông tin đánh giá cho tất cả các sản phẩm!', ToastAndroid.SHORT);
            return;
        }

        try {
            for (let i = 0; i < products.length; i++) {
                const reviewData = {
                    productId: products[i]._id,
                    user: UserId,
                    quality: reviews[i].quality,
                    content: reviews[i].content,
                    rating: reviews[i].rating,
                };

                const response = await AxiosInstance().post('/feedbacks/addFeedback', reviewData);
                if (response.status !== 200) {
                    ToastAndroid.show('Có lỗi xảy ra khi gửi đánh giá.', ToastAndroid.SHORT);
                    return;
                }
            }
            ToastAndroid.show('Đánh giá thành công!', ToastAndroid.SHORT);
            props.navigation.goBack();
        } catch (error) {
            console.log(error);
            ToastAndroid.show('Có lỗi xảy ra khi gửi đánh giá.', ToastAndroid.SHORT);
        }
    };


    const renderItem = ({ item, index }) => (
        <View style={styles.productReviewCard}>
            <Text style={styles.productName}>{item.name}</Text>

            <Text style={styles.label}>Chất lượng sản phẩm:</Text>
            <TextInput
                style={styles.input}
                placeholder="(Tốt, Bình thường, Kém)"
                value={reviews[index].quality}
                onChangeText={(text) => updateReview(index, 'quality', text)}
            />

            <Text style={styles.label}>Đánh giá sao:</Text>
            <TextInput
                style={styles.input}
                placeholder="Nhập đánh giá (1-5⭐)"
                rating={reviews[index].rating}
                selectedStar={(rating) => updateReview(index, 'rating', rating)}
            />

            <Text style={styles.label}>Nội dung đánh giá:</Text>
            <TextInput
                style={[styles.input, { height: 100 }]}  // Tăng chiều cao cho trường nhập liệu
                multiline
                placeholder="Nhập nội dung đánh giá..."
                value={reviews[index].content}
                onChangeText={(text) => updateReview(index, 'content', text)}
            />

        </View>
    );

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={styles.backButton}>{'<'} Back</Text>
            </TouchableOpacity>
            <Text style={styles.title}>Đánh giá sản phẩm</Text>

            <FlatList
                data={products}
                renderItem={renderItem}
                keyExtractor={(item) => item._id.toString()}
                ListEmptyComponent={<Text style={styles.emptyText}>Không có sản phẩm nào trong đơn hàng này.</Text>}
            />

            {/* Nút gửi đánh giá */}
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmitReview}>
                <Text style={styles.submitButtonText}>Gửi đánh giá</Text>
            </TouchableOpacity>
        </View>
    );
};

export default ReviewScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        color: '#555',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 10,
        marginBottom: 15,
        fontSize: 16,
        backgroundColor: '#F9F9F9',
    },
    rating: {
        marginBottom: 20,
    },
    submitButton: {
        backgroundColor: '#4CAF50',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    submitButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    productReviewCard: {
        marginBottom: 20,
        padding: 15,
        borderRadius: 8,
        backgroundColor: '#F9F9F9',
        borderWidth: 1,
        borderColor: '#ddd',
    },
    productName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    emptyText: {
        fontSize: 18,
        color: '#999',
        textAlign: 'center',
    },
    backButton: {
        fontSize: 18,
        color: '#000',
        marginVertical: 10,
        marginLeft: 10,
        marginTop: 20,
    },
});
