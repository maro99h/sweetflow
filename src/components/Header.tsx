
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { MenuIcon } from "lucide-react";

interface HeaderProps {
  showBackButton?: boolean;
}

const Header = ({ showBackButton = false }: HeaderProps) => {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        {showBackButton ? (
          <div className="flex-1">
            <Button variant="ghost" onClick={() => navigate("/dashboard")}>
              Back to Dashboard
            </Button>
          </div>
        ) : (
          <div className="flex-1"></div>
        )}
        
        <h1 
          className="text-2xl font-bold text-center text-gray-800 flex-1 cursor-pointer" 
          onClick={() => navigate("/dashboard")}
        >
          SweetFlow
        </h1>
        
        <div className="flex items-center space-x-4 flex-1 justify-end">
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
