import { Stack } from 'expo-router'
import React from 'react'
import { StyleSheet } from 'react-native'

const _layout = () => {
  return (
    <Stack>
      <Stack.Screen name='account' options={{ headerShown: false }} />
      <Stack.Screen name='security' options={{ headerShown: false }} />
      <Stack.Screen name='help' options={{ headerShown: false }} />
    </Stack>
  )
}

export default _layout

const styles = StyleSheet.create({})