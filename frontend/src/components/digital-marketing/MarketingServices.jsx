import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { marketingServicesList } from '@/data/digitalMarketingData';

export default function MarketingServices({ onSelectService }) {
  return (
    <section id="services-section" className="py-20 border-t border-border/40 bg-card/20 relative overflow-hidden">
      {/* Background design elements */}
      <div className="absolute top-10 right-10 w-[500px] h-[500px] bg-violet-500/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[450px] h-[450px] bg-cyan-500/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute inset-0 bg-grid-mesh opacity-25 pointer-events-none" />

      <div className="container-main max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <p className="text-xs font-semibold tracking-wider uppercase text-primary">
            OUR DIGITAL MARKETING SERVICES
          </p>
          <h2 className="text-3xl md:text-5xl font-extrabold font-outfit text-foreground tracking-tight">
            Everything You Need to Grow Online
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
            End-to-end digital marketing solutions combining strategy, technology, creative media, and performance analytics.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {marketingServicesList.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              whileHover={{ y: -6 }}
              className={`rounded-2xl p-6 bg-card border transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col justify-between group relative overflow-hidden ${
                service.isProminent
                  ? 'border-violet-500/60 bg-gradient-to-b from-violet-950/30 to-card shadow-violet-500/10'
                  : 'border-border/60 hover:border-primary/40'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${service.color} group-hover:scale-110 transition-transform`}>
                    <service.icon className="w-5 h-5" />
                  </div>
                  <span className="text-2xl font-black font-outfit text-muted-foreground/30 group-hover:text-primary/50 transition-colors">
                    {service.number}
                  </span>
                </div>

                <Badge 
                  variant={service.isProminent ? 'default' : 'secondary'} 
                  className={`text-[10px] font-semibold mb-3 ${
                    service.isProminent ? 'bg-violet-600 text-white' : ''
                  }`}
                >
                  {service.badge}
                </Badge>

                <h3 className="text-lg font-bold font-outfit text-foreground mb-2 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                  {service.description}
                </p>

                <ul className="space-y-2 mb-6">
                  {service.features.map((feat) => (
                    <li key={feat} className="flex items-start text-[11px] text-muted-foreground">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mr-2 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-between text-xs font-semibold hover:bg-primary/10 hover:text-primary transition-colors mt-2"
                onClick={() => onSelectService(service)}
              >
                <span>Request Strategy</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
