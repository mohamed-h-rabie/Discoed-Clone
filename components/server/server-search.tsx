"use client";
import { Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { useParams, useRouter } from "next/navigation";

interface ServerSearchProps {
  data: {
    label: string;
    type: "channels" | "members";
    data:
      | {
          icon: React.ReactNode;
          name: string;
          id: string;
        }[]
      | undefined;
  }[];
}
export default function ServerSearch({ data }: ServerSearchProps) {
  const router = useRouter();
  const params = useParams();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "s" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);
  const onClick = function ({
    id,
    type,
  }: {
    id: string;
    type: "channels" | "members";
  }) {
    setOpen(false);
    if (type === "channels") {
      return router.push(`/server/${params?.serverId}/channels/${id}`);
    }
    if (type === "members") {
      return router.push(`/server/${params?.serverId}/conversitions/${id}`);
    }
  };
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="group flex items-center px-2 py-3 gap-x-2 
   w-full transition hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50
    rounded-md"
      >
        <Search
          className="w-4 h-4 text-zinc-500 dark:text-zinc-400
      "
        />
        <p
          className="font-semibold text-sm text-zinc-500
      dark:text-zinc-400 
      group-hover:text-zinc-600
      transition dark:group-hover:text-zinc-300
      "
        >
          search
        </p>
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground ml-auto">
          {" "}
          <span className="text-xs">⌘</span>S
        </kbd>
      </button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search all channels and members.." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {data.map(({ label, type, data }) => {
            if (!data?.length) return null;
            return (
              <CommandGroup heading={label} key={label}>
                {data.map(({ id, icon, name }) => {
                  return (
                    <CommandItem
                      key={id}
                      onSelect={() => onClick({ id, type })}
                    >
                      {icon}
                      <span>{name}</span>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            );
          })}
        </CommandList>
      </CommandDialog>
    </>
  );
}
