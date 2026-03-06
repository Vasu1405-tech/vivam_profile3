import React from 'react';
import { motion } from 'framer-motion';
import { Server, Rocket, Workflow, RefreshCcw } from 'lucide-react';

const solutions = [
  {
    icon: Server,
    title: 'Enterprise Software Systems',
    description: 'Robust, scalable enterprise platforms that streamline operations and drive efficiency across your organization.',
  },
  {
    icon: Rocket,
    title: 'Startup MVP Development',
    description: 'Rapid MVP development to validate your ideas and get to market quickly with a production-ready product.',
  },
  {
    icon: Workflow,
    title: 'Business Automation Platforms',
    description: 'Custom automation solutions that eliminate manual processes and reduce operational costs significantly.',
  },
  {
    icon: RefreshCcw,
    title: 'Digital Transformation Solutions',
    description: 'Comprehensive digital transformation strategies and implementation to modernize your business infrastructure.',
  },
];

export default function Solutions() {
  return (
    <section className="section-padding" data-testid="solutions-section">
      <div className="container-main">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-medium tracking-wider uppercase text-primary mb-4">
            Solutions
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground font-outfit">
            Solutions That Scale
          </h2>
          <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            From startups to enterprise, we deliver solutions that grow with your business
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-5">
          {solutions.map((sol, i) => (
            <motion.div
              key={sol.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card rounded-2xl p-8 flex gap-5 hover:scale-[1.02] transition-transform duration-300"
              data-testid={`solution-card-${i}`}
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                <sol.icon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-semibold font-outfit text-foreground mb-2">{sol.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{sol.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
