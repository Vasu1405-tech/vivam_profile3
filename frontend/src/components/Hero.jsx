import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import MagneticGridBackground from '@/components/ui/MagneticGridBackground';
import InlineLottieText from '@/components/ui/InlineLottieText';
import OriginButton from '@/components/ui/OriginButton';

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden pt-20"
      data-testid="hero-section"
    >
      {/* Framer Magnetic Grid Background */}
      <MagneticGridBackground
        dotColor="rgba(59, 130, 246, 0.22)"
        activeColor="#8B5CF6"
        dotSize={3.5}
        dotSpacing={28}
        influenceRadius={130}
        maxDisplace={14}
        dotOpacity={0.6}
      />

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
            Custom Software Development & Digital Growth Agency
          </motion.div>

          <InlineLottieText
            Tag="h1"
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.15] text-foreground font-outfit"
            text="Vivam Software Services: Transforming Businesses with Scalable Software Solutions"
            triggers={[
              {
                word: "Transforming",
                type: "astronaut_rocket",
                size: "1.25em",
                zoom: 1.2,
                x: 0,
                y: -5,
                speed: 1,
                glowColor: "rgba(59, 130, 246, 0.5)"
              },
              {
                word: "Businesses",
                type: "blue_blob",
                size: "1.2em",
                zoom: 1.15,
                x: 0,
                y: -4,
                speed: 1,
                glowColor: "rgba(96, 165, 250, 0.5)"
              },
              {
                word: "Scalable",
                type: "blue_bird",
                size: "1.2em",
                zoom: 1.2,
                x: 0,
                y: -4,
                speed: 1,
                glowColor: "rgba(79, 70, 229, 0.4)"
              }
            ]}
          />

          <p className="mt-6 text-base md:text-lg text-muted-foreground leading-relaxed max-w-lg">
            Vivam Software Services & IT Trainings provides custom software development, enterprise web & mobile app engineering, real-time SEO growth audits, and hands-on IT masterclasses.
          </p>


          <div className="mt-10 flex flex-wrap gap-4">
            <OriginButton
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              backgroundColor="linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)"
              hoverColor="linear-gradient(135deg, #1E40AF 0%, #059669 100%)"
              textColor="#FFFFFF"
              className="rounded-full px-8 py-3.5 text-base font-bold shadow-xl shadow-blue-500/25"
            >
              Get a Free Consultation <ArrowRight className="w-4 h-4 ml-2" />
            </OriginButton>

            <OriginButton
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              backgroundColor="rgba(255, 255, 255, 0.05)"
              hoverColor="linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)"
              textColor="var(--foreground)"
              hoverTextColor="#FFFFFF"
              className="rounded-full border border-border/80 px-8 py-3.5 text-base font-semibold"
            >
              Talk to Our Experts
            </OriginButton>
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
              src="/assets/hero-team.png"
              alt="Team analyzing security network"
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
