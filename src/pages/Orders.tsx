
import { Route, Routes } from "react-router-dom";
import OrdersLayout from "@/components/orders/OrdersLayout";
import { AllOrders, NewOrders, InProgressOrders, CompletedOrders } from "@/components/orders/OrderViews";
import AddOrderForm from "@/components/orders/AddOrderForm";

const OrdersPage = () => {
  return (
    <OrdersLayout>
      <Routes>
        <Route path="/" element={<AllOrders />} />
        <Route path="/new" element={<NewOrders />} />
        <Route path="/in-progress" element={<InProgressOrders />} />
        <Route path="/completed" element={<CompletedOrders />} />
        <Route path="/add" element={<AddOrderForm />} />
      </Routes>
    </OrdersLayout>
  );
};

export default OrdersPage;
