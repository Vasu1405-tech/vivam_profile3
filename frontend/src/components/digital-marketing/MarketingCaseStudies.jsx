import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle2, TrendingUp, Users, Clock } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

const portfolioProjects = [
  {
    title: 'Learning Management Platform',
    category: 'Technology Case Study',
    description: 'Cloud-native LMS supporting 10,000+ active students with live video streaming and real-time assessment dashboards.',
    tech: ['React', 'Node.js', 'MongoDB', 'AWS'],
    image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=600&h=400&fit=crop',
    caseStudy: {
      client: 'vivamedutech.io',
      duration: '6 months',
      team: '8 engineers',
      challenge: 'Client needed a high-concurrency learning platform to eliminate video crashes and improve student acquisition.',
      solution: 'Architected React frontend with AWS media streaming pipelines and real-time progress analytics.',
      results: [
        { metric: '10K+', label: 'Active Students' },
        { metric: '99.9%', label: 'Uptime Achieved' },
        { metric: '3x', label: 'Faster Load Times' },
        { metric: '85%', label: 'Retention Rate' }
      ]
    }
  },
  {
    title: 'Employee HR Management System',
    category: 'Technology Case Study',
    description: 'Unified HR platform with payroll, biometric attendance, and automated performance tracking across 5 corporate offices.',
    tech: ['Next.js', 'Spring Boot', 'PostgreSQL'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
    caseStudy: {
      client: 'VS Techlog Industries',
      duration: '8 months',
      team: '6 engineers',
      challenge: 'Disconnected spreadsheets across multi-city branches created payroll errors and manual reporting bottlenecks.',
      solution: 'Engineered unified portal with role-based access, automated tax calculations, and real-time leave tracking.',
      results: [
        { metric: '90%', label: 'Fewer Errors' },
        { metric: '2,500+', label: 'Users Managed' },
        { metric: '60%', label: 'Time Saved' },
        { metric: '5', label: 'Offices Connected' }
      ]
    }
  },
  {
    title: 'Food Delivery Platform',
    category: 'Technology Case Study',
    description: 'Real-time ordering system with driver GPS tracking, restaurant dashboards, and instant push notifications.',
    tech: ['React Native', 'FastAPI', 'Redis', 'MongoDB'],
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&h=400&fit=crop',
    caseStudy: {
      client: 'QuickBite Foods',
      duration: '5 months',
      team: '7 engineers',
      challenge: 'Client required cross-platform mobile apps for consumers and delivery partners within tight market deadlines.',
      solution: 'Built React Native apps with FastAPI real-time APIs and Redis order dispatch queues.',
      results: [
        { metric: '10K+', label: 'Daily Orders' },
        { metric: '200+', label: 'Restaurants' },
        { metric: '< 30min', label: 'Avg Delivery' },
        { metric: '4.7★', label: 'App Rating' }
      ]
    }
  }
];

export default function MarketingCaseStudies({ onConsultationClick }) {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section className="py-20 border-t border-border/40 bg-card/10 relative overflow-hidden">
      {/* Background design elements */}
      <div className="absolute top-10 left-10 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-violet-500/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute inset-0 bg-grid-mesh opacity-25 pointer-events-none" />

      <div className="container-main max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <Badge variant="outline" className="px-4 py-1.5 border-primary/40 bg-primary/10 text-primary font-medium text-xs tracking-wider uppercase">
            <TrendingUp className="w-3.5 h-3.5 mr-2 inline" /> Verified Portfolio
          </Badge>
          <h2 className="text-3xl md:text-5xl font-extrabold font-outfit text-foreground tracking-tight">
            Technology + Growth in Action
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
            Explore our real engineering and platform projects that empower client digital operations and market expansion.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {portfolioProjects.map((project, idx) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              whileHover={{ y: -6 }}
              className="rounded-2xl bg-card border border-border/60 hover:border-primary/40 transition-all overflow-hidden shadow-sm hover:shadow-xl flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge variant="secondary" className="text-[10px] font-semibold bg-background/80 backdrop-blur-md">
                      {project.category}
                    </Badge>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold font-outfit text-foreground mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.tech.map((t) => (
                      <Badge key={t} variant="outline" className="text-[10px] bg-muted/40">
                        {t}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-between text-xs font-semibold rounded-full hover:bg-primary hover:text-white transition-colors"
                  onClick={() => setSelectedProject(project)}
                >
                  <span>View Case Study</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Dialog Modal */}
      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
          {selectedProject && (
            <>
              <DialogHeader>
                <Badge variant="outline" className="w-fit text-xs mb-2">
                  {selectedProject.category}
                </Badge>
                <DialogTitle className="text-2xl font-outfit font-bold text-foreground">
                  {selectedProject.title}
                </DialogTitle>
                <DialogDescription className="text-muted-foreground text-sm">
                  {selectedProject.description}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 my-4">
                <div className="p-4 rounded-xl bg-muted/40 space-y-2">
                  <h4 className="text-xs font-bold uppercase text-rose-400">The Challenge</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">{selectedProject.caseStudy.challenge}</p>
                </div>

                <div className="p-4 rounded-xl bg-muted/40 space-y-2">
                  <h4 className="text-xs font-bold uppercase text-blue-400">The Solution</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">{selectedProject.caseStudy.solution}</p>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase text-emerald-400 mb-3">Key Results & Impact</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {selectedProject.caseStudy.results.map((r) => (
                      <div key={r.label} className="p-3 rounded-xl bg-card border border-border/50 text-center">
                        <p className="text-lg font-extrabold font-outfit text-primary">{r.metric}</p>
                        <p className="text-[10px] text-muted-foreground">{r.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
