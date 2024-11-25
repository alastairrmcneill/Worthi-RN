export enum AccountType {
  CurrentAccount = "Current Account",
  CreditCard = "Credit Card",
  Investment = "Investment",
  Loan = "Loan",
  Mortgage = "Mortgage",
  Pension = "Pension",
  Property = "Property",
}

export const AccountTypeOptions = [
  AccountType.CurrentAccount,
  AccountType.CreditCard,
  AccountType.Investment,
  AccountType.Loan,
  AccountType.Mortgage,
  AccountType.Pension,
  AccountType.Property,
];

export const AccountTypeColors = {
  [AccountType.CurrentAccount]: "#89FCCA",
  [AccountType.CreditCard]: "#FCA489",
  [AccountType.Investment]: "#89B7FC",
  [AccountType.Loan]: "#FC898B",
  [AccountType.Mortgage]: "#FC89FC",
  [AccountType.Pension]: "#CA89FC",
  [AccountType.Property]: "#89FC89",
};

export enum AccountTypeGroups {
  All = "All",
  Assets = "Assets",
  Liabilities = "Liabilities",
}

export const AccountTypeGroupOptions = [AccountTypeGroups.All, AccountTypeGroups.Assets, AccountTypeGroups.Liabilities];

export const AccountTypeGroupDetails = {
  [AccountTypeGroups.All]: AccountTypeOptions.map((type) => type.toString()),
  [AccountTypeGroups.Assets]: [
    AccountType.CurrentAccount,
    AccountType.Investment,
    AccountType.Pension,
    AccountType.Property,
  ].map((type) => type.toString()),
  [AccountTypeGroups.Liabilities]: [AccountType.CreditCard, AccountType.Loan, AccountType.Mortgage].map((type) =>
    type.toString()
  ),
};
