import { Stack } from 'expo-router'
import React from 'react'
import { StyleSheet } from 'react-native'

const _layout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name='login' />
      <Stack.Screen name='forgetPassword' />
    </Stack>
  )
}

export default _layout

const styles = StyleSheet.create({})