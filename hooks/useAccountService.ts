import AccountDatabase from "@/services/AccountDatabase";
import { AuthService } from "@/services/AuthService";
import { useAccountStore } from "@/state/AccountStore";
import { useEffect } from "react";

export const useLoadUserAccounts = async () => {
  const setAccounts = useAccountStore((state) => state.setAccounts);

  useEffect(() => {
    const loadUserAccounts = async () => {
      const userId = AuthService.getCurrentUserId();
      if (userId) {
        const accounts = await AccountDatabase.getUserAccounts(userId);
        setAccounts(accounts);
      }
    };
    loadUserAccounts();
  }, []);
};
