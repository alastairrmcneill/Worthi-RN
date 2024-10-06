import { StyleSheet, TouchableOpacity, View, Image, Text, ImageSourcePropType } from "react-native";
import React from "react";

interface SocialSignInButtonProps {
  onPress: () => void;
  title: string;
  icon: ImageSourcePropType;
}

export default function SocialSignInButton({ onPress, title, icon }: SocialSignInButtonProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.btn} onPress={onPress}>
        <Image source={icon} style={{ width: 16, height: 16, objectFit: "contain" }} />
        <Text style={{ fontFamily: "mon" }}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  btn: {
    width: "100%",
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  container: {
    width: "100%",
    height: 44,
    overflow: "hidden",
    flexDirection: "row",
    borderColor: "black",
    borderWidth: StyleSheet.hairlineWidth,
    backgroundColor: "white",
    borderRadius: 8,
    marginBottom: 10,
  },
});
