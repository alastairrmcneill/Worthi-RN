import { createContext, useContext, useEffect } from "react";
import { supabase } from "@/utils/supabaseClient";
import { useAuth } from "@clerk/clerk-expo";
import AppUser from "@/models/AppUser";

export const USERS_TABLE = "users";

type ProviderProps = {
  userId: string | null;
  getUserFromId: (userId: string) => Promise<AppUser>;
};

const SupabaseContext = createContext<Partial<ProviderProps>>({});

export function useSupabase() {
  return useContext(SupabaseContext);
}

export const SupabaseProvider = ({ children }: any) => {
  const { userId } = useAuth();

  useEffect(() => {
    setRealtimeAuth();
  }, []);

  const setRealtimeAuth = async () => {
    const clerkToken = await window.Clerk?.session?.getToken({
      template: "supabase",
    });

    supabase.realtime.setAuth(clerkToken!);
  };

  const getBoards = async () => {
    const { data } = await supabase.from("users").select(`boards ( title, id, background )`).eq("user_id", userId);
    const boards = data?.map((b: any) => b.boards);

    return boards || [];
  };

  const value = {
    userId,
  };

  return <SupabaseContext.Provider value={value}>{children}</SupabaseContext.Provider>;
};
