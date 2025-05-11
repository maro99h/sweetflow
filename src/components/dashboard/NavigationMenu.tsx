
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarIcon, PackageIcon, UserIcon, BookIcon, SettingsIcon } from "lucide-react";

const DashboardNavigationMenu = () => {
  const navigate = useNavigate();

  const menuItems = [
    { icon: <CalendarIcon className="h-6 w-6" />, label: "Orders", path: "/orders/all" },
    { icon: <UserIcon className="h-6 w-6" />, label: "Clients", path: "/clients" },
    { icon: <BookIcon className="h-6 w-6" />, label: "Recipes", path: "/recipes" },
    { icon: <SettingsIcon className="h-6 w-6" />, label: "Settings", path: "/settings" },
  ];

  const handleNavClick = (path: string) => {
    console.log("Navigation clicked to:", path);
    navigate(path);
  };

  return (
    <Card className="mb-6 border-none shadow-sm">
      <CardContent className="p-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {menuItems.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center p-4 rounded-lg bg-white hover:bg-gray-50 cursor-pointer transition-colors border border-gray-100"
              onClick={() => handleNavClick(item.path)}
            >
              <div className="text-primary mb-2">{item.icon}</div>
              <span className="text-sm font-medium">{item.label}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardNavigationMenu;
