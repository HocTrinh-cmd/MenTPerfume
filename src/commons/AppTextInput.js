import { Text, View, TextInput, Image } from 'react-native'
import React from 'react'

const AppTextInput = (props) => {
    const { title, err, styles, value, onChangeText,
        iconLeft, iconRight } = props
    
    return (
        <View style={styles.container}>
            {title && <Text style={styles.title}>{title}</Text>}
            <TextInput
                style={styles.input}
                value={value}
                onChangeText={onChangeText}
            />
            {iconLeft && <Image
                source={iconLeft}
                style={{ width: 20, height: 20 }}
            />}
            {/* {
                iconRight && <Image
                    source={require(iconRight)}
                    style={{ width: 20, height: 20 }}
                />
            } */}
            {
                err && <Text style={styles.err}>{err}</Text>
            }
        </View>
    )
}

export default AppTextInput

