import { StyleSheet, View } from "react-native";
import React from "react";
import { CartesianAxis, CartesianChart, Line } from "victory-native";
import { useAccountStore } from "@/state/AccountStore";

export default function AccountHistoryChart() {
  const { currentAccount } = useAccountStore();

  const chartData =
    currentAccount?.history.map((balance) => ({
      x: balance.date.toString(), // Format the date as needed
      y: balance.balance,
    })) ?? [];

  return (
    <View style={styles.container}>
      <CartesianChart data={chartData} xKey="x" yKeys={["y"]}>
        {({ points }) => (
          <Line
            points={points.y}
            color="red"
            strokeWidth={3}
            animate={{ type: "timing", duration: 300 }}
            curveType="monotoneX"
          />
        )}
      </CartesianChart>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
