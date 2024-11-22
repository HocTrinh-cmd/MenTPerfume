import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
  Button,
} from 'react-native';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import Header from '../../commons/Header';
import ButtonCompo from '../../commons/ButtonCompo';
import CheckBox from 'react-native-check-box';
import {useDispatch, useSelector} from 'react-redux';
import {clearCart} from '../../redux/Reducer';
import AxiosInstance from '../../helper/AxiosInstance';
import Header2 from '../../commons/Header2';
import ItemCarts2 from '../../commons/OneItem/IteamCarts2';
import BottomSheet, {
  BottomSheetFlatList,
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import {getVouchers} from '../../redux/UserAPI';

export const formatDate = dateString => {
  const date = new Date(dateString); // Convert the ISO string to a Date object
  return date.toLocaleDateString('en-GB'); // Formats date as DD/MM/YYYY
};

const CartScreen = props => {
  const {navigation} = props;
  const [userVoucher, setUserVoucher] = useState([]);
  const [discount, setdiscount] = useState(0);
  const [vouchers, setvouchers] = useState([]);
  const useAppDispatch = () => useDispatch();
  const dispatch = useAppDispatch();
  const useAppSelector = useSelector;
  const appState = useAppSelector(state => state.app);
  const bottomSheetRef = useRef(null);

  //lấy vouchers của user
  const getUserVouchers = async () => {
    try {
      const response = await AxiosInstance().post(
        `users/customerByID/${appState.user._id}`,
      );
      return response.data.vouchers;
    } catch (error) {
      return error.message;
    }
  };

  //lấy vouchers của app
  const getVouchers = async () => {
    try {
      const response = await AxiosInstance().get('/vouchers');
      return response.data;
    } catch (error) {
      return error.message;
    }
  };

  useEffect(() => {
    getUserVouchers()
      .then(res => {
        setUserVoucher(res);
      })
      .catch(err => {
        console.log(err);
      });

    getVouchers()
      .then(res => {
        setvouchers(res);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const snapPoint = useMemo(() => ['70%'], []);
  // Open the Bottom Sheet
  const openBottomSheet = () => {
    bottomSheetRef.current?.expand();
  };

  // Close the Bottom Sheet
  const closeBottomSheet = () => {
    bottomSheetRef.current?.close();
  };

  //xử lý chọn voucher
  const handleChooseVoucher = (code, discountValue) => {
    let count = 0;
    userVoucher.forEach(item => {
      if (item.voucherId == code) {
        count += 1;
      }
    });
    if (count == 0) {
      Alert.alert('Không dùng được voucher', 'Người dùng chưa có voucher này', [
        {
          text: 'OK',
          style: 'cancel',
        },
      ]);
      return;
    }

    setdiscount(discountValue);
    closeBottomSheet();
  };
  const checkout = async () => {
    if (appState.cart.length === 0) {
      // Giỏ hàng đang trống, không thực hiện thanh toán
      alert('Giỏ hàng đang trống');
      return;
    }
    if (appState.cart.length === 0) {
      // Giỏ hàng đang trống, không thực hiện thanh toán
      alert('Giỏ hàng đang trống');
      return;
    }
    try {
      const body = {
        user: {
          _id: appState.user._id,
          name: appState.user.username,
        },
        products: appState.cart.map(item => {
          return {
            _id: item._id,
            quantity: item.quantity,
          };
        }),
      };
      const result = await AxiosInstance().post('/carts/add', body);
      if (result.status == true) {
        // thông báo thành công
        // quay về màn hình chính
        navigation.navigate('Home');
        // xóa giỏ hàng
        dispatch(clearCart());
      } else {
        alert('Lỗi thanh toán');
      }
      console.log(body);
    } catch (error) {
      console.log(error);
    }
  };

  //chuyển định dạng date

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Header2
          imgIconleft={require('../../resources/images/chevron-left.png')}
          backto={() => navigation.goBack()}
        />
        <View style={styles.body}>
          <Text style={styles.Text1}>Your cart</Text>
          <FlatList
            data={appState.cart.filter(item => item && item._id)}
            style={styles.FlatList}
            renderItem={({item}) => <ItemCarts2 data={item} />}
            keyExtractor={item => item._id.toString()}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
      <TouchableOpacity
        style={{
          width: '100%',
          height: 42,
          backgroundColor: 'white',
          borderColor: 'red',
          borderWidth: 1,
          borderRadius: 20,
          padding: 8,
        }}
        activeOpacity={0.7}
        onPress={openBottomSheet}>
        <Text
          style={{
            width: 'auto',
            height: '100%',
            textAlignVertical: 'center',
            color: 'black',
            fontSize: 18,
          }}>
          Voucher
        </Text>
      </TouchableOpacity>

      <View style={styles.PaymentView}>
        <View style={styles.Paymentchild}>
          <Text style={styles.totalStyle}>Total</Text>
          <Text style={styles.priceStyle}>
            {appState.cart
              .reduce((total, item) => {
                return (
                  total +
                  item.price * item.quantity -
                  (discount * (total + item.price * item.quantity)) / 100
                );
              }, 0)
              .toLocaleString('vi-VN')}{' '}
            VND
          </Text>
        </View>

        <Pressable
          style={styles.ButtonPayment}
          onPress={() => navigation.navigate('DeliveryMethod')}>
          <Text style={styles.ButtonPaymentText}>Process to payment</Text>
        </Pressable>
      </View>
      <BottomSheet
        index={-1}
        ref={bottomSheetRef}
        snapPoints={snapPoint}
        enableDynamicSizing={false}
        enablePanDownToClose={true}
        style={{padding: 16}}>
        <Text
          style={{
            width: '100%',
            height: 35,
            color: 'black',
            textAlign: 'center',
            fontSize: 24,
          }}>
          Available Vouchers
        </Text>
        <BottomSheetFlatList
          style={{}}
          contentContainerStyle={{flex: 1}}
          data={vouchers}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => handleChooseVoucher(item._id, item.discountValue)}
              style={{
                width: '100%',
                height: 'auto',
                padding: 8,

                backgroundColor: '#eee',
                borderRadius: 16,
                borderColor: 'red',
                borderWidth: 1,
              }}>
              <View style={{width: '100%'}}>
                <Text style={[styles.text2, {fontSize: 18, fontWeight: '500'}]}>
                  Mã giảm giá: {item.code}
                </Text>
                <Text style={styles.text2}>{item.description}</Text>
                <Text style={styles.text2}>
                  Giảm: {item.discountValue}% tổng đơn hàng
                </Text>
                <Text style={styles.text2}>
                  Có hiệu lực đến: {formatDate(item.endDate)}
                </Text>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index}
        />
      </BottomSheet>
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingBottom: 20,
  },
  content: {
    flexGrow: 1,
  },
  body: {
    marginTop: 40,
  },
  FlatList: {
    height: 400,
    backgroundColor: 'white',
  },
  listContainer: {
    paddingBottom: 20,
  },
  Text1: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#3D3D3D',
    marginBottom: 20,
  },
  PaymentView: {
    width: '100%',
    height: 128,
  },
  Paymentchild: {
    height: 30,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 47,
  },
  totalStyle: {
    fontSize: 16,
    color: '#3D3D3D',
  },
  priceStyle: {
    fontSize: 24,
    color: '#3D3D3D',
    fontWeight: 'bold',
  },
  ButtonPayment: {
    width: '100%',
    height: 51,
    backgroundColor: 'rgba(249, 136, 31, 1)',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ButtonPaymentText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  text2: {
    fontSize: 16,
    color: 'black',
  },
});

const cartItems = [
  {
    id: 1,
    brand: 'Jean Paul Gaultier',
    name: 'Chanel Bleu De Chanel Parfum 50ml',
    price: 2229000,
    image: require('../../resources/images/product1.png'),
    quantity: 1,
  },
  {
    id: 2,
    brand: 'Chanel',
    name: 'Classic cheeseburger',
    price: 2229000,
    image: require('../../resources/images/product1.png'),
    quantity: 1,
  },
  {
    id: 3,
    brand: 'The Macdonalds',
    name: 'Classic',
    price: 23.99,
    image: require('../../resources/images/product1.png'),
    quantity: 1,
  },
];
