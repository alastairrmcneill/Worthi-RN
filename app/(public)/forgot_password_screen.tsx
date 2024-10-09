import { StyleSheet, View, Text } from "react-native";
import React, { useState } from "react";
import { Colors } from "@/constants/Colors";
import { useHeaderHeight } from "@react-navigation/elements";
import { LinearGradient } from "expo-linear-gradient";
import * as Yup from "yup";
import { AppForm, SubmitButton, TextFormField } from "@/components/forms";
import Toast from "react-native-toast-message";
import { useSignIn } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { useAuthService } from "@/hooks/useAuthService";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Please enter a valid email.").required("Email is required."),
});

export default function Page() {
  const [isLoading, setIsLoading] = useState(false);
  const headerHeight = useHeaderHeight();
  const { signIn } = useSignIn();
  const router = useRouter();
  const { forgotPassword } = useAuthService();

  const submit = async (values: any) => {
    const { email } = values;
    setIsLoading(true);

    forgotPassword(email);
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
        <Text style={styles.headerText}>Forgot password</Text>
        <AppForm initialValues={{ email: "" }} onSubmit={submit} validationSchema={validationSchema}>
          <View style={{ marginBottom: 20, width: "100%" }}>
            <TextFormField
              name="email"
              placeholder="Email"
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect={false}
            />
          </View>
          <SubmitButton title="Send reset email" />
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
  inputField: {
    height: 44,
    width: "100%",
    borderWidth: 1,
    borderColor: "#ABABAB",
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#fff",
    fontFamily: "mon",
  },
  headerText: {
    textAlign: "left",
    alignSelf: "flex-start",
    color: Colors.text,
    fontWeight: "700",
    fontSize: 30,
    marginBottom: 20,
    fontFamily: "mon-b",
  },
});
