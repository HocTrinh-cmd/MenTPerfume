import { Image, StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import React, { useEffect } from 'react'

const Welcome = (props) => {
  const { navigation } = props;
  useEffect(() => {
    setTimeout(() => {
        navigation.navigate('Login')
    }, 2000)

  }, [])


  return (
    <View style={styles.container}>
      <Image source={require('../../resources/images/MenT_Perfume_1.png')}/>
      <ActivityIndicator size="large" color="#FF66CC" />
    </View>
  )
}

export default Welcome

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF0F5',
    alignItems: 'center',
    justifyContent: 'center'
  }
})