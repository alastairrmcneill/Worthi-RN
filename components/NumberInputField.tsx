import { StyleSheet, TextInput, View, Text } from "react-native";
import React, { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import SegmentedControl from "@react-native-segmented-control/segmented-control";

interface NumberInputFieldProps {
  onChangeText: (text: string) => void;
  onBlur?: () => void;
  placeholder: string;
  label: string | null;
  toggle: boolean;
}

export default function NumberInputField({
  onChangeText,
  onBlur,
  placeholder,
  label,
  toggle,
  ...otherProps
}: NumberInputFieldProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isNegative, setIsNegative] = useState(false);
  const [value, setValue] = useState("");

  const toggleNegative = () => {
    setIsNegative(!isNegative);

    if (value) {
      const cleanValue = value.replace(/[^0-9]/g, "");
      setValue(cleanValue);
      onChangeText(isNegative ? `-${cleanValue}` : cleanValue);
    }
  };

  return (
    <View>
      {label && <Text style={{ fontFamily: "mon", marginBottom: 2 }}>{label}</Text>}
      <View style={styles.container}>
        <View style={{ width: 50, marginRight: 10 }}>
          <SegmentedControl
            values={["+", "-"]}
            selectedIndex={selectedIndex}
            onChange={(event) => {
              setSelectedIndex(event.nativeEvent.selectedSegmentIndex);
              toggleNegative();
              console.log("selectedSegmentIndex:", event.nativeEvent.selectedSegmentIndex);
              console.log("target", event.nativeEvent.target);
              console.log("value", event.nativeEvent.value);
              // console.log("Is negative:", isNegative);
              // console.log("Index:", selectedIndex);
            }}
            style={{ height: 25 }}
            tintColor="#fff"
          />
        </View>
        <TextInput
          style={styles.inputField}
          placeholder={placeholder}
          onChangeText={(text) => {
            console.log("Is negative:", isNegative);
            console.log("Index:", selectedIndex);
            const cleanValue = text.replace(/[^0-9]/g, "");
            setValue(cleanValue);
            onChangeText(isNegative ? `-${cleanValue}` : cleanValue);
          }}
          onBlur={onBlur}
          keyboardType={"numeric"}
          value={value}
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
