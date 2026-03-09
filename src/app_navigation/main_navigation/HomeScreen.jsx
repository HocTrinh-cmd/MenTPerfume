import { FlatList, Image, ScrollView, StyleSheet, Text, View, Pressable } from 'react-native'
import React, { useEffect, useState, useContext } from 'react'
import ItemProductTop from '../../commons/OneItem/ItemProductTop'
import { useDispatch, useSelector } from 'react-redux'
import AxiosInstance from '../../helper/AxiosInstance'
import Header from '../../commons/Header'
import Header2 from '../../commons/Header2'
import ItemCate from '../../commons/OneItem/ItemCate'
import ItemProductMain from '../../commons/OneItem/ItemProductMain'

const HomeScreen = (props) => {
    const { navigation } = props;

    const useAppDispatch = () => useDispatch();
    const useAppSelector = useSelector;
    const dispatch = useAppDispatch();
    const appState = useAppSelector((state) => state.app);
    const [refreshing, setRefreshing] = useState(false);
    const [productsTop, setProductsTop] = useState([]);
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedId, setSelectedId] = useState(null);

    const fetchProductsTop = async () => {
        try {
            setRefreshing(true);
            const response = await AxiosInstance().get(`/products/getallproduct`);
            if (response.status) {
                setProductsTop(response.data);
            }
            setRefreshing(false);
        } catch (error) {
            console.log(error);
            setRefreshing(false);
        }
    };

    const fetchProducts = async () => {
        try {
            setRefreshing(true);
            const response = await AxiosInstance().get(`/products/getallproduct`);
            if (response.status) {
                setProducts(response.data);
            }
            setRefreshing(false);
        } catch (error) {
            console.log(error);
            setRefreshing(false);
        }
    };

    const fetchCategories = async () => {
        try {
            setRefreshing(true);
            const response = await AxiosInstance().get(`/categories/getallCate`);
            if (response.status) {
                setCategories(response.data);
            }
            setRefreshing(false);
        } catch (error) {
            console.log(error);
            setRefreshing(false);
        }
    };

    const fetchProductsByCategory = async (cateId) => {
        try {
            setRefreshing(true);
            const response = await AxiosInstance().post(`/products/getproductbycate/${cateId}`);
            if (response.status) {
                setProducts(response.data);
            }
            setRefreshing(false);
        } catch (error) {
            console.log(error);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        fetchProductsTop();
        fetchProducts();
        fetchCategories();
        return () => { }
    }, []);

    const handleSelect = (cateId) => {
        setSelectedId(cateId);
        fetchProductsByCategory(cateId);
    };

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.container}>
                <Header2
                    imgIconright={require('../../resources/images/shopping-cart.png')}
                    backto={null}
                    goto={() => navigation.navigate('Cart')}
                />

                <Text style={styles.TopText}>Top</Text>

                <FlatList
                    data={productsTop}
                    style={styles.styleFLProductTOP}
                    renderItem={({ item }) => <ItemProductTop data={item} />}
                    keyExtractor={(item) => item._id.toString()}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    refreshing={refreshing}
                    onRefresh={fetchProducts}
                />

                <Text style={styles.TopText2}>Popular</Text>

                <FlatList
                    data={categories}
                    style={styles.flatlist1}
                    renderItem={({ item }) => (
                        <ItemCate
                            dataCate={item}
                            isSelected={item._id.toString() === selectedId}
                            onSelect={() => handleSelect(item._id.toString())}
                        />
                    )}
                    keyExtractor={(item) => item._id.toString()}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    extraData={selectedId}
                    refreshing={refreshing}
                    onRefresh={fetchProducts}
                />

                <FlatList
                    data={products}
                    style={styles.styleFLProduct}
                    renderItem={({item}) => <ItemProductMain data={item}/>}
                    keyExtractor={(item) => item._id.toString()}
                    numColumns={2}
                    scrollEnabled={false}
                    showsVerticalScrollIndicator={false}
                    columnWrapperStyle={{
                        justifyContent: "space-between"
                    }}
                    refreshing={refreshing}
                    onRefresh={fetchProducts}
                />
            </View>
        </ScrollView>
    )
}

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
    },
    TopText: {
        marginTop: 40,
        marginBottom: 15,
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black'
    },
    TopText2: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black',
        marginTop: 7
    },
    flatlist1: {
        height: 109,
    },
    styleFLProduct: {
        marginTop: 14,
    },
    styleFLProductTOP: {
        height: 280
    }
});
