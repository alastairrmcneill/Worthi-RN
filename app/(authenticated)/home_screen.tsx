import { StyleSheet, View, Text, ActivityIndicator, Touchable } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import Screen from "@/components/Screen";
import AccountButton from "@/components/AccountButton";
import FloatingActionButton from "@/components/FloatingActionButton";
import { useAccountStore } from "@/state/AccountStore";
import { useAuth } from "@clerk/clerk-expo";
import { useUserStore } from "@/state/UserStore";
import { UserService } from "@/services/UserSerivce";
import { AccountService } from "@/services/AccountService";
import { useRouter } from "expo-router";
import AccountList from "@/components/AccountList";
import FilterAccountsButton from "@/components/FilterAccountsButton";
import { BottomSheetModal, BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import FilterAccountsBottomSheet from "@/components/BottomSheet/FilterAccountsBottomSheet";

export default function Page() {
  const { userId } = useAuth();
  const { currentUser, status } = useUserStore();
  const { accounts, setAccounts, setCurrentAccount } = useAccountStore();
  const router = useRouter();
  const filterAccountsBottomSheetRef = useRef<BottomSheetModal>(null);

  useEffect(() => {
    const fetch = async () => {
      const accounts = await AccountService.getUserAccounts(userId ?? "");
      setAccounts(accounts);
    };
    UserService.loadUser(userId ?? "");
    fetch();
  }, []);

  return (
    <BottomSheetModalProvider>
      <Screen>
        <View style={styles.container}>
          <View style={{ position: "absolute", top: 15, right: 15 }}>
            <AccountButton />
          </View>
          {status === "loading" && <ActivityIndicator />}
          {status === "error" && <Text>Error fetching user data</Text>}
          {status === "success" && (
            <View style={{ top: 60 }}>
              <View style={{ width: "100%", height: 300, backgroundColor: "grey" }} />
              <View style={{ width: "100%", height: 30, backgroundColor: "grey", marginVertical: 10 }} />

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingVertical: 10,
                  paddingHorizontal: 10,
                }}
              >
                <Text style={{ fontFamily: "mon" }}>{`${accounts.length} Account${
                  accounts.length == 0 ? "" : "s"
                }`}</Text>
                <FilterAccountsButton
                  onPress={() => {
                    filterAccountsBottomSheetRef.current?.present();
                  }}
                />
              </View>

              <AccountList />
            </View>
          )}
          <FloatingActionButton />
          <FilterAccountsBottomSheet bottomSheetModalRef={filterAccountsBottomSheetRef} />
        </View>
      </Screen>
    </BottomSheetModalProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
