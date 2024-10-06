import { StyleSheet, View, Text, Image, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import auth from "@react-native-firebase/auth";
import * as AppleAuthentication from "expo-apple-authentication";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";
import SocialSignInButton from "@/components/SocialSignInButton";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import * as Yup from "yup";
import { AppForm, SubmitButton, TextFormField } from "@/components/forms";
import TermsOfService from "@/components/TermsOfService";
import PasswordFormField from "@/components/forms/PasswordFormField";
import { AuthService } from "@/services/AuthService";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().label("Password"),
});

export default function Page() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const logIn = async (values: any) => {
    const { email, password } = values;

    setIsLoading(true);
    await AuthService.signInWithEmail(email, password);
    setIsLoading(false);
  };

  const signInWithGoogle = async () => {
    setIsLoading(true);
    await AuthService.signInWithGoogle();
    setIsLoading(false);
  };

  const signInWithApple = async () => {
    setIsLoading(true);
    await AuthService.signInWithApple();
    setIsLoading(false);
  };

  return (
    <LinearGradient
      style={{
        flex: 1,
      }}
      colors={["#E0F7FA", Colors.background]} // Light blue to transparent white
      start={{ x: 0, y: 0 }} // Start at the top
      end={{ x: 0, y: 0.3 }} // End at 20% of the height
    >
      <SafeAreaView style={styles.container}>
        <Image source={require("@/assets/logo.png")} style={styles.headerImage} />
        <Text style={styles.headerText}>{"Sign in to your\nAccount"}</Text>

        <Text style={{ alignSelf: "flex-start", color: Colors.text, marginBottom: 30, fontFamily: "mon" }}>
          Don't have an account?{" "}
          <Text onPress={() => router.push("/(public)/register_screen")} style={styles.textLink}>
            Sign Up
          </Text>
        </Text>
        <AppForm initialValues={{ email: "", password: "" }} onSubmit={logIn} validationSchema={validationSchema}>
          <View style={{ marginBottom: 10, width: "100%" }}>
            <TextFormField
              name={"email"}
              placeholder="Email"
              icon="email-outline"
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>

          <View style={{ marginBottom: 5, width: "100%" }}>
            <PasswordFormField name={"password"} placeholder="Password" autoCapitalize="none" secureTextEntry={true} />
          </View>

          <Text
            style={[styles.textLink, { alignSelf: "flex-end" }]}
            onPress={() => router.push("/(public)/forgot_password_screen")}
          >
            Forgot Password?
          </Text>

          <View style={{ marginVertical: 15, width: "100%" }}>
            <SubmitButton title="Log In" />
          </View>
        </AppForm>

        <View style={{ flexDirection: "row", alignItems: "center", paddingBottom: 15 }}>
          <View style={{ flex: 1, height: 1, backgroundColor: Colors.grey }} />
          <Text style={{ fontFamily: "mon", color: Colors.grey, paddingHorizontal: 15 }}>or</Text>
          <View style={{ flex: 1, height: 1, backgroundColor: Colors.grey }} />
        </View>
        <SocialSignInButton
          title="Continue with Google"
          icon={require("@/assets/images/google-logo.png")}
          onPress={signInWithGoogle}
        />
        <SocialSignInButton
          title="Continue with Apple"
          icon={require("@/assets/images/apple-logo-black.png")}
          onPress={signInWithApple}
        />

        <View style={{ flex: 1 }} />

        <TermsOfService />
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  appleButton: {
    width: "100%",
    height: "100%",
  },
  appleButtonWrapper: {
    width: "100%",
    height: 44,
    overflow: "hidden",
  },
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
  },
  googleSignInBtn: {
    width: "100%",
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  googleSignInContainer: {
    width: "100%",
    height: 44,
    overflow: "hidden",
    flexDirection: "row",
    borderColor: "black",
    borderWidth: StyleSheet.hairlineWidth,
    backgroundColor: "white",
    borderRadius: 8,
  },
  textLink: {
    color: Colors.tint,
    fontFamily: "mon-b",
    textDecorationLine: "underline",
  },

  headerImage: {
    width: "30%",
    height: "18%",
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
