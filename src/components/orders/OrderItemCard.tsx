
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { TrashIcon } from "lucide-react";
import { Control } from "react-hook-form";
import { OrderFormValues } from "@/types/orders";

interface OrderItemCardProps {
  control: Control<OrderFormValues>;
  index: number;
  remove: (index: number) => void;
  canRemove: boolean;
  watch: any;
}

const OrderItemCard = ({ control, index, remove, canRemove, watch }: OrderItemCardProps) => {
  // Calculate item subtotal
  const quantity = watch(`items.${index}.quantity`) || 0;
  const unitPrice = watch(`items.${index}.unit_price`) || 0;
  const subtotal = quantity * unitPrice;
  
  return (
    <Card key={index} className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FormField
          control={control}
          name={`items.${index}.dessert_name`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Dessert Name *</FormLabel>
              <FormControl>
                <Input placeholder="Enter dessert name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={control}
          name={`items.${index}.quantity`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quantity *</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  min="1"
                  placeholder="Enter quantity" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={control}
          name={`items.${index}.unit_price`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Unit Price (ILS) *</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  min="1"
                  step="0.01"
                  placeholder="Enter unit price" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      
      {canRemove && (
        <div className="flex justify-end mt-2">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => remove(index)}
            className="text-red-500 hover:text-red-700 flex items-center gap-1"
          >
            <TrashIcon className="h-4 w-4" /> Remove
          </Button>
        </div>
      )}
      
      <div className="mt-2 text-right text-sm">
        <span className="font-medium">Subtotal:</span> {subtotal.toFixed(2)} ILS
      </div>
    </Card>
  );
};

export default OrderItemCard;
