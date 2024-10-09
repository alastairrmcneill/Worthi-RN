import { create } from "zustand";
import AppUser from "@/models/AppUser";
import { Status } from "@/constants/Status";

type UserStore = {
  currentUser: AppUser | null;
  status: Status;
  setStatus: (status: Status) => void;
  setCurrentUser: (user: AppUser | null) => void;
  reset: () => void;
};

export const useUserStore = create<UserStore>((set) => ({
  currentUser: null,
  status: Status.Idle,
  setStatus: (status: Status) => set({ status }),
  setCurrentUser: (user: AppUser | null) => set({ currentUser: user }),
  reset: () => set({ currentUser: null }),
}));
