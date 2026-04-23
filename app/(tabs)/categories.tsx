import CatgeoriesScreen from '@/screens/CatgeoriesScreen'
import React from 'react'
import { StyleSheet, View } from 'react-native'

const categories = () => {
    return (
        <View style={styles.container}>
            <CatgeoriesScreen />
        </View>
    )
}

export default categories

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#F6F7FB",
    }
})