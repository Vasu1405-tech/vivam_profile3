import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  ArrowRight,
  Sparkles,
  TrendingUp,
  Users,
  Target,
  BarChart3,
  Search,
  Share2,
  DollarSign,
  ShieldCheck,
  Zap,
  Globe2
} from 'lucide-react';
import InlineLottieText from '@/components/ui/InlineLottieText';
import OriginButton from '@/components/ui/OriginButton';
import MagneticGridBackground from '@/components/ui/MagneticGridBackground';

export default function DigitalMarketingHero({ onConsultationClick, onExploreServicesClick }) {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-background">
      {/* Framer Magnetic Grid Background */}
      <MagneticGridBackground
        dotColor="rgba(59, 130, 246, 0.25)"
        activeColor="#8B5CF6"
        dotSize={3.5}
        dotSpacing={28}
        influenceRadius={130}
        maxDisplace={14}
        dotOpacity={0.65}
      />

      {/* Background Gradient Orbs */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-blue-600/15 via-violet-600/10 to-transparent -z-10 pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="container-main max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Text & CTAs */}
          <div className="lg:col-span-6 space-y-6">
            <Badge variant="outline" className="px-4 py-1.5 border-blue-500/40 bg-blue-500/10 text-blue-400 font-semibold text-xs tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5 mr-2 inline" /> DIGITAL GROWTH
            </Badge>

            <InlineLottieText
              Tag="h1"
              className="text-4xl md:text-5xl lg:text-6xl font-black font-outfit text-foreground tracking-tight leading-[1.15]"
              text="Digital Marketing That Drives Business Growth & High-Intent Leads"
              triggers={[
                {
                  word: "Drives",
                  type: "astronaut_rocket",
                  size: "1.3em",
                  zoom: 1.2,
                  x: 0,
                  y: -6,
                  speed: 1,
                  glowColor: "rgba(59, 130, 246, 0.5)"
                },
                {
                  word: "Business",
                  type: "blue_blob",
                  size: "1.25em",
                  zoom: 1.15,
                  x: 0,
                  y: -4,
                  speed: 1,
                  glowColor: "rgba(96, 165, 250, 0.4)"
                },
                {
                  word: "Leads",
                  type: "blue_bird",
                  size: "1.25em",
                  zoom: 1.2,
                  x: 0,
                  y: -4,
                  speed: 1,
                  glowColor: "rgba(79, 70, 229, 0.4)"
                }
              ]}
            />

            <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl">
              Data-driven digital marketing, performance campaigns and intelligent automation designed to attract the right audience, generate qualified leads and turn digital activity into measurable business growth.
            </p>


            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <OriginButton
                onClick={onConsultationClick}
                backgroundColor="linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)"
                hoverColor="linear-gradient(135deg, #1D4ED8 0%, #059669 100%)"
                textColor="#FFFFFF"
                className="rounded-full px-8 py-4 text-sm font-bold shadow-xl shadow-blue-500/25"
              >
                Get a Free Marketing Consultation <ArrowRight className="w-4 h-4 ml-2" />
              </OriginButton>

              <OriginButton
                onClick={onExploreServicesClick}
                backgroundColor="rgba(255, 255, 255, 0.05)"
                hoverColor="linear-gradient(135deg, #475569 0%, #1E293B 100%)"
                textColor="var(--foreground)"
                hoverTextColor="#FFFFFF"
                className="rounded-full border border-border/80 px-8 py-4 text-sm font-semibold"
              >
                Explore Our Services
              </OriginButton>
            </div>

            {/* Quick Proof Badges */}
            <div className="pt-6 border-t border-border/40 grid grid-cols-3 gap-4">
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase">Targeting</p>
                <p className="text-sm font-bold text-foreground mt-0.5">High-Intent Leads</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase">Technology</p>
                <p className="text-sm font-bold text-foreground mt-0.5">AI & Automation</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase">Reporting</p>
                <p className="text-sm font-bold text-foreground mt-0.5">Full Attribution</p>
              </div>
            </div>
          </div>

          {/* Right Column: Dashboard UI Analytics Composition */}
          <div className="lg:col-span-6 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="p-6 md:p-8 rounded-3xl bg-card border border-border/70 shadow-2xl space-y-6 relative overflow-hidden backdrop-blur-xl"
            >
              {/* Header Strip */}
              <div className="flex items-center justify-between pb-4 border-b border-border/40">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-bold font-outfit uppercase tracking-wider text-foreground">
                    Growth Analytics Console
                  </span>
                </div>
                <Badge variant="secondary" className="text-[10px] font-semibold text-muted-foreground">
                  Illustrative UI Data
                </Badge>
              </div>

              {/* Main Metric Cards Grid */}
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3.5 rounded-xl bg-background/60 border border-border/50">
                  <p className="text-[10px] font-semibold uppercase text-muted-foreground">Visitors</p>
                  <p className="text-xl font-extrabold font-outfit text-foreground mt-1">24,850</p>
                  <span className="text-[9px] font-semibold text-emerald-400">↑ 24.5%</span>
                </div>

                <div className="p-3.5 rounded-xl bg-background/60 border border-border/50">
                  <p className="text-[10px] font-semibold uppercase text-muted-foreground">Leads</p>
                  <p className="text-xl font-extrabold font-outfit text-foreground mt-1">1,284</p>
                  <span className="text-[9px] font-semibold text-emerald-400">↑ 18.2%</span>
                </div>

                <div className="p-3.5 rounded-xl bg-background/60 border border-border/50">
                  <p className="text-[10px] font-semibold uppercase text-muted-foreground">Conversion</p>
                  <p className="text-xl font-extrabold font-outfit text-foreground mt-1">5.17%</p>
                  <span className="text-[9px] font-semibold text-emerald-400">↑ 1.4%</span>
                </div>
              </div>

              {/* SVG Sparkline Graph */}
              <div className="p-4 rounded-2xl bg-background/40 border border-border/40 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-foreground">Traffic & Conversion Trend</span>
                  <span className="text-[10px] text-muted-foreground">Last 30 Days</span>
                </div>

                <div className="h-28 w-full pt-2">
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 300 80" fill="none">
                    <defs>
                      <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M 0 65 Q 40 45, 80 50 T 160 30 T 240 20 T 300 10 L 300 80 L 0 80 Z"
                      fill="url(#chartGradient)"
                    />
                    <path
                      d="M 0 65 Q 40 45, 80 50 T 160 30 T 240 20 T 300 10"
                      stroke="#3b82f6"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                    <circle cx="300" cy="10" r="5" fill="#8b5cf6" className="animate-ping" />
                    <circle cx="300" cy="10" r="4" fill="#8b5cf6" />
                  </svg>
                </div>
              </div>

              {/* Channel Attribution Strip */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="p-3 rounded-xl bg-background/40 border border-border/40 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Search className="w-4 h-4 text-blue-400" />
                    <div>
                      <p className="text-[11px] font-bold text-foreground">SEO Visibility</p>
                      <p className="text-[10px] text-muted-foreground">+180% Organic</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-blue-400">94/100</span>
                </div>

                <div className="p-3 rounded-xl bg-background/40 border border-border/40 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-amber-400" />
                    <div>
                      <p className="text-[11px] font-bold text-foreground">Revenue Attrib.</p>
                      <p className="text-[10px] text-muted-foreground">Multi-Touch</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-emerald-400">4.2x ROAS</span>
                </div>
              </div>
            </motion.div>

            {/* Subtle Floating Floating Card */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="hidden sm:flex items-center gap-3 p-3.5 rounded-2xl bg-card/90 backdrop-blur-md border border-emerald-500/40 shadow-xl absolute -bottom-6 -left-6 z-20"
            >
              <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-foreground">AI Automation Active</p>
                <p className="text-[10px] text-muted-foreground">Forms → CRM → Lead Scoring</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
