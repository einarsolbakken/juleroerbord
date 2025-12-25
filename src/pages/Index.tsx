import { useState, useEffect } from "react";
import AccessGate from "@/components/AccessGate";
import ProtectedContent from "@/components/ProtectedContent";

const Index = () => {
  const [hasAccess, setHasAccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user already has access
    const accessGranted = localStorage.getItem("access_granted");
    if (accessGranted === "true") {
      setHasAccess(true);
    }
    setIsLoading(false);
  }, []);

  const handleAccessGranted = () => {
    setHasAccess(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("access_granted");
    setHasAccess(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return hasAccess ? (
    <ProtectedContent onLogout={handleLogout} />
  ) : (
    <AccessGate onAccessGranted={handleAccessGranted} />
  );
};

export default Index;
