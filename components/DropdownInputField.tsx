import { View, Text, TouchableOpacity, StyleSheet, FlatList, Modal, TouchableWithoutFeedback } from "react-native";
import React, { useCallback, useRef, useState } from "react";
import { AntDesign, Ionicons } from "@expo/vector-icons";

interface DropDownInputFieldProps {
  label: string | null;
  data: string[];
  onChange: (item: string) => void;
  placeholder: string;
}

export default function DropdownInputField({ label, data, onChange, placeholder }: DropDownInputFieldProps) {
  const [expanded, setExpanded] = useState(false);
  const toggleExpanded = useCallback(() => setExpanded(!expanded), [expanded]);
  const [value, setValue] = useState("");
  const buttonRef = useRef<TouchableOpacity>(null);
  const [top, setTop] = useState(0);

  const onSelect = useCallback((item: string) => {
    onChange(item);
    setValue(item);
    setExpanded(false);
  }, []);

  const measureButton = () => {
    buttonRef.current?.measure((fx, fy, width, height, px, py) => {
      setTop(py + height);
    });
  };

  return (
    <View>
      {label && <Text style={{ fontFamily: "mon", marginBottom: 2 }}>{label}</Text>}
      <TouchableOpacity
        ref={buttonRef}
        style={styles.button}
        activeOpacity={0.8}
        onPress={() => {
          toggleExpanded();
          measureButton();
        }}
      >
        <Text style={[styles.text, { opacity: value ? (expanded ? 0.8 : 1) : 0.3 }]}>{value || placeholder}</Text>
        <Ionicons name={expanded ? "chevron-up" : "chevron-down"} />
      </TouchableOpacity>
      {expanded ? (
        <Modal visible={expanded} transparent>
          <TouchableWithoutFeedback onPress={() => setExpanded(false)}>
            <View style={styles.backdrop}>
              <View
                style={[
                  styles.options,
                  {
                    top,
                  },
                ]}
              >
                <FlatList
                  keyExtractor={(item) => item}
                  data={data}
                  renderItem={({ item }) => (
                    <TouchableOpacity activeOpacity={0.8} style={styles.string} onPress={() => onSelect(item)}>
                      <Text style={styles.text}>{item}</Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 15,
    borderColor: "black",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
  },
  string: {
    height: 40,
    justifyContent: "center",
  },

  options: {
    position: "absolute",
    backgroundColor: "white",
    width: "100%",
    paddingHorizontal: 10,
    borderRadius: 6,
    maxHeight: 250,
  },
  text: {
    fontFamily: "mon",
  },
  button: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 44,
    borderWidth: 1,
    borderColor: "#ABABAB",
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#fff",
  },

  container: {},
  inputField: {
    height: 44,
    width: "100%",
    fontFamily: "mon",
  },
  icon: {
    marginRight: 10,
  },
});
