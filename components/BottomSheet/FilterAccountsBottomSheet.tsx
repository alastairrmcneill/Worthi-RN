import { StyleSheet, Text, View } from "react-native";
import React, { useCallback } from "react";
import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet";
import FilterAccountTypesSelectionGroup from "../FilterAccountTypesSelectionGroup";
import ShowArchiveAccountsCheckBox from "../ShowArchiveAccountsCheckBox";
import FilterAccountTypesList from "../FilterAccountTypesList";

interface FilterAccountsBottomSheetProps {
  bottomSheetModalRef: React.RefObject<BottomSheetModal>;
}

export default function FilterAccountsBottomSheet({ bottomSheetModalRef }: FilterAccountsBottomSheetProps) {
  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        opacity={0.3}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        onPress={() => bottomSheetModalRef.current?.close()}
      />
    ),
    []
  );

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      index={0}
      backdropComponent={renderBackdrop}
      snapPoints={[280]}
      enableOverDrag={false}
      enablePanDownToClose={true}
      bottomInset={0}
      keyboardBehavior="interactive"
      keyboardBlurBehavior="restore"
      android_keyboardInputMode="adjustResize"
    >
      <View style={styles.container}>
        <Text style={styles.title}>Filter Accounts</Text>
        <FilterAccountTypesSelectionGroup />
        <FilterAccountTypesList />
        <ShowArchiveAccountsCheckBox />
      </View>
    </BottomSheetModal>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 200,
    paddingHorizontal: 20,
    paddingVertical: 10,
    gap: 10,
  },
  title: {
    fontFamily: "mon-b",
    fontSize: 16,
  },
});
