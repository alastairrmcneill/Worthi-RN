import React from "react";
import { Text } from "react-native";
import { Colors } from "@/constants/Colors";

interface ErrorTextProps {
  text: string;
  visible: boolean;
}

export default function ErrorText({ text, visible }: ErrorTextProps) {
  if (!visible || !text) return null;

  return <Text style={{ color: Colors.error, fontFamily: "mon" }}>{text}</Text>;
}
