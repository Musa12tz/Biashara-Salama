
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Sale {
  id: string;
  customer: {
    name: string;
    email: string;
    avatarUrl?: string;
  };
  amount: number;
  date: string;
}

interface RecentSalesCardProps {
  sales: Sale[];
}

export function RecentSalesCard({ sales }: RecentSalesCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Sales</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {sales.map((sale) => (
            <div key={sale.id} className="flex items-center gap-4">
              <Avatar>
                <AvatarImage src={sale.customer.avatarUrl} />
                <AvatarFallback>
                  {sale.customer.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <p className="font-medium leading-none">{sale.customer.name}</p>
                <p className="text-sm text-muted-foreground">
                  {sale.customer.email}
                </p>
              </div>
              <div className="text-right">
                <p className="font-medium">TSH {sale.amount.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">{sale.date}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
