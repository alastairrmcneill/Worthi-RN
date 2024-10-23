import { StyleSheet, View, Text, TouchableOpacity, Modal } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import DatePicker from "react-native-modern-datepicker";

interface DateInputFieldProps {
  onChangeText: (text: string) => void;
  onBlur?: () => void;
  initialDate: string;
  label: string | null;
}
export default function DateInputField({
  onChangeText,
  onBlur,
  initialDate,
  label,
  ...otherProps
}: DateInputFieldProps) {
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [date, setDate] = useState(initialDate);

  const handleDateChange = (selectedDate: string) => {
    const [year, month, day] = selectedDate.split("/");
    const formattedDate = `${day}/${month}/${year}`;
    setDate(formattedDate);
  };

  return (
    <View>
      {label && <Text style={{ fontFamily: "mon", marginBottom: 2 }}>{label}</Text>}
      <TouchableOpacity style={styles.container} onPress={() => setOpenDatePicker(true)} {...otherProps}>
        <Text style={styles.inputField}>{date}</Text>
        <Ionicons name="calendar-outline" size={24} color="gray" style={styles.icon} />
      </TouchableOpacity>

      <Modal visible={openDatePicker} animationType="slide" transparent={true}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <DatePicker mode="calendar" style={{ width: 300 }} onSelectedChange={handleDateChange} />
            <TouchableOpacity
              onPress={() => {
                setOpenDatePicker(false);
                onChangeText(date);
              }}
            >
              <Text>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    flex: 1,
    fontFamily: "mon",
  },
  icon: {
    marginLeft: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    backgroundColor: "white",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
