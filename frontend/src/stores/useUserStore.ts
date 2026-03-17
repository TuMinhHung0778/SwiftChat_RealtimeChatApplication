import { userService } from "@/services/userService";
import type { UserState } from "@/types/store";
import { create } from "zustand";
import { useAuthStore } from "./useAuthStore";
import { toast } from "sonner";
import { useChatStore } from "./useChatStore";

export const useUserStore = create<UserState>((set) => ({
  users: [],
  usersLoading: false,
  fetchAllUsers: async () => {
    try {
      set({ usersLoading: true });
      const users = await userService.fetchAllUsers();
      set({ users: users ?? [] });
    } catch (error) {
      console.error("Lỗi khi fetchAllUsers", error);
      set({ users: [] });
    } finally {
      set({ usersLoading: false });
    }
  },
  updateAvatarUrl: async (formData) => {
    try {
      const { user, setUser } = useAuthStore.getState();
      const data = await userService.uploadAvatar(formData);

      if (user) {
        setUser({
          ...user,
          avatarUrl: data.avatarUrl,
        });

        useChatStore.getState().fetchConversations();
      }
    } catch (error) {
      console.error("Lỗi khi updateAvatarUrl", error);
      toast.error("Upload avatar không thành công!");
    }
  },
}));
