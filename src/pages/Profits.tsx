
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Sample profit data
const monthlyData = [
  { name: "Jan", revenue: 450000, expenses: 320000, profit: 130000 },
  { name: "Feb", revenue: 520000, expenses: 350000, profit: 170000 },
  { name: "Mar", revenue: 480000, expenses: 310000, profit: 170000 },
  { name: "Apr", revenue: 560000, expenses: 330000, profit: 230000 },
  { name: "May", revenue: 620000, expenses: 380000, profit: 240000 },
  { name: "Jun", revenue: 590000, expenses: 340000, profit: 250000 },
  { name: "Jul", revenue: 640000, expenses: 360000, profit: 280000 },
  { name: "Aug", revenue: 580000, expenses: 320000, profit: 260000 },
  { name: "Sep", revenue: 670000, expenses: 370000, profit: 300000 },
  { name: "Oct", revenue: 710000, expenses: 390000, profit: 320000 },
  { name: "Nov", revenue: 730000, expenses: 410000, profit: 320000 },
  { name: "Dec", revenue: 800000, expenses: 460000, profit: 340000 },
];

const categoryProfitData = [
  { name: "Electronics", profit: 180000 },
  { name: "Clothing", profit: 120000 },
  { name: "Groceries", profit: 90000 },
  { name: "Home Goods", profit: 110000 },
  { name: "Beauty", profit: 70000 },
];

export default function Profits() {
  const [timeRange, setTimeRange] = useState("year");

  // Calculate profit statistics
  const totalRevenue = monthlyData.reduce((sum, item) => sum + item.revenue, 0);
  const totalExpenses = monthlyData.reduce((sum, item) => sum + item.expenses, 0);
  const totalProfit = monthlyData.reduce((sum, item) => sum + item.profit, 0);
  const profitMargin = Math.round((totalProfit / totalRevenue) * 100);

  const chartConfig = {
    revenue: {
      label: "Revenue",
      color: "#8884d8",
    },
    expenses: {
      label: "Expenses",
      color: "#ff7300",
    },
    profit: {
      label: "Profit",
      color: "#82ca9d",
    },
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Profit Analysis</h1>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Time Range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="month">This Month</SelectItem>
            <SelectItem value="quarter">This Quarter</SelectItem>
            <SelectItem value="year">This Year</SelectItem>
            <SelectItem value="all">All Time</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <CardDescription className="text-2xl font-bold">
              KSh {totalRevenue.toLocaleString()}
            </CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Total Expenses
            </CardTitle>
            <CardDescription className="text-2xl font-bold">
              KSh {totalExpenses.toLocaleString()}
            </CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Net Profit</CardTitle>
            <CardDescription className="text-2xl font-bold text-green-600">
              KSh {totalProfit.toLocaleString()}
            </CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Profit Margin</CardTitle>
            <CardDescription className="text-2xl font-bold">
              {profitMargin}%
            </CardDescription>
          </CardHeader>
        </Card>
      </div>

      {/* Profit Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Revenue, Expenses & Profit</CardTitle>
            <CardDescription>
              {timeRange === "year" ? "Monthly breakdown for this year" : "Breakdown for selected period"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[350px]">
              <ChartContainer config={chartConfig}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={monthlyData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Bar dataKey="revenue" name="revenue" stackId="a" fill="#8884d8" />
                    <Bar dataKey="expenses" name="expenses" stackId="a" fill="#ff7300" />
                    <Bar dataKey="profit" name="profit" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Profit Trend</CardTitle>
            <CardDescription>
              Monthly profit trend over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[350px]">
              <ChartContainer config={chartConfig}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={monthlyData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="profit"
                      name="profit"
                      stroke="#82ca9d"
                      strokeWidth={2}
                      activeDot={{ r: 8 }}
                    />
                    <Line type="monotone" dataKey="revenue" name="revenue" stroke="#8884d8" />
                    <Line type="monotone" dataKey="expenses" name="expenses" stroke="#ff7300" />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Profit by Category</CardTitle>
            <CardDescription>
              Breakdown of profit by product category
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[350px]">
              <ChartContainer config={chartConfig}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={categoryProfitData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    layout="vertical"
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Bar dataKey="profit" name="profit" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
