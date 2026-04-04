import { useState, useCallback } from "react";
import SplashScreen from "@/components/SplashScreen";
import LandingCarousel from "@/components/LandingCarousel";
import RoleSelection from "@/components/RoleSelection";
import Onboarding from "@/components/Onboarding";

type Screen = "splash" | "landing" | "roles" | "onboarding";

const Index = () => {
  const [screen, setScreen] = useState<Screen>("splash");
  const [role, setRole] = useState("");

  const handleSplashEnd = useCallback(() => setScreen("landing"), []);
  const handleLandingEnd = useCallback(() => setScreen("roles"), []);
  const handleRoleSelect = useCallback((r: string) => {
    setRole(r);
    setScreen("onboarding");
  }, []);

  if (screen === "splash") return <SplashScreen onFinish={handleSplashEnd} />;
  if (screen === "onboarding") return <Onboarding role={role} />;
  if (screen === "roles") return <RoleSelection onSelect={handleRoleSelect} />;
  return <LandingCarousel onEnd={handleLandingEnd} />;
};

export default Index;
