import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView, Button } from "react-native";
import React, { useRef, useState } from "react";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Platform } from "react-native";
import { useRouter } from "expo-router";
import { useAccountStore } from "@/state/AccountStore";
import { Colors } from "@/constants/Colors";
import AppDropDownMenu from "./AppDropdownMenu";
import { AccountService } from "@/services/AccountService";
import { BottomSheetModal, BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import RenameAccountBottomSheet from "./BottomSheet/RenameAccountBottomSheet";

interface AccountDetailsHeaderProps {
  onEdit: () => void;
}
export default function AccountDetailsHeader({ onEdit }: AccountDetailsHeaderProps) {
  const { currentAccount } = useAccountStore();
  const router = useRouter();

  // Define actions for each menu item
  const handleEdit = async () => {
    // Navigate to Edit screen or handle the edit action
    console.log("Item Edited");
    onEdit();
  };

  const handleArchive = async () => {
    // Archive the item (could be an API call or state update)
    console.log("Item Archived");
    await AccountService.archiveAccount(currentAccount).then(() => {
      router.back();
    });
  };

  const handleDelete = async () => {
    // Delete the item (could be an API call or state update)
    console.log("Item Deleted");
    await AccountService.deleteAccount(currentAccount?.id ?? "").then(() => {
      router.back();
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
        {Platform.OS === "ios" ? (
          <Ionicons name="chevron-back" size={24} color={Colors.text} />
        ) : (
          <MaterialIcons name="arrow-back" size={24} color={Colors.text} />
        )}
      </TouchableOpacity>
      <Text style={styles.title}>{currentAccount?.name ?? ""}</Text>
      <AppDropDownMenu
        items={[
          {
            key: "edit",
            title: "Edit",
          },
          {
            key: "archive",
            title: "Archive",
          },
          {
            key: "delete",
            title: "Delete",
          },
        ]}
        onSelect={(value: string) => {
          switch (value) {
            case "edit":
              handleEdit();
              break;
            case "archive":
              handleArchive();
              break;
            case "delete":
              handleDelete();
              break;
          }
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  backBtn: {
    padding: 8,
  },
  title: {
    flex: 1,
    marginLeft: 8,
    fontFamily: "mon",
    fontSize: 20,
    color: Colors.text,
  },
});
