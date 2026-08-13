import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import { Button } from '@/components/ui/button';
import { Sun, Moon, Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/#about' },
  { label: 'Services', href: '/#services' },
  { label: 'Digital Marketing', href: '/digital-marketing-services' },
  { label: 'Workshops', href: '/#workshops' },
  { label: 'Portfolio', href: '/#portfolio' },
  { label: 'FAQ', href: '/#faq' },
  { label: 'Contact', href: '/#contact' },
];

function StaggeredRollingText({ text, isHovered }) {
  const chars = Array.from(text);
  const baseDuration = 0.35;
  const staggerFactor = 0.35;

  return (
    <span className="inline-flex items-center overflow-hidden relative select-none leading-none">
      {chars.map((char, index) => {
        const delay = chars.length > 0 ? (baseDuration / chars.length) * index * staggerFactor : 0;

        return (
          <span key={index} className="relative inline-block overflow-hidden h-[18px] lg:h-[20px]">
            <motion.span
              className="flex flex-col"
              animate={{ y: isHovered ? '-50%' : '0%' }}
              transition={{
                type: 'spring',
                stiffness: 420,
                damping: 26,
                delay: delay
              }}
            >
              <span className="h-[18px] lg:h-[20px] flex items-center leading-none text-foreground/80 font-medium">
                {char === ' ' ? '\u00A0' : char}
              </span>
              <span className="h-[18px] lg:h-[20px] flex items-center leading-none text-foreground font-bold">
                {char === ' ' ? '\u00A0' : char}
              </span>
            </motion.span>
          </span>
        );
      })}
    </span>
  );
}

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);

  const handleNavClick = (e, href) => {
    if (href === '/') {
      if (window.location.pathname === '/') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else if (href.startsWith('/#')) {
      const sectionId = href.replace('/#', '');
      const element = document.getElementById(sectionId);
      if (element && window.location.pathname === '/') {
        e.preventDefault();
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setMobileOpen(false);
  };

  const handleGetQuote = () => {
    setMobileOpen(false);
    const element = document.getElementById('contact') || document.getElementById('consultation-form');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = '/#contact';
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border/30"
      data-testid="navbar"
    >
      <div className="container-main flex items-center justify-between h-16 md:h-20">
        <a href="/" className="flex items-center gap-2" data-testid="navbar-logo">
          <img src="/vivam-logo.png" alt="Vivam Logo" className="w-10 h-10 rounded-full object-cover" />
          <span className="font-outfit font-bold text-xl tracking-tight text-foreground">
            Vivam
          </span>
        </a>

        {/* Framer Modern Navbar Original Rolling Text & Spring Pill Link Container */}
        <div
          className="hidden md:flex items-center gap-1 p-1.5 rounded-full border border-border/30 bg-card/40 backdrop-blur-md shadow-sm"
          onMouseLeave={() => setHoveredLink(null)}
        >
          {navLinks.map((link) => {
            const isHovered = hoveredLink === link.href;

            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                onMouseEnter={() => setHoveredLink(link.href)}
                className="relative px-3.5 py-1.5 text-xs lg:text-sm font-medium tracking-tight rounded-full select-none cursor-pointer flex items-center"
                data-testid={`nav-link-${link.label.toLowerCase()}`}
              >
                {isHovered && (
                  <motion.span
                    layoutId="framer-nav-pill-highlight"
                    className="absolute inset-0 rounded-full bg-primary/10 border border-primary/20 shadow-sm"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{
                      type: 'spring',
                      stiffness: 380,
                      damping: 28,
                      mass: 0.7
                    }}
                  />
                )}

                <span className="relative z-10">
                  <StaggeredRollingText text={link.label} isHovered={isHovered} />
                </span>
              </a>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="rounded-full"
            data-testid="theme-toggle-btn"
          >
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>

          <Button
            className="hidden md:inline-flex rounded-full bg-gradient-to-r from-blue-500 to-violet-600 text-white hover:opacity-90 border-0"
            size="sm"
            data-testid="nav-cta-btn"
            onClick={handleGetQuote}
          >
            Get Quote
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            data-testid="mobile-menu-btn"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-border/30 bg-background/95 backdrop-blur-xl"
            data-testid="mobile-menu"
          >
            <div className="container-main py-6 flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="px-4 py-2.5 rounded-xl text-base font-medium text-foreground/80 hover:text-foreground hover:bg-muted/40 transition-all duration-200"
                  data-testid={`mobile-nav-${link.label.toLowerCase()}`}
                >
                  {link.label}
                </a>
              ))}
              <Button
                className="w-full rounded-full bg-gradient-to-r from-blue-500 to-violet-600 text-white border-0 mt-2"
                data-testid="mobile-cta-btn"
                onClick={handleGetQuote}
              >
                Get Quote
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
