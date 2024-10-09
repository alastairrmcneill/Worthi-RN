import { useOAuth, useSignIn, useSignUp } from "@clerk/clerk-expo";
import { AuthStrategy } from "@/constants/AuthStrategy";
import { useState } from "react";
import Toast from "react-native-toast-message";
import { useRouter } from "expo-router";

export const useAuthService = () => {
  const { signIn, setActive, isLoaded } = useSignIn();
  const { signUp } = useSignUp();
  const { startOAuthFlow: googleAuth } = useOAuth({ strategy: AuthStrategy.Google });
  const { startOAuthFlow: appleAuth } = useOAuth({ strategy: AuthStrategy.Apple });
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const signInWitheEmail = async (email: string, password: string) => {
    if (!isLoaded) return;

    setIsLoading(true);
    try {
      const signInAttempt = await signIn.create({
        identifier: email,
        password,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  const signInWithOAuth = async (strategy: AuthStrategy) => {
    if (!isLoaded || !signIn || !signUp) return;

    const selectedAuth = {
      [AuthStrategy.Google]: googleAuth,
      [AuthStrategy.Apple]: appleAuth,
    }[strategy];

    setIsLoading(true);

    const userExistsButNeedsToSignIn =
      signUp!.verifications.externalAccount.status === "transferable" &&
      signUp!.verifications.externalAccount.error?.code === "external_account_exists";

    if (userExistsButNeedsToSignIn) {
      const res = await signIn!.create({ transfer: true });

      if (res.status === "complete") {
        setActive!({
          session: res.createdSessionId,
        });
      }
    }

    const userNeedsToBeCreated = signIn!.firstFactorVerification.status === "transferable";

    if (userNeedsToBeCreated) {
      const res = await signUp!.create({
        transfer: true,
      });

      if (res.status === "complete") {
        setActive!({
          session: res.createdSessionId,
        });
      }
    } else {
      try {
        const { createdSessionId, setActive } = await selectedAuth();

        if (createdSessionId) {
          setActive!({ session: createdSessionId });
          console.log("OAuth success standard");
        }
      } catch (err) {
        console.error("OAuth error", err);
      }
    }
    setIsLoading(false);
  };

  const signUpWithEmail = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      const result = await signUp?.create({
        firstName: name,
        emailAddress: email,
        password,
      });

      if (result?.createdSessionId) {
        await setActive!({ session: result?.createdSessionId });
      }
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  const forgotPassword = async (email: string) => {
    setIsLoading(true);
    try {
      await signIn
        ?.create({
          strategy: "reset_password_email_code",
          identifier: email,
        })
        .then((res) => {
          Toast.show({
            type: "success",
            text1: "Email Sent!",
            text2: "Please check your email for your secure code.",
          });
          router.push({
            pathname: "/(public)/reset_password_screen",
            params: { email },
          });
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  const resetPassword = async (email: string, code: string, password: string) => {
    try {
      await signIn
        ?.attemptFirstFactor({
          strategy: "reset_password_email_code",
          code,
          password,
        })
        .then((result) => {
          // Check if 2FA is required
          if (result.status === "needs_second_factor") {
          } else if (result.status === "complete") {
            // Set the active session to
            // the newly created session (user is now signed in)
            setActive({ session: result.createdSessionId });
          } else {
            console.log(result);
          }
        })
        .catch((err) => {
          console.error("error", err.errors[0].longMessage);
        });
    } catch (error) {
      console.error("Error resetting password:", error);
    }
  };

  return {
    isLoading,
    signInWitheEmail,
    signInWithOAuth,
    signUpWithEmail,
    forgotPassword,
    resetPassword,
  };
};
