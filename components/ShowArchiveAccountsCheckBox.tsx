import { StyleSheet, View, Text } from "react-native";
import React, { useState } from "react";
import { CheckBox } from "@rneui/themed";
import { Colors } from "@/constants/Colors";
import { useAccountStore } from "@/state/AccountStore";

export default function ShowArchiveAccountsCheckBox() {
  const { showArchived, setShowArchived } = useAccountStore();

  return (
    <View style={styles.checkboxContainer}>
      <CheckBox
        checked={showArchived}
        onPress={() => setShowArchived(!showArchived)}
        checkedColor={Colors.tint}
        title="Show Archived Accounts"
        textStyle={styles.label}
        style={{ margin: 0, padding: 0 }}
        wrapperStyle={{ margin: 0, padding: 0 }}
        containerStyle={{ margin: 0, padding: 0 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  checkboxContainer: {
    marginLeft: -10,
  },
  label: {
    fontFamily: "mon",
    margin: 8,
  },
});
