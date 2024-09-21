import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

export default function UserAvatar({
  src,
  className,
  name,
}: {
  src?: string;
  className?: string;
  name?: string;
}) {
  const userName = name?.split(" ");
  const initials = userName?.map((name) => name[0])?.join("");

  return (
    <Avatar className={cn("h-7 w-7 md:h-10 md:w-10", className)}>
      {" "}
      <AvatarImage src={src && src} />
      <AvatarFallback className=" text-black bg-indigo-500">
        {initials ? initials : "MR"}
      </AvatarFallback>
    </Avatar>
  );
}
