import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Workflow } from 'lucide-react';
import { growthProcessSteps } from '@/data/digitalMarketingData';

export default function DigitalGrowthProcess() {
  return (
    <section className="py-20 border-t border-border/40 bg-card/20 relative overflow-hidden">
      {/* Background design elements */}
      <div className="absolute top-10 left-10 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute inset-0 bg-dot-pattern opacity-25 pointer-events-none" />

      <div className="container-main max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <Badge variant="outline" className="px-4 py-1.5 border-primary/40 bg-primary/10 text-primary font-medium text-xs tracking-wider uppercase">
            <Workflow className="w-3.5 h-3.5 mr-2 inline" /> Execution Framework
          </Badge>
          <h2 className="text-3xl md:text-5xl font-extrabold font-outfit text-foreground tracking-tight">
            Our Digital Growth Process
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
            A structured 7-phase methodology to take your digital performance from initial audit to sustainable revenue scaling.
          </p>
        </div>

        <div className="grid md:grid-cols-7 gap-3 relative">
          {growthProcessSteps.map((p, idx) => (
            <motion.div
              key={p.step}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className="p-4 rounded-xl bg-card border border-border/50 hover:border-primary/40 transition-all flex flex-col justify-between group relative shadow-sm"
            >
              <div>
                <span className="text-xs font-black font-outfit text-primary px-2 py-0.5 rounded bg-primary/10 inline-block mb-3">
                  {p.step}
                </span>
                <h3 className="text-sm font-bold font-outfit text-foreground mb-1 group-hover:text-primary transition-colors">
                  {p.title}
                </h3>
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  {p.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
