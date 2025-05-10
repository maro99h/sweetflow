
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";

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

const WelcomeSection = () => {
  const { user } = useAuth();
  const [welcomeMessage, setWelcomeMessage] = useState("");
  
  useEffect(() => {
    // Select a random welcome message on page load
    const randomIndex = Math.floor(Math.random() * welcomeMessages.length);
    setWelcomeMessage(welcomeMessages[randomIndex]);
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-semibold text-gray-800">
        Welcome, {user?.email?.split('@')[0] || 'Baker'}!
      </h2>
      <p className="text-gray-600 mt-2">
        {welcomeMessage}
      </p>
    </div>
  );
};

export default WelcomeSection;
