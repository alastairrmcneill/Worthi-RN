import React, { useState } from "react";
import { useFormikContext } from "formik";
import { View, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import TextInputField from "../TextInputField";
import ErrorText from "./ErrorText";

interface FormValues {
  [key: string]: any;
}

interface TextFormFieldProps {
  name: string;
  placeholder: string;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
  autoComplete?: "email" | "password" | "username";
  secureTextEntry?: boolean;
  autoCorrect?: boolean;
}

export default function PasswordFormField({ name, secureTextEntry, ...otherProps }: TextFormFieldProps) {
  const { setFieldTouched, handleChange, touched, errors } = useFormikContext<FormValues>();
  const [isPasswordVisible, setIsPasswordVisible] = useState(!secureTextEntry);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <View style={{ width: "100%", gap: 5 }}>
      <View style={styles.inputContainer}>
        <MaterialCommunityIcons name="lock-outline" size={24} color="gray" style={styles.icon} />
        <TextInput
          style={styles.inputField}
          onChangeText={handleChange(name)}
          onBlur={() => setFieldTouched(name)}
          secureTextEntry={!isPasswordVisible}
          {...otherProps}
        />
        {secureTextEntry && (
          <TouchableOpacity onPress={togglePasswordVisibility} style={styles.icon}>
            <MaterialCommunityIcons
              name={isPasswordVisible ? "eye-outline" : "eye-off-outline"}
              size={24}
              color="gray"
            />
          </TouchableOpacity>
        )}
      </View>
      <ErrorText text={errors[name] as string} visible={touched[name] as boolean} />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ABABAB",
    borderRadius: 8,
    backgroundColor: "#fff",
    width: "100%",
  },
  inputField: {
    flex: 1,
    height: 44,
  },
  icon: {
    marginHorizontal: 10,
  },
});
