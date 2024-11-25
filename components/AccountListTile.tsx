import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Account from "@/models/Account";
import { format } from "date-fns";
import { AccountType, AccountTypeColors } from "@/constants/AccountTypes";
import { useRouter } from "expo-router";
import { useAccountStore } from "@/state/AccountStore";

interface AccountListTileProps {
  account: Account;
}

export default function AccountListTile({ account }: AccountListTileProps) {
  const router = useRouter();
  const { setCurrentAccount } = useAccountStore();

  const getLastUpdatedDate = () => {
    if (account.history.length === 0) return "No transactions";
    return format(account.history[0].date, "dd/MM/yyyy");
  };

  const getLatestBalance = () => {
    if (account.history.length === 0) return "-";

    const balance = account.history[0].balance;
    return balance < 0 ? `-£${Math.abs(balance)}` : `£${balance}`;
  };

  const getIndicatorColor = () => {
    return AccountTypeColors[account.type as AccountType];
  };

  const lastUpdatedDate = getLastUpdatedDate();
  const latestBalance = getLatestBalance();
  const indicatorColor = getIndicatorColor();

  return (
    <TouchableOpacity
      onPress={() => {
        setCurrentAccount(account);
        router.push("/(authenticated)/AccountDetailsScreen");
      }}
    >
      <View style={styles.container}>
        <View style={[styles.indicator, { backgroundColor: indicatorColor }]} />
        <View style={styles.content}>
          <View>
            <Text style={styles.accountName}>{account.name}</Text>
            <Text style={styles.lastUpdated}>{lastUpdatedDate}</Text>
          </View>
          <Text style={styles.balance}>{latestBalance}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    height: 50,
    margin: 5,
    paddingRight: 5,
  },
  content: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  indicator: {
    width: 6,
    borderRadius: 5,
    marginRight: 10,
    marginLeft: 2,
  },
  accountName: {
    fontFamily: "mon-sb",
    marginBottom: 5,
  },
  lastUpdated: {
    fontFamily: "mon",
    fontSize: 12,
    color: "#333",
  },
  balance: {
    fontFamily: "mon-sb",
    fontSize: 12,
    width: 80,
    textAlign: "right",
  },
});
