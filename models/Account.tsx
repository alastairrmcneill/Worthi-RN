class Account {
  id: string | null;
  name: string;
  type: string;
  archived: boolean;
  history: any[];

  constructor(id: string | null, name: string, type: string, archived: boolean, history: any[]) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.archived = archived;
    this.history = history;
  }

  // Convert to JSON
  toJSON() {
    return {
      id: this.id,
      name: this.name,
      type: this.type,
      archived: this.archived,
      history: this.history,
    };
  }

  // Create from JSON
  static fromJSON(json: any): Account {
    return new Account(json.id, json.name, json.type, json.archived, json.history);
  }
}

export default Account;
