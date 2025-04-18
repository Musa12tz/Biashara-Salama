
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
import { AddExpenseDialog } from "@/components/dialogs/AddExpenseDialog";
import { FilterMenu } from "@/components/filters/FilterMenu";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Sample expenses data
const initialExpenses = [
  {
    id: 1,
    date: "15 Apr 2025",
    category: "Rent",
    description: "Office space monthly rent",
    amount: 45000,
    paymentMethod: "Bank Transfer",
  },
  {
    id: 2,
    date: "10 Apr 2025",
    category: "Utilities",
    description: "Electricity bill",
    amount: 8700,
    paymentMethod: "M-PESA",
  },
  {
    id: 3,
    date: "8 Apr 2025",
    category: "Salaries",
    description: "Staff salaries for March",
    amount: 120000,
    paymentMethod: "Bank Transfer",
  },
  {
    id: 4,
    date: "5 Apr 2025",
    category: "Transport",
    description: "Delivery vehicles fuel",
    amount: 12500,
    paymentMethod: "Cash",
  },
  {
    id: 5,
    date: "3 Apr 2025",
    category: "Marketing",
    description: "Social media advertising",
    amount: 15000,
    paymentMethod: "M-PESA",
  },
];

// Calculate expense statistics
const calculateCurrentMonthTotal = (expenses: any[]) => {
  // In a real app, this would filter by current month
  return expenses.reduce((sum, expense) => sum + expense.amount, 0);
};

export default function Expenses() {
  const [expenses, setExpenses] = useState(initialExpenses);
  const [searchTerm, setSearchTerm] = useState("");
  const [appliedFilters, setAppliedFilters] = useState<any>({});

  const filteredExpenses = expenses.filter(
    (expense) =>
      expense.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expense.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expense.paymentMethod.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentMonthTotal = calculateCurrentMonthTotal(expenses);

  const handleFilterChange = (filters: any) => {
    setAppliedFilters(filters);
    // In a real app, you would use these filters to query data
    console.log("Applied filters:", filters);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Expenses</h1>
        <AddExpenseDialog />
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              This Month's Expenses
            </CardTitle>
            <CardDescription className="text-2xl font-bold">
              KSh {currentMonthTotal.toLocaleString()}
            </CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Largest Category
            </CardTitle>
            <CardDescription className="text-2xl font-bold">
              Salaries
            </CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Change from Last Month
            </CardTitle>
            <CardDescription className="text-2xl font-bold text-red-500">
              +8.2%
            </CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Average Daily Expense
            </CardTitle>
            <CardDescription className="text-2xl font-bold">
              TSh 6,740
            </CardDescription>
          </CardHeader>
        </Card>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full md:max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search expenses..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <FilterMenu
          onFilterChange={handleFilterChange}
          filterOptions={{
            dateRange: true,
            categories: ["Rent", "Utilities", "Salaries", "Transport", "Marketing", "Office", "Other"]
          }}
        />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Payment Method</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredExpenses.map((expense) => (
              <TableRow key={expense.id}>
                <TableCell>{expense.date}</TableCell>
                <TableCell>
                  <div className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-800">
                    {expense.category}
                  </div>
                </TableCell>
                <TableCell className="max-w-xs truncate">{expense.description}</TableCell>
                <TableCell className="font-medium">
                  TSh {expense.amount.toLocaleString()}
                </TableCell>
                <TableCell>{expense.paymentMethod}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
