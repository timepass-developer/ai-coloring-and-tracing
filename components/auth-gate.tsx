"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { X, Download, Gift, Star, Heart } from "lucide-react";

interface AuthGateProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  actionType: "download" | "save" | "print" | null;
  contentTitle?: string;
}

export default function AuthGate({ isOpen, onClose, onSuccess, actionType, contentTitle }: AuthGateProps) {
  const { isAuthenticated, isLoading } = useKindeBrowserClient();
  const [showBenefits, setShowBenefits] = useState(false);

  if (!isOpen) return null;

  // If user is already authenticated, proceed with action
  if (isAuthenticated) {
    onSuccess();
    onClose();
    return null;
  }

  const getActionText = () => {
    switch (actionType) {
      case "download":
        return "Download";
      case "save":
        return "Save";
      case "print":
        return "Print";
      default:
        return "Access";
    }
  };

  const getContentText = () => {
    if (contentTitle) {
      return `"${contentTitle}"`;
    }
    return "this content";
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg mx-auto animate-in fade-in-50 duration-300">
        <CardHeader className="text-center pb-4">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <CardTitle className="text-xl font-bold text-primary flex items-center justify-center gap-2">
                <Gift className="h-5 w-5" />
                Unlock Premium Features
              </CardTitle>
              <CardDescription className="mt-2">
                Sign up to {getActionText().toLowerCase()} {getContentText()} and access unlimited content!
              </CardDescription>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-8 w-8 rounded-full hover:bg-muted"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Benefits Section */}
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-primary/5 rounded-lg">
              <Download className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium text-sm">Unlimited Downloads</p>
                <p className="text-xs text-muted-foreground">Download as many coloring pages and tracing sheets as you want</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-secondary/5 rounded-lg">
              <Star className="h-5 w-5 text-secondary" />
              <div>
                <p className="font-medium text-sm">Premium Content</p>
                <p className="text-xs text-muted-foreground">Access exclusive designs and educational materials</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-accent/5 rounded-lg">
              <Heart className="h-5 w-5 text-accent" />
              <div>
                <p className="font-medium text-sm">Save Your Progress</p>
                <p className="text-xs text-muted-foreground">Keep track of your child's learning journey</p>
              </div>
            </div>
          </div>

          {/* Auth Buttons */}
          <div className="space-y-3">
            <RegisterLink postLoginRedirectURL={window.location.pathname}>
              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-md hover:shadow-lg transition-all duration-200">
                <Gift className="w-4 h-4 mr-2" />
                Sign Up Free
              </Button>
            </RegisterLink>
            
            <LoginLink postLoginRedirectURL={window.location.pathname}>
              <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary/10">
                Already have an account? Sign In
              </Button>
            </LoginLink>
          </div>

          {/* Trust Indicators */}
          <div className="text-center">
            <p className="text-xs text-muted-foreground">
              Join thousands of parents and educators using Kiwiz
            </p>
            <div className="flex justify-center gap-1 mt-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              ))}
              <span className="text-xs text-muted-foreground ml-1">4.9/5 rating</span>
            </div>
          </div>

          {/* Skip Option */}
          <div className="text-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground"
            >
              Maybe later
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
