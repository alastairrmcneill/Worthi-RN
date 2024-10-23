import Account from "@/models/Account";
import { useUserStore } from "@/state/UserStore";
import AccountDatabase from "./supabase/AccountDatabase";
import AccountBalanceDatabase from "./supabase/AccountBalanceDatabase";
import AccountBalance from "@/models/AccountBalance";
import { useAccountStore } from "@/state/AccountStore";

export class AccountService {
  static async createAccount(account: Account, accountBalance: AccountBalance | null): Promise<void> {
    const { currentUser } = useUserStore.getState();

    account.user_id = currentUser?.id ?? "";

    const accountId = await AccountDatabase.createAccount(account);
    console.log("🚀 ~ file: AccountService.tsx:13 ~ AccountService ~ createAccount ~ accountId:", accountId);

    if (!accountBalance) return;

    // Create account balance
    accountBalance.account_id = accountId ?? "";
    await AccountBalanceDatabase.createAccountBalance(accountBalance);
  }

  static async getUserAccounts(userId: string): Promise<Account[]> {
    const accounts = await AccountDatabase.getUserAccounts(userId);

    const accountBalances = await AccountBalanceDatabase.getAccountBalancesFromIds(
      accounts.map((account) => account.id!)
    );

    accounts.forEach((account) => {
      account.history = accountBalances.filter((balance) => balance.account_id === account.id);
    });

    accounts.forEach((account) => {
      console.log("🚀 ~ file: AccountService.tsx:35 ~ AccountService ~ accounts.forEach ~ account:", account.history);
    });
    return accounts;
  }

  static async addAccountBalance(accountBalance: AccountBalance): Promise<void> {
    const { addAccountBalance } = useAccountStore.getState();

    await AccountBalanceDatabase.createAccountBalance(accountBalance);

    addAccountBalance(accountBalance);
  }

  static async renameAccount(account: Account | null, newName: string): Promise<void> {
    if (!account) return;

    const { updateAccount } = useAccountStore.getState();

    account.name = newName;

    await AccountDatabase.updateAccount(account);

    updateAccount(account);
  }

  static async archiveAccount(account: Account | null): Promise<void> {
    if (!account) return;

    const { updateAccount } = useAccountStore.getState();

    account.archived = true;

    await AccountDatabase.updateAccount(account);

    updateAccount(account);
  }

  static async deleteAccount(accountId: string): Promise<void> {
    const { deleteAccount } = useAccountStore.getState();

    await AccountDatabase.deleteAccount(accountId);

    deleteAccount(accountId);
  }
}
