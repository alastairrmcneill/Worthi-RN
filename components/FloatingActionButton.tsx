import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons"; // Use Expo vector icons for the FAB icon
import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";

export default function FloatingActionButton() {
  const router = useRouter();
  return (
    <View style={{ position: "absolute", bottom: 0, right: 0, margin: 30 }}>
      <TouchableOpacity
        style={styles.container}
        onPress={() => {
          router.push("/(authenticated)/NewAccountScreen");
        }}
      >
        <MaterialIcons name="add" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    backgroundColor: Colors.tint,
    width: 50,
    height: 50,
    borderRadius: 30,
    alignItems: "center",
    elevation: 5, // Shadow for Android
    shadowColor: "#000", // Shadow for iOS
    shadowOffset: { width: 0, height: 2 }, // Shadow for iOS
    shadowOpacity: 0.3, // Shadow for iOS
    shadowRadius: 3, // Shadow for iOS
  },
  fab: {},
});
