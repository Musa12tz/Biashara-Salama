
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
import { Search, Filter, Download } from "lucide-react";
import { NewSaleDialog } from "@/components/dialogs/NewSaleDialog";
import { FilterMenu } from "@/components/filters/FilterMenu";

// Sample sales data
const initialSales = [
  {
    id: "ORD-2025-001",
    customer: "Sarah Johnson",
    date: "15 Apr 2025",
    status: "Completed",
    payment: "M-PESA",
    amount: "TSH 12,500",
  },
  {
    id: "ORD-2025-002",
    customer: "Michael John",
    date: "14 Apr 2025",
    status: "Processing",
    payment: "Cash",
    amount: "TSH 8,750",
  },
  {
    id: "ORD-2025-003",
    customer: "Sarah Damiano",
    date: "12 Apr 2025",
    status: "Completed",
    payment: "M-PESA",
    amount: "TSH 5,200",
  },
  {
    id: "ORD-2025-004",
    customer: "Daniel Kimani",
    date: "10 Apr 2025",
    status: "Pending",
    payment: "Bank Transfer",
    amount: "TSH 25,000",
  },
  {
    id: "ORD-2025-005",
    customer: "Lucy Robert",
    date: "8 Apr 2025",
    status: "Completed",
    payment: "M-PESA",
    amount: "TSH 4,300",
  },
];

export default function Sales() {
  const [sales, setSales] = useState(initialSales);
  const [searchTerm, setSearchTerm] = useState("");
  const [appliedFilters, setAppliedFilters] = useState<any>({});

  const filteredSales = sales.filter(
    (sale) =>
      sale.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sale.customer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800";
      case "Processing":
        return "bg-blue-100 text-blue-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleFilterChange = (filters: any) => {
    setAppliedFilters(filters);
    // In a real app, you would use these filters to query data
    console.log("Applied filters:", filters);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Sales</h1>
        <NewSaleDialog />
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <div className="rounded-lg border bg-card p-4 shadow-sm">
          <h3 className="text-sm font-medium text-muted-foreground">
            Today's Sales
          </h3>
          <p className="mt-2 text-2xl font-bold">TSH 24,500</p>
          <p className="text-xs text-green-600">+15% from yesterday</p>
        </div>
        <div className="rounded-lg border bg-card p-4 shadow-sm">
          <h3 className="text-sm font-medium text-muted-foreground">This Week</h3>
          <p className="mt-2 text-2xl font-bold">TSH 145,750</p>
          <p className="text-xs text-green-600">+8% from last week</p>
        </div>
        <div className="rounded-lg border bg-card p-4 shadow-sm">
          <h3 className="text-sm font-medium text-muted-foreground">
            This Month
          </h3>
          <p className="mt-2 text-2xl font-bold">TSH 487,200</p>
          <p className="text-xs text-green-600">+12% from last month</p>
        </div>
        <div className="rounded-lg border bg-card p-4 shadow-sm">
          <h3 className="text-sm font-medium text-muted-foreground">
            Avg. Order Value
          </h3>
          <p className="mt-2 text-2xl font-bold">TSH 8,450</p>
          <p className="text-xs text-green-600">+4% from last month</p>
        </div>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search orders..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <FilterMenu 
            onFilterChange={handleFilterChange} 
            filterOptions={{
              dateRange: true,
              statuses: ["Completed", "Processing", "Pending"],
              customers: true
            }}
          />
          <Button variant="outline" size="sm" className="sm:w-auto">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Payment</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSales.map((sale) => (
              <TableRow key={sale.id}>
                <TableCell className="font-medium">{sale.id}</TableCell>
                <TableCell>{sale.customer}</TableCell>
                <TableCell>{sale.date}</TableCell>
                <TableCell>
                  <div
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${getStatusColor(
                      sale.status
                    )}`}
                  >
                    {sale.status}
                  </div>
                </TableCell>
                <TableCell>{sale.payment}</TableCell>
                <TableCell className="text-right">{sale.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
