import { StyleSheet, Image, View } from 'react-native';
import React from 'react';
import HomeScreen from '../main_navigation/HomeScreen';
import SearchScreen from '../main_navigation/SearchScreen';
import BellScreen from '../main_navigation/BellScreen';
import UserProfileScreen from '../main_navigation/UserProfileScreen';
import DetailProductScreen from '../main_navigation/DetailProductScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CartScreen from '../main_navigation/CartScreen';
import EditUserScreen from '../main_navigation/EditUserScreen';
import WhitelistScreen from '../main_navigation/WhitelistScreen';
import SettingScreen from '../main_navigation/SettingScreen';
import DeliveryMethod from '../main_navigation/deliveryMethod';
import PaymentScreen from '../main_navigation/PaymentScreen';
import OrderHistory from '../main_navigation/OrderHistory';


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const MainNavigation = () => {
    const MainTab = () => {
        return (
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused }) => {
                        let iconPath;
                        let iconStyle = { width: 24, height: 24, tintColor: focused ? '#D17842' : '#4E5053' };
                        let iconBackgroundStyle = {};

                        if (route.name === 'Home') {
                            iconPath = require('../../resources/images/home_inactive.png');
                        } else if (route.name === 'Whitelist') {
                            iconPath = require('../../resources/images/Heart.png');
                        } else if (route.name === 'Search') {
                            iconPath = require('../../resources/images/search_inactive.png');
                            iconStyle.tintColor = '#FFFFFF';
                            iconBackgroundStyle = {
                                backgroundColor: '#FF8C42',
                                width: 60,
                                height: 60,
                                borderRadius: 30,
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginTop: -30,
                            };
                        } else if (route.name === 'Bell') {
                            iconPath = require('../../resources/images/bell_inactive.png');
                        } else if (route.name === 'User') {
                            iconPath = require('../../resources/images/user_inactive.png');
                        }

                        return (
                            <View style={iconBackgroundStyle}>
                                <Image
                                    source={iconPath}
                                    style={iconStyle}
                                    resizeMode="contain"
                                />
                            </View>
                        );
                    },
                    tabBarShowLabel: false,
                    tabBarStyle: {
                        backgroundColor: '#FFFFFF',
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                        height: 60,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        elevation: 10,
                    },
                    headerShown: false,
                })}
            >
                <Tab.Screen name="Home" component={HomeScreen} />
                <Tab.Screen name="Whitelist" component={WhitelistScreen} />
                <Tab.Screen name="Search" component={SearchScreen} />
                <Tab.Screen name="Bell" component={BellScreen} />
                <Tab.Screen name="User" component={UserProfileScreen} />
            </Tab.Navigator>
        );
    };

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="MainTab" component={MainTab} />
            <Stack.Screen name="Detail" component={DetailProductScreen} />
            <Stack.Screen name="UpdateProfile" component={UserProfileScreen} />
            <Stack.Screen name="Cart" component={CartScreen} />
            <Stack.Screen name="EditUser" component={EditUserScreen} />
            <Stack.Screen name="Setting" component={SettingScreen} />
            <Stack.Screen name="OrderHistory" component={OrderHistory} />
            <Stack.Screen name="DeliveryMethod" component={DeliveryMethod} />
            <Stack.Screen name="Payment" component={PaymentScreen} />
        </Stack.Navigator>
    );
};

export default MainNavigation;

const styles = StyleSheet.create({});
