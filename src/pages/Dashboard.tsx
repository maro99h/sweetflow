
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarIcon, PlusIcon, SettingsIcon, BookIcon, UsersIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "@/components/Header";

// Array of engaging bakery/confectionery-related messages
const welcomeMessages = [
  "Fresh ideas for your sweet creations today!",
  "Ready to create something delicious?",
  "Managing your bakery just got sweeter!",
  "Organize your recipes and delight your customers!",
  "Streamline your sweet business operations today!",
  "Let's bake success into your business!",
  "Your confectionery management just got easier!",
  "Whipping up organization for your bakery!",
  "Sweet success starts with good planning!",
  "Making your bakery business run as smooth as fondant!"
];

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [welcomeMessage, setWelcomeMessage] = useState("");
  
  useEffect(() => {
    // Select a random welcome message on page load
    const randomIndex = Math.floor(Math.random() * welcomeMessages.length);
    setWelcomeMessage(welcomeMessages[randomIndex]);
  }, []);

  // Handle navigation
  const handleNavClick = (path: string) => {
    navigate(path);
  };

  // Handle add order button click
  const handleAddOrder = () => {
    navigate("/orders/add");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Navigation Menu */}
        <div className="mb-8">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Orders</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-3 p-4 w-[400px]">
                    <NavigationMenuLink asChild>
                      <a
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        onClick={() => handleNavClick("/orders/new")}
                      >
                        <div className="text-sm font-medium leading-none">New Orders</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          View and manage new incoming orders
                        </p>
                      </a>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                      <a
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        onClick={() => handleNavClick("/orders/in-progress")}
                      >
                        <div className="text-sm font-medium leading-none">In Progress</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          View orders currently being prepared
                        </p>
                      </a>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                      <a
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        onClick={() => handleNavClick("/orders/completed")}
                      >
                        <div className="text-sm font-medium leading-none">Completed</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          View all fulfilled and delivered orders
                        </p>
                      </a>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                      <a
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        onClick={() => handleNavClick("/orders")}
                      >
                        <div className="text-sm font-medium leading-none">All Orders</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          View complete order history
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>
                  <div className="flex items-center">
                    <UsersIcon className="mr-2 h-4 w-4" />
                    Clients
                  </div>
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-3 p-4 w-[400px]">
                    <NavigationMenuLink asChild>
                      <a
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        onClick={() => handleNavClick("/clients/list")}
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
                        onClick={() => handleNavClick("/clients/add")}
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
                <NavigationMenuTrigger>
                  <div className="flex items-center">
                    <BookIcon className="mr-2 h-4 w-4" />
                    Recipes
                  </div>
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-3 p-4 w-[400px]">
                    <NavigationMenuLink asChild>
                      <a
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        onClick={() => handleNavClick("/recipes/library")}
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
                        onClick={() => handleNavClick("/recipes/add")}
                      >
                        <div className="text-sm font-medium leading-none">Add New Recipe</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Create and save a new recipe
                        </p>
                      </a>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                      <a
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        onClick={() => handleNavClick("/recipes/categories")}
                      >
                        <div className="text-sm font-medium leading-none">Categories</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Manage recipe categories
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
                  onClick={() => handleNavClick("/settings")}
                >
                  <SettingsIcon className="mr-2 h-5 w-5" />
                  Settings
                </Button>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Welcome message with user's name and rotating message */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            Welcome, {user?.email?.split('@')[0] || 'Baker'}!
          </h2>
          <p className="text-gray-600 mt-2">
            {welcomeMessage}
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
                onClick={() => handleNavClick("/orders")}
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
                onClick={() => handleNavClick("/orders")}
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
