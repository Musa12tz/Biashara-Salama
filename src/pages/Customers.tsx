
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search } from "lucide-react";
import { AddCustomerDialog } from "@/components/dialogs/AddCustomerDialog";
import { FilterMenu } from "@/components/filters/FilterMenu";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const initialCustomers = [
  {
    id: 1,
    name: "Debora Chavala",
    email: "chavaladebora@gmail.com",
    phone: "+255 712 345 678",
    orders: 12,
    totalSpent: 68500,
    lastOrder: "15 Apr 2025",
    status: "Active",
  },
  {
    id: 2,
    name: "Musa Charles",
    email: "lazaromusa23@gmail.com",
    phone: "+255 723 456 789",
    orders: 8,
    totalSpent: 42300,
    lastOrder: "10 Apr 2025",
    status: "Active",
  },
  {
    id: 3,
    name: "Dickson Lazaro",
    email: "lazarodickson@45gmail.com",
    phone: "+255 734 567 890",
    orders: 5,
    totalSpent: 28000,
    lastOrder: "5 Apr 2025",
    status: "Active",
  },
  {
    id: 4,
    name: "Lispel Lazaro",
    email: "lazarolispel@30gmail.com",
    phone: "+255 745 678 901",
    orders: 3,
    totalSpent: 15200,
    lastOrder: "1 Apr 2025",
    status: "Inactive",
  },
];

export default function Customers() {
  const [customers, setCustomers] = useState(initialCustomers);
  const [searchTerm, setSearchTerm] = useState("");
  const [appliedFilters, setAppliedFilters] = useState<any>({});

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm)
  );

  // Calculate customer statistics
  const totalCustomers = customers.length;
  const activeCustomers = customers.filter(c => c.status === "Active").length;
  const avgOrderValue = Math.round(
    customers.reduce((sum, c) => sum + c.totalSpent, 0) / 
    customers.reduce((sum, c) => sum + c.orders, 0)
  );

  const handleFilterChange = (filters: any) => {
    setAppliedFilters(filters);
    // In a real app, you would use these filters to query data
    console.log("Applied filters:", filters);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Customers</h1>
        <AddCustomerDialog />
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
            <CardDescription className="text-2xl font-bold">
              {totalCustomers}
            </CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Active Customers
            </CardTitle>
            <CardDescription className="text-2xl font-bold">
              {activeCustomers} <span className="text-sm font-normal text-muted-foreground">({Math.round(activeCustomers/totalCustomers*100)}%)</span>
            </CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Avg. Order Value
            </CardTitle>
            <CardDescription className="text-2xl font-bold">
              TSh {avgOrderValue.toLocaleString()}
            </CardDescription>
          </CardHeader>
        </Card>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full md:max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search customers..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <FilterMenu 
          onFilterChange={handleFilterChange}
          filterOptions={{
            dateRange: true,
            statuses: ["Active", "Inactive"]
          }}
        />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer Name</TableHead>
              <TableHead>Contact Information</TableHead>
              <TableHead>Orders</TableHead>
              <TableHead>Total Spent</TableHead>
              <TableHead>Last Order</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCustomers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell className="font-medium">{customer.name}</TableCell>
                <TableCell>
                  <div>{customer.email}</div>
                  <div className="text-sm text-muted-foreground">
                    {customer.phone}
                  </div>
                </TableCell>
                <TableCell>{customer.orders}</TableCell>
                <TableCell>TSh {customer.totalSpent.toLocaleString()}</TableCell>
                <TableCell>{customer.lastOrder}</TableCell>
                <TableCell>
                  <div
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                      customer.status === "Active"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {customer.status}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
