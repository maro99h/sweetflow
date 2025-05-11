
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Package, Clock, CheckCircle } from "lucide-react";

const OrderSummary = () => {
  const { user } = useAuth();
  
  // Define today and tomorrow's dates for filtering
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  // Format dates for Supabase queries
  const todayStr = today.toISOString().split('T')[0];
  const tomorrowStr = tomorrow.toISOString().split('T')[0];
  
  // Fetch order statistics
  const { data: orderStats, isLoading } = useQuery({
    queryKey: ['orderStats', user?.id],
    queryFn: async () => {
      if (!user) return { today: 0, tomorrow: 0, pending: 0, completed: 0 };
      
      try {
        // Fetch today's orders count
        const todayResult = await supabase
          .from('orders')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', user.id)
          .eq('delivery_date', todayStr);
          
        if (todayResult.error) {
          console.error('Error fetching today orders:', todayResult.error);
          throw todayResult.error;
        }
        
        // Fetch tomorrow's orders count
        const tomorrowResult = await supabase
          .from('orders')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', user.id)
          .eq('delivery_date', tomorrowStr);
          
        if (tomorrowResult.error) {
          console.error('Error fetching tomorrow orders:', tomorrowResult.error);
          throw tomorrowResult.error;
        }
        
        // Fetch pending orders count
        const pendingResult = await supabase
          .from('orders')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', user.id)
          .eq('status', 'pending');
          
        if (pendingResult.error) {
          console.error('Error fetching pending orders:', pendingResult.error);
          throw pendingResult.error;
        }
        
        // Fetch completed orders count
        const completedResult = await supabase
          .from('orders')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', user.id)
          .eq('status', 'completed');
          
        if (completedResult.error) {
          console.error('Error fetching completed orders:', completedResult.error);
          throw completedResult.error;
        }
        
        return {
          today: todayResult.count || 0,
          tomorrow: tomorrowResult.count || 0,
          pending: pendingResult.count || 0,
          completed: completedResult.count || 0
        };
      } catch (error) {
        console.error('Error fetching order stats:', error);
        return { today: 0, tomorrow: 0, pending: 0, completed: 0 };
      }
    },
    enabled: !!user,
  });

  // Define the stats to display
  const stats = [
    { 
      title: "Today's Orders", 
      value: orderStats?.today || 0, 
      icon: <Calendar className="h-5 w-5 text-indigo-600" />,
      color: "bg-indigo-100" 
    },
    { 
      title: "Tomorrow's Orders", 
      value: orderStats?.tomorrow || 0, 
      icon: <Clock className="h-5 w-5 text-yellow-600" />,
      color: "bg-yellow-100" 
    },
    { 
      title: "Pending Orders", 
      value: orderStats?.pending || 0, 
      icon: <Package className="h-5 w-5 text-orange-600" />,
      color: "bg-orange-100" 
    },
    { 
      title: "Completed Orders", 
      value: orderStats?.completed || 0, 
      icon: <CheckCircle className="h-5 w-5 text-green-600" />,
      color: "bg-green-100"
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, index) => (
        <Card key={index} className="border-none shadow-sm">
          <CardHeader className={`flex flex-row items-center justify-between space-y-0 pb-2 ${stat.color} rounded-t-lg`}>
            <CardTitle className="text-sm font-medium">
              {stat.title}
            </CardTitle>
            {stat.icon}
          </CardHeader>
          <CardContent className="pt-4">
            {isLoading ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              <div className="text-2xl font-bold">{stat.value}</div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default OrderSummary;
