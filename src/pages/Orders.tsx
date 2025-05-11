
import { useEffect } from "react";
import { Route, Routes, useNavigate, useLocation, Navigate } from "react-router-dom";
import OrdersLayout from "@/components/orders/OrdersLayout";
import { AllOrders, NewOrders, InProgressOrders, CompletedOrders } from "@/components/orders/OrderViews";
import AddOrderForm from "@/components/orders/AddOrderForm";
import OrderDetails from "@/components/orders/OrderDetails";

const OrdersPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Redirect to all orders if just on /orders
  useEffect(() => {
    if (location.pathname === "/orders") {
      console.log("Redirecting to /orders/all from /orders");
      navigate("/orders/all", { replace: true });
    }
  }, [location.pathname, navigate]);
  
  console.log("Current location:", location.pathname);
  
  return (
    <OrdersLayout>
      <Routes>
        <Route path="all" element={<AllOrders />} />
        <Route path="new" element={<NewOrders />} />
        <Route path="in-progress" element={<InProgressOrders />} />
        <Route path="completed" element={<CompletedOrders />} />
        <Route path="add" element={<AddOrderForm />} />
        <Route path=":id" element={<OrderDetails />} />
        <Route path="*" element={<Navigate to="/orders/all" replace />} />
      </Routes>
    </OrdersLayout>
  );
};

export default OrdersPage;
