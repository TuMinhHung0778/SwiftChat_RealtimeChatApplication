import { useMemo, useState } from "react";
import { useAuthStore } from "@/stores/useAuthStore";
import { useUserStore } from "@/stores/useUserStore";
import { useFriendStore } from "@/stores/useFriendStore";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import UserAvatar from "@/components/chat/UserAvatar";
import type { User } from "@/types/user";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ProfileCard from "@/components/profile/ProfileCard";

const AllUsersList = () => {
  const { user: me } = useAuthStore();
  const { users, usersLoading, fetchAllUsers } = useUserStore();
  const { addFriend, loading: friendLoading, friends, sentList } =
    useFriendStore();
  const [profileOpen, setProfileOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const friendIds = useMemo(() => {
    return new Set((friends ?? []).map((f) => f._id));
  }, [friends]);

  const sentIds = useMemo(() => {
    const set = new Set<string>();
    (sentList ?? []).forEach((r) => {
      const to = r.to;
      if (!to) return;
      // API getAllFriendRequests() trả populate object; nhưng để an toàn vẫn handle string id
      if (typeof to === "string") set.add(to);
      else if (to._id) set.add(to._id);
    });
    return set;
  }, [sentList]);

  const visible = useMemo(() => {
    const myId = me?._id;
    return (users ?? []).filter((u) => {
      if (!u?._id) return false;
      if (u._id === myId) return false;
      if (friendIds.has(u._id)) return false; // đã là bạn -> ẩn
      return true;
    });
  }, [users, me?._id, friendIds]);

  const handleAdd = async (u: User) => {
    try {
      const msg = await addFriend(u._id, "");
      toast.success(msg);
    } catch (error) {
      console.error(error);
      toast.error("Gửi lời mời kết bạn thất bại");
    }
  };

  const openProfile = (u: User) => {
    setSelectedUser(u);
    setProfileOpen(true);
  };

  if (usersLoading) {
    return (
      <div className="flex-1 overflow-y-auto p-2">
        <p className="text-sm text-muted-foreground">Đang tải danh sách...</p>
      </div>
    );
  }

  if (!visible.length) {
    return (
      <div className="flex-1 overflow-y-auto p-2 space-y-2">
        <p className="text-sm text-muted-foreground">
          Chưa có người dùng nào khác.
        </p>
        <Button size="sm" variant="outline" onClick={fetchAllUsers}>
          Tải lại
        </Button>
      </div>
    );
  }

  return (
    <>
      <div className="flex-1 overflow-y-auto p-2 space-y-2">
        {visible.map((u) => (
          <Card
            key={u._id}
            className="py-3 px-3 flex items-center gap-3 hover:bg-accent/40 transition-colors"
          >
            <UserAvatar
              type="chat"
              name={u.displayName}
              avatarUrl={u.avatarUrl ?? undefined}
            />
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-medium">{u.displayName}</div>
              <div className="truncate text-xs text-muted-foreground">
                @{u.username}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="secondary"
                onClick={() => openProfile(u)}
              >
                Profile
              </Button>
              {sentIds.has(u._id) ? (
                <Button size="sm" variant="outline" disabled>
                  Đã gửi lời mời
                </Button>
              ) : (
                <Button
                  size="sm"
                  variant="primary"
                  onClick={() => handleAdd(u)}
                  disabled={friendLoading}
                >
                  Kết bạn
                </Button>
              )}
            </div>
          </Card>
        ))}
      </div>

      <Dialog open={profileOpen} onOpenChange={setProfileOpen}>
        <DialogContent className="overflow-y-auto max-h-[95vh] p-0 bg-transparent border-0 shadow-2xl">
          <div className="bg-gradient-glass">
            <div className="max-w-4xl mx-auto p-4">
              <DialogHeader className="mb-6">
                <DialogTitle className="text-2xl font-bold text-foreground">
                  Profile
                </DialogTitle>
              </DialogHeader>
              <ProfileCard user={selectedUser} />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AllUsersList;

