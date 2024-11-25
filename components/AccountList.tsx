import { FlatList, StyleSheet, View, Text } from "react-native";
import React from "react";
import { useAccountStore } from "@/state/AccountStore";
import AccountListTile from "./AccountListTile";
import AccountListEmpty from "./AccountListEmpty";

export default function AccountList() {
  const { filteredAccounts } = useAccountStore();
  return (
    <View style={styles.container}>
      <FlatList
        data={filteredAccounts}
        keyExtractor={(item) => item.id!}
        renderItem={({ item }) => <AccountListTile account={item} />}
        ListEmptyComponent={() => <AccountListEmpty />}
        contentContainerStyle={{
          backgroundColor: "white",
          borderRadius: 15,
          paddingVertical: 5,
        }}
        ItemSeparatorComponent={() => (
          <View
            style={{
              height: StyleSheet.hairlineWidth,
              backgroundColor: "#efefef",
              marginHorizontal: 5,
            }}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
});
