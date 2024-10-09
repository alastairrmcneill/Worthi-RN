import { Colors } from "@/constants/Colors";
import { Stack, useRouter } from "expo-router";
import React from "react";
import { TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function Layout() {
  const router = useRouter();
  return (
    <Stack>
      <Stack.Screen name="login_screen" options={{ headerShown: false }} />
      <Stack.Screen
        name="register_screen"
        options={{
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <MaterialCommunityIcons name="arrow-left" size={24} color={Colors.text} />
            </TouchableOpacity>
          ),
          headerTransparent: true,
          headerTitle: "",
        }}
      />
      <Stack.Screen
        name="forgot_password_screen"
        options={{
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <MaterialCommunityIcons name="arrow-left" size={24} color={Colors.text} />
            </TouchableOpacity>
          ),
          headerTransparent: true,
          headerTitle: "",
        }}
      />
      <Stack.Screen
        name="reset_password_screen"
        options={{
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <MaterialCommunityIcons name="arrow-left" size={24} color={Colors.text} />
            </TouchableOpacity>
          ),
          headerTransparent: true,
          headerTitle: "",
        }}
      />
    </Stack>
  );
}
