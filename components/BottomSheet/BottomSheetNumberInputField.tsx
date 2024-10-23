import { StyleSheet, View, Text, TouchableOpacity, Keyboard } from "react-native";
import React, { useState } from "react";
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";

interface BottomSheetNumberInputFieldProps {
  onChangeText: (text: string) => void;
  onBlur?: () => void;
  placeholder: string;
  label: string | null;
  toggle: boolean;
  disabled: boolean;
}

export default function BottomSheetNumberInputField({
  onChangeText,
  onBlur,
  placeholder,
  label,
  toggle,
  disabled,
  ...otherProps
}: BottomSheetNumberInputFieldProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [value, setValue] = useState("");

  return (
    <View style={{ opacity: disabled ? 0.3 : 1 }}>
      {label && <Text style={{ fontFamily: "mon", marginBottom: 2 }}>{label}</Text>}
      <View style={styles.container}>
        {toggle && (
          <View style={{ width: 50, marginRight: 10 }}>
            <SegmentedControl
              values={["+", "-"]}
              selectedIndex={selectedIndex}
              onChange={(event) => {
                if (disabled) return;
                setSelectedIndex(event.nativeEvent.selectedSegmentIndex);
                const isNegative = event.nativeEvent.selectedSegmentIndex == 1;

                const cleanValue = value.replace(/[^0-9]/g, "");
                setValue(cleanValue);
                onChangeText(isNegative ? `-${cleanValue}` : cleanValue);
              }}
              style={{ height: 25 }}
              tintColor="#fff"
            />
          </View>
        )}
        <BottomSheetTextInput
          style={styles.inputField}
          placeholder={placeholder}
          onChangeText={(text) => {
            if (disabled) return;
            const cleanValue = text.replace(/[^0-9]/g, "");
            setValue(cleanValue);
            onChangeText(selectedIndex == 1 ? `-${cleanValue}` : cleanValue);
          }}
          onBlur={onBlur}
          keyboardType={"numeric"}
          returnKeyLabel="Done"
          returnKeyType="done"
          onSubmitEditing={Keyboard.dismiss}
          value={value}
          editable={!disabled}
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
