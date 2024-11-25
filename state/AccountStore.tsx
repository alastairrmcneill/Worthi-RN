import { AccountTypeGroupDetails, AccountTypeGroups } from "@/constants/AccountTypes";
import Account from "@/models/Account";
import AccountBalance from "@/models/AccountBalance";
import { create } from "zustand";

type AccountStore = {
  accounts: Account[];
  filteredAccounts: Account[];
  currentAccount: Account | null;
  accountTypeFilter: string[];
  accountTypeGroupFilter: AccountTypeGroups;
  showArchived: boolean;
  setAccounts: (accounts: Account[]) => void;
  setCurrentAccount: (account: Account) => void;
  addAccountBalance: (accountBalance: AccountBalance) => void;
  updateAccount: (account: Account) => void;
  deleteAccount: (accountId: string) => void;
  setAccountTypeFilter: (accountTypeFilter: string[]) => void;
  setAccountTypeGroupFilter: (accountTypeGroupFilter: AccountTypeGroups) => void;
  setShowArchived: (showArchived: boolean) => void;
  filterAccounts: () => void;
  reset: () => void;
};

export const useAccountStore = create<AccountStore>((set, get) => ({
  accounts: [],
  filteredAccounts: [],
  currentAccount: null,
  accountTypeFilter: [],
  accountTypeGroupFilter: AccountTypeGroups.All,
  showArchived: false,
  setAccounts: (accounts: Account[]) => {
    const { filterAccounts } = get();

    set({ accounts: accounts });
    filterAccounts();
  },
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

  setAccountTypeFilter: (accountTypeFilter: string[]) => {
    set({ accountTypeFilter });
    get().filterAccounts();
  },
  setAccountTypeGroupFilter: (accountTypeGroupFilter: AccountTypeGroups) => {
    set({ accountTypeGroupFilter });
    get().filterAccounts();
  },
  setShowArchived: (showArchived: boolean) => {
    set({ showArchived });
    get().filterAccounts();
  },
  filterAccounts: () => {
    const { accounts, accountTypeFilter, showArchived } = get();

    var runningList = accounts;

    if (accountTypeFilter.length != 0) {
      runningList = runningList.filter((account) => accountTypeFilter.includes(account.type));
    }

    const groupFilter = get().accountTypeGroupFilter;
    const groupFilterTypes = AccountTypeGroupDetails[groupFilter];

    if (groupFilterTypes) {
      runningList = runningList.filter((account) => groupFilterTypes.includes(account.type));
    }

    if (!showArchived) {
      runningList = runningList.filter((account) => !account.archived);
    }

    set({ filteredAccounts: runningList });
  },
  reset: () => set({ accounts: [] }),
}));
