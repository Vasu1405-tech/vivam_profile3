import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, Boxes, DollarSign, Headphones } from 'lucide-react';

const reasons = [
  { icon: Shield, title: 'Experienced Development Team', description: 'Senior engineers with deep expertise across modern technology stacks.' },
  { icon: Zap, title: 'Agile Development Process', description: 'Iterative sprints with continuous feedback and transparent communication.' },
  { icon: Boxes, title: 'Scalable Architecture', description: 'Systems designed to handle growth from day one with cloud-native patterns.' },
  { icon: DollarSign, title: 'Affordable Enterprise Solutions', description: 'Premium quality software at competitive rates without compromising on delivery.' },
  { icon: Headphones, title: 'Long-Term Technical Support', description: 'Dedicated post-launch support and maintenance to keep your systems running.' },
];

export default function WhyChoose() {
  return (
    <section className="section-padding" data-testid="why-choose-section">
      <div className="container-main">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm font-medium tracking-wider uppercase text-primary mb-4">
              Why Choose Us
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground font-outfit">
              Why Vivam?
            </h2>
            <p className="mt-4 text-base md:text-lg text-muted-foreground leading-relaxed">
              We're not just developers. We're technology partners invested in your success.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="space-y-4"
          >
            {reasons.map((reason, i) => (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex gap-4 p-4 rounded-xl hover:bg-muted/50 transition-colors duration-200"
                data-testid={`why-choose-item-${i}`}
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                  <reason.icon className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-0.5">{reason.title}</h3>
                  <p className="text-sm text-muted-foreground">{reason.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
