// services/UserService.ts
import { Status } from "@/constants/Status";
import { UserDatabase } from "@/services/supabase";
import { useUserStore } from "@/state/UserStore";

export class UserService {
  static async loadUser(userId: string) {
    const { setCurrentUser, setStatus } = useUserStore.getState();

    try {
      setStatus(Status.Loading);
      const user = await UserDatabase.getUserFromId(userId);
      if (user) {
        setCurrentUser(user);
        setStatus(Status.Success);
      } else {
        console.log("User not found");
        setStatus(Status.Error);
      }
    } catch (error) {
      console.log("Error fetching user data:", error);
      setStatus(Status.Error);
    } finally {
      console.log("User data fetched");
      setStatus(Status.Success);
    }
  }
}
