
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  PlusCircle, 
  Download, 
  ArrowUpRight, 
  ArrowDownLeft,
  ChevronUp,
  ChevronDown
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";

// Sample finance data
const transactions = [
  {
    id: "TRX-2025-001",
    type: "Income",
    description: "Sales Revenue",
    date: "15 Apr 2025",
    amount: "TSH +38,500",
  },
  {
    id: "TRX-2025-002",
    type: "Expense",
    description: "Inventory Purchase",
    date: "14 Apr 2025",
    amount: "TSH -18,750",
  },
  {
    id: "TRX-2025-003",
    type: "Income",
    description: "Sales Revenue",
    date: "12 Apr 2025",
    amount: "TSH +25,200",
  },
  {
    id: "TRX-2025-004",
    type: "Expense",
    description: "Rent Payment",
    date: "10 Apr 2025",
    amount: "TSH -15,000",
  },
  {
    id: "TRX-2025-005",
    type: "Expense",
    description: "Utilities",
    date: "8 Apr 2025",
    amount: "TSH -4,300",
  },
];

const chartData = [
  { name: 'Jan', income: 24500, expenses: 18000 },
  { name: 'Feb', income: 28000, expenses: 19200 },
  { name: 'Mar', income: 32000, expenses: 21500 },
  { name: 'Apr', income: 35500, expenses: 22000 },
  { name: 'May', income: 38000, expenses: 23500 },
  { name: 'Jun', income: 42000, expenses: 25000 },
];

export default function Finances() {
  const [period, setPeriod] = useState("month");
  
  const chartConfig = {
    income: {
      label: "Income",
      color: "#10b981", // green-500
    },
    expenses: {
      label: "Expenses",
      color: "#ef4444", // red-500
    },
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Finances</h1>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            New Transaction
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Revenue</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">TSH 142,500</div>
              <div className="flex items-center text-green-600">
                <ChevronUp className="h-4 w-4" />
                <span className="text-xs">+15%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Expenses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">KSH 87,750</div>
              <div className="flex items-center text-red-600">
                <ChevronDown className="h-4 w-4" />
                <span className="text-xs">+8%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Net Profit</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">TSH 54,750</div>
              <div className="flex items-center text-green-600">
                <ChevronUp className="h-4 w-4" />
                <span className="text-xs">+12%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Outstanding Invoices</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">TSH 32,450</div>
              <div className="flex items-center text-red-600">
                <ChevronDown className="h-4 w-4" />
                <span className="text-xs">-4%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle>Financial Overview</CardTitle>
            <Select value={period} onValueChange={setPeriod}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="quarter">This Quarter</SelectItem>
                <SelectItem value="year">This Year</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ChartContainer config={chartConfig}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <ChartTooltip 
                    content={<ChartTooltipContent />} 
                  />
                  <Bar dataKey="income" fill="#10b981" name="income" />
                  <Bar dataKey="expenses" fill="#ef4444" name="expenses" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>

      <div>
        <h2 className="mb-4 text-xl font-semibold">Recent Transactions</h2>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Transaction ID</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell className="font-medium">{transaction.id}</TableCell>
                  <TableCell>
                    {transaction.type === "Income" ? (
                      <span className="inline-flex items-center text-green-600">
                        <ArrowUpRight className="mr-1 h-4 w-4" />
                        {transaction.type}
                      </span>
                    ) : (
                      <span className="inline-flex items-center text-red-600">
                        <ArrowDownLeft className="mr-1 h-4 w-4" />
                        {transaction.type}
                      </span>
                    )}
                  </TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell className={`text-right ${transaction.amount.includes('+') ? 'text-green-600' : 'text-red-600'}`}>
                    {transaction.amount}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
