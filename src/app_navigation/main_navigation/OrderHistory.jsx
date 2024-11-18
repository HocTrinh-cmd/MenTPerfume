import { StyleSheet, Text, View, TouchableOpacity, FlatList, Image, AppState } from 'react-native';
import React, { useState, useEffect } from 'react';
import AxiosInstance from '../../helper/AxiosInstance';
import { useDispatch, useSelector } from 'react-redux';

const OrderHistory = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('complete');
  const [orders, setorders] = useState([]);

  const useAppDispatch = () => useDispatch();
  const dispatch = useAppDispatch();
  const useAppSelector = useSelector;
  const appState = useAppSelector((state) => state.app);

  const id = appState.user._id;


  const fetchProduct = async () => {
    try {
      const response = await AxiosInstance().get(`/carts/user/${id}`);
      if (response.status) {
        setorders(response.data);
        console.log(response)
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchProduct();
  }, []);



  const renderItem = ({ item }) => (
    <View style={styles.orderCard}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardDate}>
          {new Date(item.date).toLocaleDateString('vi-VN', {
            day: 'numeric',
            month: 'numeric',
            year: 'numeric',
          })}
        </Text>
        <Text
          style={[
            styles.statusBadge,
            styles[item.status === 'delivered' ? 'completed' : item.status],
          ]}
        >
          {item.status === 'delivered'
            ? 'Completed'
            : item.status.charAt(0).toUpperCase() + item.status.slice(1)}
        </Text>

      </View>

      {item.products.map((product, index) => (
        <View style={styles.productItem} key={index}>
          <Image
            source={{ uri: product.image || 'https://via.placeholder.com/70' }}
            style={styles.productImage}
          />
          <View style={styles.productDetails}>
            <Text style={styles.productName}>{product.name}</Text>
            <Text style={styles.productPrice}>
              {product.price.toLocaleString('vi-VN')} đ
            </Text>
            <Text style={styles.productQuantity}>
              Số lượng: {product.quantity}
            </Text>
          </View>
        </View>
      ))}


      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Tổng cộng:</Text>
        <Text style={styles.totalAmount}>
          {item.total.toLocaleString('vi-VN')} đ
        </Text>
      </View>


    </View>
  );



  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.backButton}>{'<'} Back</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Đơn hàng của bạn</Text>
      <View style={styles.tabContainer}>
        <Text style={[styles.tabText, activeTab === 'complete' && styles.activeTab]}>Các đơn hàng</Text>
      </View>
      <FlatList
        data={orders}
        renderItem={renderItem}
        keyExtractor={(item) => item._id.toString()}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

export default OrderHistory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEEEEE',
  },
  backButton: {
    fontSize: 18,
    color: '#000',
    marginVertical: 10,
    marginLeft: 20,
    marginTop: 40,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginVertical: 10,
    marginLeft: 20,
    color: '#333',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#DDD',
    marginBottom: 20,
  },
  tabText: {
    fontSize: 18,
    color: '#999',
    paddingBottom: 5,
  },
  activeTab: {
    color: '#000',
    borderBottomWidth: 2,
    borderBottomColor: '#000',
  },
  listContainer: {
    paddingBottom: 20,
  },
  orderCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardDate: {
    fontSize: 14,
    color: '#6B7280',
  },
  statusBadge: {
    fontSize: 12,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 10,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  pending: {
    backgroundColor: '#F59E0B',
  },
  delivered: {
    backgroundColor: '#10B981',
  },
  cancelled: {
    backgroundColor: '#EF4444',
  },
  productItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 10,
    backgroundColor: '#E5E7EB',
  },
  productDetails: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  productPrice: {
    fontSize: 14,
    color: '#EF4444',
    marginTop: 4,
  },
  productQuantity: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingTop: 10,
  },
  totalText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  totalAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#EF4444',
  },
  completed: {
    backgroundColor: '#28A745', // Màu xanh thành công
    color: '#FFF',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },

});
