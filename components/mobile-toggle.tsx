import { Menu } from "lucide-react";
import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "./ui/button";
import { NavigationSidebar } from "./navigation/navigation-sidebar";
import { ServerNavigationSidebar } from "./server/ServerNavigationSidebar";

export default function MobileToggle({ serverId }: { serverId: string }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 flex gap-0">
        <div className="w-[72px]">
          <NavigationSidebar />
        </div>
        <ServerNavigationSidebar serverId={serverId} />
      </SheetContent>
    </Sheet>
  );
}
