import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import { useAccountStore } from "@/state/AccountStore";
import { AccountTypeGroupOptions, AccountTypeGroups } from "@/constants/AccountTypes";

export default function FilterAccountTypesSelectionGroup() {
  // Need to make sure this is set to the right one based on the filter that is set
  const { accountTypeGroupFilter, setAccountTypeGroupFilter } = useAccountStore();
  const startingIndex = AccountTypeGroupOptions.indexOf(accountTypeGroupFilter);
  const [selectedIndex, setSelectedIndex] = useState(startingIndex);
  return (
    <View style={styles.container}>
      <SegmentedControl
        values={AccountTypeGroupOptions}
        fontStyle={{ fontFamily: "mon-b" }}
        activeFontStyle={{ fontFamily: "mon-b" }}
        selectedIndex={selectedIndex}
        onChange={(event) => {
          const value = event.nativeEvent.value;
          if (value === "All") {
            setAccountTypeGroupFilter(AccountTypeGroups.All);
          } else if (value === "Assets") {
            setAccountTypeGroupFilter(AccountTypeGroups.Assets);
          } else if (value === "Liabilities") {
            setAccountTypeGroupFilter(AccountTypeGroups.Liabilities);
          }

          setSelectedIndex(event.nativeEvent.selectedSegmentIndex);
        }}
        style={styles.segmentedControl}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  segmentedControl: {
    height: 30,
  },
});
