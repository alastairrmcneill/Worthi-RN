import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useUserStore } from "@/state/UserStore";
import { useRouter } from "expo-router";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Colors } from "@/constants/Colors";

export default function AccountButton() {
  const { currentUser } = useUserStore();
  const router = useRouter();

  const initials = currentUser?.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          router.navigate("/(authenticated)/SettingsScreen");
        }}
      >
        <Text style={styles.text}>{initials}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignContent: "center",
    justifyContent: "center",
    backgroundColor: Colors.grey,
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  text: {
    width: "100%",
    textAlign: "center",
    fontFamily: "mon-b",
    fontSize: 18,
    color: "white",
  },
});
