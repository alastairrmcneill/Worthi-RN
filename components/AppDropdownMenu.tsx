import { StyleSheet, View } from "react-native";
import React from "react";
import * as DropDownMenu from "zeego/dropdown-menu";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";

interface AppDropDownMenuProps {
  items: { key: string; title: string }[];
  onSelect: (value: string) => void;
}

export default function AppDropDownMenu({ items, onSelect }: AppDropDownMenuProps) {
  return (
    <DropDownMenu.Root>
      <DropDownMenu.Trigger>
        <Ionicons name="ellipsis-vertical" color={Colors.text} size={20} style={{ padding: 8 }} />
      </DropDownMenu.Trigger>
      <DropDownMenu.Content loop side align alignOffset avoidCollisions collisionPadding sideOffset>
        {items.map((item) => (
          <DropDownMenu.Item key={item.key} onSelect={() => onSelect(item.key)}>
            <DropDownMenu.ItemTitle>{item.title}</DropDownMenu.ItemTitle>
          </DropDownMenu.Item>
        ))}
      </DropDownMenu.Content>
    </DropDownMenu.Root>
  );
}

const styles = StyleSheet.create({
  container: {},
});
