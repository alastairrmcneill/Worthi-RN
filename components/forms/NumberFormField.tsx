import React from "react";
import { useFormikContext } from "formik";
import TextInputField from "../TextInputField";
import ErrorText from "./ErrorText";
import { View, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Dropdown from "../Dropdown";
import NumberInputField from "../NumberInputField";

interface FormValues {
  [key: string]: any;
}

interface NumberFormFieldProps {
  name: string;
  placeholder: string;
  label: string | null;
  toggle: boolean;
  disabled: boolean;
}

export default function NumberFormField({ name, disabled, ...otherProps }: NumberFormFieldProps) {
  const { setFieldTouched, handleChange, touched, errors } = useFormikContext<FormValues>();
  return (
    <View style={{ width: "100%", gap: 2 }}>
      <NumberInputField
        onChangeText={handleChange(name)}
        onBlur={() => setFieldTouched(name)}
        disabled={disabled}
        {...otherProps}
      />
      <ErrorText text={errors[name] as string} visible={touched[name] as boolean} />
    </View>
  );
}
