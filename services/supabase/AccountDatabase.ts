import Account from "@/models/Account";

class AccountDatabase {
  static async createAccount(account: Account): Promise<void> {}
  static async updateAccount(account: Account): Promise<void> {}
  static async deleteAccount(accountId: string): Promise<void> {}
  static async getUserAccounts(userId: string): Promise<Account[]> {
    const accounts: Account[] = [];

    return accounts;
  }
}

export default AccountDatabase;
