
import { Route, Routes, useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import ClientsLayout from "@/components/clients/ClientsLayout";
import ClientList from "@/components/clients/ClientList";

const ClientsPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <ClientsLayout>
      <Routes>
        <Route path="/" element={<Navigate to="/clients/list" replace />} />
        <Route path="/list" element={<ClientList />} />
        <Route path="/add" element={<div>Add New Client Form (Coming soon)</div>} />
        <Route path="/:id" element={<div>Client Details (Coming soon)</div>} />
      </Routes>
    </ClientsLayout>
  );
};

export default ClientsPage;
