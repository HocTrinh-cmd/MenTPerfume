import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Header from '../../commons/Header'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../redux/Reducer'
import BottomButton from '../../commons/BottomButton'
import ComposSeting from '../../commons/ComposSeting'
import Header2 from '../../commons/Header2'
import OrderStepItem from '../../commons/OrderStepItem'
import Icon from 'react-native-vector-icons/FontAwesome';

const UserProfileScreen = (props) => {
  const { navigation } = props;

  const [imageLocal, setImageLocal] = useState('');
  const [imageOnline, setImageOnline] = useState('');

  const useAppDispatch = () => useDispatch();
  const useAppSelector = useSelector;
  const dispatch = useAppDispatch();
  const appState = useAppSelector((state) => state.app);
  
  const name = appState.user.username;
  const checkRole = () => {
    const role = Number(appState.user.role);
    if (role === 1) {
      return 'Thành viên';
    } else if (role === 2) {
      return 'Admin';
    } else {
      return null;
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.template}>

          <View style={styles.templatechild}>
            <Image
              source={appState.user.avatar ? { uri: appState.user.avatar } : {uri: 'https://i.pinimg.com/736x/cd/4b/d9/cd4bd9b0ea2807611ba3a67c331bff0b.jpg'}}
              style={styles.imageAvatar}
            />
            <View>
              <Text style={styles.displayName}>{appState.user.username}</Text>
              <Text style={styles.displayEmail}>{appState.user.email}</Text>
              {checkRole() && (
                <Text style={styles.displayMember}>{checkRole()}</Text>
              )}
            </View>


          </View>
        </View>

        <View style={styles.option1}>
          <Text style={styles.option1text} s>Đơn mua</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('OrderHistory')}
          >
            <Text style={styles.option1text}>Xem lịch sử mua hàng {'\u2192'}</Text>
          </TouchableOpacity>
        </View>


        <View style={styles.OrderStep}>
          <OrderStepItem icon={require('../../resources/images/wallet-solid.png')} label="Chờ xác nhận" eventPress={() => console.log('Chờ xác nhận')} />
          <OrderStepItem icon={require('../../resources/images/box-solid.png')} label="Chờ lấy hàng" eventPress={() => console.log('Chờ lấy hàng')} />
          <OrderStepItem icon={require('../../resources/images/truck-solid.png')} label="Chờ giao hàng" eventPress={() => console.log('Chờ giao hàng')} />
          <OrderStepItem icon={require('../../resources/images/star-solid.png')} label="Đánh giá" eventPress={() => console.log('Đánh giá')} />

        </View>


        <View>
          <ComposSeting
            icons={require('../../resources/images/profile.png')}
            customstyle={styles.customStyle}
            title={'My profile'}
            pressEvent={() => navigation.navigate('EditUser')}
          />
          <ComposSeting
            icons={require('../../resources/images/work.png')}
            customstyle={styles.customStyle}
            title={'Payment method'}
            pressEvent={() => console.log('Payment method')}
          />
          <ComposSeting
            icons={require('../../resources/images/settings.png')}
            customstyle={styles.customStyle}
            title={'Settings'}
            pressEvent={() => console.log('Settings')}
          />
          <ComposSeting
            icons={require('../../resources/images/chat.png')}
            customstyle={styles.customStyle}
            title={'Help'}
            pressEvent={() => console.log('Help')}
          />
          <ComposSeting
            icons={require('../../resources/images/Paper.png')}
            customstyle={styles.customStyle}
            title={'Privacy policy'}
            pressEvent={() => console.log('Privacy policy')}
          />
        </View>




      </View>

      <BottomButton
        title={'Log Out'}
        press={() => dispatch(logout())}
      />


    </View>
  )
}

export default UserProfileScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 20,

  },
  content: {
    flexGrow: 1,
  },
  template: {
    width: 416,
    height: 137,
    backgroundColor: 'rgba(249, 136, 31, 1)',
    marginLeft: -24,
    paddingTop: 30
  },
  templatechild: {
    width: '100%',
    flexDirection: 'row',
  },
  imageAvatar: {
    width: 74,
    height: 74,
    borderRadius: 77.5,
    marginLeft: 20,
    marginRight: 31
  },
  displayName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF'
  },
  displayEmail: {
    width: 190,
    fontSize: 16,
    color: '#FFFFFF',
    textDecorationLine: 'underline',
    fontWeight: 'bold',
    marginTop: 5
  },
  displayMember: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginTop: 5
  },
  option1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  option1text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3D3D3D'
  },
  OrderStep: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20
  }
})