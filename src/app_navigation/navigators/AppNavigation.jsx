import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import UserNavigation from './UserNavigation';
import MainNavigation from './MainNavigation';
import { useSelector } from 'react-redux';
import HomeScreen from '../main_navigation/HomeScreen';

const useAppSelector = useSelector;

const AppNavigation = () => {
    const appState = useAppSelector((state) => state.app);
    return (
        
        <NavigationContainer>
            {
                appState.user ? <MainNavigation/> : <UserNavigation/>
            }
        </NavigationContainer>
    )
}

export default AppNavigation
