import { AccountTypeOptions } from "@/constants/AccountTypes";
import { Colors } from "@/constants/Colors";
import { useAccountStore } from "@/state/AccountStore";
import React, { useState } from "react";
import { View, Text, FlatList, Pressable, StyleSheet } from "react-native";

const FilterAccountTypesList = () => {
  const { accountTypeFilter, setAccountTypeFilter } = useAccountStore();

  // Toggle the selection of an account type
  const toggleTypeSelection = (type: string) => {
    if (accountTypeFilter.includes(type)) {
      setAccountTypeFilter(accountTypeFilter.filter((item) => item !== type));
    } else {
      setAccountTypeFilter([...accountTypeFilter, type]);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={AccountTypeOptions}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => toggleTypeSelection(item)}
            style={[styles.typeButton, accountTypeFilter.includes(item) && styles.selectedTypeButton]}
          >
            <Text style={[styles.typeText, accountTypeFilter.includes(item) && styles.selectedTypeText]}>{item}</Text>
          </Pressable>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: -20,
  },
  contentContainer: {
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 10,
  },
  typeButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    marginRight: 10,
  },
  selectedTypeButton: {
    backgroundColor: Colors.tint,
    borderColor: Colors.tint,
  },
  typeText: {
    color: "#000",
    fontFamily: "mon",
  },
  selectedTypeText: {
    color: "#fff",
    fontFamily: "mon-sb",
  },
});

export default FilterAccountTypesList;
