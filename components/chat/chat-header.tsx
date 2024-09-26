import { Hash, Menu } from "lucide-react";
import React from "react";
import MobileToggle from "../mobile-toggle";
import UserAvatar from "../avatar-image";
import { SocketIndicator } from "../socket-indicator";

interface ChatHeaderProps {
  serverId: string;
  name: string;
  type: "channel" | "conversation";
  imageUrl?: string;
}
export default function ChatHeader({
  name,
  serverId,
  type,
  imageUrl,
}: ChatHeaderProps) {
  return (
    <div className="min-h-12 border-b-2 border-neutral-200 dark:border-neutral-700 px-3  flex items-center text-base font-semibold">
      <MobileToggle serverId={serverId} />
      {type === "channel" && (
        <Hash className="w-5 h-5 mr-2 text-zinc-500 dark:text-zinc-400" />
      )}
      {type === "conversation" && (
        <UserAvatar
          src={imageUrl}
          className="w-8 h-8 md:h-8 md:w-8  mr-2 text-zinc-500 dark:text-zinc-400"
          name={name ? name : ""}
        />
      )}
      <p className="font-semibold text-base dark:text-white text-black">
        {name}
      </p>
      <div className="ml-auto flex items-center">
        <SocketIndicator />
      </div>
    </div>
  );
}
