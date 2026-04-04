import React, { useState, useEffect } from "react";
import "@/App.css";
import { ThemeProvider } from "@/context/ThemeContext";
import Preloader from "@/components/Preloader";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Highlights from "@/components/Highlights";
import About from "@/components/About";
import Services from "@/components/Services";
import Workshops from "@/components/Workshops";
import TechStack from "@/components/TechStack";
import Solutions from "@/components/Solutions";
import Industries from "@/components/Industries";
import Portfolio from "@/components/Portfolio";
import WhyChoose from "@/components/WhyChoose";
// import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";
import Contact from "@/components/Contact";
import FAQ from "@/components/FAQ";
import { Toaster } from 'sonner';
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import Footer from "@/components/Footer";

function App() {
  const [loading, setLoading] = useState(true);

  // Prevent scrolling while preloader is active
  useEffect(() => {
    if (loading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [loading]);

  return (
    <ThemeProvider>
      {/* Show Preloader on initial load */}
      {loading && <Preloader onComplete={() => setLoading(false)} />}

      <div className={`min-h-screen bg-background text-foreground transition-opacity duration-700 ${loading ? 'opacity-0' : 'opacity-100'}`}>
        <Navbar />
        <main>
          <Hero />
          <Highlights />
          <About />
          <Services />
          <Workshops />
          <TechStack />
          <Solutions />
          <Industries />
          <Portfolio />
          <FAQ />
          <WhyChoose />
          {/* <Testimonials /> */}
          <CTA />
          <Contact />
        </main>
        <Toaster position="bottom-right" richColors />
        <FloatingWhatsApp />
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
