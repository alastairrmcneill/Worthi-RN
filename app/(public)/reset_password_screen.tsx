import { StyleSheet, View, Text } from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import * as Yup from "yup";
import { useHeaderHeight } from "@react-navigation/elements";
import { Colors } from "@/constants/Colors";
import { AppForm, SubmitButton, TextFormField } from "@/components/forms";
import PasswordFormField from "@/components/forms/PasswordFormField";
import { useAuth, useSignIn } from "@clerk/clerk-expo";
import { useAuthService } from "@/hooks/useAuthService";

const validationSchema = Yup.object().shape({
  code: Yup.string()
    .matches(/^\d+$/, "Password must contain only numbers.")
    .length(6, "Code must be 6 characters long.")
    .required("Code is required."),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters long.")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter.")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter.")
    .matches(/[0-9]/, "Password must contain at least one number.")
    .matches(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character.")
    .required("Password is required."),
});
export default function Page() {
  const [isLoading, setIsLoading] = useState(false);
  const headerHeight = useHeaderHeight();
  const { email } = useLocalSearchParams();
  const { signIn, setActive } = useSignIn();
  const { resetPassword } = useAuthService();

  const submit = async (values: any) => {
    const { code, password } = values;
    setIsLoading(true);
    resetPassword(email as string, code, password);
    setIsLoading(false);
  };

  return (
    <LinearGradient
      style={{
        flex: 1,
      }}
      colors={["#E0F7FA", "#FFFFFF00"]} // Light blue to transparent white
      start={{ x: 0, y: 0 }} // Start at the top
      end={{ x: 0, y: 0.3 }} // End at 20% of the height
    >
      <View style={[styles.container, { paddingTop: headerHeight }]}>
        <Text style={styles.headerText}>Reset password</Text>
        <AppForm initialValues={{ code: "", password: "" }} onSubmit={submit} validationSchema={validationSchema}>
          <View style={{ marginVertical: 20, width: "100%", gap: 10 }}>
            <Text style={{ fontFamily: "mon" }}>Reset the password for {email}.</Text>
            <TextFormField name="code" placeholder="Code" keyboardType="numeric" autoCorrect={false} label={null} />
            <PasswordFormField
              name="password"
              placeholder="Password"
              keyboardType="default"
              autoCapitalize="none"
              autoComplete="password"
              autoCorrect={false}
              secureTextEntry
            />
          </View>
          <SubmitButton title="Reset password" />
        </AppForm>
        <View style={{ flex: 1 }} />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
  },
  headerText: {
    textAlign: "left",
    alignSelf: "flex-start",
    color: Colors.text,
    fontWeight: "700",
    fontSize: 30,
    marginBottom: 5,
    fontFamily: "mon-b",
  },
});
