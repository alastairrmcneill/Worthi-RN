import { StyleSheet, View, Text } from "react-native";
import React from "react";
import Screen from "@/components/Screen";
import * as Yup from "yup";
import { AppForm, SubmitButton, TextFormField } from "@/components/forms";
import { useHeaderHeight } from "@react-navigation/elements";
import DropdownFormField from "@/components/forms/DropdownFormField";
import NumberFormField from "@/components/forms/NumberFormField";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required."),
  type: Yup.string().required("Type is required."),
  balance: Yup.string().required("Balance is required."),
  invested: Yup.string().required("Invested is required."),
});
export default function NewAccountScreen() {
  const headerHeight = useHeaderHeight();
  const submit = async (values: any) => {
    console.log(values);
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

          <DropdownFormField
            name="type"
            label="Type"
            data={["Current Account", "Investment", "Loan", "Credit Card", "Pension"]}
            placeholder="Select account type"
          />

          <NumberFormField name="balance" label="Balance" placeholder="£0.00" toggle={true} />
          <NumberFormField name="invested" label="Invested" placeholder="£0.00" toggle={false} />
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
