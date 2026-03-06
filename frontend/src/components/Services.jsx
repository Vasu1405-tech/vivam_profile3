import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Globe, Smartphone, Cloud, BrainCircuit, Building2, ArrowRight } from 'lucide-react';

const services = [
  {
    icon: Code2,
    title: 'Custom Software Development',
    description: 'Tailored software solutions designed to meet your unique business requirements and workflows.',
    color: 'text-blue-500 bg-blue-500/10',
  },
  {
    icon: Globe,
    title: 'Web Application Development',
    description: 'Modern, responsive web applications built with cutting-edge frameworks and best practices.',
    color: 'text-violet-500 bg-violet-500/10',
  },
  {
    icon: Smartphone,
    title: 'Mobile App Development',
    description: 'Native and cross-platform mobile applications that deliver exceptional user experiences.',
    color: 'text-emerald-500 bg-emerald-500/10',
  },
  {
    icon: Cloud,
    title: 'Cloud Solutions',
    description: 'Scalable cloud infrastructure and migration services for enterprise workloads.',
    color: 'text-cyan-500 bg-cyan-500/10',
  },
  {
    icon: BrainCircuit,
    title: 'AI & Automation',
    description: 'Intelligent automation and AI-powered solutions to streamline business processes.',
    color: 'text-amber-500 bg-amber-500/10',
  },
  {
    icon: Building2,
    title: 'Enterprise Systems',
    description: 'Robust enterprise-grade systems built for reliability, security, and scale.',
    color: 'text-rose-500 bg-rose-500/10',
  },
];

export default function Services() {
  return (
    <section id="services" className="section-padding" data-testid="services-section">
      <div className="container-main">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-medium tracking-wider uppercase text-primary mb-4">
            Our Services
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground font-outfit">
            What We Build
          </h2>
          <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            End-to-end software development services tailored for modern enterprises
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="glass-card rounded-2xl p-7 group hover:scale-[1.02] transition-all duration-300 cursor-pointer"
              data-testid={`service-card-${i}`}
            >
              <div className={`w-12 h-12 rounded-xl ${service.color} flex items-center justify-center mb-5`}>
                <service.icon className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold text-foreground font-outfit mb-2">
                {service.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                {service.description}
              </p>
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Learn More <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
