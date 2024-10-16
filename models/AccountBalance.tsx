class AccountBalance {
  id: string | null;
  account_id: string | null;
  balance: number;
  invested: number | null;
  date: Date;

  constructor(id: string | null, account_id: string | null, balance: number, invested: number | null, date: Date) {
    this.id = id;
    this.account_id = account_id;
    this.balance = balance;
    this.invested = invested;
    this.date = date;
  }

  // Convert to JSON
  toJSON() {
    return {
      account_id: this.account_id,
      balance: this.balance,
      invested: this.invested,
      date: this.date,
    };
  }

  // Create from JSON
  static fromJSON(json: any): AccountBalance {
    return new AccountBalance(
      (json.id as string) ?? "",
      (json.account_id as string) ?? "",
      (json.balance as number) ?? 0,
      json.invested as number | null,
      (json.date as Date) ?? new Date()
    );
  }
}

export default AccountBalance;
