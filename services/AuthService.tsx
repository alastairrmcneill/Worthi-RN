import { Alert } from "react-native";
import { useUserStore } from "@/state/UserStore";
import Toast from "react-native-toast-message";
import { useAuth } from "@clerk/clerk-expo";

export class AuthService {
  // Register with Email and Password
  static async registerWithEmail(name: string, email: string, password: string) {
    try {
      return null;
    } catch (error: any) {
      const cleanedMessage = error.message.replace(/\[.*?\]/g, "");
      Alert.alert("Error", cleanedMessage);
    }
  }

  // Sign in with Email and Password
  static async signInWithEmail(email: string, password: string) {
    try {
      // const userCredential = await auth().signInWithEmailAndPassword(email, password);
      // return userCredential.user;
      return null;
    } catch (error: any) {
      const cleanedMessage = error.message.replace(/\[.*?\]/g, "");
      Alert.alert("Error", cleanedMessage);
    }
  }

  // Google Sign-In
  static async signInWithGoogle() {
    try {
      // const result = await GoogleSignin.signIn();
      // if (result.type === "success") {
      //   const { idToken } = result.data;
      //   const credential = auth.GoogleAuthProvider.credential(idToken);
      //   const userCredential = await auth().signInWithCredential(credential);
      //   const { uid, displayName, email } = userCredential.user;
      //   // Store the user's information in Firestore
      //   await firestore()
      //     .collection("users")
      //     .doc(uid)
      //     .set({
      //       uid: uid,
      //       name: displayName || "Google User", // Fallback if displayName is not available
      //       email: email,
      //       provider: "Google",
      //       createdAt: firestore.FieldValue.serverTimestamp(),
      //     });
      // }
    } catch (error: any) {
      const cleanedMessage = error.message.replace(/\[.*?\]/g, "");
      Alert.alert("Error", cleanedMessage);
    }
  }

  // Apple Sign-In
  static async signInWithApple() {
    try {
      // const appleCredential = await AppleAuthentication.signInAsync({
      //   requestedScopes: [
      //     AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
      //     AppleAuthentication.AppleAuthenticationScope.EMAIL,
      //   ],
      // });

      // const { identityToken, fullName, email } = appleCredential;
      // const appleAuthCredential = auth.AppleAuthProvider.credential(identityToken);

      // const userCredential = await auth().signInWithCredential(appleAuthCredential);
      // const { user } = userCredential;

      // // Construct a display name if fullName is available
      // const displayName = fullName ? `${fullName.givenName} ${fullName.familyName}` : "Apple User";

      // // Check if user exists in Firestore, create if not
      // const userDoc = await firestore().collection("users").doc(user.uid).get();
      // if (!userDoc.exists) {
      //   await firestore()
      //     .collection("users")
      //     .doc(user.uid)
      //     .set({
      //       uid: user.uid,
      //       name: displayName,
      //       email: email || "Email not provided",
      //       provider: "Apple",
      //       createdAt: firestore.FieldValue.serverTimestamp(),
      //     });
      // }

      // return user;
      return null;
    } catch (error: any) {
      console.log("Error during Apple sign-in:", error);
      if (error.code === "ERR_CANCELED") {
        console.log("User canceled Apple Sign In.");
      }

      const cleanedMessage = error.message.replace(/\[.*?\]/g, "");
      Alert.alert("Error", cleanedMessage);
    }
  }

  // Forgot Password
  static async forgotPassword(email: string) {
    try {
      // await auth().sendPasswordResetEmail(email);
      // Toast.show({
      //   type: "success",
      //   text1: "Password Reset Email Sent",
      //   text2: "Please check your email to reset your password.",
      // });
    } catch (error: any) {
      const cleanedMessage = error.message.replace(/\[.*?\]/g, "");
      Alert.alert("Error", cleanedMessage);
    }
  }

  // Sign Out
  static async signOut() {
    const reset = useUserStore.getState().reset;
    try {
      // await auth().signOut();
      reset();
    } catch (error: any) {
      console.log("Error during sign out:", error);
      throw new Error(error.message);
    }
  }

  // Delete User Account
  static async deleteAccount() {
    try {
      // const user = auth().currentUser;
      // if (user == null) return;
      // // Delete user from Firestore
      // await firestore().collection("users").doc(user.uid).delete();
      // await user.delete();
    } catch (error: any) {
      const cleanedMessage = error.message.replace(/\[.*?\]/g, "");
      Alert.alert("Error", cleanedMessage);
    }
  }
}
