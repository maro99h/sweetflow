
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import OrderForm from "@/components/orders/OrderForm";
import { OrderFormValues } from "@/types/orders";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";

interface OrderFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const OrderFormModal = ({ open, onOpenChange }: OrderFormModalProps) => {
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const queryClient = useQueryClient();

  const handleSubmit = async (values: OrderFormValues) => {
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
          status: values.status || 'pending',
          notes: values.notes || null
        });
        
      if (error) throw error;
      
      // Invalidate queries to refresh the data
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      queryClient.invalidateQueries({ queryKey: ['orderStats'] });
      
      toast({
        title: "Order added!",
        description: "Your order has been created successfully",
      });
      
      // Close the modal
      onOpenChange(false);
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px] p-6">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">New Order</DialogTitle>
          <DialogDescription>
            Fill in the details to create a new order.
          </DialogDescription>
        </DialogHeader>
        
        <OrderForm 
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          onCancel={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
};

export default OrderFormModal;
