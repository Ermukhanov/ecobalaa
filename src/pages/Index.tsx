import { useState, useCallback } from "react";
import LandingCarousel from "@/components/LandingCarousel";
import RoleSelection from "@/components/RoleSelection";
import Onboarding from "@/components/Onboarding";

type Screen = "landing" | "roles" | "onboarding";

const Index = () => {
  const [screen, setScreen] = useState<Screen>("landing");
  const [role, setRole] = useState<string>("");

  const handleLandingEnd = useCallback(() => setScreen("roles"), []);
  const handleRoleSelect = useCallback((r: string) => {
    setRole(r);
    setScreen("onboarding");
  }, []);

  if (screen === "onboarding") return <Onboarding role={role} />;
  if (screen === "roles") return <RoleSelection onSelect={handleRoleSelect} />;
  return <LandingCarousel onEnd={handleLandingEnd} />;
};

export default Index;
