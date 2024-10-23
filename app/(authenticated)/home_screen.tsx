import { StyleSheet, View, Text, ActivityIndicator, Touchable } from "react-native";
import React, { useEffect, useState } from "react";
import Screen from "@/components/Screen";
import AccountButton from "@/components/AccountButton";
import FloatingActionButton from "@/components/FloatingActionButton";
import { useAccountStore } from "@/state/AccountStore";
import { useAuth } from "@clerk/clerk-expo";
import { useUserStore } from "@/state/UserStore";
import { UserService } from "@/services/UserSerivce";
import { AccountService } from "@/services/AccountService";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useRouter } from "expo-router";

export default function Page() {
  const { userId } = useAuth();
  const { currentUser, status } = useUserStore();
  const { accounts, setAccounts, setCurrentAccount } = useAccountStore();
  const router = useRouter();

  useEffect(() => {
    const fetch = async () => {
      const accounts = await AccountService.getUserAccounts(userId ?? "");
      setAccounts(accounts);
    };
    UserService.loadUser(userId ?? "");
    fetch();
  }, []);

  return (
    <Screen>
      <View style={styles.container}>
        <View style={{ position: "absolute", top: 15, right: 15 }}>
          <AccountButton />
        </View>
        {status === "loading" && <ActivityIndicator />}
        {status === "error" && <Text>Error fetching user data</Text>}
        {status === "success" && (
          <View>
            <Text>Welcome back, {currentUser?.name}!</Text>
            {accounts.map((account) => (
              <TouchableOpacity
                key={account.id}
                onPress={() => {
                  setCurrentAccount(account);
                  router.push("/AccountDetailsScreen");
                }}
              >
                <Text>
                  {account.name} - {account.history.length}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
        <FloatingActionButton />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
});
