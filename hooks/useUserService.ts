import { AuthService } from "@/services/AuthService";
import { UserDatabase } from "@/services/UserDatabase";
import { useUserStore } from "@/state/UserStore";
import { useEffect } from "react";

export const useLoadUserProfile = () => {
  // Get store methods
  const setCurrentUser = useUserStore((state) => state.setCurrentUser);

  useEffect(() => {
    const loadUserProfile = async () => {
      // Get current user ID
      const userId = AuthService.getCurrentUserId();

      if (userId) {
        // Load user profile
        const user = await UserDatabase.getUserFromId(userId);
        if (user == null) return;
        setCurrentUser(user);
      }
    };

    loadUserProfile();
  }, []);
};
