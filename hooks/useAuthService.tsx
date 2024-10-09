import { useOAuth, useSignIn, useSignUp } from "@clerk/clerk-expo";
import { AuthStrategy } from "@/constants/AuthStrategy";
import { useState } from "react";

export const useAuthService = () => {
  const { signIn, setActive, isLoaded } = useSignIn();
  const { signUp } = useSignUp();
  const { startOAuthFlow: googleAuth } = useOAuth({ strategy: AuthStrategy.Google });
  const { startOAuthFlow: appleAuth } = useOAuth({ strategy: AuthStrategy.Apple });

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
      console.log("Sending reset email to", email);
      // Integrate Clerk's password reset API if needed
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  return {
    isLoading,
    signInWitheEmail,
    signInWithOAuth,
    signUpWithEmail,
    forgotPassword,
  };
};
