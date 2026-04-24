import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import HelpSupport from '@/screens/SettingsHelpScreen'

const help = () => {
  return (
    <View style={{flex: 1}}>
      <HelpSupport/>
    </View>
  )
}

export default help

const styles = StyleSheet.create({})