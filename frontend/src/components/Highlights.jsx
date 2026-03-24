import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Users, Clock, Layers } from 'lucide-react';

const stats = [
  { icon: Briefcase, value: '50+', label: 'Projects Delivered', color: 'text-blue-500 bg-blue-500/10' },
  { icon: Users, value: '10+', label: 'Technology Experts', color: 'text-violet-500 bg-violet-500/10' },
  { icon: Clock, value: '2+', label: 'Years Experience', color: 'text-emerald-500 bg-emerald-500/10' },
  { icon: Layers, value: '10+', label: 'Technologies', color: 'text-amber-500 bg-amber-500/10' },
];

export default function Highlights() {
  return (
    <section className="py-16 md:py-20 relative" data-testid="highlights-section">
      <div className="container-main">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card rounded-2xl p-6 md:p-8 text-center hover:scale-105 transition-transform duration-300"
              data-testid={`highlight-card-${i}`}
            >
              <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center mx-auto mb-4`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <h3 className="text-3xl md:text-4xl font-bold font-outfit text-foreground tracking-tight">
                {stat.value}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground font-medium">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
