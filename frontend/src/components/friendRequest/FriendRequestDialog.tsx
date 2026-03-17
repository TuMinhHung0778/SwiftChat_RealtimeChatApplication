import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useFriendStore } from "@/stores/useFriendStore";
import SentRequests from "./SentRequests";
import ReceivedRequests from "./ReceivedRequests";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

interface FriendRequestDialogProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const FriendRequestDialog = ({ open, setOpen }: FriendRequestDialogProps) => {
  const [tab, setTab] = useState("received");
  const { getAllFriendRequests, receivedList, sentList } = useFriendStore();
  const receivedCount = receivedList?.length ?? 0;
  const sentCount = sentList?.length ?? 0;

  useEffect(() => {
    if (!open) return;
    const loadRequest = async () => {
      try {
        await getAllFriendRequests();
      } catch (error) {
        console.error("Lỗi xảy ra khi load requests", error);
        toast.error("Không tải được lời mời kết bạn. Vui lòng thử lại.");
      }
    };

    loadRequest();
  }, [open, getAllFriendRequests]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="tracking-tight">Lời mời kết bạn</DialogTitle>
        </DialogHeader>
        <Tabs value={tab} onValueChange={setTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 rounded-xl p-1">
            <TabsTrigger value="received" className="rounded-lg">
              <span className="flex items-center gap-2">
                Đã nhận
                {receivedCount > 0 ? (
                  <Badge
                    variant="destructive"
                    className="min-w-5 px-1.5 py-0 text-[11px] leading-4"
                  >
                    {receivedCount > 99 ? "99+" : receivedCount}
                  </Badge>
                ) : null}
              </span>
            </TabsTrigger>
            <TabsTrigger value="sent" className="rounded-lg">
              <span className="flex items-center gap-2">
                Đã gửi
                {sentCount > 0 ? (
                  <Badge
                    variant="secondary"
                    className="min-w-5 px-1.5 py-0 text-[11px] leading-4"
                  >
                    {sentCount > 99 ? "99+" : sentCount}
                  </Badge>
                ) : null}
              </span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="received">
            <ReceivedRequests />
          </TabsContent>

          <TabsContent value="sent">
            <SentRequests />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default FriendRequestDialog;
