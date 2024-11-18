import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../redux/Reducer'
import BottomButton from '../../commons/BottomButton'
import ComposSeting from '../../commons/ComposSeting'
import Header2 from '../../commons/Header2'

const SettingScreen = (props) => {
    const { navigation } = props;

    const [imageLocal, setImageLocal] = useState('');
    const [imageOnline, setImageOnline] = useState('');

    const useAppDispatch = () => useDispatch();
    const useAppSelector = useSelector;
    const dispatch = useAppDispatch();
    const appState = useAppSelector((state) => state.app);




    return (
        <View style={styles.container}>
            <View >
                <Header2
                    imgIconleft={require('../../resources/images/chevron-left.png')}
                    backto={() => navigation.goBack()}
                />

                <View>
                    <ComposSeting
                        icons={require('../../resources/images/profile.png')}
                        customstyle={styles.customStyle}
                        title={'My profile'}
                        pressEvent={() => console.log('my profile')}
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


        </View>
    )
}

export default SettingScreen

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
    customStyle: {
        marginTop: 40
    },

})




