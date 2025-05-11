
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";

const AddOrderButton = () => {
  const navigate = useNavigate();

  const handleAddOrder = () => {
    console.log("Add order button clicked from dashboard");
    navigate("/orders/add");
  };

  return (
    <div className="flex justify-center my-8">
      <Button 
        onClick={handleAddOrder}
        size="lg" 
        className="flex items-center gap-2 px-8 py-6 text-lg shadow-lg"
      >
        <PlusIcon className="h-5 w-5" />
        Add New Order
      </Button>
    </div>
  );
};

export default AddOrderButton;
