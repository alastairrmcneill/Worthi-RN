import Account from "@/models/Account";
import { useUserStore } from "@/state/UserStore";
import AccountDatabase from "./supabase/AccountDatabase";
import AccountBalanceDatabase from "./supabase/AccountBalanceDatabase";
import AccountBalance from "@/models/AccountBalance";

export class AccountSerivce {
  static async createAccount(account: Account, accountBalance: AccountBalance | null): Promise<void> {
    const { currentUser } = useUserStore.getState();

    account.user_id = currentUser?.id ?? "";

    const accountId = await AccountDatabase.createAccount(account);
    console.log("🚀 ~ file: AccountService.tsx:13 ~ AccountSerivce ~ createAccount ~ accountId:", accountId);

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
      console.log("🚀 ~ file: AccountService.tsx:35 ~ AccountSerivce ~ accounts.forEach ~ account:", account.history);
    });
    return accounts;
  }
}
