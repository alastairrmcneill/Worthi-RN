import { StyleSheet, View, Text, Keyboard } from "react-native";
import React, { useCallback, useState } from "react";
import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet";
import * as Yup from "yup";
import { useAccountStore } from "@/state/AccountStore";
import { AppForm, SubmitButton } from "../forms";
import DateFormField from "../forms/DateFormField";
import AccountBalance from "@/models/AccountBalance";
import { AccountService } from "@/services/AccountService";
import BottomSheetNumberFormField from "./BottomSheetNumberFormField";
import BottomSheetTextFormField from "./BottomSheetTextFormField";

interface RenameAccountBottomSheetProps {
  bottomSheetModalRef: React.RefObject<BottomSheetModal>;
  initialName: string;
}

export default function RenameAccountBottomSheet({ bottomSheetModalRef, initialName }: RenameAccountBottomSheetProps) {
  const { currentAccount } = useAccountStore();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Date is required."),
  });

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

  const submit = async (values: any) => {
    const { name } = values;

    await AccountService.renameAccount(currentAccount, name);
    bottomSheetModalRef.current?.close();
  };

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      index={0}
      backdropComponent={renderBackdrop}
      snapPoints={[200]}
      enableOverDrag={false}
      enablePanDownToClose={true}
      bottomInset={0}
      keyboardBehavior="interactive"
      keyboardBlurBehavior="restore"
      android_keyboardInputMode="adjustResize"
    >
      <View style={styles.container}>
        <Text style={styles.title}>Rename</Text>
        <View style={styles.form}>
          <AppForm initialValues={{ name: initialName }} onSubmit={submit} validationSchema={validationSchema}>
            <BottomSheetTextFormField name="name" label="Name" placeholder={initialName} />

            <View style={{ marginTop: 5 }}>
              <SubmitButton title="Save" />
            </View>
          </AppForm>
        </View>
      </View>
    </BottomSheetModal>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingBottom: 15,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  title: {
    fontFamily: "mon-sb",
    fontSize: 18,
    marginBottom: 10,
  },
  form: { gap: 10 },
});
