
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Filter, Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

interface FilterMenuProps {
  onFilterChange?: (filters: any) => void;
  filterOptions?: {
    categories?: string[];
    statuses?: string[];
    dateRange?: boolean;
    suppliers?: boolean;
    customers?: boolean;
  };
}

export function FilterMenu({ 
  onFilterChange,
  filterOptions = {
    categories: [],
    statuses: [],
    dateRange: true,
    suppliers: false,
    customers: false,
  }
}: FilterMenuProps) {
  const [open, setOpen] = useState(false);
  const [dateFrom, setDateFrom] = useState<Date | undefined>();
  const [dateTo, setDateTo] = useState<Date | undefined>();
  const [category, setCategory] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [supplier, setSupplier] = useState<string>("");
  const [customer, setCustomer] = useState<string>("");

  const handleApplyFilter = () => {
    if (onFilterChange) {
      onFilterChange({
        dateFrom,
        dateTo,
        category,
        status,
        supplier,
        customer
      });
    }
    setOpen(false);
  };

  const handleResetFilters = () => {
    setDateFrom(undefined);
    setDateTo(undefined);
    setCategory("");
    setStatus("");
    setSupplier("");
    setCustomer("");
    if (onFilterChange) {
      onFilterChange({});
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          Filter
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-4">
        <h4 className="font-medium mb-2">Filter</h4>
        <div className="space-y-4">
          {filterOptions.dateRange && (
            <div className="space-y-2">
              <h5 className="text-sm font-medium">Date Range</h5>
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <Label htmlFor="date-from" className="text-xs">From</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        id="date-from"
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal text-xs",
                          !dateFrom && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-3 w-3" />
                        {dateFrom ? format(dateFrom, "PP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={dateFrom}
                        onSelect={setDateFrom}
                        initialFocus
                        className={cn("p-3 pointer-events-auto")}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="date-to" className="text-xs">To</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        id="date-to"
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal text-xs",
                          !dateTo && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-3 w-3" />
                        {dateTo ? format(dateTo, "PP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={dateTo}
                        onSelect={setDateTo}
                        initialFocus
                        className={cn("p-3 pointer-events-auto")}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </div>
          )}

          {filterOptions.categories && filterOptions.categories.length > 0 && (
            <div className="space-y-1">
              <Label htmlFor="category" className="text-xs">Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger id="category">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Categories</SelectItem>
                  {filterOptions.categories.map(cat => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {filterOptions.statuses && filterOptions.statuses.length > 0 && (
            <div className="space-y-1">
              <Label htmlFor="status" className="text-xs">Status</Label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger id="status">
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Statuses</SelectItem>
                  {filterOptions.statuses.map(stat => (
                    <SelectItem key={stat} value={stat}>{stat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {filterOptions.suppliers && (
            <div className="space-y-1">
              <Label htmlFor="supplier" className="text-xs">Supplier</Label>
              <Select value={supplier} onValueChange={setSupplier}>
                <SelectTrigger id="supplier">
                  <SelectValue placeholder="All Suppliers" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Suppliers</SelectItem>
                  <SelectItem value="1">Space Button Ltd</SelectItem>
                  <SelectItem value="2">Jambo  Co.</SelectItem>
                  <SelectItem value="3">Mo Ltd</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {filterOptions.customers && (
            <div className="space-y-1">
              <Label htmlFor="customer" className="text-xs">Customer</Label>
              <Select value={customer} onValueChange={setCustomer}>
                <SelectTrigger id="customer">
                  <SelectValue placeholder="All Customers" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Customers</SelectItem>
                  <SelectItem value="1">Debora Chavala</SelectItem>
                  <SelectItem value="2">Musa Charles</SelectItem>
                  <SelectItem value="3">Dickson Lazaro</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          <Separator />
          
          <div className="flex justify-between">
            <Button variant="outline" size="sm" onClick={handleResetFilters}>
              Reset
            </Button>
            <Button size="sm" onClick={handleApplyFilter}>
              Apply Filters
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
