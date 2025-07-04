
import { useState, useEffect } from "react";
import EnhancedNavigation from "@/components/EnhancedNavigation";
import InternshipPreview from "@/components/InternshipPreview";
import TestimonialsSection from "@/components/TestimonialsSection";
import BlogSection from "@/components/BlogSection";
import ContactSection from "@/components/ContactSection";
import EnhancedFooter from "@/components/EnhancedFooter";
import TrustSection from "@/components/TrustSection";
import CookieConsent from "@/components/CookieConsent";
import Breadcrumb from "@/components/Breadcrumb";
import HeroSection from "@/components/HeroSection";
import MetricsSection from "@/components/MetricsSection";
import FeaturesSection from "@/components/FeaturesSection";
import CallToActionSection from "@/components/CallToActionSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <EnhancedNavigation />
      <Breadcrumb />
      <HeroSection />
      <MetricsSection />
      <FeaturesSection />
      <InternshipPreview />
      <TestimonialsSection />
      <BlogSection />
      <CallToActionSection />
      <ContactSection />
      <EnhancedFooter />
      <CookieConsent />
    </div>
  );
};

export default Index;
