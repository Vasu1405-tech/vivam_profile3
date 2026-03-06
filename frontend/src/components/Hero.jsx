import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden pt-20"
      data-testid="hero-section"
    >
      {/* Background gradient orb */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -right-32 w-[600px] h-[600px] rounded-full bg-blue-500/10 blur-[120px] animate-glow-pulse" />
        <div className="absolute bottom-1/4 -left-32 w-[500px] h-[500px] rounded-full bg-violet-500/10 blur-[120px] animate-glow-pulse" style={{ animationDelay: '1.5s' }} />
      </div>

      <div className="container-main relative z-10 grid md:grid-cols-2 gap-12 md:gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-8"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Enterprise Software Solutions
          </motion.div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] text-foreground font-outfit">
            Transforming Businesses with{' '}
            <span className="bg-gradient-to-r from-blue-500 to-violet-500 bg-clip-text text-transparent">
              Scalable Software
            </span>{' '}
            Solutions
          </h1>

          <p className="mt-6 text-base md:text-lg text-muted-foreground leading-relaxed max-w-lg">
            Vivam Software Services delivers enterprise-grade web applications,
            mobile apps, and AI-powered digital platforms for modern businesses.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Button
              size="lg"
              className="rounded-full bg-gradient-to-r from-blue-500 to-violet-600 text-white hover:opacity-90 border-0 px-8 h-12 text-base"
              data-testid="hero-start-project-btn"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Start a Project
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="rounded-full px-8 h-12 text-base"
              data-testid="hero-explore-services-btn"
              onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Explore Services
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
          className="relative hidden md:block"
        >
          <div className="relative rounded-2xl overflow-hidden border border-border/50 shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1768330187404-59e46cf222c9?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2OTF8MHwxfHNlYXJjaHwyfHxhYnN0cmFjdCUyMGZ1dHVyaXN0aWMlMjB0ZWNobm9sb2d5JTIwYmFja2dyb3VuZCUyMGJsdWUlMjBuZXR3b3JrfGVufDB8fHx8MTc3MjczMDU5MHww&ixlib=rb-4.1.0&q=85"
              alt="Technology dashboard"
              className="w-full h-auto object-cover"
              data-testid="hero-image"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
          </div>

          {/* Floating stat card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="absolute -bottom-6 -left-6 glass-card rounded-xl p-4 flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
              <span className="text-green-500 font-bold text-sm">99%</span>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Client Satisfaction</p>
              <p className="text-sm font-semibold text-foreground">Trusted Partner</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
