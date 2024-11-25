import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useAccountStore } from "@/state/AccountStore";

export default function AccountListEmpty() {
  const { accounts } = useAccountStore();
  if ((accounts.length = 0)) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Get Started!</Text>
        <Text style={styles.subtitle}>Add your first account below with the + button</Text>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>No Accounts</Text>
        <Text style={styles.subtitle}>Add more acconts below with the + button</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontFamily: "mon-sb",
    marginBottom: 10,
  },
  subtitle: {
    fontFamily: "mon",
  },
});
