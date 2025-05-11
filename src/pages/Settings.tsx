
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import BusinessInfoSettings from "@/components/settings/BusinessInfoSettings";
import PreferencesSettings from "@/components/settings/PreferencesSettings";
import AccountSettings from "@/components/settings/AccountSettings";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BuildingIcon, 
  Settings2Icon, 
  UserIcon,
  Loader2Icon
} from "lucide-react";

const SettingsPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (!user) return;

        setLoading(true);
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        if (error) {
          console.error("Error fetching profile:", error);
          toast({
            title: "Error",
            description: "Could not load your profile information",
            variant: "destructive",
          });
          return;
        }

        setProfile(data);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user, toast]);

  // Handle profile updates
  const handleProfileUpdate = (updatedProfile) => {
    setProfile(updatedProfile);
    toast({
      title: "Success",
      description: "Your settings have been updated",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header showBackButton={true} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <h1 className="text-2xl font-bold mb-6">Settings</h1>

        {loading ? (
          <div className="flex items-center justify-center p-12">
            <Loader2Icon className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <Tabs defaultValue="business" className="w-full">
            <TabsList className="w-full mb-6 grid grid-cols-3">
              <TabsTrigger value="business" className="flex items-center gap-2">
                <BuildingIcon className="h-4 w-4" />
                <span className="hidden sm:inline">Business Information</span>
                <span className="sm:hidden">Business</span>
              </TabsTrigger>
              <TabsTrigger value="preferences" className="flex items-center gap-2">
                <Settings2Icon className="h-4 w-4" />
                <span className="hidden sm:inline">Preferences</span>
                <span className="sm:hidden">Prefs</span>
              </TabsTrigger>
              <TabsTrigger value="account" className="flex items-center gap-2">
                <UserIcon className="h-4 w-4" />
                <span className="hidden sm:inline">Account Settings</span>
                <span className="sm:hidden">Account</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="business" className="mt-4">
              <BusinessInfoSettings 
                profile={profile} 
                onUpdate={handleProfileUpdate} 
              />
            </TabsContent>

            <TabsContent value="preferences" className="mt-4">
              <PreferencesSettings 
                profile={profile} 
                onUpdate={handleProfileUpdate} 
              />
            </TabsContent>

            <TabsContent value="account" className="mt-4">
              <AccountSettings user={user} />
            </TabsContent>
          </Tabs>
        )}
      </main>
    </div>
  );
};

export default SettingsPage;
