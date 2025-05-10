
import { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/Header";

const ClientsPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header showBackButton={true} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-2xl font-bold mb-6">Client Management</h1>
          
          <Routes>
            <Route path="/" element={<ClientList />} />
            <Route path="/list" element={<ClientList />} />
            <Route path="/add" element={<AddClient />} />
            <Route path="/:id" element={<ClientDetails />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

// Placeholder components for different client views
const ClientList = () => <div>Client List (Coming soon)</div>;
const AddClient = () => <div>Add New Client Form (Coming soon)</div>;
const ClientDetails = () => <div>Client Details (Coming soon)</div>;

export default ClientsPage;
