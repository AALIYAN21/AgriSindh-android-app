import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const _layout = () => {
  return (
    <Stack>
        <Stack.Screen name='account'/>
        <Stack.Screen name='security'/>
        <Stack.Screen name='help'/>
    </Stack>
  )
}

export default _layout

const styles = StyleSheet.create({})