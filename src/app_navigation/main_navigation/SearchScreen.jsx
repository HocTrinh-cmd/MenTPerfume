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
                setProducts([]);
            }
        } catch (error) {
            console.log('Get products error: ', error.message || error);
            setProducts([]); 
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
                            style={styles.searchIcon}
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
        backgroundColor: '#f9f9f9', 
    },
    textinput: {
        flex: 1,
        fontSize: 16,
        color: '#333',
        paddingHorizontal: 10,
        borderRadius: 10,
        backgroundColor: '#fff',
        height: 42,
    },
    SearchStyle: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        marginBottom: 20,
    },
    SearchChild: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        maxWidth: 320, 
        height: 50,
        borderRadius: 10,
        backgroundColor: '#fff',
        paddingHorizontal: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
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
    searchIcon: {
        width: 24,
        height: 24,
        tintColor: '#555', 
    },
});
