import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
import Footer from "@/components/Footer";
import Admin from "@/pages/Admin";
import DigitalMarketing from "@/pages/DigitalMarketing";

function HomePage({ loading, setLoading }) {
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
    <>
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
        <Footer />
      </div>
    </>
  );
}

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("React ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-6 text-center">
          <div className="max-w-md p-8 rounded-3xl bg-card border border-border/80 shadow-2xl space-y-4">
            <h2 className="text-2xl font-bold font-outfit text-primary">Something went wrong</h2>
            <p className="text-sm text-muted-foreground">
              An unexpected error occurred while loading this section.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2.5 rounded-full bg-primary text-primary-foreground font-bold text-xs shadow-lg hover:opacity-90 transition-opacity"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <ErrorBoundary>
      <ThemeProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage loading={loading} setLoading={setLoading} />} />
            <Route path="/digital-marketing-services" element={<DigitalMarketing />} />
            <Route path="/digital-marketing" element={<DigitalMarketing />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
          <Toaster position="bottom-right" richColors />
        </Router>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;

