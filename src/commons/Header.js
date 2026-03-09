import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Header = (props) => {
    const { title, imgIconleft, backto, goto, imgIconright } = props;


    return (
        <View style={styles.container}>
            
            <Pressable onPress={() => backto()}>
                {imgIconleft && <Image
                    source={imgIconleft}
                    style={styles.IconImg}
                />}
            </Pressable>


            {title && <Text style={{ color: 'black', fontSize: 16 }}>{title}</Text>}

            <Pressable onPress={() => goto()}>
                {imgIconright && <Image
                    source={imgIconright}
                    style={styles.IconImg}
                />}
            </Pressable>

        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    container: {
        width: 375,
        height: 35,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    IconImg: {
        width: 24,
        height: 24
    }
})