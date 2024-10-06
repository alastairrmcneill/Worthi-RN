import React from "react";
import { useFormikContext } from "formik";
import TextInputField from "../TextInputField";
import ErrorText from "./ErrorText";
import { View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface FormValues {
  [key: string]: any;
}

interface TextFormFieldProps {
  name: string;
  placeholder: string;
  icon?: keyof typeof MaterialCommunityIcons.glyphMap;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
  autoComplete?: "email" | "password" | "username";
  secureTextEntry?: boolean;
  autoCorrect?: boolean;
}

export default function TextFormField({ name, ...otherProps }: TextFormFieldProps) {
  const { setFieldTouched, handleChange, touched, errors } = useFormikContext<FormValues>();
  return (
    <View style={{ width: "100%", gap: 5 }}>
      <TextInputField onChangeText={handleChange(name)} onBlur={() => setFieldTouched(name)} {...otherProps} />
      <ErrorText text={errors[name] as string} visible={touched[name] as boolean} />
    </View>
  );
}
