import { Hash, Menu } from "lucide-react";
import React from "react";
import MobileToggle from "../mobile-toggle";

interface ChatHeaderProps {
  serverId: string;
  name: string;
  type: "channel" | "conversation";
  imageUrl?: string;
}
export default function ChatHeader({ name, serverId, type }: ChatHeaderProps) {
  return (
    <div className="h-12 border-b-2 border-neutral-200 dark:border-neutral-700 px-3 flex items-center text-base font-semibold">
      <MobileToggle serverId={serverId} />
      {type === "channel" && (
        <>
          <Hash className="w-5 h-5 mr-2 text-zinc-500 dark:text-zinc-400" />
          <p className="font-semibold text-base dark:text-white text-black">
            {name}
          </p>
        </>
      )}
    </div>
  );
}
