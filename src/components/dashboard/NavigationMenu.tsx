
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { BookIcon, SettingsIcon, UsersIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const DashboardNavigationMenu = () => {
  const navigate = useNavigate();

  // Handle navigation with React Router's navigate function
  const handleNavClick = (path: string) => {
    // Prevent default behavior and use React Router navigation
    navigate(path);
  };

  return (
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
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick("/orders/new");
                    }}
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
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick("/orders/in-progress");
                    }}
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
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick("/orders/completed");
                    }}
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
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick("/orders");
                    }}
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
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick("/clients/list");
                    }}
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
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick("/clients/add");
                    }}
                  >
                    <div className="text-sm font-medium leading-none">Add New Client</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      View and manage your clients
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
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick("/recipes/library");
                    }}
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
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick("/recipes/add");
                    }}
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
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick("/recipes/categories");
                    }}
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
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("/settings");
              }}
            >
              <SettingsIcon className="mr-2 h-5 w-5" />
              Settings
            </Button>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default DashboardNavigationMenu;
