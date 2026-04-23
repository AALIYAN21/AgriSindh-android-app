import IdentityProfile from '@/screens/SettingsProfileScreen'
import React from 'react'
import { StyleSheet, View } from 'react-native'

const account = () => {
  return (
    <View style={{ flex: 1 }}>
      <IdentityProfile />
    </View>
  )
}

export default account

const styles = StyleSheet.create({})