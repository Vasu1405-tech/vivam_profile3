import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Sparkles } from 'lucide-react';
import { marketingTechPillars } from '@/data/digitalMarketingData';

export default function MarketingTechnologySection() {
  return (
    <section className="py-20 border-t border-border/40 bg-card/10 relative overflow-hidden">
      {/* Background design elements */}
      <div className="absolute top-10 left-10 w-[450px] h-[450px] bg-blue-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-violet-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 bg-dot-pattern opacity-30 pointer-events-none" />

      <div className="container-main max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <Badge variant="outline" className="px-4 py-1.5 border-primary/40 bg-primary/10 text-primary font-medium text-xs tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5 mr-2 inline" /> Core Positioning
          </Badge>
          <h2 className="text-3xl md:text-5xl font-extrabold font-outfit text-foreground tracking-tight">
            Marketing Meets Technology
          </h2>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            Your marketing should not operate separately from your technology. Vivam combines digital marketing, software development, AI and automation to create connected growth systems for modern businesses.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {marketingTechPillars.map((pillar, index) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className={`rounded-2xl p-8 bg-card border ${pillar.color} shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group`}
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="p-3.5 rounded-xl bg-background/80 border border-border/50 group-hover:scale-110 transition-transform">
                    <pillar.icon className="w-6 h-6" />
                  </div>
                  <Badge variant="secondary" className="text-xs font-semibold">
                    {pillar.tag}
                  </Badge>
                </div>
                <h3 className="text-2xl font-bold font-outfit text-foreground mb-4">
                  {pillar.title}
                </h3>
                <ul className="space-y-3.5 mb-6">
                  {pillar.items.map((item) => (
                    <li key={item} className="flex items-start text-sm text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 mr-2.5 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center p-8 rounded-2xl bg-gradient-to-r from-blue-500/10 via-violet-500/10 to-indigo-500/10 border border-primary/20 backdrop-blur-xl">
          <h3 className="text-xl md:text-3xl font-extrabold font-outfit text-foreground tracking-tight">
            One Technology Partner. One Growth Ecosystem.
          </h3>
          <p className="text-sm md:text-base text-muted-foreground mt-2 max-w-2xl mx-auto">
            Build. Market. Automate. Scale — all under one unified strategy.
          </p>
        </div>
      </div>
    </section>
  );
}
