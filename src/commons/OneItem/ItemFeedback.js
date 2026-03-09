import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ItemFeedback = (props) => {
    const {data} = props;

  return (
    <View style={styles.container}>
        <View style={styles.userInfor}>
            <Text style={styles.Textstyle}>{data.user.name}</Text>
            <Text style={styles.Textstyle}>⭐ {data.rating}</Text>
        </View>
        <View style={styles.content}>
            <Text>Chất lượng sản phẩm: <Text style={styles.Textstyle}>{data.quality}</Text></Text>
            <Text style={styles.Textstyle}>{data.content}</Text>
        </View>
    </View>
  )
}

export default ItemFeedback

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 'auto',
        borderWidth: 1,
        borderRadius: 6,
        alignSelf: 'center',
        marginVertical: 3,
        padding: 5,
        borderColor: '#DDDDDD'
    },
    content: {
        marginTop: 10
    },
    Textstyle: {
        fontSize: 16,
        color: '#3d3d3d'
    },
})