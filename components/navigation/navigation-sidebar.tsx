import { currentprofile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import NavigationSidebarAction from "./navigation-action";
import { Separator } from "../ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { NavigationItem } from "./navigation-item";
import { ModeToggle } from "../mode-toggle";
import { UserButton } from "@clerk/nextjs";

export async function NavigationSidebar() {
  const profile = await currentprofile();

  if (!profile) {
    return redirect("/");
  }
  const servers = await db.server.findMany({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });
  return (
    <div
      className="flex flex-col
  dark:bg-[#1E1F22]
  h-full  text-primary
  w-full space-y-4 py-3 items-center
  bg-zinc-200
  "
    >
      <NavigationSidebarAction />
      <Separator className="h-[2px] bg-zinc-300 dark:bg-zinc-700 rounded-md w-10 mx-auto" />
      <ScrollArea className="flex-1 w-full">
        {servers.map((server) => (
          <div key={server.id} className="mb-4">
            <NavigationItem
              id={server.id}
              name={server.name}
              imageUrl={server.imageUrl}
            />
          </div>
        ))}
      </ScrollArea>
      <div
        className=" flex flex-col gap-y-4   items-center 
      pb-3 mt-auto
      "
      >
        <ModeToggle />
        {
          <UserButton
            appearance={{
              elements: {
                avatarBox: "w-[48px] h-[48px]",
              },
            }}
          />
        }
      </div>
    </div>
  );
}
