import {
  Alert,
  AppState,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import AxiosInstance from '../../helper/AxiosInstance';
import Header2 from '../../commons/Header2';
import AppStyles from '../../styles/AppStyles';
import {formatDate} from './CartScreen';

const BellScreen = props => {
  const {navigation} = props;
  const [vouchers, setVouchers] = useState([]);
  const useAppDispatch = () => useDispatch();
  const dispatch = useAppDispatch();
  const useAppSelector = useSelector;
  const appState = useAppSelector(state => state.app);

  const getVouchers = async () => {
    try {
      const response = await AxiosInstance().get('/vouchers');
      if (response.status) {
        setVouchers(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const claimVoucher = async voucherCode => {
    try {
      const body = {
        user: appState.user._id,
        voucherCode: voucherCode,
      };
      console.log(body);
      const response = await AxiosInstance().post(
        'vouchers/claimVoucher',
        body,
      );
      console.log(response.data);
      if (response.status == 200) {
        Alert.alert('Claim Voucher', response.data, [
          {
            text: 'OK',
            style: 'cancel',
          },
        ]);
      }
    } catch (error) {
      console.log(error.message);
      if (error.status == 400) {
        Alert.alert(
          'Claim Voucher Failed ',
          'Người dùng đã lấy Voucher này rồi.',
          [
            {
              text: 'Cancel',
              style: 'cancel',
            },
          ],
        );
      }
    }
  };

  useEffect(() => {
    getVouchers();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Header2
          imgIconleft={require('../../resources/images/chevron-left.png')}
          backto={() => navigation.goBack()}
        />
        <View style={styles.body}>
          <FlatList
            data={vouchers}
            renderItem={({item}) => (
              <View style={styles.voucherFlatlistView}>
                <View style={{width: '60%'}}>
                  <Text
                    style={[
                      AppStyles.textColorRed,
                      {fontWeight: '500', fontSize: 18},
                    ]}>
                    Mã giảm giá: {item.code}
                  </Text>
                  {/* <Text style={styles.voucherFlatlistTxt2}>
                    {item.description}
                  </Text> */}
                  <Text style={styles.voucherFlatlistTxt2}>
                    Giảm giá: {item.discountValue}%
                  </Text>

                  {/* <Text style={styles.voucherFlatlistTxt2}>
                    Số lần sử dụng: {item.usageLimit}
                  </Text> */}

                  <Text style={styles.voucherFlatlistTxt2}>
                    Có hạn đến ngày: {formatDate(item.endDate)}
                  </Text>
                </View>
                <TouchableOpacity
                  style={[
                    AppStyles.backgroundColorRed,
                    {
                      width: '30%',
                      height: 60,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 16,
                      padding: 8,
                    },
                  ]}
                  onPress={() => claimVoucher(item.code)}>
                  <Text style={{color: 'white', fontSize: 18}}>Claim</Text>
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={item => item._id}
          />
        </View>
      </View>
    </View>
  );
};

export default BellScreen;

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

  voucherFlatlistView: {
    width: '100%',
    flexDirection: 'row',
    height: 'auto',
    backgroundColor: 'lightgray',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  voucherFlatlistTxt2: {color: 'black', fontWeight: '500', fontSize: 16},
});
