import Account from "@/models/Account";
import firestore from "@react-native-firebase/firestore";
import { AuthService } from "./AuthService";

class AccountDatabase {
  static async createAccount(account: Account): Promise<void> {}
  static async updateAccount(account: Account): Promise<void> {}
  static async deleteAccount(accountId: string): Promise<void> {}
  static async getUserAccounts(userId: string): Promise<Account[]> {
    const accounts: Account[] = [];
    const currentUserId = AuthService.getCurrentUserId();
    const snapshot = await firestore()
      .collection("users")
      .doc(currentUserId ?? "")
      .collection("accounts")
      .get();

    snapshot.forEach((doc) => {
      accounts.push(Account.fromJSON(doc.data()));
    });
    return accounts;
  }
}

export default AccountDatabase;
