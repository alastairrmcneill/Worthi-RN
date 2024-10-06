import { SafeAreaView, StyleSheet, View } from "react-native";
import React from "react";
import Constants from "expo-constants";
import { Colors } from "@/constants/Colors";

export default function Screen(props: any) {
  return (
    <SafeAreaView style={[styles.screen, props.style]}>
      <View style={[styles.view, props.style]}>{props.children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    paddingTop: Constants.statusBarHeight,
    flex: 1,
    backgroundColor: Colors.background,
  },
  view: {
    flex: 1,
  },
});
