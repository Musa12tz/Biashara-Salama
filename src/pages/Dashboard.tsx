
import { BarChart3, CircleDollarSign, Package, ShoppingCart, Users } from "lucide-react";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { RecentSalesCard } from "@/components/dashboard/RecentSalesCard";
import { SalesChart } from "@/components/dashboard/SalesChart";
import { InventoryStatusCard } from "@/components/dashboard/InventoryStatusCard";

// Sample data for dashboard
const salesChartData = [
  { name: "Jan", total: 26000 },
  { name: "Feb", total: 14000 },
  { name: "Mar", total: 22000 },
  { name: "Apr", total: 21000 },
  { name: "May", total: 37000 },
  { name: "Jun", total: 23000 },
  { name: "Jul", total: 30000 },
];

const recentSales = [
  {
    id: "1",
    customer: {
      name: "Musa Charles",
      email: "lazaromusa23@gmail.com",
    },
    amount: 2500,
    date: "Just now",
  },
  {
    id: "2",
    customer: {
      name: "Mwajuma Ally",
      email: "allymwajuma17@gmail.com",
    },
    amount: 3200,
    date: "2 hours ago",
  },
  {
    id: "3",
    customer: {
      name: "Khamis Shaban",
      email: "shabankhamis73@gmail.com",
    },
    amount: 1800,
    date: "5 hours ago",
  },
  {
    id: "4",
    customer: {
      name: "Sarah Williams",
      email: "williamssarah869@gmail.com",
    },
    amount: 4200,
    date: "Yesterday",
  },
];

const inventoryItems = [
  {
    id: "1",
    name: "Product A",
    stock: 45,
    capacity: 50,
  },
  {
    id: "2",
    name: "Product B",
    stock: 12,
    capacity: 100,
  },
  {
    id: "3",
    name: "Product C",
    stock: 25,
    capacity: 30,
  },
  {
    id: "4",
    name: "Product D",
    stock: 5,
    capacity: 50,
  },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <div className="mb-6 bg-kuza-600 text-white p-6 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Welcome to Biashara Salama Manager</h1>
          <p className="text-white/90">
            Your complete business management solution. Track inventory, sales, finances, and more.
          </p>
        </div>
        <h2 className="text-2xl font-bold tracking-tight">Business Overview</h2>
        <p className="text-muted-foreground">
          Key metrics and performance at a glance
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Revenue"
          value="TSH 158,400"
          description="↗︎ +8% from last month"
          icon={CircleDollarSign}
          trend={8}
          trendColor="up"
        />
        <StatsCard
          title="Sales"
          value="285"
          description="+12% from last month"
          icon={ShoppingCart}
          trend={12}
          trendColor="up"
        />
        <StatsCard
          title="Inventory Items"
          value="48"
          description="4 items low in stock"
          icon={Package}
          trend={-2}
          trendColor="down"
        />
        <StatsCard
          title="Active Customers"
          value="126"
          description="+10 new this month"
          icon={Users}
          trend={10}
          trendColor="up"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <SalesChart data={salesChartData} className="lg:col-span-4" />
        <InventoryStatusCard items={inventoryItems} className="lg:col-span-3" />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <RecentSalesCard sales={recentSales} />
        
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Button className="flex flex-col h-24 items-center justify-center gap-1">
                <Package size={24} />
                <span>Add Product</span>
              </Button>
              <Button className="flex flex-col h-24 items-center justify-center gap-1">
                <ShoppingCart size={24} />
                <span>New Sale</span>
              </Button>
              <Button className="flex flex-col h-24 items-center justify-center gap-1">
                <Users size={24} />
                <span>Add Customer</span>
              </Button>
              <Button className="flex flex-col h-24 items-center justify-center gap-1">
                <BarChart3 size={24} />
                <span>View Reports</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Import these components to avoid TypeScript errors
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
