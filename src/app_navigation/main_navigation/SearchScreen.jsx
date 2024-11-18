import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../../commons/Header'
import ItemSearch from '../../commons/OneItem/ItemSearch'
import { useDispatch, useSelector } from 'react-redux'
import AxiosInstance from '../../helper/AxiosInstance'

const SearchScreen = (props) => {
    const { navigation } = props;

    const useAppDispatch = () => useDispatch();
    const useAppSelector = useSelector;
    const dispatch = useAppDispatch();
    const appState = useAppSelector((state) => state.app);

    const [keySearch, setKeySearch] = useState('');
    const [products, setProducts] = useState([]);

    const getProducts = async () => {
        try {
            const body = {
                name: keySearch,
            };
            const response = await AxiosInstance().post(`/products/find_product`, body);
            if (response.status === true) {
                setProducts(response.data);
            } else {
                console.log("Lấy data từ API thất bại!");
                setProducts([]); // Đảm bảo mảng rỗng khi thất bại
            }
        } catch (error) {
            console.log('Get products error: ', error.message || error);
            setProducts([]); // Đảm bảo mảng rỗng khi có lỗi
        }
    };

    useEffect(() => {
        getProducts();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.SearchStyle}>
                <View style={styles.SearchChild}>
                    <TextInput
                        style={styles.textinput}
                        placeholder="Tìm kiếm"
                        value={keySearch}
                        onBlur={getProducts}
                        onChangeText={setKeySearch}
                    />
                    <TouchableOpacity
                        onPress={() => getProducts()}
                    >
                        <Image
                            source={require('../../resources/images/search.png')}
                        />
                    </TouchableOpacity>
                </View>
            </View>

            {products.length === 0 ? (
                <View style={styles.noProductsContainer}>
                    <Text style={styles.noProductsText}>Không tìm thấy sản phẩm</Text>
                </View>
            ) : (
                <FlatList
                    data={products}
                    renderItem={({ item }) => <ItemSearch data={item} />}
                    keyExtractor={(item) => item._id}
                    showsVerticalScrollIndicator={false}
                />
            )}
        </View>
    );
};

export default SearchScreen;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 24,
        flex: 1,
    },
    textinput: {
        width: '90%',
        fontSize: 16,
        color: '#221F1F',
    },
    SearchStyle: {
        width: '100%',
        height: 33,
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginTop: 20,
        marginBottom: 20,
    },
    SearchChild: {
        width: 279,
        height: 42,
        borderBottomWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    noProductsContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    noProductsText: {
        fontSize: 16,
        color: '#888',
    },
});
