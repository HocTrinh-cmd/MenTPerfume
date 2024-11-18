import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Textcom = (props) => {
    const {styles, text} = props;

  return (
    <View>
        {text && <Text style={styles.text}>{text}</Text>}
    </View>
  )
}

export default Textcom

const styles = StyleSheet.create({})