import { StyleSheet, View, Text, TextInput, KeyboardAvoidingView, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import { Stack, useRouter } from "expo-router";
import MaterialCommunityIcons from "@expo/vector-icons/build/MaterialCommunityIcons";
import { Colors } from "@/constants/Colors";
import PrimaryButton from "@/components/PrimaryButton";
import { useHeaderHeight } from "@react-navigation/elements";
import { LinearGradient } from "expo-linear-gradient";
import * as Yup from "yup";
import { AppForm, SubmitButton, TextFormField } from "@/components/forms";
import TermsOfService from "@/components/TermsOfService";
import PasswordFormField from "@/components/forms/PasswordFormField";
import { AuthService } from "@/services/AuthService";
import { useAuth, useSignUp } from "@clerk/clerk-expo";
import { useAuthService } from "@/hooks/useAuthService";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required."),
  email: Yup.string().email("Please enter a valid email.").required("Email is required."),
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
  const { signUp, setActive } = useSignUp();
  const { signOut } = useAuth();

  const signUpWithEmail = async (values: any) => {
    const { name, email, password } = values;
    try {
      await signOut();
      const result = await signUp?.create({
        firstName: name,
        emailAddress: email,
        password,
      });

      await setActive!({ session: result?.createdSessionId });
      // Send the user an email with the verification code
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
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
        <Text style={styles.headerText}>Register</Text>
        <Text style={{ alignSelf: "flex-start", color: Colors.text, marginBottom: 30, fontFamily: "mon" }}>
          Create an account to continue
        </Text>
        <AppForm
          initialValues={{ name: "", email: "", password: "" }}
          onSubmit={signUpWithEmail}
          validationSchema={validationSchema}
        >
          <View style={{ marginBottom: 10, width: "100%" }}>
            <TextFormField
              name="name"
              placeholder="Name"
              keyboardType="default"
              autoCapitalize="words"
              autoCorrect={true}
              label={null}
            />
          </View>
          <View style={{ marginBottom: 10, width: "100%" }}>
            <TextFormField
              name="email"
              placeholder="Email"
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect={false}
              label={null}
            />
          </View>
          <View style={{ marginBottom: 20, width: "100%" }}>
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

          <SubmitButton title="Create account" />
        </AppForm>

        <View style={{ flex: 1 }} />

        <TermsOfService />
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
