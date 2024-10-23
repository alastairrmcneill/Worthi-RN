import { StyleSheet, View, Text } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";

interface BottomSheetTextInputFieldProps {
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

export default function BottomSheetTextInputField({
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
}: BottomSheetTextInputFieldProps) {
  return (
    <View>
      {label && <Text style={{ fontFamily: "mon", marginBottom: 2 }}>{label}</Text>}
      <View style={styles.container}>
        {icon && <MaterialCommunityIcons name={icon} size={24} color="gray" style={styles.icon} />}
        <BottomSheetTextInput
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
    flex: 1,
    fontFamily: "mon",
  },
  icon: {
    marginRight: 10,
  },
});
