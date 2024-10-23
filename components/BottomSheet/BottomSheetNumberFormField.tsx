import React from "react";
import { useFormikContext } from "formik";
import { View } from "react-native";
import { ErrorText } from "../forms";
import BottomSheetNumberInputField from "./BottomSheetNumberInputField";

interface FormValues {
  [key: string]: any;
}

interface BottomSheetNumberFormFieldProps {
  name: string;
  placeholder: string;
  label: string | null;
  toggle: boolean;
  disabled: boolean;
}

export default function BottomSheetNumberFormField({ name, disabled, ...otherProps }: BottomSheetNumberFormFieldProps) {
  const { setFieldTouched, handleChange, touched, errors } = useFormikContext<FormValues>();
  return (
    <View style={{ width: "100%", gap: 2 }}>
      <BottomSheetNumberInputField
        onChangeText={handleChange(name)}
        onBlur={() => setFieldTouched(name)}
        disabled={disabled}
        {...otherProps}
      />
      <ErrorText text={errors[name] as string} visible={touched[name] as boolean} />
    </View>
  );
}
