
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Loader2, Upload } from "lucide-react";

const BusinessInfoSchema = z.object({
  business_name: z.string().min(1, { message: "Business name is required" }),
  full_name: z.string().min(1, { message: "Full name is required" }),
  phone: z.string().optional(),
});

type BusinessInfoFormValues = z.infer<typeof BusinessInfoSchema>;

interface BusinessInfoSettingsProps {
  profile: any;
  onUpdate: (profile: any) => void;
}

const BusinessInfoSettings = ({ profile, onUpdate }: BusinessInfoSettingsProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(profile?.logo_url || null);
  const [isUploading, setIsUploading] = useState(false);

  const form = useForm<BusinessInfoFormValues>({
    resolver: zodResolver(BusinessInfoSchema),
    defaultValues: {
      business_name: profile?.business_name || "",
      full_name: profile?.full_name || "",
      phone: profile?.phone || "",
    },
  });

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setLogoFile(file);
    const objectUrl = URL.createObjectURL(file);
    setLogoPreview(objectUrl);
  };

  const onSubmit = async (values: BusinessInfoFormValues) => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      let logo_url = profile?.logo_url;
      
      // Upload logo if changed
      if (logoFile) {
        setIsUploading(true);
        
        // Check if storage bucket exists, create if not
        const { data: buckets } = await supabase.storage.listBuckets();
        const profileBucket = buckets?.find(bucket => bucket.name === 'profiles');
        
        if (!profileBucket) {
          await supabase.storage.createBucket('profiles', {
            public: true,
          });
        }
        
        // Upload the file
        const filePath = `${user.id}/${logoFile.name}`;
        const { data: fileData, error: fileError } = await supabase.storage
          .from('profiles')
          .upload(filePath, logoFile, {
            upsert: true,
          });
          
        if (fileError) {
          console.error("Error uploading file:", fileError);
          toast({
            title: "Upload failed",
            description: fileError.message,
            variant: "destructive",
          });
        } else {
          // Get the public URL
          const { data: publicUrl } = supabase.storage
            .from('profiles')
            .getPublicUrl(filePath);
            
          logo_url = publicUrl?.publicUrl;
        }
        setIsUploading(false);
      }

      // Update profile
      const { data, error } = await supabase
        .from("profiles")
        .update({
          business_name: values.business_name,
          full_name: values.full_name,
          phone: values.phone,
          logo_url,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id)
        .select();

      if (error) {
        console.error("Error updating profile:", error);
        toast({
          title: "Error",
          description: "Failed to update business information",
          variant: "destructive",
        });
        return;
      }

      onUpdate(data[0]);
      toast({
        title: "Success",
        description: "Business information updated successfully",
      });
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Business Information</CardTitle>
        <CardDescription>
          Update your business details and profile
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <div className="flex flex-col items-center sm:flex-row sm:space-x-4 sm:items-start">
                <div className="w-32 h-32 rounded-lg mb-4 sm:mb-0 overflow-hidden border-2 border-dashed border-gray-300 flex items-center justify-center relative">
                  {logoPreview ? (
                    <img
                      src={logoPreview}
                      alt="Business Logo"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-gray-400">No logo</span>
                  )}
                </div>
                <div className="flex-1">
                  <Label htmlFor="logo">Business Logo</Label>
                  <div className="mt-1">
                    <Input
                      id="logo"
                      type="file"
                      accept="image/*"
                      onChange={handleLogoChange}
                      className="cursor-pointer"
                    />
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    Recommended size: 512x512 pixels. Max size: 2MB.
                  </p>
                </div>
              </div>

              <FormField
                control={form.control}
                name="business_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Business Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your Business Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="full_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Owner Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your Full Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number (optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Your Phone Number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="form-group">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={user?.email || ""}
                  disabled
                  className="bg-gray-100"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Email cannot be changed
                </p>
              </div>
            </div>

            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={isLoading || isUploading}
                className="min-w-[100px]"
              >
                {(isLoading || isUploading) && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                {isUploading ? "Uploading..." : isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default BusinessInfoSettings;
