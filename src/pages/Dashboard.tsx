
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarIcon, PlusIcon, SettingsIcon, BookIcon, MenuIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  // Handle navigation
  const handleNavClick = (path: string) => {
    console.log(`Navigate to ${path}`);
    // Future navigation implementation when routes are added
  };

  // Handle add order button click
  const handleAddOrder = () => {
    console.log("Navigate to Add Order");
    // Will navigate to Add Order page when implemented
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">SweetFlow</h1>
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">{user?.email}</span>
            <Button 
              variant="outline" 
              onClick={signOut}
            >
              Sign out
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Navigation Menu */}
        <div className="mb-8">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Orders</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-3 p-4 w-[400px]">
                    <div className="row-span-3">
                      <NavigationMenuLink asChild>
                        <a
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-rose-500 to-indigo-700 p-6 no-underline outline-none focus:shadow-md"
                          onClick={() => handleNavClick("new-order")}
                        >
                          <div className="mt-4 mb-2 text-lg font-medium text-white">
                            New Order
                          </div>
                          <p className="text-sm leading-tight text-white/90">
                            Create a new order for your clients
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </div>
                    <NavigationMenuLink asChild>
                      <a
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        onClick={() => handleNavClick("order-history")}
                      >
                        <div className="text-sm font-medium leading-none">Order History</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          View and manage all your previous orders
                        </p>
                      </a>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                      <a
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        onClick={() => handleNavClick("order-templates")}
                      >
                        <div className="text-sm font-medium leading-none">Order Templates</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Create and use templates for recurring orders
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Clients</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-3 p-4 w-[400px]">
                    <NavigationMenuLink asChild>
                      <a
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        onClick={() => handleNavClick("client-list")}
                      >
                        <div className="text-sm font-medium leading-none">Client List</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          View and manage your clients
                        </p>
                      </a>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                      <a
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        onClick={() => handleNavClick("add-client")}
                      >
                        <div className="text-sm font-medium leading-none">Add New Client</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Add a new client to your database
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Recipes</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-3 p-4 w-[400px]">
                    <NavigationMenuLink asChild>
                      <a
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        onClick={() => handleNavClick("recipe-library")}
                      >
                        <div className="text-sm font-medium leading-none">Recipe Library</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Browse and search your recipes
                        </p>
                      </a>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                      <a
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        onClick={() => handleNavClick("add-recipe")}
                      >
                        <div className="text-sm font-medium leading-none">Add New Recipe</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Create and save a new recipe
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Button 
                  variant="ghost" 
                  className="flex items-center"
                  onClick={() => handleNavClick("settings")}
                >
                  <SettingsIcon className="mr-2 h-5 w-5" />
                  Settings
                </Button>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Welcome message with user's name */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            Welcome, {user?.email?.split('@')[0] || 'Baker'}!
          </h2>
          <p className="text-gray-600 mt-2">
            Here's what's happening with your bakery orders.
          </p>
        </div>

        {/* Add New Order Button - Centered and prominent */}
        <div className="flex justify-center py-6">
          <Button 
            onClick={handleAddOrder}
            className="bg-indigo-600 hover:bg-indigo-700 text-white text-lg py-6 px-8 rounded-md shadow-md flex items-center gap-2 transform transition-all hover:scale-105"
          >
            <PlusIcon className="h-5 w-5" /> Add New Order
          </Button>
        </div>

        {/* Order cards - 2 cards in a horizontal layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {/* Today's Orders */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-medium">Today's Orders</CardTitle>
                <CalendarIcon className="h-5 w-5 text-gray-400" />
              </div>
              <CardDescription>Orders scheduled for today</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">No orders scheduled for today</p>
            </CardContent>
            <CardFooter>
              <Button 
                variant="ghost" 
                className="w-full justify-start p-0"
                onClick={() => handleNavClick("orders")}
              >
                View all orders
              </Button>
            </CardFooter>
          </Card>

          {/* Orders for Tomorrow */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-medium">Tomorrow's Orders</CardTitle>
                <CalendarIcon className="h-5 w-5 text-gray-400" />
              </div>
              <CardDescription>Upcoming orders for tomorrow</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">No orders scheduled for tomorrow</p>
            </CardContent>
            <CardFooter>
              <Button 
                variant="ghost" 
                className="w-full justify-start p-0"
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
