import { create } from "zustand";
import AppUser from "@/models/AppUser";

type UserStore = {
  currentUser: AppUser | null;
  setCurrentUser: (user: AppUser) => void;
  reset: () => void;
};

export const useUserStore = create<UserStore>((set) => ({
  currentUser: null,
  setCurrentUser: (user: AppUser) => set({ currentUser: user }),
  reset: () => set({ currentUser: null }),
}));
