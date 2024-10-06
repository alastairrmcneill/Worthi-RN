import { StyleSheet, View, Text } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";

export default function TermsOfService() {
  return (
    <Text style={styles.termsOfService}>
      By signing up, you agree to{" "}
      <Text onPress={() => console.log("Pressed")} style={styles.termsOfServiceLink}>
        Terms of Service
      </Text>{" "}
      and{" "}
      <Text onPress={() => console.log("Pressed")} style={styles.termsOfServiceLink}>
        Privacy Policy
      </Text>
      .
    </Text>
  );
}

const styles = StyleSheet.create({
  termsOfService: {
    color: Colors.grey,
    fontFamily: "mon",
    textAlign: "left",
    alignSelf: "flex-start",
  },
  termsOfServiceLink: {
    fontFamily: "mon-b",
    textDecorationLine: "underline",
  },
});
