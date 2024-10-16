import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import Screen from "@/components/Screen";
import AccountButton from "@/components/AccountButton";
import FloatingActionButton from "@/components/FloatingActionButton";
import { useAccountStore } from "@/state/AccountStore";
import { useAuth } from "@clerk/clerk-expo";
import { useUserStore } from "@/state/UserStore";
import { UserService } from "@/services/UserSerivce";
import AccountDatabase from "@/services/supabase/AccountDatabase";
import Account from "@/models/Account";
import { AccountSerivce } from "@/services/AccountService";

export default function Page() {
  const { userId } = useAuth();
  const { currentUser, status } = useUserStore();
  const [data, setData] = useState<Account[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const accounts = await AccountSerivce.getUserAccounts(userId ?? "");
      setData(accounts);
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
            {data.map((account) => (
              <Text key={account.id}>
                {account.name} - {account.history.length}
              </Text>
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
