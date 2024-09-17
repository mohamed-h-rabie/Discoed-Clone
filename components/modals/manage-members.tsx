"use client";
import queryString from "query-string";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useModal } from "@/hooks/use-modal-hook";
import { ServerWithMembersandProfile } from "@/types";
import { ScrollArea } from "../ui/scroll-area";
import UserAvatar from "../avatar-image";
import {
  Check,
  Gavel,
  Loader2,
  MoreVertical,
  Shield,
  ShieldAlert,
  ShieldCheck,
  ShieldQuestion,
} from "lucide-react";
import { useState } from "react";
import axios from "axios";
import { MemberRole } from "@prisma/client";
import { useRouter } from "next/navigation";

const userShiled = {
  GUEST: null,
  ADMIN: <ShieldCheck className="w-4 h-4 ml-2  text-red-500" />,
  MODERATOR: <ShieldAlert className="w-4 h-4 ml-2 text-indigo-500" />,
};
export function ManageMembersModal() {
  const router = useRouter();
  const [loadingId, setLoadingId] = useState("");
  const { isOpen, type, onClose, data, onOpen } = useModal();
  const isOpenModal = isOpen && type === "members";
  const { server } = data as { server: ServerWithMembersandProfile };
  const onRoleChange = async (memberId: string, role: MemberRole) => {
    try {
      setLoadingId(memberId);
      const url = queryString.stringifyUrl({
        url: `/api/members/${memberId}`,
        query: {
          serverId: server.id,
        },
      });
      console.log(url);

      const res = await axios.patch(url, { role });
      onOpen("members", { server: res.data });
      router.refresh();
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingId("");
    }
  };
  const onKickMember = async (memberId: string) => {
    try {
      setLoadingId(memberId);
      const url = queryString.stringifyUrl({
        url: `/api/members/${memberId}`,
        query: {
          serverId: server.id,
        },
      });
      console.log(url);

      const res = await axios.delete(url);
      onOpen("members", { server: res.data });
      router.refresh();
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingId("");
    }
  };
  return (
    <Dialog open={isOpenModal} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black  overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-center text-2xl font-bold">
            Manage Members
          </DialogTitle>
          <DialogDescription className="text-center font-semibold">
            {server?.members?.length} Members
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-[420px] mt-8  pr-6">
          {server?.members?.map((member) => (
            <div key={member.id} className="flex items-center mb-6 gap-x-2">
              <UserAvatar src={member.profile.imageUrl} />

              <div className="flex flex-col gap-y-1">
                <div className=" font-semibold gap-x-1 flex items-center">
                  {member?.profile?.name}
                  {userShiled[member?.role]}
                </div>
                <p className="text-xs text-zinc-500">{member.profile.email}</p>
              </div>
              {server.profileId !== member.profileId &&
                loadingId !== member.id && (
                  <div className="ml-auto">
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <MoreVertical className="w-5 h-5 text-zinc-500" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent side="left">
                        <DropdownMenuSub>
                          <DropdownMenuSubTrigger className="flex items-center">
                            <ShieldQuestion className="mr-2 w-4 h-4 " />
                            Role
                          </DropdownMenuSubTrigger>
                          <DropdownMenuPortal>
                            <DropdownMenuSubContent>
                              <DropdownMenuItem
                                onClick={() => onRoleChange(member.id, "GUEST")}
                              >
                                <Shield className="mr-2 h-4 w-4" />
                                Guest
                                {member.role === "GUEST" && (
                                  <Check className="ml-auto" />
                                )}
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onClick={() =>
                                  onRoleChange(member.id, "MODERATOR")
                                }
                              >
                                <ShieldCheck className="mr-2 h-4 w-4" />
                                MODERATOR
                                {member.role === "MODERATOR" && (
                                  <Check className="ml-auto" />
                                )}
                              </DropdownMenuItem>
                            </DropdownMenuSubContent>
                          </DropdownMenuPortal>
                        </DropdownMenuSub>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => onKickMember(member.id)}
                        >
                          <Gavel className="w-4 h-4 mr-2" />
                          Kick
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                )}
              {loadingId === member?.id && (
                <Loader2 className=" ml-auto w-4 h-4 animate-spin text-zinc-500" />
              )}
            </div>
          ))}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
