import AppUser from "@/models/AppUser";
import { supabase } from "@/utils/supabaseClient";

export class UserDatabase {
  static async getUserFromId(userId: string): Promise<AppUser | null> {
    try {
      const { data, error } = await supabase
        .from("users") // Your Supabase table name
        .select("*")
        .eq("id", userId)
        .single();

      if (error) return null;

      const user = AppUser.fromJSON(data);

      return user;
    } catch (error) {
      console.error("Error fetching user data:", error);
      return null;
    }
  }
}
