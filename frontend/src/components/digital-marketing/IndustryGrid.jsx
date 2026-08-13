import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Building2 } from 'lucide-react';
import { industriesList } from '@/data/digitalMarketingData';
import Antigravity from '@/components/ui/Antigravity';

export default function IndustryGrid() {
  return (
    <section className="py-24 border-t border-border/40 bg-gradient-to-b from-background via-card/30 to-background relative overflow-hidden min-h-[500px]">
      {/* Full Section Background: React Bits Antigravity 3D Particle Canvas */}
      <div className="absolute inset-0 pointer-events-none z-0 w-full h-full">
        <Antigravity
          count={350}
          magnetRadius={8}
          ringRadius={9}
          waveSpeed={0.5}
          waveAmplitude={1.2}
          particleSize={1.8}
          lerpSpeed={0.08}
          color={'#FF9FFC'}
          autoAnimate={true}
          particleVariance={1}
        />
      </div>

      <div className="container-main max-w-6xl mx-auto px-6 relative z-10">

        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <Badge variant="outline" className="px-4 py-1.5 border-pink-500/40 bg-pink-500/10 text-pink-500 dark:text-pink-400 font-semibold text-xs tracking-wider uppercase">
            <Building2 className="w-3.5 h-3.5 mr-2 inline" /> Vertical Experience
          </Badge>
          <h2 className="text-3xl md:text-5xl font-extrabold font-outfit text-foreground tracking-tight">
            Digital Growth Across Industries
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Tailored acquisition strategies engineered around unique buyer journeys and industry compliance.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {industriesList.map((ind, idx) => (
            <motion.div
              key={ind.name}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              whileHover={{ y: -4 }}
              className="p-6 rounded-2xl bg-card/85 border border-border/70 hover:border-pink-500/40 transition-all shadow-lg hover:shadow-2xl flex flex-col justify-between group backdrop-blur-xl"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-pink-500/10 text-pink-500 dark:text-pink-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <ind.icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold font-outfit text-foreground mb-1 group-hover:text-pink-500 transition-colors">
                  {ind.name}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {ind.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}


