import { StyleSheet, Text, View, TouchableOpacity, FlatList, Image, AppState, ToastAndroid } from 'react-native';
import React, { useState, useEffect } from 'react';
import AxiosInstance from '../../helper/AxiosInstance';
import { useDispatch, useSelector } from 'react-redux';
import { isEnabled } from 'react-native/Libraries/Performance/Systrace';

const OrderHistory = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('complete');
  const [orders, setorders] = useState([]);

  const useAppDispatch = () => useDispatch();
  const dispatch = useAppDispatch();
  const useAppSelector = useSelector;
  const appState = useAppSelector((state) => state.app);

  const id = appState.user._id;

  const navigateToReviewScreen = (item) => {
    if (item && item.length > 0) {
      navigation.navigate('ReviewScreen', { products: item });
    } else {
      console.log('Không có sản phẩm để đánh giá');
      ToastAndroid.show('Không có sản phẩm để đánh giá', ToastAndroid.SHORT);
    }
  };
  

  const fetchProduct = async () => {
    try {
      const response = await AxiosInstance().get(`/carts/user/${id}`);
      if (response.status) {
        setorders(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const cancelOrder = async (orderId) => {
    try {
      const response = await AxiosInstance().put(`/carts/status/${orderId}`, { status: "cancelled" });
      if (response.data.status) {
        ToastAndroid.show('Hủy đơn hàng thành công', ToastAndroid.SHORT);
        fetchProduct();
      } else {
        ToastAndroid.show('Hủy đơn hàng không thành công', ToastAndroid.SHORT);
      }
    } catch (error) {
      console.log(error);
      ToastAndroid.show('Có lỗi xảy ra khi hủy đơn hàng', ToastAndroid.SHORT);
    }
  };

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
            styles[item.status],
          ]}
        >
          {item.status === 'pending'
          ? 'Đang chờ'
          : item.status === 'processing'
          ? 'Đang xử lý'
          : item.status === 'shipped'
          ? 'Đã gửi'
          : item.status === 'delivered'
          ? 'Đã giao hàng'
          : item.status === 'cancelled'
          ? 'Đã hủy'
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

      <Text style={styles.paymentMethod}>
        Phương thức thanh toán: {item.paymentMethod === 'pay_online' ? 'Thanh toán trực tuyến' : 'Thanh toán khi nhận hàng'}
      </Text>

      <Text style={styles.paymentStatus}>
        Trạng thái thanh toán: {item.paymentStatus === 'paid' ? 'Đã thanh toán' : 'Chưa thanh toán'}
      </Text>

      {/* Hiển thị nút "Hủy đơn hàng" hoặc "Đánh giá sản phẩm" */}
      {item.status === 'pending' ? (
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => cancelOrder(item._id)}
        >
          <Text style={styles.cancelButtonText}>Hủy đơn hàng</Text>
        </TouchableOpacity>
      ) : item.status === 'delivered' ? (
        <TouchableOpacity
          style={styles.reviewButton}
          onPress={() => navigateToReviewScreen(item.products)}
        >
          <Text style={styles.cancelButtonText}>Đánh giá sản phẩm</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );





  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.backButton}>{'<'} Back</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Lịch sử đơn hàng của bạn</Text>
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
  processing: {
    backgroundColor: '#EF7D00',
  },
  shipped: {
    backgroundColor: '#1D4ED8',
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
  cancelButton: {
    backgroundColor: '#FF3B30', // Màu đỏ
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
    width: '70%',
    alignSelf:'center'
  },
  reviewButton: {
    backgroundColor: '#00BB00', // Màu xanh 00BB00
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
    width: '70%',
    alignSelf:'center'
  },
  cancelButtonText: {
    color: '#FFFFF', // Màu trắng FFFFF
    fontSize: 16,
    fontWeight: 'bold',
  },
  paymentMethod: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 5,
    fontStyle: 'italic',
  },
  paymentStatus: {
    fontSize: 14,
    color: '#10B981',
    marginTop: 5,
    fontWeight: 'bold',
  },
  disabledButton: {
    backgroundColor: '#D1D5DB', // Màu xám nhạt
  },
});