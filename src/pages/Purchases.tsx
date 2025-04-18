
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
import { NewPurchaseDialog } from "@/components/dialogs/NewPurchaseDialog";
import { FilterMenu } from "@/components/filters/FilterMenu";

const initialPurchases = [
  {
    id: 1,
    supplier: "Space Button Ltd",
    date: "15 Apr 2025",
    amount: 125000,
    status: "Received",
    invoice: "INV-2025-041",
    items: 24,
  },
  {
    id: 2,
    supplier: "jambo  Co.",
    date: "10 Apr 2025",
    amount: 78500,
    status: "Pending",
    invoice: "INV-2025-038",
    items: 15,
  },
  {
    id: 3,
    supplier: "John Emmanuel",
    date: "5 Apr 2025",
    amount: 45200,
    status: "Received",
    invoice: "INV-2025-027",
    items: 8,
  },
  {
    id: 4,
    supplier: "Eldoret Supply Chain",
    date: "8 Apr 2025",
    amount: 92300,
    status: "Received",
    invoice: "INV-2025-035",
    items: 19,
  },
];

export default function Purchases() {
  const [purchases, setPurchases] = useState(initialPurchases);
  const [searchTerm, setSearchTerm] = useState("");
  const [appliedFilters, setAppliedFilters] = useState<any>({});

  const filteredPurchases = purchases.filter(
    (purchase) =>
      purchase.supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
      purchase.invoice.toLowerCase().includes(searchTerm.toLowerCase()) ||
      purchase.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleFilterChange = (filters: any) => {
    setAppliedFilters(filters);
    // In a real app, you would use these filters to query data
    console.log("Applied filters:", filters);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Purchases</h1>
        <NewPurchaseDialog />
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full md:max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search purchases..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <FilterMenu 
          onFilterChange={handleFilterChange}
          filterOptions={{
            dateRange: true,
            statuses: ["Received", "Pending", "Cancelled"],
            suppliers: true
          }}
        />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Invoice</TableHead>
              <TableHead>Supplier</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPurchases.map((purchase) => (
              <TableRow key={purchase.id}>
                <TableCell className="font-medium">{purchase.invoice}</TableCell>
                <TableCell>{purchase.supplier}</TableCell>
                <TableCell>{purchase.date}</TableCell>
                <TableCell>TSh {purchase.amount.toLocaleString()}</TableCell>
                <TableCell>{purchase.items}</TableCell>
                <TableCell>
                  <div
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                      purchase.status === "Received"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {purchase.status}
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
