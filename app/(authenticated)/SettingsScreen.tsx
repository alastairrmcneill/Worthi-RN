import { Button, StyleSheet, View } from "react-native";
import React from "react";
import auth from "@react-native-firebase/auth";
import { AuthService } from "@/services/AuthService";

export default function Page() {
  return (
    <View style={styles.container}>
      <Button onPress={() => AuthService.signOut()} title="Sign Out" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
