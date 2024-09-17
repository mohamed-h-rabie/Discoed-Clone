"use client";
import { Plus } from "lucide-react";

import React from "react";
import ActionTooltip from "../action-tooltip";
import { useModal } from "@/hooks/use-modal-hook";

export default function NavigationSidebarAction() {
  const { onOpen } = useModal();

  return (
    <div>
      <ActionTooltip side="right" label="Add a server" align="center">
        <button
          className="group flex items-center focus:outline-none"
          onClick={() => onOpen("createServer")}
        >
          <div
            className="flex mx-3 
        bg-background dark:bg-neutral-700
        rounded-[48px] w-[48px] h-[48px]
        items-center justify-center
        group-hover:bg-emerald-500
        group-hover:rounded-[16px]
        transition-all overflow-hidden
        "
          >
            <Plus
              size={25}
              className="text-emerald-500
          group-hover:text-white
          transition
          "
            />
          </div>
        </button>
      </ActionTooltip>
    </div>
  );
}
