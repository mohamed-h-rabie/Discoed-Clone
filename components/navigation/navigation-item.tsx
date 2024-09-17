"use client";
import React from "react";
import ActionTooltip from "../action-tooltip";
import { cn } from "@/lib/utils";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
interface Props {
  id: string;
  imageUrl: string;
  name: string;
}
export function NavigationItem({ id, imageUrl, name }: Props) {
  const params = useParams();
  const router = useRouter();
  const onClick = () => {
    router.push(`/servers/${id}`);
  };
  return (
    <ActionTooltip label={name} side="right" align="center">
      <button
        onClick={onClick}
        className="group relative flex items-center focus:outline-none"
      >
        <div
          className={cn(
            "absolute left-0 bg-primary rounded-r-full transition-all w-[4px]",
            params?.serverId !== id && "group-hover:h-[20px]",
            params?.serverId === id ? "h-[36px]" : "h-[8px]"
          )}
        />
        <div
          className={cn(
            "relative group w-[48px] h-[48px] rounded-[24px] flex mx-3  group-hover:rounded-[16px] transition-all overflow-hidden",
            params?.serverId === id &&
              "bg-primary/10 text-primary rounded-[16px]"
          )}
        >
          <Image fill src={imageUrl} alt="channel" quality={100} />
        </div>
      </button>
    </ActionTooltip>
  );
}
