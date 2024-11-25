import AccountBalance from "./AccountBalance";

class Account {
  id: string | null;
  user_id: string;
  name: string;
  type: string;
  archived: boolean;
  history: AccountBalance[];

  constructor(
    id: string | null,
    user_id: string,
    name: string,
    type: string,
    archived: boolean,
    history: AccountBalance[]
  ) {
    this.id = id;
    this.user_id = user_id;
    this.name = name;
    this.type = type;
    this.archived = archived;
    this.history = history;
  }

  // Convert to JSON
  toJSON() {
    return {
      user_id: this.user_id,
      name: this.name,
      type: this.type,
      archived: this.archived,
    };
  }

  // Create from JSON
  static fromJSON(json: any): Account {
    return new Account(
      (json.id as string) ?? "",
      (json.user_id as string) ?? "",
      (json.name as string) ?? "",
      (json.type as string) ?? "",
      (json.archived as boolean) ?? false,
      (json.history as AccountBalance[]) ?? []
    );
  }
}

export default Account;
