import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { Slot, SplashScreen, useRouter, useSegments } from "expo-router";
import React, { useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import auth from "@react-native-firebase/auth";
import { ActivityIndicator, View } from "react-native";
import { useFonts } from "expo-font";
import Toast from "react-native-toast-message";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { AuthService } from "@/services/AuthService";

const InitialLayout = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const router = useRouter();
  const segments = useSegments();

  const onAuthStateChanged = (user: FirebaseAuthTypes.User | null) => {
    setUser(user);
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    const subscriber = AuthService.onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: process.env.GOOGLE_SIGN_IN_CLIENT_ID,
    });
  }, []);

  useEffect(() => {
    if (initializing) return;

    const inAuthGroup = segments[0] === "(authenticated)";
    const inPublicGroup = segments[0] === "(public)";

    if (user && !inAuthGroup) {
      console.log("Navigating to authenticated group");
      router.replace("/(authenticated)/home_screen");
    } else if (!user && !inPublicGroup) {
      console.log("Navigating to public group");
      router.replace("/(public)/login_screen");
    }
  }, [user, initializing]);

  if (initializing)
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );

  return <Slot />;
};

export default function RootLayout() {
  const [loaded, error] = useFonts({
    mon: require("../assets/fonts/Montserrat-Regular.ttf"),
    "mon-sb": require("../assets/fonts/Montserrat-SemiBold.ttf"),
    "mon-b": require("../assets/fonts/Montserrat-Bold.ttf"),
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <InitialLayout />
      <Toast />
    </GestureHandlerRootView>
  );
}
