
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  LayoutDashboard, 
  Users, 
  ShoppingCart, 
  BarChart3, 
  Settings, 
  ChevronLeft,
  ChevronRight,
  LogOut,
  Truck,
  DollarSign,
  TrendingUp,
  Box
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

type SidebarProps = {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    // In a real app, this would handle logging out the user
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account.",
    });
    // Navigate to login page
    navigate("/login");
  };

  return (
    <div className={cn(
      "flex flex-col border-r bg-sidebar transition-all duration-300",
      collapsed ? "w-16" : "w-64",
      className
    )}>
      <div className="flex h-14 items-center border-b px-4">
        {!collapsed && (
          <Link to="/" className="flex items-center gap-2 font-semibold text-sidebar-foreground">
            <span className="text-xl font-bold">Biashara Salama</span>
          </Link>
        )}
        <Button 
          variant="ghost" 
          size="icon" 
          className={cn(
            "ml-auto text-sidebar-foreground",
            collapsed && "mx-auto"
          )}
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <ChevronRight /> : <ChevronLeft />}
        </Button>
      </div>
      <ScrollArea className="flex-1">
        <nav className="flex flex-col gap-1 p-2">
          <NavItem to="/" icon={LayoutDashboard} label="Dashboard" collapsed={collapsed} active={location.pathname === "/"} />
          <NavItem to="/suppliers" icon={Truck} label="Suppliers" collapsed={collapsed} active={location.pathname === "/suppliers"} />
          <NavItem to="/purchases" icon={ShoppingCart} label="Purchases" collapsed={collapsed} active={location.pathname === "/purchases"} />
          <NavItem to="/sales" icon={ShoppingCart} label="Sales" collapsed={collapsed} active={location.pathname === "/sales"} />
          <NavItem to="/expenses" icon={DollarSign} label="Expenses" collapsed={collapsed} active={location.pathname === "/expenses"} />
          <NavItem to="/profits" icon={TrendingUp} label="Profits" collapsed={collapsed} active={location.pathname === "/profits"} />
          <NavItem to="/stocks" icon={Box} label="Stocks" collapsed={collapsed} active={location.pathname === "/stocks"} />
          <NavItem to="/customers" icon={Users} label="Customers" collapsed={collapsed} active={location.pathname === "/customers"} />
          <NavItem to="/reports" icon={BarChart3} label="Reports" collapsed={collapsed} active={location.pathname === "/reports"} />
          <NavItem to="/settings" icon={Settings} label="Settings" collapsed={collapsed} active={location.pathname === "/settings"} />
        </nav>
      </ScrollArea>
      <div className="border-t p-2">
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start text-sidebar-foreground",
            collapsed && "justify-center"
          )}
          onClick={handleLogout}
        >
          <LogOut className="h-5 w-5 mr-2" />
          {!collapsed && <span>Logout</span>}
        </Button>
      </div>
    </div>
  );
}

type NavItemProps = {
  to: string;
  icon: React.ElementType;
  label: string;
  collapsed: boolean;
  active: boolean;
}

function NavItem({ to, icon: Icon, label, collapsed, active }: NavItemProps) {
  return (
    <Link
      to={to}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-sidebar-foreground transition-all hover:bg-sidebar-accent",
        collapsed ? "justify-center" : "justify-start",
        active && "bg-sidebar-accent font-medium"
      )}
    >
      <Icon className="h-5 w-5" />
      {!collapsed && <span>{label}</span>}
    </Link>
  );
}
