
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarIcon, PlusIcon, SettingsIcon, BookIcon, MenuIcon, ListIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  // Animation style for card hover effect
  const getCardStyle = (cardId: string) => {
    return {
      transform: hoveredCard === cardId ? "translateY(-10px)" : "translateY(0)",
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
      boxShadow: hoveredCard === cardId ? "0 10px 25px -5px rgba(0, 0, 0, 0.1)" : "none",
    };
  };

  // Handle navigation
  const handleNavClick = (navItem: string) => {
    console.log(`Navigate to ${navItem}`);
    // Future navigation implementation when routes are added
  };

  // Handle add order button click
  const handleAddOrder = () => {
    console.log("Navigate to Add Order");
    // Will navigate to Add Order page when implemented
  };

  return (
    <div className="min-h-screen bg-[#FFE8D6]">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-[#A47149]">SweetFlow</h1>
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">{user?.email}</span>
            <Button 
              variant="outline" 
              className="border-[#A47149] text-[#A47149] hover:bg-[#C4D6B0] hover:text-[#A47149]"
              onClick={signOut}
            >
              Sign out
            </Button>
          </div>
        </div>
      </header>

      {/* Top navigation buttons */}
      <div className="bg-white shadow-sm mb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex space-x-6 overflow-x-auto">
            <Button 
              variant="ghost" 
              className="flex items-center text-[#A47149] hover:bg-[#C4D6B0]/20"
              onClick={() => handleNavClick("orders")}
            >
              <ListIcon className="mr-2 h-5 w-5" />
              Orders
            </Button>
            <Button 
              variant="ghost" 
              className="flex items-center text-[#A47149] hover:bg-[#C4D6B0]/20"
              onClick={() => handleNavClick("clients")}
            >
              <MenuIcon className="mr-2 h-5 w-5" />
              Clients
            </Button>
            <Button 
              variant="ghost" 
              className="flex items-center text-[#A47149] hover:bg-[#C4D6B0]/20"
              onClick={() => handleNavClick("recipes")}
            >
              <BookIcon className="mr-2 h-5 w-5" />
              Recipes
            </Button>
            <Button 
              variant="ghost" 
              className="flex items-center text-[#A47149] hover:bg-[#C4D6B0]/20"
              onClick={() => handleNavClick("settings")}
            >
              <SettingsIcon className="mr-2 h-5 w-5" />
              Settings
            </Button>
          </div>
        </div>
      </div>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Welcome message with user's name */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-[#A47149]">
            Welcome, {user?.email?.split('@')[0] || 'Baker'}!
          </h2>
          <p className="text-gray-600 mt-2">
            Here's what's happening with your bakery orders.
          </p>
        </div>

        {/* Add New Order Button - Centered and prominent */}
        <div className="flex justify-center py-4">
          <Button 
            onClick={handleAddOrder}
            className="bg-[#A47149] hover:bg-[#8B5E3C] text-white text-lg py-6 px-8 rounded-md shadow-md flex items-center gap-2 transform transition-all hover:scale-105"
          >
            <PlusIcon className="h-5 w-5" /> Add New Order
          </Button>
        </div>

        {/* Order cards - 2 cards in a horizontal layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Today's Orders */}
          <Card 
            style={getCardStyle('today')}
            className="border-[#C4D6B0] bg-white"
            onMouseEnter={() => setHoveredCard('today')}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-[#A47149] text-lg font-medium">Today's Orders</CardTitle>
                <CalendarIcon className="h-5 w-5 text-[#C4D6B0]" />
              </div>
              <CardDescription>Orders scheduled for today</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">No orders scheduled for today</p>
            </CardContent>
            <CardFooter>
              <Button 
                variant="ghost" 
                className="text-[#A47149] hover:text-[#A47149] hover:bg-[#C4D6B0]/20 w-full justify-start p-0"
                onClick={() => handleNavClick("orders")}
              >
                View all orders
              </Button>
            </CardFooter>
          </Card>

          {/* Orders for Tomorrow */}
          <Card 
            style={getCardStyle('tomorrow')}
            className="border-[#C4D6B0] bg-white"
            onMouseEnter={() => setHoveredCard('tomorrow')}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-[#A47149] text-lg font-medium">Tomorrow's Orders</CardTitle>
                <CalendarIcon className="h-5 w-5 text-[#C4D6B0]" />
              </div>
              <CardDescription>Upcoming orders for tomorrow</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">No orders scheduled for tomorrow</p>
            </CardContent>
            <CardFooter>
              <Button 
                variant="ghost" 
                className="text-[#A47149] hover:text-[#A47149] hover:bg-[#C4D6B0]/20 w-full justify-start p-0"
                onClick={() => handleNavClick("orders")}
              >
                View upcoming orders
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
