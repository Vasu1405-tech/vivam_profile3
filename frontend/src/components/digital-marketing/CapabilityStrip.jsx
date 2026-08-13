import React from 'react';
import { motion } from 'framer-motion';
import { capabilityStripItems } from '@/data/digitalMarketingData';

export default function CapabilityStrip() {
  return (
    <section className="py-8 border-y border-border/40 bg-card/30 backdrop-blur-md">
      <div className="container-main max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {capabilityStripItems.map((item, idx) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              whileHover={{ y: -3 }}
              className="p-3 rounded-xl bg-card/60 border border-border/50 hover:border-primary/40 transition-all text-center flex flex-col items-center justify-center group cursor-default"
            >
              <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                <item.icon className="w-4 h-4" />
              </div>
              <span className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors leading-tight">
                {item.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
