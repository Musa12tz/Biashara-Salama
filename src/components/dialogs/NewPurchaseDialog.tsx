
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
import { ShoppingCart, Trash2 } from "lucide-react";

export function NewPurchaseDialog() {
  const [open, setOpen] = useState(false);
  const [supplier, setSupplier] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [items, setItems] = useState([
    { product: "", quantity: 1, price: 0, total: 0 }
  ]);

  // Sample product data (in a real app, you would fetch this)
  const products = [
    { id: "1", name: "Daftari", price: 2800 },
    { id: "2", name: "Pipi", price: 800 },
    { id: "3", name: "Biscuits", price: 600 },
  ];

  // Sample supplier data (in a real app, you would fetch this)
  const suppliers = [
    { id: "1", name: "Space Button Ltd" },
    { id: "2", name: "Jambo Ltd" },
    { id: "3", name: "Mo Ltd" },
  ];

  const handleProductChange = (index: number, productId: string) => {
    const product = products.find(p => p.id === productId);
    const newItems = [...items];
    
    if (product) {
      newItems[index] = {
        ...newItems[index],
        product: productId,
        price: product.price * 0.8, // Example purchase price (80% of retail)
        total: product.price * 0.8 * newItems[index].quantity
      };
    }
    
    setItems(newItems);
  };

  const handleQuantityChange = (index: number, quantity: number) => {
    const newItems = [...items];
    
    newItems[index] = {
      ...newItems[index],
      quantity: quantity,
      total: newItems[index].price * quantity
    };
    
    setItems(newItems);
  };

  const handlePriceChange = (index: number, price: number) => {
    const newItems = [...items];
    
    newItems[index] = {
      ...newItems[index],
      price: price,
      total: price * newItems[index].quantity
    };
    
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
      title: "Purchase recorded",
      description: `New purchase of KSh ${calculateTotal().toLocaleString()} has been recorded.`,
    });
    setOpen(false);
    // Reset the form
    setSupplier("");
    setInvoiceNumber("");
    setItems([{ product: "", quantity: 1, price: 0, total: 0 }]);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <ShoppingCart className="mr-2 h-4 w-4" />
          New Purchase
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Record New Purchase</DialogTitle>
          <DialogDescription>
            Add the purchase details below.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="supplier">Supplier</Label>
                <Select value={supplier} onValueChange={setSupplier}>
                  <SelectTrigger id="supplier">
                    <SelectValue placeholder="Select supplier" />
                  </SelectTrigger>
                  <SelectContent>
                    {suppliers.map(s => (
                      <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>
                    ))}
                    <SelectItem value="new">+ Add New Supplier</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="invoiceNumber">Invoice Number</Label>
                <Input
                  id="invoiceNumber"
                  value={invoiceNumber}
                  onChange={(e) => setInvoiceNumber(e.target.value)}
                  required
                />
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
                      <Label htmlFor={`price-${index}`} className="sr-only">Unit Price</Label>
                      <Input
                        id={`price-${index}`}
                        type="number"
                        min="0"
                        value={item.price}
                        onChange={(e) => handlePriceChange(index, parseFloat(e.target.value) || 0)}
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
                    KSh {calculateTotal().toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Record Purchase</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
