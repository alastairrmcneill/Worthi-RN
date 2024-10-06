import Account from "@/models/Account";
import { create } from "zustand";

type AccountStore = {
  accounts: Account[];
  setAccounts: (accounts: Account[]) => void;
  reset: () => void;
};

export const useAccountStore = create<AccountStore>((set) => ({
  accounts: [],
  setAccounts: (accounts: Account[]) => set({ accounts }),
  reset: () => set({ accounts: [] }),
}));
