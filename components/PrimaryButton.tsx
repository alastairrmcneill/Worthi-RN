import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";

interface PrimaryButtonProps {
  title: string;
  onPress: () => void;
  paddingX?: number;
  paddingY?: number;
}

export default function PrimaryButton({ title, onPress, paddingX = 0, paddingY = 0 }: PrimaryButtonProps) {
  return (
    <View style={{ width: "100%", padding: paddingX, paddingVertical: paddingY }}>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.text}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 0,
    paddingVertical: 0,
    width: "100%",
    height: 44,
    backgroundColor: Colors.tint,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    padding: 15,
  },
  text: {
    color: "white",
    fontSize: 18,
    fontFamily: "mon",
  },
});
