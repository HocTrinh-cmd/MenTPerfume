import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ItemProduct from './OneItem/ItemProductTop'

const Flatlist = (props) => {

    const { data } = props;

    return (
        <View>
            <FlatList
                data={data}
                style={styles.FlatListSttle}
                renderItem={({ item }) => <ItemProduct data={item} />}
                keyExtractor={(item) => item.id}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                columnWrapperStyle={{
                    justifyContent: "space-between"
                }}
                scrollEnabled={false}
            />
        </View>
    )
}

export default Flatlist

const styles = StyleSheet.create({
    FlatListstyle: {
        width: 325,
        height: 691,
       
    }
})