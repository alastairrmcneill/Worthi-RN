import React from "react";
import { useFormikContext } from "formik";
import { View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import BottomSheetTextInputField from "./BottomSheetTextInputField";
import { ErrorText } from "../forms";

interface FormValues {
  [key: string]: any;
}

interface BottomSheetTextFormFieldProps {
  name: string;
  placeholder: string;
  icon?: keyof typeof MaterialCommunityIcons.glyphMap;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
  autoComplete?: "email" | "password" | "username";
  secureTextEntry?: boolean;
  autoCorrect?: boolean;
  label: string | null;
}

export default function BottomSheetTextFormField({ name, ...otherProps }: BottomSheetTextFormFieldProps) {
  const { setFieldTouched, handleChange, touched, errors } = useFormikContext<FormValues>();
  return (
    <View style={{ width: "100%", gap: 2 }}>
      <BottomSheetTextInputField
        onChangeText={handleChange(name)}
        onBlur={() => setFieldTouched(name)}
        {...otherProps}
      />
      <ErrorText text={errors[name] as string} visible={touched[name] as boolean} />
    </View>
  );
}
