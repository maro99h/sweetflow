
import { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/Header";

const OrdersPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header showBackButton={true} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-2xl font-bold mb-6">Order Management</h1>
          
          <Routes>
            <Route path="/" element={<AllOrders />} />
            <Route path="/new" element={<NewOrders />} />
            <Route path="/in-progress" element={<InProgressOrders />} />
            <Route path="/completed" element={<CompletedOrders />} />
            <Route path="/add" element={<AddOrder />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

// Placeholder components for different order views
const AllOrders = () => <div>All Orders (Coming soon)</div>;
const NewOrders = () => <div>New Orders (Coming soon)</div>;
const InProgressOrders = () => <div>In Progress Orders (Coming soon)</div>;
const CompletedOrders = () => <div>Completed Orders (Coming soon)</div>;

const AddOrder = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Add New Order</h2>
      <p>Order form coming soon...</p>
    </div>
  );
};

export default OrdersPage;
