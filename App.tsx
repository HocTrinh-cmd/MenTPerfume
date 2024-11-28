import React from 'react';
import { Image, SafeAreaView, StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import store from './src/redux/Store';
import AppNavigation from './src/app_navigation/navigators/AppNavigation';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import HomeScreen from './src/app_navigation/main_navigation/HomeScreen';
import MainNavigation from './src/app_navigation/navigators/MainNavigation';
import { NavigationContainer } from '@react-navigation/native';
import DetailProductScreen from './src/app_navigation/main_navigation/DetailProductScreen';
import CartScreen from './src/app_navigation/main_navigation/CartScreen';
import UserProfileScreen from './src/app_navigation/main_navigation/UserProfileScreen';
import SettingScreen from './src/app_navigation/main_navigation/SettingScreen';
import GoogleMapsScreen from './src/app_navigation/googlemaps/GoogleMapsScreen';
import Welcome from './src/app_navigation/user_navigation/Welcome';
import LoginScreen from './src/app_navigation/user_navigation/LoginScreen';
import RegisterScreen from './src/app_navigation/user_navigation/RegisterScreen';
import ForgetPassword from './src/app_navigation/user_navigation/ForgetPassword';
import VerifyOTPScreen from './src/app_navigation/user_navigation/VerifyOTPScreen';
import PaymentScreen from './src/app_navigation/main_navigation/PaymentScreen';
import OrderHistory from './src/app_navigation/main_navigation/OrderHistory';
import DeliveryMethod from './src/app_navigation/main_navigation/deliveryMethod';


function App(): React.JSX.Element {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <SafeAreaView style={{ flex: 1 }}>
          <StatusBar />

          <AppNavigation />

          {/* <ForgetPassword></ForgetPassword> */}
          {/* <VerifyOTPScreen></VerifyOTPScreen> */}

          {/* <OrderHistory></OrderHistory> */}
          {/* <PaymentScreen></PaymentScreen> */}
          {/* <DeliveryMethod></DeliveryMethod> */}

          {/* <CartScreen></CartScreen> */}
          {/* <UserProfileScreen></UserProfileScreen> */}
          {/* <SettingScreen></SettingScreen> */}
          {/* <NavigationContainer>
          <DetailProductScreen></DetailProductScreen>
        </NavigationContainer> */}
          {/* <GoogleMapsScreen></GoogleMapsScreen> */}
          {/* <Welcome></Welcome> */}
          {/* <RegisterScreen></RegisterScreen> */}
          {/* <LoginScreen></LoginScreen> */}



        </SafeAreaView>
      </Provider>
    </GestureHandlerRootView>
  )
}
export default App;