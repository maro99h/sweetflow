
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuTrigger, 
  DropdownMenuContent, 
  DropdownMenuItem 
} from "@/components/ui/dropdown-menu";

interface HeaderProps {
  showBackButton?: boolean;
}

const Header = ({ showBackButton = false }: HeaderProps) => {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  
  const handleNavigateToSettings = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log("Navigating to settings page");
    navigate("/settings");
  };
  
  const handleNavigateToDashboard = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate("/dashboard");
  };
  
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        {showBackButton ? (
          <div className="flex-1">
            <Button 
              variant="ghost" 
              onClick={(e) => {
                e.preventDefault();
                navigate("/dashboard");
              }}
            >
              Back to Dashboard
            </Button>
          </div>
        ) : (
          <div className="flex-1"></div>
        )}
        
        <h1 
          className="text-2xl font-bold text-center text-gray-800 flex-1 cursor-pointer" 
          onClick={handleNavigateToDashboard}
        >
          SweetFlow
        </h1>
        
        <div className="flex items-center space-x-4 flex-1 justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
                <span className="sr-only">Settings</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleNavigateToSettings}>
                Business Settings
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button 
            variant="outline" 
            onClick={signOut}
          >
            Sign out
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
