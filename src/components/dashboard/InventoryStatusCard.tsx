
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface InventoryItem {
  id: string;
  name: string;
  stock: number;
  capacity: number;
}

interface InventoryStatusCardProps {
  items: InventoryItem[];
  className?: string;
}

export function InventoryStatusCard({ items, className }: InventoryStatusCardProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Inventory Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-5">
          {items.map((item) => {
            const percentage = Math.round((item.stock / item.capacity) * 100);
            let progressColor = "bg-primary";
            
            if (percentage < 20) {
              progressColor = "bg-destructive";
            } else if (percentage < 50) {
              progressColor = "bg-warning-500";
            } else if (percentage > 90) {
              progressColor = "bg-success-500";
            }
            
            return (
              <div key={item.id} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{item.name}</span>
                  <span className="text-muted-foreground">
                    {item.stock} / {item.capacity}
                  </span>
                </div>
                <Progress
                  value={percentage}
                  className={progressColor}
                />
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
