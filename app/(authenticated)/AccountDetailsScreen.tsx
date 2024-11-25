import { Button, StyleSheet, View, Text, TouchableOpacity, FlatList } from "react-native";
import React, { useRef } from "react";
import { BottomSheetModal, BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { Stack } from "expo-router";
import UpdateBalanceBottomSheet from "@/components/BottomSheet/UpdateBalanceBottomSheet";
import AccountDetailsHeader from "@/components/AccountDetailsHeader";
import { useAccountStore } from "@/state/AccountStore";
import RenameAccountBottomSheet from "@/components/BottomSheet/RenameAccountBottomSheet";
import PrimaryButton from "@/components/PrimaryButton";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import Screen from "@/components/Screen";
import { useHeaderHeight } from "@react-navigation/elements";
import AccountBalanceTile from "@/components/AccountBalanceTile";
import { CartesianChart, Line } from "victory-native";
import AccountHistoryChart from "@/components/AccountHistoryChart";
import FilterAccountsBottomSheet from "@/components/BottomSheet/FilterAccountsBottomSheet";

export default function AccountDetailsScreen() {
  const { currentAccount } = useAccountStore();
  const updateBalanceBottomSheet = useRef<BottomSheetModal>(null);
  const renameBottomSheetRef = useRef<BottomSheetModal>(null);
  const headerHeight = useHeaderHeight();

  const chartData =
    currentAccount?.history.map((balance) => ({
      x: balance.date.toString(), // Format the date as needed
      y: balance.balance,
    })) ?? [];

  return (
    <BottomSheetModalProvider>
      <Stack.Screen
        options={{
          header: () => (
            <AccountDetailsHeader
              onEdit={() => {
                renameBottomSheetRef.current?.present();
              }}
            />
          ),
          headerTransparent: true,
        }}
      />
      <Screen>
        <View style={[styles.container, { top: headerHeight }]}>
          <Text style={styles.totalBalance}>{`£${currentAccount?.history[0].balance}`}</Text>
          <View style={{ height: 400 }}>
            <AccountHistoryChart />
          </View>
          {/* Timeline picker */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.subTitle}>Balance history</Text>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => {
                updateBalanceBottomSheet.current?.present();
              }}
            >
              <Ionicons name="add" size={20} color="white" />
              <Text style={styles.btnText}>Update</Text>
            </TouchableOpacity>
          </View>
          {/* <View style={{ marginTop: 15 }}>
            <FlatList
              contentContainerStyle={{ backgroundColor: "white", borderRadius: 10, paddingVertical: 5 }}
              data={currentAccount?.history}
              renderItem={({ item }) => <AccountBalanceTile type={currentAccount?.type ?? ""} accountBalance={item} />}
              ItemSeparatorComponent={() => (
                <View
                  style={{
                    height: StyleSheet.hairlineWidth,
                    backgroundColor: "#ddd",
                    marginVertical: 5,
                  }}
                />
              )}
            />
          </View> */}

          <UpdateBalanceBottomSheet bottomSheetModalRef={updateBalanceBottomSheet} />
          <RenameAccountBottomSheet
            bottomSheetModalRef={renameBottomSheetRef}
            initialName={currentAccount?.name ?? ""}
          />
        </View>
      </Screen>
    </BottomSheetModalProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
  },
  btn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.tint,
    borderRadius: 30,
    paddingVertical: 5,
    paddingHorizontal: 10,
    gap: 5,
  },
  btnText: {
    fontFamily: "mon",
    color: "white",
    fontSize: 18,
  },
  totalBalance: {
    fontFamily: "mon-b",
    fontSize: 24,
    marginBottom: 20,
  },
  subTitle: {
    fontFamily: "mon",
    fontSize: 18,
    flex: 1,
  },
});
