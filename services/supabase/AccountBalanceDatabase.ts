import AccountBalance from "@/models/AccountBalance";
import { supabase } from "@/utils/supabaseClient";

class AccountBalanceDatabase {
  static async createAccountBalance(
    accountBalance: AccountBalance,
  ): Promise<void> {
    console.log("Creating accountBalance...");
    console.log(
      "🚀 ~ file: AccountBalanceDatabase.ts:8 ~ AccountBalanceDatabase ~ accountBalance:",
      accountBalance,
    );

    const { data, error } = await supabase
      .from("account_balances")
      .insert([
        accountBalance.toJSON(),
      ]);

    if (error) {
      console.log(error);
    }
  }
  static async updateAccountBalance(
    accountBalance: AccountBalance,
  ): Promise<void> {}
  static async deleteAccountBalance(accountBalanceId: string): Promise<void> {}
  static async getAccountBalancesFromIds(
    accountIds: string[],
  ): Promise<AccountBalance[]> {
    const { data, error } = await supabase
      .from("account_balances")
      .select("*")
      .in("account_id", accountIds)
      .order("date", { ascending: false });

    const accountBalances: AccountBalance[] = [];

    data?.forEach((accountBalance: any) => {
      accountBalances.push(AccountBalance.fromJSON(accountBalance));
    });
    return accountBalances;
  }
}

export default AccountBalanceDatabase;
