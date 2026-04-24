import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import PrivacySecurity from '@/screens/SettingsSecurityScreen'

const security = () => {
  return (
    <View style={{flex: 1}}>
      <PrivacySecurity/>
    </View>
  )
}

export default security

const styles = StyleSheet.create({})