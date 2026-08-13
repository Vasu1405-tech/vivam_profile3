import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { ArrowDown, ArrowRight, Filter } from 'lucide-react';
import { growthFunnelSteps } from '@/data/digitalMarketingData';

export default function GrowthFunnel() {
  return (
    <section className="py-20 border-t border-border/40 bg-card/20 relative overflow-hidden">
      {/* Background design elements */}
      <div className="absolute top-10 right-10 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[450px] h-[450px] bg-indigo-500/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute inset-0 bg-dot-pattern opacity-25 pointer-events-none" />

      <div className="container-main max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <Badge variant="outline" className="px-4 py-1.5 border-blue-500/40 bg-blue-500/10 text-blue-400 font-medium text-xs tracking-wider uppercase">
            <Filter className="w-3.5 h-3.5 mr-2 inline" /> Conversion Funnel
          </Badge>
          <h2 className="text-3xl md:text-5xl font-extrabold font-outfit text-foreground tracking-tight">
            From Visibility to Revenue
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
            A connected growth architecture designed to turn top-of-funnel traffic into sustainable bottom-line revenue.
          </p>
        </div>

        {/* Desktop Horizontal Funnel */}
        <div className="hidden lg:grid grid-cols-6 gap-3 items-stretch relative">
          {growthFunnelSteps.map((step, idx) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="p-5 rounded-2xl bg-card border border-border/60 hover:border-primary/40 transition-all flex flex-col justify-between group relative shadow-md"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-black font-outfit text-primary px-2.5 py-1 rounded-md bg-primary/10">
                    {step.step}
                  </span>
                  <step.icon className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <h3 className="text-sm font-bold font-outfit text-foreground mb-1">
                  {step.title}
                </h3>
                <p className="text-[11px] font-medium text-primary mb-2">
                  {step.subtitle}
                </p>
                <p className="text-[11px] text-muted-foreground leading-relaxed mb-4">
                  {step.description}
                </p>
              </div>

              <div>
                <div className="flex flex-wrap gap-1">
                  {step.channels.map((ch) => (
                    <span key={ch} className="text-[9px] font-semibold px-2 py-0.5 rounded bg-muted/60 text-muted-foreground">
                      {ch}
                    </span>
                  ))}
                </div>
              </div>

              {idx < growthFunnelSteps.length - 1 && (
                <div className="absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-6 h-6 rounded-full bg-background border border-border flex items-center justify-center text-muted-foreground">
                  <ArrowRight className="w-3 h-3" />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Mobile / Tablet Vertical Funnel */}
        <div className="lg:hidden space-y-4">
          {growthFunnelSteps.map((step, idx) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.08 }}
              className="p-6 rounded-2xl bg-card border border-border/60 flex flex-col sm:flex-row items-start gap-4 relative"
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary font-black font-outfit text-base flex items-center justify-center shrink-0">
                {step.step}
              </div>
              <div className="space-y-1 flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold font-outfit text-foreground">{step.title}</h3>
                  <step.icon className="w-4 h-4 text-primary" />
                </div>
                <p className="text-xs font-semibold text-primary">{step.subtitle}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{step.description}</p>
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {step.channels.map((ch) => (
                    <span key={ch} className="text-[10px] font-semibold px-2 py-0.5 rounded bg-muted/60 text-muted-foreground">
                      {ch}
                    </span>
                  ))}
                </div>
              </div>

              {idx < growthFunnelSteps.length - 1 && (
                <div className="flex justify-center w-full pt-2 lg:hidden">
                  <ArrowDown className="w-4 h-4 text-muted-foreground" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
