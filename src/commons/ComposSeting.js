import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'


const ComposSeting = (props) => {
    const { customstyle, icons, title, pressEvent } = props;
    return (

        <TouchableOpacity
            onPress={() => pressEvent()}
            style={[styles.container, customstyle]}>
            {icons && <Image
                source={icons}
                style={styles.Icon}
            />}
            {title && <Text style={styles.title}>{title}</Text>}
        </TouchableOpacity>


    )
}

export default ComposSeting

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20
    },
    Icon: {
        width: 30,
        height: 30
    },
    title: {
        marginLeft: 10,
        fontSize: 16,
        color: '#000000'
    }
})