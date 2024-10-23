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

interface UpdateBalanceBottomSheetProps {
  bottomSheetModalRef: React.RefObject<BottomSheetModal>;
}

export default function UpdateBalanceBottomSheet({ bottomSheetModalRef }: UpdateBalanceBottomSheetProps) {
  const { currentAccount } = useAccountStore();

  const validationSchema = Yup.object().shape({
    date: Yup.string().required("Date is required."),
    balance: Yup.string().required("Balance is required."),
    invested: Yup.string().when("balance", (balance: any, schema) => {
      if (currentAccount?.type == "Investment") {
        return schema.required("Invested is required.");
      }
      return schema.notRequired();
    }),
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
    const { date, balance, invested } = values;

    const newBalance = parseFloat(balance);
    const newInvested = invested == "" ? null : parseFloat(invested);
    console.log(date);
    const [day, month, year] = (date as string).split("/").map((part) => parseInt(part, 10));
    const newDate = new Date(year, month - 1, day);
    const accountBalance = new AccountBalance(null, currentAccount?.id ?? "", newBalance, newInvested, newDate);

    await AccountService.addAccountBalance(accountBalance);
  };

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      index={0}
      backdropComponent={renderBackdrop}
      snapPoints={[370]}
      enableOverDrag={false}
      enablePanDownToClose={true}
      bottomInset={0}
      keyboardBehavior="interactive"
      keyboardBlurBehavior="restore"
      android_keyboardInputMode="adjustResize"
    >
      <View style={styles.container}>
        <Text style={styles.title}>New balance</Text>
        <View style={styles.form}>
          <AppForm
            initialValues={{ date: "17/10/2024", balance: "", invested: "" }}
            onSubmit={submit}
            validationSchema={validationSchema}
          >
            <DateFormField name="date" label="Date" initialDate="17/10/2024" />
            <BottomSheetNumberFormField
              name="balance"
              label="Balance"
              placeholder="£0.00"
              toggle={true}
              disabled={false}
            />

            <BottomSheetNumberFormField
              name="invested"
              label="Invested"
              placeholder="£0.00"
              toggle={true}
              disabled={currentAccount?.type != "Investment"}
            />
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
