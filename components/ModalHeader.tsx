import { SafeAreaView, StyleSheet, TouchableOpacity, Text, View } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";

export default function ModalHeader() {
  const router = useRouter();
  return (
    <SafeAreaView>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginHorizontal: 15,
          paddingTop: 10,
          paddingBottom: 20,
        }}
      >
        <Text style={{ fontFamily: "mon-b", fontSize: 20 }}>Track New Account</Text>
        <TouchableOpacity
          onPress={() => {
            router.back();
          }}
          style={{
            borderWidth: StyleSheet.hairlineWidth,
            borderColor: Colors.text,
            width: 30,
            height: 30,
            borderRadius: 20,
            alignContent: "center",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Ionicons name="close-outline" size={20} color={Colors.text} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {},
});
