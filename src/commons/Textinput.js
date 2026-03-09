import { Image, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'

const Textinput = (props) => {
  const { styles, value,  iconRight, placeholder, onChange, security, } = props;

  return (
    <View style={styles.container}>
        <TextInput
          
          style={styles.input}
          placeholder={placeholder}
          value={value}
          onChangeText={onChange}      
          secureTextEntry={security}
      />
      {
        iconRight && <Image
          source={iconRight}
          style={{ width: 20, height: 20 }}
        />
      }
    </View>
  )
}

export default Textinput

const styles = StyleSheet.create({})