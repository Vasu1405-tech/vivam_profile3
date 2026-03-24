import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, HeartPulse, ShoppingCart, UtensilsCrossed, Truck, LayoutGrid } from 'lucide-react';

const industries = [
  { icon: GraduationCap, title: 'EdTech', description: 'Learning management & educational platforms', color: 'text-blue-500 bg-blue-500/10' },
  { icon: HeartPulse, title: 'Healthcare', description: 'Digital health solutions & patient management', color: 'text-rose-500 bg-rose-500/10' },
  { icon: ShoppingCart, title: 'Retail & E-commerce', description: 'Online stores & marketplace platforms', color: 'text-emerald-500 bg-emerald-500/10' },
  { icon: UtensilsCrossed, title: 'Food Delivery', description: 'Ordering systems & delivery platforms', color: 'text-amber-500 bg-amber-500/10' },
  { icon: Truck, title: 'Logistics', description: 'Supply chain & fleet management systems', color: 'text-cyan-500 bg-cyan-500/10' },
  { icon: LayoutGrid, title: 'Enterprise SaaS', description: 'Multi-tenant SaaS platforms & tools', color: 'text-violet-500 bg-violet-500/10' },
];

export default function Industries() {
  return (
    <section id="industries" className="section-padding" data-testid="industries-section">
      <div className="container-main">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-medium tracking-wider uppercase text-primary mb-4">
            Industries
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground font-outfit">
            Industries We Serve
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
          {industries.map((ind, i) => (
            <motion.div
              key={ind.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="glass-card rounded-2xl p-6 text-center hover:scale-105 transition-transform duration-300"
              data-testid={`industry-card-${i}`}
            >
              <div className={`w-12 h-12 rounded-xl ${ind.color} flex items-center justify-center mx-auto mb-4`}>
                <ind.icon className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold font-outfit text-foreground mb-1">{ind.title}</h3>
              <p className="text-xs text-muted-foreground">{ind.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
