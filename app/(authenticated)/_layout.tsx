import { StyleSheet, TouchableOpacity, Text, View, SafeAreaView } from "react-native";
import React from "react";
import { Stack, useRouter } from "expo-router";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import ModalHeader from "@/components/ModalHeader";

export default function Layout() {
  const router = useRouter();
  return (
    <Stack>
      <Stack.Screen name="home_screen" options={{ headerShown: false }} />
      <Stack.Screen name="SettingsScreen" />
      <Stack.Screen
        name="NewAccountScreen"
        options={{
          presentation: "fullScreenModal",
          headerTransparent: true,
          header: () => <ModalHeader />,
        }}
      />
    </Stack>
  );
}

const styles = StyleSheet.create({
  container: {},
});
