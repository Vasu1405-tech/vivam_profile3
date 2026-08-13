import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Sparkles } from 'lucide-react';
import { marketingToolsCategories } from '@/data/digitalMarketingData';

export default function MarketingTools() {
  return (
    <section className="py-20 border-t border-border/40 bg-card/10 relative overflow-hidden">
      {/* Background design elements */}
      <div className="absolute top-10 left-10 w-[450px] h-[450px] bg-purple-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-blue-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 bg-grid-mesh opacity-20 pointer-events-none" />

      <div className="container-main max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <Badge variant="outline" className="px-4 py-1.5 border-purple-500/40 bg-purple-500/10 text-purple-400 font-medium text-xs tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5 mr-2 inline" /> Technology Ecosystem
          </Badge>
          <h2 className="text-3xl md:text-5xl font-extrabold font-outfit text-foreground tracking-tight">
            Powered by the Tools Modern Marketing Teams Use
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
            We leverage enterprise analytics, automated bidding platforms, SEO intelligence, and AI engines to give your campaigns a performance edge.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {marketingToolsCategories.map((cat, index) => (
            <motion.div
              key={cat.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="rounded-2xl p-6 bg-card border border-border/50 hover:border-purple-500/40 transition-all duration-300 shadow-sm hover:shadow-lg flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${cat.color}`}>
                    <cat.icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold font-outfit text-foreground">{cat.category}</h3>
                </div>

                <div className="space-y-2.5">
                  {cat.tools.map((t) => (
                    <div
                      key={t.name}
                      className="p-3 rounded-xl bg-background/60 border border-border/50 hover:border-purple-500/40 transition-all flex items-center justify-between group"
                    >
                      <div>
                        <p className="text-xs font-semibold text-foreground group-hover:text-purple-400 transition-colors">
                          {t.name}
                        </p>
                        <p className="text-[11px] text-muted-foreground">{t.desc}</p>
                      </div>
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 ml-2" />
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
