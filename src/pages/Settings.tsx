
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/Header";

const SettingsPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header showBackButton={true} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-2xl font-bold mb-6">Application Settings</h1>
          
          <div className="space-y-6">
            <section>
              <h2 className="text-xl font-semibold mb-3">User Profile</h2>
              <p className="text-gray-500 mb-4">Update your profile details and preferences.</p>
              <p className="text-gray-700">(Profile settings coming soon)</p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">Display Preferences</h2>
              <p className="text-gray-500 mb-4">Customize how SweetFlow appears and behaves.</p>
              <p className="text-gray-700">(Display settings coming soon)</p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">Notifications</h2>
              <p className="text-gray-500 mb-4">Control how and when you receive alerts.</p>
              <p className="text-gray-700">(Notification settings coming soon)</p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SettingsPage;
