
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { PlusCircle, Trash2 } from "lucide-react";

export function NewSaleDialog() {
  const [open, setOpen] = useState(false);
  const [customer, setCustomer] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [items, setItems] = useState([
    { product: "", quantity: 1, price: 0, total: 0 }
  ]);

  // Sample product data (in a real app, you would fetch this)
  const products = [
    { id: "1", name: "Samsung Smart TV 43\"", price: 35000 },
    { id: "2", name: "Men's Casual Shirt", price: 1200 },
    { id: "3", name: "Premium Coffee 500g", price: 850 },
  ];

  // Sample customer data (in a real app, you would fetch this)
  const customers = [
    { id: "1", name: "Debora Chavala" },
    { id: "2", name: "Musa Charles" },
    { id: "3", name: "Dickson Lazaro" },
  ];

  const handleProductChange = (index: number, productId: string) => {
    const product = products.find(p => p.id === productId);
    const newItems = [...items];
    
    if (product) {
      newItems[index] = {
        ...newItems[index],
        product: productId,
        price: product.price,
        total: product.price * newItems[index].quantity
      };
    }
    
    setItems(newItems);
  };

  const handleQuantityChange = (index: number, quantity: number) => {
    const newItems = [...items];
    const product = products.find(p => p.id === newItems[index].product);
    
    if (product) {
      newItems[index] = {
        ...newItems[index],
        quantity: quantity,
        total: product.price * quantity
      };
    }
    
    setItems(newItems);
  };

  const addItemRow = () => {
    setItems([...items, { product: "", quantity: 1, price: 0, total: 0 }]);
  };

  const removeItemRow = (index: number) => {
    if (items.length > 1) {
      const newItems = [...items];
      newItems.splice(index, 1);
      setItems(newItems);
    }
  };

  const calculateTotal = () => {
    return items.reduce((sum, item) => sum + item.total, 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send data to your backend
    toast({
      title: "Sale recorded",
      description: `New sale of TSh ${calculateTotal().toLocaleString()} has been recorded.`,
    });
    setOpen(false);
    // Reset the form
    setCustomer("");
    setPaymentMethod("");
    setItems([{ product: "", quantity: 1, price: 0, total: 0 }]);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          New Sale
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Record New Sale</DialogTitle>
          <DialogDescription>
            Add the sale details below.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="customer">Customer</Label>
                <Select value={customer} onValueChange={setCustomer}>
                  <SelectTrigger id="customer">
                    <SelectValue placeholder="Select customer" />
                  </SelectTrigger>
                  <SelectContent>
                    {customers.map(c => (
                      <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                    ))}
                    <SelectItem value="new">+ Add New Customer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="paymentMethod">Payment Method</Label>
                <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                  <SelectTrigger id="paymentMethod">
                    <SelectValue placeholder="Select payment method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cash">Cash</SelectItem>
                    <SelectItem value="mpesa">M-PESA</SelectItem>
                    <SelectItem value="card">Card</SelectItem>
                    <SelectItem value="bank">Bank Transfer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="mt-4">
              <Label>Items</Label>
              <div className="mt-2 space-y-2">
                {items.map((item, index) => (
                  <div key={index} className="flex items-end gap-2">
                    <div className="flex-1">
                      <Label htmlFor={`product-${index}`} className="sr-only">Product</Label>
                      <Select
                        value={item.product}
                        onValueChange={(value) => handleProductChange(index, value)}
                      >
                        <SelectTrigger id={`product-${index}`}>
                          <SelectValue placeholder="Select product" />
                        </SelectTrigger>
                        <SelectContent>
                          {products.map(p => (
                            <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="w-20">
                      <Label htmlFor={`quantity-${index}`} className="sr-only">Quantity</Label>
                      <Input
                        id={`quantity-${index}`}
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(index, parseInt(e.target.value) || 1)}
                      />
                    </div>
                    <div className="w-24">
                      <Label htmlFor={`price-${index}`} className="sr-only">Price</Label>
                      <Input
                        id={`price-${index}`}
                        value={`TSh ${item.price}`}
                        readOnly
                      />
                    </div>
                    <div className="w-24">
                      <Label htmlFor={`total-${index}`} className="sr-only">Total</Label>
                      <Input
                        id={`total-${index}`}
                        value={`TSh ${item.total}`}
                        readOnly
                      />
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeItemRow(index)}
                      disabled={items.length <= 1}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                
                <Button type="button" variant="outline" onClick={addItemRow} className="w-full mt-2">
                  Add Another Item
                </Button>
              </div>
            </div>
            
            <div className="flex justify-end">
              <div className="w-48 text-right">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Total:</span>
                  <span className="text-lg font-bold">
                    TSh {calculateTotal().toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Complete Sale</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
