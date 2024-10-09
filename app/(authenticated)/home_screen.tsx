import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import React, { useEffect } from "react";
import Screen from "@/components/Screen";
import AccountButton from "@/components/AccountButton";
import FloatingActionButton from "@/components/FloatingActionButton";
import { useAccountStore } from "@/state/AccountStore";
import { useAuth } from "@clerk/clerk-expo";
import { useUserStore } from "@/state/UserStore";
import { UserService } from "@/services/UserSerivce";

export default function Page() {
  const { userId } = useAuth();
  const { currentUser, status } = useUserStore();

  useEffect(() => {
    UserService.loadUser(userId ?? "");
  }, []);

  return (
    <Screen>
      <View style={styles.container}>
        <View style={{ position: "absolute", top: 15, right: 15 }}>
          <AccountButton />
        </View>
        {status === "loading" && <ActivityIndicator />}
        {status === "error" && <Text>Error fetching user data</Text>}
        {status === "success" && <Text>{currentUser?.name}</Text>}
        <FloatingActionButton />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
});
