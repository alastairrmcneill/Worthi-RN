import { StyleSheet, View, Text } from "react-native";
import React from "react";
import Screen from "@/components/Screen";
import AccountButton from "@/components/AccountButton";
import FloatingActionButton from "@/components/FloatingActionButton";
import { useLoadUserProfile } from "@/hooks/useUserService";
import { useLoadUserAccounts } from "@/hooks/useAccountService";
import { useAccountStore } from "@/state/AccountStore";

export default function Page() {
  const { accounts } = useAccountStore();
  useLoadUserProfile();
  useLoadUserAccounts();

  return (
    <Screen>
      <View style={styles.container}>
        <View style={{ position: "absolute", top: 15, right: 15 }}>
          <AccountButton />
        </View>

        {accounts.map((account) => {
          return (
            <View key={account.id}>
              <Text
                style={{
                  fontWeight: "bold",
                  marginTop: 10,
                }}
              >
                {account.name}
              </Text>
              <Text>{account.history[0].value}</Text>
            </View>
          );
        })}

        <FloatingActionButton />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
});
