
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarIcon, PlusIcon, BookIcon, DollarSignIcon, UserIcon } from "lucide-react";
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

  // Handle shortcut button clicks
  const handleShortcutClick = (action: string) => {
    switch (action) {
      case "addOrder":
        // Will navigate to Add Order page when implemented
        console.log("Navigate to Add Order");
        break;
      case "manageRecipes":
        // Will navigate to Manage Recipes page when implemented
        console.log("Navigate to Manage Recipes");
        break;
      default:
        break;
    }
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
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Welcome message with user's name */}
        <div className="bg-white rounded-lg shadow-md p-6 animate-fade-in">
          <div className="flex items-center space-x-3">
            <UserIcon className="h-6 w-6 text-[#A47149]" />
            <h2 className="text-xl font-semibold text-[#A47149]">
              Welcome, {user?.email?.split('@')[0] || 'Baker'}!
            </h2>
          </div>
          <p className="text-gray-600 mt-2 pl-9">
            Here's what's happening with your pastry orders.
          </p>
        </div>

        {/* Order status cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                <CardTitle className="text-[#A47149] text-lg font-medium">Orders for Tomorrow</CardTitle>
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
              >
                View upcoming orders
              </Button>
            </CardFooter>
          </Card>

          {/* Pending Payments */}
          <Card 
            style={getCardStyle('payments')}
            className="border-[#C4D6B0] bg-white"
            onMouseEnter={() => setHoveredCard('payments')}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-[#A47149] text-lg font-medium">Pending Payments</CardTitle>
                <DollarSignIcon className="h-5 w-5 text-[#C4D6B0]" />
              </div>
              <CardDescription>Orders awaiting payment</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">No pending payments</p>
            </CardContent>
            <CardFooter>
              <Button 
                variant="ghost" 
                className="text-[#A47149] hover:text-[#A47149] hover:bg-[#C4D6B0]/20 w-full justify-start p-0"
              >
                View payment history
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Shortcut buttons */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-medium text-[#A47149] mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button 
              onClick={() => handleShortcutClick("addOrder")}
              className="bg-[#A47149] hover:bg-[#8B5E3C] text-white flex items-center justify-center h-12"
            >
              <PlusIcon className="mr-2 h-5 w-5" /> Add Order
            </Button>
            <Button 
              onClick={() => handleShortcutClick("manageRecipes")}
              className="bg-[#A47149] hover:bg-[#8B5E3C] text-white flex items-center justify-center h-12"
            >
              <BookIcon className="mr-2 h-5 w-5" /> Manage Recipes
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
