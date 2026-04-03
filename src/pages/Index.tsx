import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import FeaturesSection from "@/components/FeaturesSection";
import PlatformsSection from "@/components/PlatformsSection";
import TeacherSection from "@/components/TeacherSection";
import AchievementsSection from "@/components/AchievementsSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import ReviewsSection from "@/components/ReviewsSection";
import ComingSoonSection from "@/components/ComingSoonSection";
import FAQSection from "@/components/FAQSection";
import ContactsSection from "@/components/ContactsSection";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="min-h-screen">
    <Navbar />
    <HeroSection />
    <AboutSection />
    <FeaturesSection />
    <PlatformsSection />
    <TeacherSection />
    <AchievementsSection />
    <HowItWorksSection />
    <ReviewsSection />
    <ComingSoonSection />
    <FAQSection />
    <ContactsSection />
    <Footer />
  </div>
);

export default Index;
