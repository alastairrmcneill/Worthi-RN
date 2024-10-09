import { Button, StyleSheet, View } from "react-native";
import React from "react";
import { AuthService } from "@/services/AuthService";
import { useAuth } from "@clerk/clerk-expo";

export default function Page() {
  const { signOut } = useAuth();
  return (
    <View style={styles.container}>
      <Button onPress={() => signOut()} title="Sign Out" />
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
