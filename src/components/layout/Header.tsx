
import { Link } from "react-router-dom";
import { Bell, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NotificationsMenu } from "../notifications/NotificationsMenu";
import { ProfileMenu } from "../profile/ProfileMenu";

export function Header() {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <div className="hidden md:block">
        <h2 className="text-lg font-semibold">Biashara Salama Manager</h2>
      </div>
      
      <div className="relative ml-auto flex-1 md:grow-0 md:basis-1/3">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search..."
          className="w-full pl-8 md:w-[300px] lg:w-[400px]"
        />
      </div>
      
      <div className="flex items-center gap-2">
        <NotificationsMenu />
        <ProfileMenu />
      </div>
    </header>
  );
}
