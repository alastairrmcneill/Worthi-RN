import { StyleSheet, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="home_screen" options={{ headerShown: false }} />
      <Stack.Screen name="SettingsScreen" />
    </Stack>
  );
}

const styles = StyleSheet.create({
  container: {},
});
