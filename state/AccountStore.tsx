import Account from "@/models/Account";
import AccountBalance from "@/models/AccountBalance";
import { create } from "zustand";

type AccountStore = {
  accounts: Account[];
  currentAccount: Account | null;
  setAccounts: (accounts: Account[]) => void;
  setCurrentAccount: (account: Account) => void;
  addAccountBalance: (accountBalance: AccountBalance) => void;
  updateAccount: (account: Account) => void;
  deleteAccount: (accountId: string) => void;
  reset: () => void;
};

export const useAccountStore = create<AccountStore>((set, get) => ({
  accounts: [],
  currentAccount: null,
  setAccounts: (accounts: Account[]) => set({ accounts }),
  setCurrentAccount: (currentAccount: Account) => set({ currentAccount }),

  addAccountBalance: (accountBalance: AccountBalance) => {
    const { accounts } = get();

    // Find the account by accountId
    const updatedAccounts = accounts.map((account) => {
      if (account.id === accountBalance.account_id) {
        // Add the new balance to the history
        const updatedHistory = [...account.history, accountBalance];

        // Sort the history by date (assuming the date is a string in ISO format or a Date object)
        updatedHistory.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

        // Return the updated account with the sorted history
        account.history = updatedHistory;
        return account;
      }
      return account;
    });

    // Update the accounts in the store
    set({ accounts: updatedAccounts });
  },

  updateAccount: (newAcccount: Account) => {
    const { accounts } = get();

    // Find the account by accountId
    const updatedAccounts = accounts.map((account) => {
      if (account.id === newAcccount.id) {
        // Update the account
        return newAcccount;
      }
      return account;
    });

    // Update the accounts in the store
    set({ accounts: updatedAccounts });
  },
  deleteAccount: (accountId: string) => {
    const { accounts } = get();

    // Filter out the account to delete
    const updatedAccounts = accounts.filter((account) => account.id !== accountId);

    // Update the accounts in the store
    set({ accounts: updatedAccounts });
  },
  reset: () => set({ accounts: [] }),
}));
