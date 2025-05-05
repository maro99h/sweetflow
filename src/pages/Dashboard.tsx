
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  const { user, signOut } = useAuth();

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
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-[#A47149] mb-4">Welcome to your Dashboard!</h2>
          <p className="text-gray-600 mb-4">
            This is your personalized dashboard. You can start managing your pastry orders
            and recipes here.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-[#C4D6B0]/20 p-6 rounded-lg border border-[#C4D6B0]">
              <h3 className="font-medium mb-2">Today's Orders</h3>
              <p className="text-sm text-gray-500">No orders scheduled for today</p>
            </div>
            <div className="bg-[#C4D6B0]/20 p-6 rounded-lg border border-[#C4D6B0]">
              <h3 className="font-medium mb-2">Tomorrow's Orders</h3>
              <p className="text-sm text-gray-500">No orders scheduled for tomorrow</p>
            </div>
            <div className="bg-[#C4D6B0]/20 p-6 rounded-lg border border-[#C4D6B0]">
              <h3 className="font-medium mb-2">Recipe Library</h3>
              <p className="text-sm text-gray-500">You have 0 recipes saved</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
