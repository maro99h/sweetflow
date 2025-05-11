
import { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/Header";
import { Card } from "@/components/ui/card";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { OrderFormValues } from "@/types/orders";

const OrdersPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header showBackButton={true} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Routes>
          <Route path="/" element={<AllOrders />} />
          <Route path="/new" element={<NewOrders />} />
          <Route path="/in-progress" element={<InProgressOrders />} />
          <Route path="/completed" element={<CompletedOrders />} />
          <Route path="/add" element={<AddOrder />} />
        </Routes>
      </main>
    </div>
  );
};

// Placeholder components for different order views
const AllOrders = () => <div className="bg-white rounded-lg shadow p-6"><h1 className="text-2xl font-bold mb-6">All Orders</h1><p>All orders view coming soon</p></div>;
const NewOrders = () => <div className="bg-white rounded-lg shadow p-6"><h1 className="text-2xl font-bold mb-6">New Orders</h1><p>New orders view coming soon</p></div>;
const InProgressOrders = () => <div className="bg-white rounded-lg shadow p-6"><h1 className="text-2xl font-bold mb-6">In Progress Orders</h1><p>In progress orders view coming soon</p></div>;
const CompletedOrders = () => <div className="bg-white rounded-lg shadow p-6"><h1 className="text-2xl font-bold mb-6">Completed Orders</h1><p>Completed orders view coming soon</p></div>;

// Form validation schema
const orderSchema = z.object({
  clientName: z.string().min(2, "Client name is required and must be at least 2 characters"),
  productName: z.string().min(2, "Product name is required and must be at least 2 characters"),
  quantity: z.coerce.number().min(1, "Quantity must be at least 1"),
  deliveryDate: z.string().min(1, "Delivery date is required"),
  deliveryTime: z.string().optional(),
  notes: z.string().optional()
});

const AddOrder = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<OrderFormValues>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      clientName: "",
      productName: "",
      quantity: 1,
      deliveryDate: new Date().toISOString().split('T')[0],
      deliveryTime: "",
      notes: ""
    },
  });

  const onSubmit = async (values: OrderFormValues) => {
    if (!user) {
      toast({
        title: "Authentication Error",
        description: "You must be logged in to create an order",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from('orders')
        .insert({
          user_id: user.id,
          client_name: values.clientName,
          product_name: values.productName,
          quantity: values.quantity,
          delivery_date: values.deliveryDate,
          delivery_time: values.deliveryTime || null,
          status: 'pending',
          notes: values.notes || null
        } as any);
        
      if (error) throw error;
      
      toast({
        title: "Success!",
        description: "Order has been created successfully",
      });
      
      navigate("/dashboard");
    } catch (error: any) {
      console.error("Error creating order:", error);
      toast({
        title: "Error",
        description: error.message || "There was a problem creating your order. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Get today's date for min date in date picker
  const today = new Date().toISOString().split('T')[0];

  return (
    <Card className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Add New Order</h2>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="clientName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Client Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter client name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="productName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter product name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantity</FormLabel>
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="deliveryDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Delivery Date</FormLabel>
                  <FormControl>
                    <Input 
                      type="date" 
                      min={today}
                      {...field} 
                    />
                  </FormControl>
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
                  <FormControl>
                    <Input 
                      type="time"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Notes (Optional)</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Additional instructions or notes"
                    className="min-h-[100px]" 
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
              onClick={() => navigate("/dashboard")}
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
    </Card>
  );
};

export default OrdersPage;
