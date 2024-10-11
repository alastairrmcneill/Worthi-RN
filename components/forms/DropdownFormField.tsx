import React from "react";
import { useFormikContext } from "formik";
import TextInputField from "../TextInputField";
import ErrorText from "./ErrorText";
import { View, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Dropdown from "../Dropdown";

interface FormValues {
  [key: string]: any;
}

interface TextFormFieldProps {
  name: string;
  placeholder: string;
  data: string[];
  label: string | null;
}

export default function TextFormField({ name, ...otherProps }: TextFormFieldProps) {
  const { handleChange, touched, errors } = useFormikContext<FormValues>();
  return (
    <View style={{ width: "100%", gap: 2 }}>
      <Dropdown onChange={handleChange(name)} {...otherProps} />
      <ErrorText text={errors[name] as string} visible={touched[name] as boolean} />
    </View>
  );
}
