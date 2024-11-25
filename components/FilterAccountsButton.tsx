import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

interface FilterAccountsButtonProps {
  onPress: () => void;
}

export default function FilterAccountsButton({ onPress }: FilterAccountsButtonProps) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <Ionicons name="filter-outline" size={18} color="black" style={styles.icon} />
        <Text style={styles.text}>Filter</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.text,
    backgroundColor: "white",
    borderRadius: 8,
  },
  icon: {
    marginRight: 5,
  },
  text: {
    fontFamily: "mon",
  },
});
