import { StyleSheet, Text, View } from "react-native";
import React from "react";
import AccountBalance from "@/models/AccountBalance";
import { AccountType } from "@/constants/AccountTypes";
import { format } from "date-fns";

interface AccountBalanceTileProps {
  accountBalance: AccountBalance;
  type: string;
}

export default function AccountBalanceTile({ accountBalance, type }: AccountBalanceTileProps) {
  const isInvestment = type === AccountType.Investment;
  const returnsValue = isInvestment ? accountBalance.balance - accountBalance.invested! : 0;
  const dateString = format(accountBalance.date, "dd/MM/yyyy");
  const returnsPercentage = isInvestment ? (returnsValue / accountBalance.invested!) * 100 : 0;

  return (
    <View style={styles.container}>
      <View>
        <Text style={{ fontFamily: "mon", fontSize: 16 }}>{dateString}</Text>

        {isInvestment && (
          <View>
            <Text style={{ fontFamily: "mon", fontSize: 12 }}>Deposited: £{accountBalance.invested}</Text>
            <Text style={{ fontFamily: "mon", fontSize: 12 }}>
              Returns:{" "}
              <Text
                style={{ fontFamily: "mon", fontSize: 12, color: returnsValue < 0 ? "red" : "green" }}
              >{`£${returnsValue} (${returnsPercentage.toFixed(0)}%)`}</Text>
            </Text>
          </View>
        )}
      </View>
      <Text style={{ fontFamily: "mon", fontSize: 16 }}>£{accountBalance.balance}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
