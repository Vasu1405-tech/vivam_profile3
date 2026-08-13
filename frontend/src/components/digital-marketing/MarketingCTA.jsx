import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import OriginButton from '@/components/ui/OriginButton';
import TextHoverEffects from '@/components/ui/TextHoverEffects';

export default function MarketingCTA({ onPrimaryClick, onSecondaryClick }) {
  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-br from-blue-900/40 via-background to-violet-900/40 border-t border-border/40">
      {/* Background design glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-indigo-500/20 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute inset-0 bg-dot-pattern opacity-20 pointer-events-none" />

      <div className="container-main max-w-5xl mx-auto px-6 text-center space-y-8 relative z-10">
        <div className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/30">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Connect Marketing & Technology</span>
        </div>

        <div>
          <TextHoverEffects
            Tag="h2"
            text="Ready to Turn Your Digital Presence Into Business Growth?"
            className="text-3xl md:text-5xl font-extrabold font-outfit text-foreground tracking-tight max-w-3xl mx-auto leading-tight"
            preset="Bounce"
            centerScaleY={1.4}
            neighborScaleY={1.2}
            neighborDistance={2}
            colorRipple={true}
            accentColor="#60A5FA"
          />
        </div>

        <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
          Tell us about your business, your current challenges and your growth goals. Our team can help you create a practical digital growth strategy powered by marketing, technology and automation.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <OriginButton
            onClick={onPrimaryClick}
            backgroundColor="linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)"
            hoverColor="linear-gradient(135deg, #1E40AF 0%, #059669 100%)"
            textColor="#FFFFFF"
            className="w-full sm:w-auto rounded-full py-4 px-8 text-sm font-bold shadow-xl shadow-blue-500/25"
          >
            Get a Free Marketing Consultation <ArrowRight className="w-4 h-4 ml-2" />
          </OriginButton>

          <OriginButton
            onClick={onSecondaryClick}
            backgroundColor="rgba(255, 255, 255, 0.05)"
            hoverColor="linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)"
            textColor="var(--foreground)"
            hoverTextColor="#FFFFFF"
            className="w-full sm:w-auto rounded-full border border-border/80 py-4 px-8 text-sm font-semibold"
          >
            View Technology Services
          </OriginButton>
        </div>
      </div>
    </section>
  );
}

