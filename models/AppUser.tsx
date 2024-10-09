class AppUser {
  id: string | null;
  name: string;

  constructor(id: string | null, name: string) {
    this.id = id;
    this.name = name;
  }

  // Convert to JSON
  toJSON() {
    return {
      id: this.id,
      name: this.name,
    };
  }

  // Create from JSON
  static fromJSON(json: any): AppUser {
    return new AppUser(json.id, json.first_name);
  }

  // Copy method
  copy(id?: string, name?: string): AppUser {
    return new AppUser(id ?? this.id, name ?? this.name);
  }
}

export default AppUser;
