import { StyleSheet, Text, View, Pressable} from 'react-native'
import React from 'react'

const BottomButton = (props) => {
    const {title, press, style} = props;



    return (
        <View>
            <Pressable
                style={styles.buttonstyle}
                onPress={() => press()}
            >
                {title && <Text style={styles.ButtonText}> {title}</Text>}
            </Pressable>
        </View>
    )
}

export default BottomButton

const styles = StyleSheet.create({
    buttonstyle: {
        width: '100%',
        height: 51,
        backgroundColor: 'rgba(249, 136, 31, 1)',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    ButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFFFFF'
    },
})