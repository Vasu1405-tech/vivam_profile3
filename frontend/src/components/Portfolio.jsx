import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const projects = [
  {
    title: 'Learning Management Platform',
    description: 'A comprehensive LMS with live classes, assessments, and progress tracking for 50K+ students.',
    tech: ['React', 'Node.js', 'MongoDB', 'AWS'],
    image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=600&h=400&fit=crop',
  },
  {
    title: 'Employee Management System',
    description: 'End-to-end HR platform with payroll, attendance, and performance management modules.',
    tech: ['Next.js', 'Spring Boot', 'PostgreSQL'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
  },
  {
    title: 'Food Delivery Platform',
    description: 'Real-time food ordering and delivery system with driver tracking and restaurant management.',
    tech: ['React Native', 'FastAPI', 'Redis', 'MongoDB'],
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&h=400&fit=crop',
  },
  {
    title: 'AI Chatbot System',
    description: 'Intelligent conversational AI for customer support with NLP and multi-language support.',
    tech: ['Python', 'TensorFlow', 'React', 'Docker'],
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop',
  },
  {
    title: 'Business Automation Platform',
    description: 'Workflow automation platform that reduced manual processes by 80% for enterprise clients.',
    tech: ['TypeScript', 'Node.js', 'PostgreSQL', 'AWS'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
  },
];

export default function Portfolio() {
  return (
    <section id="portfolio" className="section-padding" data-testid="portfolio-section">
      <div className="container-main">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-medium tracking-wider uppercase text-primary mb-4">
            Portfolio
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground font-outfit">
            Case Studies
          </h2>
          <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our recent projects and the impact we've delivered
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="glass-card rounded-2xl overflow-hidden group hover:scale-[1.02] transition-all duration-300"
              data-testid={`portfolio-card-${i}`}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold font-outfit text-foreground mb-2">
                  {project.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.tech.map((t) => (
                    <Badge key={t} variant="secondary" className="text-xs font-normal">
                      {t}
                    </Badge>
                  ))}
                </div>
                <Button variant="ghost" size="sm" className="p-0 h-auto text-primary hover:bg-transparent" data-testid={`view-case-study-${i}`}>
                  View Case Study <ArrowRight className="ml-1 w-3.5 h-3.5" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
