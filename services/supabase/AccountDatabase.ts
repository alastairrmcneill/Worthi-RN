import Account from "@/models/Account";
import { supabase } from "@/utils/supabaseClient";

class AccountDatabase {
  static async createAccount(account: Account): Promise<string> {
    console.log("Creating account...");
    const { data, error } = await supabase
      .from("accounts")
      .insert([
        account.toJSON(),
      ])
      .select("id");

    if (error) {
      console.log(error);
    }

    return data?.[0]?.id || null;
  }
  static async updateAccount(account: Account): Promise<void> {
    const { error } = await supabase
      .from("accounts")
      .update(account.toJSON())
      .eq("id", account.id);

    if (error) {
      console.log(error);
    }
  }
  static async deleteAccount(accountId: string): Promise<void> {
    const { error } = await supabase
      .from("accounts")
      .delete()
      .eq("id", accountId);

    if (error) {
      console.log(error);
    }
  }
  static async getUserAccounts(userId: string): Promise<Account[]> {
    const { data, error } = await supabase
      .from("accounts")
      .select("*")
      .eq("user_id", userId);

    const accounts: Account[] = [];

    data?.forEach((account: any) => {
      accounts.push(Account.fromJSON(account));
    });
    return accounts;
  }
}

export default AccountDatabase;
