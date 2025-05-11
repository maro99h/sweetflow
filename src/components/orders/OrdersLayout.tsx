
import { ReactNode } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusIcon } from "lucide-react";

interface OrdersLayoutProps {
  children: ReactNode;
}

const OrdersLayout = ({ children }: OrdersLayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const getCurrentTab = () => {
    if (location.pathname.includes("/orders/new")) return "new";
    if (location.pathname.includes("/orders/in-progress")) return "in-progress";
    if (location.pathname.includes("/orders/completed")) return "completed";
    if (location.pathname.includes("/orders/all")) return "all";
    return "all"; // Default to "all" if no match
  };

  const handleTabChange = (value: string) => {
    console.log("Tab change requested to:", value);
    navigate(`/orders/${value}`, { replace: true });
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header showBackButton={true} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Orders</h1>
          <Button 
            onClick={() => {
              console.log("Add Order button clicked");
              navigate("/orders/add");
            }}
            className="flex items-center gap-1"
          >
            <PlusIcon className="h-4 w-4" />
            Add Order
          </Button>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
          <Tabs 
            value={getCurrentTab()} 
            onValueChange={handleTabChange} 
            className="w-full"
          >
            <TabsList className="w-full sm:w-auto grid grid-cols-2 sm:grid-cols-4 gap-2">
              <TabsTrigger value="all">All Orders</TabsTrigger>
              <TabsTrigger value="new">New</TabsTrigger>
              <TabsTrigger value="in-progress">In Progress</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {children}
      </main>
    </div>
  );
};

export default OrdersLayout;
