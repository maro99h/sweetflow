
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { CalendarIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface OrderListProps {
  title: string;
  period: "today" | "tomorrow";
}

// Mock type for Order (replace with actual type from your database)
interface Order {
  id: string;
  client_name: string;
  product_name: string;
  quantity: number;
  delivery_date: string;
  status: string;
}

const OrderList = ({ title, period }: OrderListProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Define date for filtering based on period
  const today = new Date();
  const filterDate = new Date(today);
  if (period === "tomorrow") {
    filterDate.setDate(filterDate.getDate() + 1);
  }
  
  // Format date for display and filtering
  const dateStr = filterDate.toISOString().split('T')[0];
  
  // Fetch orders for the specified period
  const { data: orders, isLoading, error } = useQuery({
    queryKey: ['orders', user?.id, period],
    queryFn: async () => {
      if (!user) return [];
      
      // This is a placeholder. In a real app, you would implement
      // a query to fetch orders from your database
      // For now, we'll return mock data
      if (period === "today") {
        return [
          {
            id: "1",
            client_name: "Cafe Delight",
            product_name: "Chocolate Cake",
            quantity: 2,
            delivery_date: dateStr,
            status: "pending"
          }
        ];
      }
      return []; // Empty for tomorrow to show the empty state
    },
    enabled: !!user,
  });

  const handleViewAll = () => {
    navigate("/orders");
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-medium">{title}</CardTitle>
          <CalendarIcon className="h-5 w-5 text-gray-400" />
        </div>
        <CardDescription>
          {period === "today" ? "Orders scheduled for today" : "Upcoming orders for tomorrow"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-2">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        ) : error ? (
          <div className="text-sm text-red-500">Error loading orders</div>
        ) : orders && orders.length > 0 ? (
          <div className="space-y-3">
            {orders.map((order) => (
              <div 
                key={order.id} 
                className="border border-gray-100 rounded-md p-3 hover:bg-gray-50 transition cursor-pointer"
              >
                <div className="flex justify-between">
                  <span className="font-medium">{order.client_name}</span>
                  <span className="text-sm text-gray-500">#{order.id.substring(0, 6)}</span>
                </div>
                <div className="text-sm mt-1">
                  {order.quantity}x {order.product_name}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6">
            <p className="text-sm text-gray-500">No orders scheduled for {period === "today" ? "today" : "tomorrow"}</p>
            <Button 
              variant="outline" 
              size="sm"
              className="mt-2"
              onClick={() => navigate("/orders/add")}
            >
              Add an order
            </Button>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button 
          variant="ghost" 
          className="w-full justify-start p-0"
          onClick={handleViewAll}
        >
          View all orders
        </Button>
      </CardFooter>
    </Card>
  );
};

export default OrderList;
