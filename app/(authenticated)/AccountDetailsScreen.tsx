import { Button, StyleSheet, View } from "react-native";
import React, { useRef } from "react";
import { BottomSheetModal, BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { Stack } from "expo-router";
import UpdateBalanceBottomSheet from "@/components/BottomSheet/UpdateBalanceBottomSheet";
import AccountDetailsHeader from "@/components/AccountDetailsHeader";
import { useAccountStore } from "@/state/AccountStore";
import RenameAccountBottomSheet from "@/components/BottomSheet/RenameAccountBottomSheet";

export default function AccountDetailsScreen() {
  const { currentAccount } = useAccountStore();
  const updateBalanceBottomSheet = useRef<BottomSheetModal>(null);
  const renameBottomSheetRef = useRef<BottomSheetModal>(null);

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
      <View style={styles.container}>
        <Button title="Open Bottom Sheet" onPress={() => updateBalanceBottomSheet.current?.present()} />

        <UpdateBalanceBottomSheet bottomSheetModalRef={updateBalanceBottomSheet} />
        <RenameAccountBottomSheet bottomSheetModalRef={renameBottomSheetRef} initialName={currentAccount?.name ?? ""} />
      </View>
    </BottomSheetModalProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
