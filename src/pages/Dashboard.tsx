
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/Header";
import DashboardNavigationMenu from "@/components/dashboard/NavigationMenu";
import WelcomeSection from "@/components/dashboard/WelcomeSection";
import AddOrderButton from "@/components/dashboard/AddOrderButton";
import OrderSummary from "@/components/dashboard/OrderSummary";
import OrderList from "@/components/dashboard/OrderList";
import { supabase } from "@/integrations/supabase/client";

const Dashboard = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<{ full_name?: string, business_name?: string } | null>(null);

  // Fetch user profile data to get full name for welcome message
  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;
      
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('full_name, business_name')
          .eq('id', user.id)
          .single();
          
        if (error) {
          console.error('Error fetching profile:', error);
          return;
        }
        
        setProfile(data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };
    
    fetchProfile();
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Navigation Menu */}
        <DashboardNavigationMenu />

        {/* Welcome message with user's name */}
        <WelcomeSection userName={profile?.full_name} />

        {/* Order Summary Statistics */}
        <OrderSummary />

        {/* Add New Order Button - Centered and prominent */}
        <AddOrderButton />

        {/* Order Lists - Today and Tomorrow */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <OrderList title="Today's Orders" period="today" />
          <OrderList title="Tomorrow's Orders" period="tomorrow" />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
