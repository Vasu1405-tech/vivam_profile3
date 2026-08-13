import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Bot, ArrowRight, CheckCircle2 } from 'lucide-react';
import { aiMarketingCards } from '@/data/digitalMarketingData';
import OriginButton from '@/components/ui/OriginButton';

export default function AIMarketingSection({ onExploreAI }) {
  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-b from-background via-muted/30 to-background border-t border-border/40">
      {/* Glow Orbs */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-violet-600/10 via-transparent to-transparent -z-10 pointer-events-none" />

      <div className="container-main max-w-6xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <Badge variant="outline" className="px-4 py-1.5 border-violet-500/40 bg-violet-500/10 text-violet-500 dark:text-violet-400 font-semibold text-xs tracking-wider uppercase">
            <Bot className="w-3.5 h-3.5 mr-2 inline" /> Next-Gen Capabilities
          </Badge>
          <h2 className="text-3xl md:text-5xl font-extrabold font-outfit text-foreground tracking-tight">
            Intelligent Marketing With AI
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Move beyond manual marketing workflows with AI-powered customer engagement, lead qualification, content workflows and automation.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {aiMarketingCards.map((card, idx) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              whileHover={{ y: -5 }}
              className="p-7 rounded-2xl bg-card border border-border/70 hover:border-violet-500/50 transition-all duration-300 shadow-xl flex flex-col justify-between group backdrop-blur-xl"
            >
              <div>
                <div className="p-3.5 rounded-xl bg-violet-500/10 border border-violet-500/20 text-violet-600 dark:text-violet-400 w-fit mb-5 group-hover:scale-110 transition-transform">
                  <card.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold font-outfit text-foreground mb-2 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                  {card.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                  {card.desc}
                </p>
              </div>

              <div className="flex items-center text-[11px] font-semibold text-violet-600 dark:text-violet-400 pt-3 border-t border-border/40">
                <CheckCircle2 className="w-3.5 h-3.5 mr-2 text-emerald-500" />
                <span>Automated Workflow Active</span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-14 text-center">
          <OriginButton
            onClick={onExploreAI}
            backgroundColor="linear-gradient(135deg, #7C3AED 0%, #4F46E5 100%)"
            hoverColor="linear-gradient(135deg, #4F46E5 0%, #2563EB 100%)"
            textColor="#FFFFFF"
            className="rounded-full py-4 px-8 text-sm font-bold shadow-xl shadow-violet-500/20"
          >
            Explore AI & Automation <ArrowRight className="w-4 h-4 ml-2" />
          </OriginButton>
        </div>
      </div>
    </section>
  );
}
