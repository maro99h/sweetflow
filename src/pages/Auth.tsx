
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AlertCircle, Loader2, CheckCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const loginSchema = z.object({
  email: z.string().email("נא להזין כתובת אימייל חוקית"),
  password: z.string().min(6, "סיסמה חייבת להכיל לפחות 6 תווים"),
});

const registerSchema = z.object({
  email: z.string().email("נא להזין כתובת אימייל חוקית"),
  password: z.string().min(6, "סיסמה חייבת להכיל לפחות 6 תווים"),
  confirmPassword: z.string().min(6, "סיסמה חייבת להכיל לפחות 6 תווים"),
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
  const { signIn, signUp, isLoading, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // If user is already logged in, redirect to dashboard
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const registerForm = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // Reset forms and errors when switching modes
  useEffect(() => {
    setServerError(null);
    setSuccessMsg(null);
    
    if (mode === "login") {
      loginForm.reset();
    } else {
      registerForm.reset();
    }
  }, [mode, loginForm, registerForm]);

  const onLoginSubmit = async (data: LoginFormValues) => {
    setServerError(null);
    try {
      const { error, data: authData } = await signIn(data.email, data.password);
      
      if (error) {
        console.error("Login error:", error);
        if (error.message.includes("Invalid login")) {
          setServerError("שם משתמש או סיסמה שגויים. אנא נסה שוב.");
        } else if (error.message.includes("Email not confirmed")) {
          setServerError("נא לאמת את כתובת האימייל לפני הכניסה.");
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
      
      setSuccessMsg("ההרשמה הצליחה! בדוק את האימייל שלך לאימות החשבון.");
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
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>אימייל</FormLabel>
                      <FormControl>
                        <Input
                          dir="ltr"
                          placeholder="you@example.com"
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
                          {...field}
                        />
                      </FormControl>
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
