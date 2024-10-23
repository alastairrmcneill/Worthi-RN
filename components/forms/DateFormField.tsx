import React from "react";
import { useFormikContext } from "formik";
import ErrorText from "./ErrorText";
import { View } from "react-native";
import DateInputField from "../DateInputField";

interface FormValues {
  [key: string]: any;
}

interface DateFormFieldProps {
  name: string;
  initialDate: string;
  label: string | null;
}

export default function DateFormField({ name, ...otherProps }: DateFormFieldProps) {
  const { setFieldTouched, handleChange, touched, errors, values } = useFormikContext<FormValues>();

  return (
    <View style={{ width: "100%", gap: 2 }}>
      <DateInputField onChangeText={handleChange(name)} onBlur={() => setFieldTouched(name)} {...otherProps} />
      <ErrorText text={errors[name] as string} visible={touched[name] as boolean} />
    </View>
  );
}
