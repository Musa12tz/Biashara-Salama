
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
import { AddProductDialog } from "@/components/dialogs/AddProductDialog";
import { FilterMenu } from "@/components/filters/FilterMenu";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const initialStocks = [
  {
    id: 1,
    sku: "EL-001",
    name: "Samsung Smart TV 43\"",
    category: "Electronics",
    inStock: 8,
    reorderLevel: 5,
    unitPrice: 35000,
    totalValue: 280000,
  },
  {
    id: 2,
    sku: "CL-012",
    name: "Men's Casual Shirt",
    category: "Clothing",
    inStock: 45,
    reorderLevel: 20,
    unitPrice: 1200,
    totalValue: 54000,
  },
  {
    id: 3,
    sku: "GR-034",
    name: "Premium Coffee 500g",
    category: "Groceries",
    inStock: 30,
    reorderLevel: 15,
    unitPrice: 850,
    totalValue: 25500,
  },
  {
    id: 4,
    sku: "HG-023",
    name: "Kitchen Blender",
    category: "Home Goods",
    inStock: 12,
    reorderLevel: 8,
    unitPrice: 4500,
    totalValue: 54000,
  },
  {
    id: 5,
    sku: "BE-045",
    name: "Facial Cream 150ml",
    category: "Beauty",
    inStock: 25,
    reorderLevel: 10,
    unitPrice: 1800,
    totalValue: 45000,
  },
];

export default function Stocks() {
  const [stocks, setStocks] = useState(initialStocks);
  const [searchTerm, setSearchTerm] = useState("");
  const [appliedFilters, setAppliedFilters] = useState<any>({});

  const filteredStocks = stocks.filter(
    (stock) =>
      stock.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stock.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stock.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate total inventory value
  const totalInventoryValue = stocks.reduce(
    (sum, stock) => sum + stock.totalValue,
    0
  );

  // Count low stock items
  const lowStockItems = stocks.filter(
    (stock) => stock.inStock <= stock.reorderLevel
  ).length;

  // Count categories
  const categories = [...new Set(stocks.map((stock) => stock.category))].length;

  const handleFilterChange = (filters: any) => {
    setAppliedFilters(filters);
    // In a real app, you would use these filters to query data
    console.log("Applied filters:", filters);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Stock Inventory</h1>
        <AddProductDialog />
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="space-y-1">
              <CardTitle className="text-sm font-medium">
                Total Products
              </CardTitle>
              <CardDescription className="text-xl font-bold">
                {stocks.length}
              </CardDescription>
            </div>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="space-y-1">
              <CardTitle className="text-sm font-medium">
                Inventory Value
              </CardTitle>
              <CardDescription className="text-xl font-bold">
                KSh {totalInventoryValue.toLocaleString()}
              </CardDescription>
            </div>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="space-y-1">
              <CardTitle className="text-sm font-medium">
                Low Stock Items
              </CardTitle>
              <CardDescription className="text-xl font-bold">
                {lowStockItems}
              </CardDescription>
            </div>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="space-y-1">
              <CardTitle className="text-sm font-medium">Categories</CardTitle>
              <CardDescription className="text-xl font-bold">
                {categories}
              </CardDescription>
            </div>
          </CardHeader>
        </Card>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full md:max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <FilterMenu 
          onFilterChange={handleFilterChange}
          filterOptions={{
            categories: ["Electronics", "Clothing", "Groceries", "Home Goods", "Beauty"]
          }}
        />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>SKU</TableHead>
              <TableHead>Product Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>In Stock</TableHead>
              <TableHead>Reorder Level</TableHead>
              <TableHead>Unit Price</TableHead>
              <TableHead>Total Value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStocks.map((stock) => (
              <TableRow key={stock.id}>
                <TableCell>{stock.sku}</TableCell>
                <TableCell className="font-medium">{stock.name}</TableCell>
                <TableCell>{stock.category}</TableCell>
                <TableCell
                  className={
                    stock.inStock <= stock.reorderLevel
                      ? "text-red-600 font-medium"
                      : ""
                  }
                >
                  {stock.inStock}
                </TableCell>
                <TableCell>{stock.reorderLevel}</TableCell>
                <TableCell>TSh {stock.unitPrice.toLocaleString()}</TableCell>
                <TableCell>TSh {stock.totalValue.toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
