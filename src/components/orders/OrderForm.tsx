
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { OrderFormValues } from "@/types/orders";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, Clock, PlusIcon, TrashIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";

interface OrderFormProps {
  onSubmit: (values: OrderFormValues) => void;
  isSubmitting: boolean;
  onCancel: () => void;
  initialValues?: Partial<OrderFormValues>;
}

// Order item schema
const orderItemSchema = z.object({
  dessert_name: z.string().min(1, "Dessert name is required"),
  quantity: z.coerce.number().min(1, "Quantity must be at least 1"),
  unit_price: z.coerce.number().min(1, "Unit price must be at least 1 ILS"),
});

// Form validation schema
const orderSchema = z.object({
  clientName: z.string().min(2, "Client name is required and must be at least 2 characters"),
  items: z.array(orderItemSchema).min(1, "At least one dessert item is required"),
  deliveryDate: z.string().refine(
    (date) => {
      const selectedDate = new Date(date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return selectedDate >= today;
    },
    { message: "Delivery date cannot be in the past" }
  ),
  deliveryTime: z.string().optional(),
  status: z.enum(['pending', 'in_progress', 'completed', 'cancelled']).default('pending'),
  notes: z.string().optional(),
});

const OrderForm = ({ onSubmit, isSubmitting, onCancel, initialValues }: OrderFormProps) => {
  // Get today's date for date validation
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  // Format today as ISO string for min date
  const todayStr = today.toISOString().split('T')[0];

  const form = useForm<OrderFormValues>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      clientName: initialValues?.clientName || "",
      items: initialValues?.items || [{ dessert_name: "", quantity: 1, unit_price: 0 }],
      deliveryDate: initialValues?.deliveryDate || todayStr,
      deliveryTime: initialValues?.deliveryTime || "",
      status: initialValues?.status || "pending",
      notes: initialValues?.notes || ""
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "items",
  });

  // Calculate total price from all items
  const calculateTotal = () => {
    const items = form.getValues("items");
    return items.reduce((sum, item) => {
      return sum + (item.quantity * item.unit_price || 0);
    }, 0);
  };

  // Update total when items change
  const [totalPrice, setTotalPrice] = useState(calculateTotal());

  // Update total price when form values change
  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name?.startsWith('items')) {
        setTotalPrice(calculateTotal());
      }
    });
    return () => subscription.unsubscribe();
  }, [form.watch]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="clientName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Client Name *</FormLabel>
              <FormControl>
                <Input placeholder="Enter client name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-medium">Dessert Items *</h3>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => append({ dessert_name: "", quantity: 1, unit_price: 0 })}
              className="flex items-center gap-1"
            >
              <PlusIcon className="h-4 w-4" /> Add Item
            </Button>
          </div>

          {fields.map((field, index) => (
            <Card key={field.id} className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
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
                  control={form.control}
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
                  control={form.control}
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
              
              {fields.length > 1 && (
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
                <span className="font-medium">Subtotal:</span> {((form.watch(`items.${index}.quantity`) || 0) * (form.watch(`items.${index}.unit_price`) || 0)).toFixed(2)} ILS
              </div>
            </Card>
          ))}
          
          <div className="flex justify-between items-center bg-muted p-3 rounded-md mt-4">
            <span className="font-semibold">Total Price:</span>
            <span className="font-bold text-lg">{totalPrice.toFixed(2)} ILS</span>
          </div>

          {form.formState.errors.items?.root && (
            <p className="text-sm font-medium text-destructive mt-2">
              {form.formState.errors.items.root.message}
            </p>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="deliveryDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Delivery Date *</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(new Date(field.value), "PPP")
                        ) : (
                          <span>Select a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value ? new Date(field.value) : undefined}
                      onSelect={(date) => {
                        if (date) {
                          field.onChange(date.toISOString().split('T')[0]);
                        }
                      }}
                      disabled={(date) => {
                        const now = new Date();
                        now.setHours(0, 0, 0, 0);
                        return date < now;
                      }}
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="deliveryTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Delivery Time (Optional)</FormLabel>
                <div className="flex items-center">
                  <Clock className="mr-2 h-4 w-4 text-gray-400" />
                  <FormControl>
                    <Input 
                      type="time"
                      className="flex-1"
                      {...field} 
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select 
                onValueChange={field.onChange} 
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes (Optional)</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Additional instructions or notes"
                  className="min-h-[80px]" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="flex justify-end space-x-2 pt-4">
          <Button 
            type="button" 
            variant="outline" 
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button 
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating..." : "Create Order"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default OrderForm;
