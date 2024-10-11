import { StyleSheet, TextInput, View, Text } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface TextInputFieldProps {
  onChangeText: (text: string) => void;
  onBlur?: () => void;
  placeholder: string;
  icon?: keyof typeof MaterialCommunityIcons.glyphMap;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
  autoComplete?: "email" | "password" | "username";
  secureTextEntry?: boolean;
  autoCorrect?: boolean;
  label: string | null;
}

export default function TextInputField({
  onChangeText,
  onBlur,
  placeholder,
  icon,
  autoCapitalize,
  keyboardType,
  autoComplete,
  secureTextEntry,
  autoCorrect,
  label,
  ...otherProps
}: TextInputFieldProps) {
  return (
    <View>
      {label && <Text style={{ fontFamily: "mon", marginBottom: 2 }}>{label}</Text>}
      <View style={styles.container}>
        {icon && <MaterialCommunityIcons name={icon} size={24} color="gray" style={styles.icon} />}
        <TextInput
          style={styles.inputField}
          placeholder={placeholder}
          onChangeText={onChangeText}
          onBlur={onBlur}
          autoCapitalize={autoCapitalize}
          keyboardType={keyboardType}
          autoComplete={autoComplete}
          secureTextEntry={secureTextEntry}
          autoCorrect={autoCorrect}
          {...otherProps}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    height: 44,
    borderWidth: 1,
    borderColor: "#ABABAB",
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#fff",
  },
  inputField: {
    height: 44,
    width: "100%",
    fontFamily: "mon",
  },
  icon: {
    marginRight: 10,
  },
});
