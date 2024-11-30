import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, SafeAreaView, Image, ScrollView, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ItemDelivery from '../../commons/OneItem/ItemDelivery';
import { useDispatch, useSelector } from 'react-redux'
import AxiosInstance from '../../helper/AxiosInstance'
import { clearCart } from '../../redux/Reducer'
import { Linking } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';



const DeliveryMethod = (props) => {
  const { navigation } = props;

  const useAppDispatch = () => useDispatch();
  const dispatch = useAppDispatch();
  const useAppSelector = useSelector;
  const appState = useAppSelector((state) => state.app);

  const [payment, setPayment] = useState("payOnArrival");
  const [address, setAddress] = useState("137 Teaticket Teaticket Hwy, East Falmouth MA, 2536");
  const [phone, setPhone] = useState("+234 901039271");
  const [orderId, setOrderId] = useState('');

  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const deliveryFee = appState.feedelivery;
  const discount = 0;

  const calculateTotal = (cart, deliveryFee, discount) => {
    const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    return subtotal + deliveryFee - discount;
  };

  const totalAmount = calculateTotal(appState.cart, deliveryFee, discount);

  // const checkout = async () => {
  //   if (appState.cart.length === 0) {
  //     // Giỏ hàng đang trống, không thực hiện thanh toán
  //     alert('Giỏ hàng đang trống');
  //     return;
  //   }
  //   if (appState.cart.length === 0) {
  //     // Giỏ hàng đang trống, không thực hiện thanh toán
  //     alert('Giỏ hàng đang trống');
  //     return;
  //   }
  //   try {
  //     const body = {
  //       user: {
  //         _id: appState.user._id,
  //         name: appState.user.username
  //       },
  //       products: appState.cart.map((item) => {
  //         return {
  //           _id: item._id,
  //           quantity: item.quantity
  //         }
  //       })
  //     }
  //     const result = await AxiosInstance().post('/carts/add', body);
  //     if (result.status == true) {
  //       // thông báo thành công
  //       // quay về màn hình chính
  //       navigation.navigate('Home');
  //       // xóa giỏ hàng
  //       dispatch(clearCart());
  //     } else {
  //       alert('Lỗi thanh toán');
  //     }
  //     console.log(body);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  const handleDeepLink = async (url) => {
    if (!url) return;

    try {
      // Get stored orderId
      const storedOrderId = await AsyncStorage.getItem('currentOrderId');
      if (!storedOrderId) {
        console.log('No stored orderId found');
        return;
      }

      setIsProcessingPayment(true);

      const response = await AxiosInstance().post('/payments/transaction-status', {
        orderId: storedOrderId
      });

      if (response.message === "Thành công.") {
        const updateResponse = await AxiosInstance().put(`/carts/update/${storedOrderId}`, {
          paymentStatus: "paid",
        });

        if (!updateResponse.data.status) {
          console.error("Cập nhật trạng thái thất bại:", updateResponse.data.error);
          Alert.alert('Lỗi', 'Không thể cập nhật trạng thái đơn hàng.');
          return;
        }
        // Clear the stored orderId
        await AsyncStorage.removeItem('currentOrderId');
        // Clear cart and navigate to success
        dispatch(clearCart());
        navigation.navigate('SuccessScreen', {
          message: 'Thanh toán thành công!',
        });



      } else {
        Alert.alert('Thanh toán thất bại', 'Vui lòng thử lại sau.');
      }
    } catch (error) {
      console.error('Error handling deep link:', error);
      Alert.alert('Lỗi', 'Không thể xác minh trạng thái thanh toán.');
    } finally {
      setIsProcessingPayment(false);
    }
  };

  useEffect(() => {
    // Handle initial URL (app opened via deep link)
    Linking.getInitialURL().then(handleDeepLink);

    // Handle deep link when app is already running
    const linkingSubscription = Linking.addEventListener('url', (event) => {
      handleDeepLink(event.url);
    });

    return () => {
      linkingSubscription.remove();
    };
  }, []);

  const checkout = async () => {
    if (appState.cart.length === 0) {
      Alert.alert('Giỏ hàng đang trống');
      return;
    }

    try {
      // Create order
      const orderBody = {
        user: {
          _id: appState.user._id,
          name: appState.user.username,
        },
        products: appState.cart.map((item) => ({
          _id: item._id,
          quantity: item.quantity,
        })),
      };

      const orderResponse = await AxiosInstance().post('/carts/add', orderBody);

      if (orderResponse.status !== true) {
        Alert.alert('Không thể tạo đơn hàng');
        return;
      }

      const orderId = orderResponse.data.cart._id;

      // Store orderId for later verification
      await AsyncStorage.setItem('currentOrderId', orderId);

      // Create MoMo payment
      const momoBody = {
        orderId: orderId,
        amount: totalAmount,
        orderInfo: 'Thanh toán đơn hàng',
        redirectUrl: 'MenT://momo',
      };

      const paymentResponse = await AxiosInstance().post('/payments/paymentMomo', momoBody);

      if (paymentResponse.deeplink) {
        await Linking.openURL(paymentResponse.deeplink);
      } else {
        Alert.alert('Lỗi', 'Không thể tạo giao dịch thanh toán.');
        await AsyncStorage.removeItem('currentOrderId');
      }
    } catch (error) {
      console.error('Payment error:', error);
      Alert.alert('Lỗi thanh toán', 'Vui lòng thử lại sau.');
      await AsyncStorage.removeItem('currentOrderId');
    }
  };



  return (
    <View style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={require('../../resources/images/chevron-left.png')} />
          </TouchableOpacity>
        </View>
        <Text style={styles.header}><Icon name="location-on" size={24} color="#000" />Địa chỉ nhận hàng</Text>
        <View style={styles.infoContainer}>
          <View style={styles.infoRow}>
            <Text style={styles.infoText}>{appState.user.username}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoText}>{appState.user.phonenumber}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoText}>{appState.user.address}</Text>
          </View>
        </View>
        <View style={{ width: '100%', backgroundColor: 'black', margin: 3 }}>
          <Image source={require('../../resources/images/Line.png')} />
        </View>

        <FlatList
          data={appState.cart.filter(item => item && item._id)}
          style={styles.flatlistItem}
          renderItem={({ item }) => <ItemDelivery data={item} />}
          keyExtractor={(item) => item._id.toString()}
          scrollEnabled={false}
        />


        <View style={{ width: '100%', backgroundColor: 'black', margin: 3 }}>
          <Image source={require('../../resources/images/Line.png')} />
        </View>

        <Text style={styles.header}>Payment</Text>
        <View style={styles.paymentContainer}>
          {/* payment */}
          <View style={styles.paymentIcons}>
            <View style={{ justifyContent: 'center' }}>
              <TouchableOpacity
                onPress={() => navigation.navigate('PaymentScreen')}
              >
                <Image source={require('../../resources/images/plus.png')} style={{ width: 50, height: 50, marginRight: 15, }} />
              </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={() => setPaymentMethod("card")} style={paymentMethod === "card" ? styles.selected : styles.icon}>
              <Text>💳</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setPaymentMethod("paypal")} style={paymentMethod === "paypal" ? styles.selected : styles.icon}>
              <Text>💲</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setPaymentMethod("stripe")} style={paymentMethod === "stripe" ? styles.selected : styles.icon}>
              <Text>💳</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={() => setPaymentMethod("payOnArrival")}
            style={styles.payOnArrivalContainer}
          >
            <View style={styles.radioCircle}>
              {paymentMethod === "payOnArrival" && <View style={styles.selectedRadioCircle} />}
            </View>
            <Text style={styles.payOnArrivalText}>Pay on arrival</Text>
          </TouchableOpacity>
          {paymentMethod === "payOnArrival" && (
            <Text style={styles.arrivalInfo}>Pay with cash/POS upon arrival</Text>
          )}

          {/* <View style={styles.paymentOption}>
            <TouchableOpacity onPress={() => setPaymentMethod("payOnArrival")}>
              <Text style={styles.payOnArrivalText}>Pay with cash/POS upon arrival</Text>
            </TouchableOpacity>
          </View> */}
        </View>
        <View style={{ width: '100%', backgroundColor: 'black', margin: 3 }}>
          <Image source={require('../../resources/images/Line.png')} />
        </View>

        <View style={styles.summaryContainer}>
          <View style={styles.summaryR}>
            <Icon name="content-paste" size={24} color="#000" />
            <Text style={styles.summaryText}>Chi tiết thanh toán</Text>

          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryText}>Tổng tiền hàng</Text>
            <Text style={styles.summaryText}>{
              appState.cart.reduce((total, item) => {
                return total + item.price * item.quantity;
              }, 0).toLocaleString('vi-VN')} VNĐ</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryText}>Chi phí vận chuyển</Text>
            <Text style={styles.summaryText}>{appState.feedelivery.toLocaleString('vi-VN')} VNĐ</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryText}>Tổng cộng Voucher giảm giá</Text>
            <Text style={styles.summaryText}> VNĐ</Text>
          </View>

          <View style={{ width: '100%', backgroundColor: 'black', margin: 3 }}>
            <Image source={require('../../resources/images/Line.png')} />
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.totalText}>Tổng thanh toán</Text>
            <Text style={styles.totalTexts}>{totalAmount.toLocaleString('vi-VN')} VNĐ</Text>
          </View>
        </View>

      </ScrollView>


      <TouchableOpacity style={styles.proceedButton} onPress={() => checkout()}>
        <Text style={styles.proceedButtonText}>Proceed to Payment</Text>
      </TouchableOpacity>
    </View>
  );
};

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
  header: {
    fontSize: 24,
    fontWeight: '700',
    marginVertical: 1,
    marginTop: 30,
    color: 'black'
  },
  infoContainer: {
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  infoText: {
    width: 'auto',
    fontSize: 16,
    color: 'black'
  },
  changeText: {
    color: '#F9881F',
    fontSize: 16,

  },
  paymentContainer: {
    marginBottom: 60,
  },
  paymentIcons: {
    flexDirection: 'row',
    marginVertical: 20,
  },
  icon: {
    padding: 15,
    backgroundColor: '#eee',
    borderRadius: 8,
    margin: 15,
  },
  selected: {
    margin: 15,
    padding: 15,
    backgroundColor: '#ffff',
    borderRadius: 8,
    borderColor: '#F9881F',
    borderWidth: 1,
  },
  paymentOption: {
    marginTop: 10,
    alignItems: 'center',
  },
  payOnArrivalText: {
    fontSize: 16,
    color: '#F9881F',

  },
  summaryContainer: {
    marginVertical: 20,
    marginBottom: 60
  },
  summaryR: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  summaryText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'black'
  },
  totalText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'black'
  },
  totalTexts: {
    fontSize: 22,
    fontWeight: '600',
    color: 'black'
  },
  proceedButton: {
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
  proceedButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  arrivalInfo: {
    fontSize: 14,
    color: 'black',
    marginTop: 5,
  },
  flatlistItem: {
    height: 'auto',
    width: '100%',
    marginVertical: 5
  }
});

export default DeliveryMethod;


const dataTest = [
  {
    id: 1,
    name: 'test 1',
    quantity: 1,
    price: 10000,
    img: 'https://i.pinimg.com/236x/99/75/b5/9975b5b8d819d8cf9a523fcad48bbbb0.jpg'
  },
  {
    id: 2,
    name: 'test 2',
    quantity: 1,
    price: 20000,
    img: 'https://i.pinimg.com/236x/99/75/b5/9975b5b8d819d8cf9a523fcad48bbbb0.jpg'
  },
  {
    id: 3,
    name: 'test 3',
    quantity: 1,
    price: 30000,
    img: 'https://i.pinimg.com/236x/99/75/b5/9975b5b8d819d8cf9a523fcad48bbbb0.jpg'
  },
]