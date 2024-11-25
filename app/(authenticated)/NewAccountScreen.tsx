import { StyleSheet, View } from "react-native";
import React from "react";
import Screen from "@/components/Screen";
import * as Yup from "yup";
import { AppForm, SubmitButton, TextFormField } from "@/components/forms";
import { useHeaderHeight } from "@react-navigation/elements";
import DropdownFormField from "@/components/forms/DropdownFormField";
import NumberFormField from "@/components/forms/NumberFormField";
import { useFormikContext } from "formik";
import Account from "@/models/Account";
import AccountDatabase from "@/services/supabase/AccountDatabase";
import { useAuth } from "@clerk/clerk-expo";
import { AccountService } from "@/services/AccountService";
import AccountBalance from "@/models/AccountBalance";
import { AccountTypeOptions } from "@/constants/AccountTypes";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required."),
  type: Yup.string().required("Type is required."),
  balance: Yup.string().required("Balance is required."),
  invested: Yup.string().when("type", (type: any, schema) => {
    if (type == "Investment") {
      return schema.required("Invested is required.");
    }
    return schema.notRequired();
  }),
});

export default function NewAccountScreen() {
  const headerHeight = useHeaderHeight();
  const { userId } = useAuth();

  const submit = async (values: any) => {
    console.log("Submit");
    const { name, type, balance, invested } = values;

    // Create account object
    const account = new Account(null, userId ?? "", name, type, false, []);

    const newBalance = parseFloat(balance);
    const newInvested = invested == "" ? null : parseFloat(invested);
    const accountBalance = new AccountBalance(null, null, newBalance, newInvested, new Date());

    // Save account to database
    await AccountService.createAccount(account, accountBalance);
  };

  // Component to handle the invested field with dynamic disabling
  const InvestedField = () => {
    const { values } = useFormikContext(); // Safely get values from Formik context

    // Conditionally disable invested field based on account type
    const isInvestedDisabled = (values as any).type !== "Investment";

    return (
      <NumberFormField
        name="invested"
        label="Invested"
        placeholder="£0.00"
        toggle={true}
        disabled={isInvestedDisabled}
      />
    );
  };

  return (
    <Screen>
      <AppForm
        initialValues={{ name: "", type: "", balance: "", invested: "" }}
        onSubmit={submit}
        validationSchema={validationSchema}
      >
        <View
          style={{
            flex: 1,
            marginTop: headerHeight - 20,
            marginBottom: 20,
            marginHorizontal: 15,
            gap: 20,
          }}
        >
          <TextFormField
            name="name"
            label="Account Name"
            placeholder="Monzo, Vanguard, Car 🚗 ..."
            keyboardType="default"
            autoCapitalize="words"
            autoCorrect={true}
          />

          <DropdownFormField name="type" label="Type" data={AccountTypeOptions} placeholder="Select account type" />

          <NumberFormField name="balance" label="Balance" placeholder="£0.00" toggle={true} disabled={false} />

          {/* Use the InvestedField component to handle the dynamic disabling */}
          <InvestedField />

          <View style={{ flex: 1 }} />
          <SubmitButton title="Start tracking" />
        </View>
      </AppForm>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
