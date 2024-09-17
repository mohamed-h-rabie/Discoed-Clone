"use client";
import { ServerWithMembersandProfile } from "@/types";
import { MemberRole } from "@prisma/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ChevronDown,
  LogOut,
  Plus,
  PlusCircle,
  Settings,
  Trash,
  UserPlus,
  Users,
  X,
} from "lucide-react";
import { useState } from "react";
import { useModal } from "@/hooks/use-modal-hook";
import { log } from "console";

interface ServerHeaderProps {
  server: ServerWithMembersandProfile;
  role?: MemberRole;
}
export default function ServerHeader({ server, role }: ServerHeaderProps) {
  const [clicked, setClicked] = useState(false);
  const { isOpen, onClose, onOpen } = useModal();
  const isAdmin = role === MemberRole.ADMIN;
  const isModerator = isAdmin || role === MemberRole.MODERATOR;
  return (
    <DropdownMenu open={clicked} onOpenChange={setClicked}>
      <DropdownMenuTrigger className="focus:outline-none" asChild>
        <button
          className="
w-full h-12 px-3 flex items-center font-semibold text-base
border-b-2 border-neutral-200 dark:border-neutral-700
hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition
    "
        >
          {server.name}
          {clicked ? (
            <X
              className="w-5 h-5 flex items-end
          ml-auto
          "
            />
          ) : (
            <ChevronDown
              className="w-5 h-5 flex items-end
          ml-auto
          "
            />
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className=" w-56
      text-xs font-medium text-black 
      dark:text-neutral-400
space-y-[2px] 

"
      >
        {isModerator && (
          <DropdownMenuItem
            className="text-indigo-600
          dark:text-indigo-400 py-2 px-2 
          text-sm cursor-pointer
          hover:!bg-indigo-400
          dark:hover:!text-white
          
          "
            onClick={() => onOpen("invite", { server })}
          >
            Invite Friends
            <UserPlus className="w-4 h-4 ml-auto" />
          </DropdownMenuItem>
        )}
        {isAdmin && (
          <DropdownMenuItem
            className="text-indigo-600
          dark:text-indigo-400 py-2 px-2 
          text-sm cursor-pointer
                 hover:!bg-indigo-400
          dark:hover:!text-white
          
          "
            onClick={() => onOpen("editServer", { server })}
          >
            Server Settings
            <Settings className="w-4 h-4 ml-auto" />
          </DropdownMenuItem>
        )}
        {isAdmin && (
          <DropdownMenuItem
            className="text-indigo-600
          dark:text-indigo-400 py-2 px-2 
          text-sm cursor-pointer
                 hover:!bg-indigo-400
          dark:hover:!text-white
          "
            onClick={() => onOpen("members", { server })}
          >
            Manage Members
            <Users className="w-4 h-4 ml-auto" />
          </DropdownMenuItem>
        )}
        {isModerator && (
          <DropdownMenuItem
            className="text-indigo-600
          dark:text-indigo-400 py-2 px-2 
          text-sm cursor-pointer
                 hover:!bg-indigo-400
          dark:hover:!text-white
          "
            onClick={() => onOpen("createChannel", { server })}
          >
            Create Channel
            <PlusCircle className="w-4 h-4 ml-auto" />
          </DropdownMenuItem>
        )}
        {isModerator && <DropdownMenuSeparator />}
        {isAdmin && (
          <DropdownMenuItem
            className="text-rose-500
          py-2 px-2 
          text-sm cursor-pointer
       
                 hover:!bg-rose-500
          dark:hover:!text-white
          "
            onClick={() => onOpen("deleteServer", { server })}
          >
            Delete Server
            <Trash className="w-4 h-4 ml-auto" />
          </DropdownMenuItem>
        )}
        {!isAdmin && (
          <DropdownMenuItem
            className="text-rose-500
          py-2 px-2 
          text-sm cursor-pointer
                 hover:!bg-rose-500
          dark:hover:!text-white
          
          "
            onClick={() => onOpen("leaveServer", { server })}
          >
            Leave Server
            <LogOut className="w-4 h-4 ml-auto" />
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
