import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle2, ArrowRight, Layers } from 'lucide-react';
import { packagesList } from '@/data/digitalMarketingData';

export default function MarketingPackages({ onSelectPackage }) {
  return (
    <section className="py-20 border-t border-border/40 bg-card/20 relative overflow-hidden">
      {/* Background design elements */}
      <div className="absolute top-10 right-10 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[450px] h-[450px] bg-indigo-500/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute inset-0 bg-dot-pattern opacity-25 pointer-events-none" />

      <div className="container-main max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <Badge variant="outline" className="px-4 py-1.5 border-primary/40 bg-primary/10 text-primary font-medium text-xs tracking-wider uppercase">
            <Layers className="w-3.5 h-3.5 mr-2 inline" /> Growth Models
          </Badge>
          <h2 className="text-3xl md:text-5xl font-extrabold font-outfit text-foreground tracking-tight">
            Digital Growth Strategy Options
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
            Tailored engagement models designed to align with your acquisition objectives and technology scope.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {packagesList.map((pkg, idx) => (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              whileHover={{ y: -6 }}
              className={`rounded-2xl p-6 bg-card border transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col justify-between group relative ${
                pkg.popular
                  ? 'border-primary/80 bg-gradient-to-b from-primary/5 to-card shadow-primary/10'
                  : 'border-border/60 hover:border-primary/40'
              }`}
            >
              <div>
                {pkg.popular && (
                  <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground text-[10px] font-bold">
                    RECOMMENDED
                  </Badge>
                )}

                <h3 className="text-lg font-bold font-outfit text-foreground mb-1">
                  {pkg.name}
                </h3>
                <p className="text-[11px] font-medium text-muted-foreground mb-6">
                  {pkg.target}
                </p>

                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feat) => (
                    <li key={feat} className="flex items-start text-xs text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 mr-2 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Button
                variant={pkg.popular ? 'default' : 'outline'}
                className="w-full rounded-full font-bold text-xs py-5"
                onClick={() => onSelectPackage(pkg)}
              >
                {pkg.ctaText} <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
