import CommodityListing from '@/screens/CommodityListing'
import React from 'react'
import { StyleSheet, View } from 'react-native'

const index = () => {
    return (
        <View style={styles.container}>
            <CommodityListing />
        </View>
    )
}

export default index

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F6F7FB",
    },
})