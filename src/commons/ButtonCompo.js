import { Button, StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'

const ButtonCompo = (props) => {
    const {styles, title, press} = props;


    
    return (
        <View >
            <Pressable style={styles.Buttonstyle} onPress={() => press()}>
                {title && <Text style={styles.title}>{title}</Text>}
            </Pressable>
        </View>
    )
}

export default ButtonCompo

const styles = StyleSheet.create({})