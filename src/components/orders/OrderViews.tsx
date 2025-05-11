
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

// Placeholder components for different order views
export const AllOrders = () => {
  const navigate = useNavigate();
  
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h1 className="text-2xl font-bold mb-6">All Orders</h1>
      <p>All orders view coming soon</p>
      <div className="mt-4">
        <Button onClick={() => navigate("/orders/add")}>Add New Order</Button>
      </div>
    </div>
  );
};

export const NewOrders = () => (
  <div className="bg-white rounded-lg shadow p-6">
    <h1 className="text-2xl font-bold mb-6">New Orders</h1>
    <p>New orders view coming soon</p>
  </div>
);

export const InProgressOrders = () => (
  <div className="bg-white rounded-lg shadow p-6">
    <h1 className="text-2xl font-bold mb-6">In Progress Orders</h1>
    <p>In progress orders view coming soon</p>
  </div>
);

export const CompletedOrders = () => (
  <div className="bg-white rounded-lg shadow p-6">
    <h1 className="text-2xl font-bold mb-6">Completed Orders</h1>
    <p>Completed orders view coming soon</p>
  </div>
);
