
import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/Header";
import DashboardNavigationMenu from "@/components/dashboard/NavigationMenu";
import WelcomeSection from "@/components/dashboard/WelcomeSection";
import AddOrderButton from "@/components/dashboard/AddOrderButton";
import OrderCards from "@/components/dashboard/OrderCards";

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Navigation Menu */}
        <DashboardNavigationMenu />

        {/* Welcome message with user's name and rotating message */}
        <WelcomeSection />

        {/* Add New Order Button - Centered and prominent */}
        <AddOrderButton />

        {/* Order cards - 2 cards in a horizontal layout */}
        <OrderCards />
      </main>
    </div>
  );
};

export default Dashboard;
