
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
import { Search, Filter, UserPlus } from "lucide-react";
import { AddSupplierDialog } from "@/components/dialogs/AddSupplierDialog";
import { FilterMenu } from "@/components/filters/FilterMenu";

const initialSuppliers = [
  {
    id: 1,
    name: "Space Button Ltd",
    contact: "John Kamau",
    email: "john@wholesalers.com",
    phone: "+255 712 345 678",
    status: "Active",
    lastOrder: "15 Apr 2025",
  },
  {
    id: 2,
    name: "Jambo Co.",
    contact: "Sarah Damiano",
    email: "sarah@imports.com",
    phone: "+255 723 456 789",
    status: "Active",
    lastOrder: "10 Apr 2025",
  },
  {
    id: 3,
    name: "Mo Ltd",
    contact: "Daniel Sheka",
    email: "daniel@dist.com",
    phone: "+255 734 567 890",
    status: "Inactive",
    lastOrder: "5 Mar 2025",
  },
  {
    id: 4,
    name: "Eldoret Supply Chain",
    contact: "Mercy Kiprop",
    email: "mercy@eldoretsupply.com",
    phone: "+255 745 678 901",
    status: "Active",
    lastOrder: "8 Apr 2025",
  },
];

export default function Suppliers() {
  const [suppliers, setSuppliers] = useState(initialSuppliers);
  const [searchTerm, setSearchTerm] = useState("");
  const [appliedFilters, setAppliedFilters] = useState<any>({});

  const filteredSuppliers = suppliers.filter(
    (supplier) =>
      supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleFilterChange = (filters: any) => {
    setAppliedFilters(filters);
    // In a real app, you would use these filters to query data
    console.log("Applied filters:", filters);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Suppliers</h1>
        <AddSupplierDialog />
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full md:max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search suppliers..."
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
              <TableHead>Supplier Name</TableHead>
              <TableHead>Contact Person</TableHead>
              <TableHead>Contact Information</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Order</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSuppliers.map((supplier) => (
              <TableRow key={supplier.id}>
                <TableCell className="font-medium">{supplier.name}</TableCell>
                <TableCell>{supplier.contact}</TableCell>
                <TableCell>
                  <div>{supplier.email}</div>
                  <div className="text-sm text-muted-foreground">
                    {supplier.phone}
                  </div>
                </TableCell>
                <TableCell>
                  <div
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                      supplier.status === "Active"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {supplier.status}
                  </div>
                </TableCell>
                <TableCell>{supplier.lastOrder}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
