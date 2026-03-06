import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

const highlights = [
  'Custom software development for enterprises',
  'Cloud platforms and intelligent automation',
  'Agile methodology with continuous delivery',
  'Scalable architecture built for growth',
];

export default function About() {
  return (
    <section id="about" className="section-padding" data-testid="about-section">
      <div className="container-main grid md:grid-cols-2 gap-12 md:gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="rounded-2xl overflow-hidden border border-border/50">
            <img
              src="https://images.unsplash.com/photo-1758873272809-7947b9a73fe5?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA2MjJ8MHwxfHNlYXJjaHwyfHxtb2Rlcm4lMjBjb3Jwb3JhdGUlMjBvZmZpY2UlMjB0ZWFtJTIwY29sbGFib3JhdGlvbiUyMHRlY2hub2xvZ3l8ZW58MHx8fHwxNzcyNzMwNTg5fDA&ixlib=rb-4.1.0&q=85"
              alt="Vivam team collaboration"
              className="w-full h-auto object-cover"
              data-testid="about-image"
            />
          </div>
          <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-500 to-violet-600 opacity-20 blur-xl" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <p className="text-sm font-medium tracking-wider uppercase text-primary mb-4">
            About Vivam
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground font-outfit">
            Building the Future of{' '}
            <span className="bg-gradient-to-r from-blue-500 to-violet-500 bg-clip-text text-transparent">
              Digital Enterprise
            </span>
          </h2>
          <p className="mt-6 text-base md:text-lg text-muted-foreground leading-relaxed">
            Vivam Software Services is a technology company focused on building
            scalable digital platforms and enterprise software systems. We combine
            deep technical expertise with a passion for innovation.
          </p>
          <p className="mt-4 text-base md:text-lg text-muted-foreground leading-relaxed">
            Our team specializes in custom software development, cloud platforms,
            and intelligent automation solutions that drive measurable business outcomes.
          </p>

          <div className="mt-8 space-y-3">
            {highlights.map((item) => (
              <div key={item} className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-sm font-medium text-foreground">{item}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
