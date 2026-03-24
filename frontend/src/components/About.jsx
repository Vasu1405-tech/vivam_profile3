import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Eye, Target } from 'lucide-react';

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
            Who We{' '}
            <span className="bg-gradient-to-r from-blue-500 to-violet-500 bg-clip-text text-transparent">
              Are
            </span>
          </h2>
          <p className="mt-6 text-base md:text-lg text-muted-foreground leading-relaxed">
            Vivam Software Services is a fast-growing IT company delivering high-quality
            software solutions, training, and digital transformation services. We combine
            deep technical expertise with a passion for innovation to build products
            that make a real impact.
          </p>

          {/* Vision & Mission */}
          <div className="mt-8 space-y-5">
            <div className="glass-card rounded-xl p-5 flex gap-4 items-start">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center flex-shrink-0">
                <Eye className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-base font-semibold font-outfit text-foreground mb-1">Our Vision</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  To be a globally recognized technology partner empowering businesses
                  with innovative digital solutions — driving growth, efficiency, and
                  transformation across industries.
                </p>
              </div>
            </div>

            <div className="glass-card rounded-xl p-5 flex gap-4 items-start">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-400 flex items-center justify-center flex-shrink-0">
                <Target className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-base font-semibold font-outfit text-foreground mb-1">Our Mission</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  To deliver exceptional software products and services that solve
                  real-world problems, nurture tech talent through quality training,
                  and help businesses scale with cutting-edge technology.
                </p>
              </div>
            </div>
          </div>

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

