
import { format } from "date-fns";
import { Edit, Trash2, Clock } from "lucide-react";
import { Order } from "@/types/orders";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

interface OrderListProps {
  orders: Order[];
  isLoading: boolean;
  error: Error | null;
  onEdit: (order: Order) => void;
  onDelete: (order: Order) => void;
  onViewDetails: (order: Order) => void;
}

const OrderList = ({ orders, isLoading, error, onEdit, onDelete, onViewDetails }: OrderListProps) => {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="p-6">
            <div className="flex flex-col space-y-3">
              <Skeleton className="h-6 w-1/3" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-1/4" />
              <div className="flex justify-between">
                <Skeleton className="h-8 w-20" />
                <Skeleton className="h-8 w-24" />
              </div>
            </div>
          </Card>
        ))}
      </div>
    );
  }
  
  if (error) {
    return (
      <Card className="p-6 border-red-200 bg-red-50">
        <p className="text-red-600">Error loading orders: {error.message}</p>
      </Card>
    );
  }
  
  if (orders.length === 0) {
    return (
      <Card className="p-6 text-center">
        <p className="text-gray-500">No orders found in this category</p>
      </Card>
    );
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">New</Badge>;
      case 'in_progress':
        return <Badge variant="secondary" className="bg-blue-100 text-blue-800 hover:bg-blue-200">In Progress</Badge>;
      case 'completed':
        return <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-200">Completed</Badge>;
      case 'cancelled':
        return <Badge variant="secondary" className="bg-red-100 text-red-800 hover:bg-red-200">Cancelled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const formatDate = (dateStr: string) => {
    try {
      return format(new Date(dateStr), 'MMM d, yyyy');
    } catch (error) {
      return dateStr;
    }
  };

  const formatTime = (timeStr: string | null) => {
    if (!timeStr) return '';
    try {
      const [hours, minutes] = timeStr.split(':');
      return format(new Date().setHours(parseInt(hours), parseInt(minutes)), 'h:mm a');
    } catch (error) {
      return timeStr;
    }
  };

  const formatItems = (items: any[]) => {
    if (!items || !Array.isArray(items) || items.length === 0) {
      return "No items";
    }

    return items.map(item => `${item.quantity}x ${item.dessert_name}`).join(', ');
  };

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <Card 
          key={order.id} 
          className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
          onClick={() => {
            console.log("View details clicked for order:", order.id);
            onViewDetails(order);
          }}
        >
          <div className="flex flex-col space-y-2">
            <div className="flex justify-between items-start">
              <h3 className="font-medium text-lg">{order.client_name}</h3>
              {getStatusBadge(order.status)}
            </div>
            
            <p className="text-sm">{formatItems(order.items)}</p>
            
            <div className="flex items-center text-sm text-gray-500 gap-1">
              <span>{formatDate(order.delivery_date)}</span>
              {order.delivery_time && (
                <span className="flex items-center ml-2">
                  <Clock className="h-3 w-3 mr-1" />
                  {formatTime(order.delivery_time)}
                </span>
              )}
            </div>
            
            <div className="flex justify-between items-center mt-2 pt-2 border-t border-gray-100">
              <span className="font-medium">{order.total_price.toFixed(2)} ILS</span>
              
              <div className="flex space-x-2" onClick={(e) => e.stopPropagation()}>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="flex items-center"
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log("Edit clicked for order:", order.id);
                    onEdit(order);
                  }}
                >
                  <Edit className="h-4 w-4 mr-1" /> Edit
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="flex items-center text-red-600 hover:text-red-700 hover:bg-red-50"
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log("Delete clicked for order:", order.id);
                    onDelete(order);
                  }}
                >
                  <Trash2 className="h-4 w-4 mr-1" /> Delete
                </Button>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default OrderList;
