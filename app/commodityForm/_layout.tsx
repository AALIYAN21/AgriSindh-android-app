import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet } from "react-native";

const _layout = () => {
  return (
    <>
      <StatusBar style="dark" />
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="volume" options={{ headerShown: false }} />
      </Stack>
    </>
  );
};

export default _layout;

const styles = StyleSheet.create({});
