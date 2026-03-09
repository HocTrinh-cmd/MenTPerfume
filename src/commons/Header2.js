import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';

const Header2 = (props) => {
    const { imgIconleft, backto, goto, imgIconright } = props;

    return (
        <View style={styles.container}>
            {/* Icon bên trái */}
            <Pressable onPress={() => backto && backto()}
                style={styles.buttonContainer}
            >
                {imgIconleft && (
                    <View style={styles.iconContainer}>
                        <Image
                            source={imgIconleft}
                            style={styles.IconImg}
                            resizeMode="contain"
                        />
                    </View>
                )}
            </Pressable>

            {/* Nội dung ở giữa */}
            <View style={styles.titleContainer}>
                <Image
                    source={require('../resources/images/MenT_Perfume_2.png')}
                    style={styles.logo}
                />
            </View>

            {/* Icon bên phải */}
            <Pressable onPress={() => goto && goto()}
                style={styles.buttonContainer}
            >
                {imgIconright && (
                    <View style={styles.iconContainer}>
                        <Image
                            source={imgIconright}
                            style={styles.IconImg}
                            resizeMode="contain"
                        />
                    </View>
                )}
            </Pressable>
        </View>
    );
};

export default Header2;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

    },
    buttonContainer: {
        width: 40,
        height: 40,
    },
    logo: {
        alignSelf: 'center',
        width: 68,
        height: 46.5,
    },
    iconContainer: {
        width: 40,
        height: 40,
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        padding: 6,
        elevation: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    IconImg: {
        width: 24,
        height: 24,
        color: 'black'
    },
    titleContainer: {
        alignItems: 'center',
    },
    title: {
        fontSize: 14,
        color: 'black',
        fontWeight: 'bold',
    },
    subtitle: {
        fontSize: 14,
        color: '#FF6347', // Màu đỏ cho địa chỉ
    },
});
