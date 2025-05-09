
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AlertCircle, Loader2, CheckCircle, Info } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Enhanced email regex for better validation
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Enhanced password regex for security requirements - only English letters and numbers
const passwordRegex = /^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%^&*]{8,}$/;

const loginSchema = z.object({
  email: z.string()
    .email("נא להזין כתובת אימייל חוקית")
    .regex(emailRegex, "נא להזין כתובת אימייל חוקית"),
  password: z.string().min(6, "סיסמה חייבת להכיל לפחות 6 תווים"),
});

const registerSchema = z.object({
  fullName: z.string().min(2, "נא להזין שם מלא"),
  phoneNumber: z.string().min(9, "נא להזין מספר טלפון תקין"),
  email: z.string()
    .email("נא להזין כתובת אימייל חוקית")
    .regex(emailRegex, "נא להזין כתובת אימייל חוקית"),
  password: z.string()
    .min(8, "סיסמה חייבת להכיל לפחות 8 תווים")
    .regex(
      passwordRegex,
      "הסיסמה חייבת לכלול לפחות מספר אחד ואותיות באנגלית"
    ),
  confirmPassword: z.string().min(8, "סיסמה חייבת להכיל לפחות 8 תווים"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "הסיסמאות אינן תואמות",
  path: ["confirmPassword"],
});

type LoginFormValues = z.infer<typeof loginSchema>;
type RegisterFormValues = z.infer<typeof registerSchema>;

const Auth = () => {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [serverError, setServerError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [isEmailConfirmationPending, setIsEmailConfirmationPending] = useState(false);
  const { signIn, signUp, isLoading, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check for email confirmation in URL
    const queryParams = new URLSearchParams(location.search);
    const hasConfirmation = queryParams.get("confirmation") === "true";
    
    if (hasConfirmation) {
      setSuccessMsg("האימייל שלך אומת בהצלחה! כעת תוכל להתחבר.");
      setMode("login");
    }
    
    // If user is already logged in, redirect to dashboard
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate, location]);

  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange", // Enable real-time validation
  });

  const registerForm = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      phoneNumber: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onChange", // Enable real-time validation
  });

  // Reset forms and errors when switching modes
  useEffect(() => {
    setServerError(null);
    setSuccessMsg(null);
    setIsEmailConfirmationPending(false);
    
    if (mode === "login") {
      loginForm.reset();
    } else {
      registerForm.reset();
    }
  }, [mode, loginForm, registerForm]);

  const onLoginSubmit = async (data: LoginFormValues) => {
    setServerError(null);
    try {
      const { error, data: authData, requiresEmailConfirmation } = await signIn(data.email, data.password);
      
      if (error) {
        console.error("Login error:", error);
        if (error.message.includes("Invalid login")) {
          setServerError("שם משתמש או סיסמה שגויים. אנא נסה שוב.");
        } else if (error.message.includes("Email not confirmed") || requiresEmailConfirmation) {
          setServerError("נא לאמת את כתובת האימייל לפני הכניסה.");
          setIsEmailConfirmationPending(true);
        } else {
          setServerError(error.message || "אירעה שגיאה במהלך הכניסה.");
        }
        return;
      }
      
      if (authData?.user) {
        toast({
          title: "ברוכים הבאים!",
          description: "נכנסת בהצלחה למערכת.",
        });
        navigate("/dashboard");
      }
    } catch (error: any) {
      console.error("Unexpected login error:", error);
      setServerError(error.message || "אירעה שגיאה בלתי צפויה.");
    }
  };

  const onRegisterSubmit = async (data: RegisterFormValues) => {
    setServerError(null);
    try {
      const { error, data: authData } = await signUp(data.email, data.password);
      
      if (error) {
        console.error("Signup error:", error);
        if (error.message.includes("already registered")) {
          setServerError("כתובת האימייל כבר רשומה במערכת. נסה להתחבר במקום.");
        } else {
          setServerError(error.message || "אירעה שגיאה במהלך ההרשמה.");
        }
        return;
      }
      
      // If registration is successful, save user metadata to Supabase
      if (authData?.user) {
        // Update user metadata with fullName and phoneNumber
        const { error: metadataError } = await supabase.auth.updateUser({
          data: {
            full_name: data.fullName,
            phone_number: data.phoneNumber,
          }
        });

        if (metadataError) {
          console.error("Error updating user metadata:", metadataError);
        }
      }
      
      setSuccessMsg("ההרשמה הצליחה! בדוק את האימייל שלך לאימות החשבון.");
      setIsEmailConfirmationPending(true);
      toast({
        title: "ההרשמה הצליחה!",
        description: "אנא בדוק את האימייל שלך לאימות החשבון.",
      });
      
      // Switch to login mode after successful registration
      setTimeout(() => {
        setMode("login");
      }, 3000);
    } catch (error: any) {
      console.error("Unexpected signup error:", error);
      setServerError(error.message || "אירעה שגיאה בלתי צפויה.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFE8D6]">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-[#A47149] mb-6">
          {mode === "login" ? "כניסה למערכת" : "יצירת חשבון"}
        </h1>
        
        {serverError && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{serverError}</AlertDescription>
          </Alert>
        )}

        {successMsg && (
          <Alert variant="default" className="mb-6 bg-[#C4D6B0] text-white">
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>{successMsg}</AlertDescription>
          </Alert>
        )}

        {isEmailConfirmationPending && (
          <Alert className="mb-6 bg-[#f0f9ff] border-blue-200 text-blue-800">
            <Info className="h-4 w-4" />
            <AlertDescription>
              שלחנו לך אימייל לאימות חשבונך. אנא בדוק את תיבת הדואר שלך (כולל תיקיית הספאם) ולחץ על הקישור לאימות.
            </AlertDescription>
          </Alert>
        )}
        
        {mode === "login" ? (
          <>
            <Form {...loginForm}>
              <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                <FormField
                  control={loginForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>אימייל</FormLabel>
                      <FormControl>
                        <Input
                          dir="ltr"
                          placeholder="you@example.com"
                          autoComplete="email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={loginForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>סיסמה</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="••••••••"
                          autoComplete="current-password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="w-full bg-[#A47149] hover:bg-[#8B5E3C]"
                  disabled={isLoading || loginForm.formState.isSubmitting}
                >
                  {(isLoading || loginForm.formState.isSubmitting) ? 
                    <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> מתחבר...</> : 
                    "כניסה"}
                </Button>
              </form>
            </Form>
            
            <div className="text-center mt-4">
              <p className="text-sm text-gray-600">
                אין לך חשבון?{" "}
                <button 
                  onClick={() => setMode("register")} 
                  className="text-[#A47149] font-medium hover:underline"
                >
                  הרשמה
                </button>
              </p>
            </div>
          </>
        ) : (
          <>
            <Form {...registerForm}>
              <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-4">
                <FormField
                  control={registerForm.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>שם מלא</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="ישראל ישראלי"
                          autoComplete="name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={registerForm.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>מספר טלפון</FormLabel>
                      <FormControl>
                        <Input
                          dir="ltr"
                          placeholder="050-0000000"
                          type="tel"
                          autoComplete="tel"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={registerForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>אימייל</FormLabel>
                      <FormControl>
                        <Input
                          dir="ltr"
                          placeholder="you@example.com"
                          autoComplete="email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={registerForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>סיסמה</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="••••••••"
                          autoComplete="new-password"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription className="text-xs text-gray-500">
                        הסיסמה חייבת להכיל לפחות 8 תווים, אותיות באנגלית ומספרים.
                      </FormDescription>
                      <FormMessage className="text-right" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={registerForm.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>אימות סיסמה</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="••••••••"
                          autoComplete="new-password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-right" />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="w-full bg-[#A47149] hover:bg-[#8B5E3C]"
                  disabled={isLoading || registerForm.formState.isSubmitting}
                >
                  {(isLoading || registerForm.formState.isSubmitting) ? 
                    <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> יוצר חשבון...</> : 
                    "יצירת חשבון"}
                </Button>
              </form>
            </Form>
            
            <div className="text-center mt-4">
              <p className="text-sm text-gray-600">
                יש לך כבר חשבון?{" "}
                <button 
                  onClick={() => setMode("login")} 
                  className="text-[#A47149] font-medium hover:underline"
                >
                  כניסה
                </button>
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Auth;
