
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AddOrderButton = () => {
  const navigate = useNavigate();

  const handleAddOrder = () => {
    navigate("/orders/add");
  };

  return (
    <div className="flex justify-center py-6">
      <Button 
        onClick={handleAddOrder}
        className="bg-indigo-600 hover:bg-indigo-700 text-white text-lg py-6 px-8 rounded-md shadow-md flex items-center gap-2 transform transition-all hover:scale-105"
      >
        <PlusIcon className="h-5 w-5" /> Add New Order
      </Button>
    </div>
  );
};

export default AddOrderButton;
