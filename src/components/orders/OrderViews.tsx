
import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Order } from "@/types/orders";
import OrderList from "@/components/orders/OrderList";
import OrderEditModal from "@/components/orders/OrderEditModal";
import OrderDeleteDialog from "@/components/orders/OrderDeleteDialog";

const useOrders = (status?: string) => {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['orders', user?.id, status],
    queryFn: async () => {
      if (!user) return [];
      
      let query = supabase
        .from('orders')
        .select('*')
        .eq('user_id', user.id)
        .order('delivery_date', { ascending: true });
        
      if (status && status !== 'all') {
        query = query.eq('status', status);
      }
      
      const { data, error } = await query;
        
      if (error) {
        console.error('Error fetching orders:', error);
        throw error;
      }
      
      return data || [];
    },
    enabled: !!user,
  });
};

// Shared component structure for all order views
const OrdersView = ({ title, status }: { title: string; status?: string }) => {
  const { data: orders, isLoading, error, refetch } = useOrders(status);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  
  const handleEdit = (order: Order) => {
    setSelectedOrder(order);
    setEditModalOpen(true);
  };
  
  const handleDelete = (order: Order) => {
    setSelectedOrder(order);
    setDeleteDialogOpen(true);
  };
  
  const handleEditSuccess = () => {
    setEditModalOpen(false);
    refetch();
  };
  
  const handleDeleteSuccess = () => {
    setDeleteDialogOpen(false);
    refetch();
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">{title}</h2>
      
      <OrderList 
        orders={orders || []}
        isLoading={isLoading}
        error={error}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      
      {selectedOrder && (
        <>
          <OrderEditModal 
            open={editModalOpen}
            onOpenChange={setEditModalOpen}
            order={selectedOrder}
            onSuccess={handleEditSuccess}
          />
          
          <OrderDeleteDialog
            open={deleteDialogOpen}
            onOpenChange={setDeleteDialogOpen}
            order={selectedOrder}
            onSuccess={handleDeleteSuccess}
          />
        </>
      )}
    </div>
  );
};

// Individual view components 
export const AllOrders = () => (
  <OrdersView title="All Orders" />
);

export const NewOrders = () => (
  <OrdersView title="New Orders" status="pending" />
);

export const InProgressOrders = () => (
  <OrdersView title="In Progress Orders" status="in_progress" />
);

export const CompletedOrders = () => (
  <OrdersView title="Completed Orders" status="completed" />
);
