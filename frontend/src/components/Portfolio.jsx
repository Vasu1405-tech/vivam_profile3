import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, X, CheckCircle, TrendingUp, Users, Clock, Briefcase, Sparkles, UsersRound } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';

const projects = [
  {
    title: 'Learning Management Platform',
    description: 'A comprehensive Learning Management System with live classes, assessments, and tracking for 10K+ students.',
    tech: ['React', 'Node.js', 'MongoDB', 'AWS'],
    image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=600&h=400&fit=crop',
    caseStudy: {
      client: 'vivamedutech.io',
      duration: '6 months',
      team: '8 developers',
      challenge: 'The client needed a scalable learning platform to support 10,000+ concurrent students with live video classes, real-time assessments, and detailed analytics — replacing an outdated system that frequently crashed during peak hours.',
      solution: 'We built a cloud-native LMS using React for the frontend, Node.js microservices on the backend, and MongoDB for flexible content storage. AWS services (EC2, S3, CloudFront, MediaLive) were used for video streaming and global content delivery.',
      features: [
        'Live video classes with real-time Q&A and screen sharing',
        'Adaptive assessments with automated grading',
        'Student progress dashboards and analytics',
        'Mobile-responsive design for on-the-go learning',
        'Admin panel for course management and instructor tools',
      ],
      results: [
        { metric: '10K+', label: 'Active Students' },
        { metric: '99.9%', label: 'Uptime Achieved' },
        { metric: '3x', label: 'Faster Load Times' },
        { metric: '85%', label: 'Student Satisfaction' },
      ],
    },
  },
  {
    title: 'Employee Management System',
    description: 'End-to-end HR platform with payroll, attendance, and performance management modules.',
    tech: ['Next.js', 'Spring Boot', 'PostgreSQL'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
    caseStudy: {
      client: 'VS Techlog Industries',
      duration: '8 months',
      team: '6 developers',
      challenge: 'The client managed HR processes across 5 offices using spreadsheets and disconnected tools, leading to payroll errors, missed attendance records, and no visibility into employee performance.',
      solution: 'We developed a unified HR platform with Next.js for a fast, SEO-friendly frontend and Spring Boot microservices for robust backend processing. PostgreSQL was chosen for reliable transactional data handling across payroll, attendance, and performance modules.',
      features: [
        'Automated payroll processing with tax calculations',
        'Biometric attendance integration and leave management',
        'Performance review cycles with goal tracking',
        'Employee self-service portal',
        'Role-based access control and audit trails',
      ],
      results: [
        { metric: '90%', label: 'Less Payroll Errors' },
        { metric: '2,500+', label: 'Employees Managed' },
        { metric: '60%', label: 'Time Saved on HR Tasks' },
        { metric: '5', label: 'Offices Connected' },
      ],
    },
  },
  {
    title: 'Food Delivery Platform',
    description: 'Real-time food ordering and delivery system with driver tracking and restaurant management.',
    tech: ['React Native', 'FastAPI', 'Redis', 'MongoDB'],
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&h=400&fit=crop',
    caseStudy: {
      client: 'QuickBite Foods',
      duration: '5 months',
      team: '7 developers',
      challenge: 'The client needed a full-stack food delivery platform for a metro city launch — consumer app, restaurant dashboard, driver app, and real-time order tracking, all built from scratch with tight timelines.',
      solution: 'We used React Native for cross-platform mobile apps (consumer & driver), FastAPI for high-performance backend APIs, Redis for real-time caching and order queues, and MongoDB for flexible restaurant and menu data.',
      features: [
        'Real-time GPS tracking of delivery drivers',
        'Restaurant management dashboard with menu editor',
        'Smart order routing and delivery time estimation',
        'In-app payments with multiple gateway support',
        'Push notifications for order status updates',
      ],
      results: [
        { metric: '10K+', label: 'Daily Orders' },
        { metric: '200+', label: 'Restaurants Onboarded' },
        { metric: '< 30min', label: 'Avg Delivery Time' },
        { metric: '4.7★', label: 'App Store Rating' },
      ],
    },
  },
  {
    title: 'AI Chatbot System',
    description: 'Intelligent conversational AI for customer support with NLP and multi-language support.',
    tech: ['Python', 'TensorFlow', 'React', 'Docker'],
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop',
    caseStudy: {
      client: 'Private Company.',
      duration: '4 months',
      team: '5 developers',
      challenge: 'The client\'s support team handled 1,000+ tickets monthly across 3 languages. Response times averaged 4 hours and customer satisfaction was declining — they needed an AI-first approach to handle routine queries instantly.',
      solution: 'We built a custom NLP chatbot using TensorFlow with intent classification and entity extraction. The React-based admin panel allows non-technical staff to train the bot and manage conversation flows. Docker containerization ensures easy deployment and scaling.',
      features: [
        'Multi-language support (English, Hindi, Telugu)',
        'Context-aware conversation handling',
        'Seamless handoff to human agents for complex queries',
        'Analytics dashboard with conversation insights',
        'Integration with CRM and ticketing systems',
      ],
      results: [
        { metric: '70%', label: 'Queries Auto-Resolved' },
        { metric: '< 5sec', label: 'Avg Response Time' },
        { metric: '45%', label: 'Support Cost Reduced' },
        { metric: '3', label: 'Languages Supported' },
      ],
    },
  },
  {
    title: 'Business Automation Platform',
    description: 'Workflow automation platform that reduced manual processes by 80% for enterprise clients.',
    tech: ['TypeScript', 'Node.js', 'PostgreSQL', 'AWS'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
    caseStudy: {
      client: 'PRN Tech Enterprises',
      duration: '7 months',
      team: '9 developers',
      challenge: 'The client had over 20 manual business processes across departments — approvals, data entry, report generation — consuming hundreds of employee hours monthly with high error rates.',
      solution: 'We designed a visual workflow builder (drag-and-drop) in TypeScript/React, backed by a Node.js orchestration engine. PostgreSQL handles state management and audit logs. AWS Lambda functions power individual workflow steps for serverless scalability.',
      features: [
        'Visual drag-and-drop workflow designer',
        'Conditional branching and parallel execution',
        'Template library with 10+ pre-built automations',
        'Real-time monitoring and execution dashboards',
        'API connectors for Slack, Email, Google Sheets, SAP',
      ],
      results: [
        { metric: '80%', label: 'Process Automation' },
        { metric: '20+', label: 'Workflows Automated' },
        { metric: '5,000hrs', label: 'Monthly Time Saved' },
        { metric: '95%', label: 'Error Rate Reduction' },
      ],
    },
  },
];

export default function Portfolio() {
  const [selectedProject, setSelectedProject] = useState(null);

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
              transition={{ duration: 0.5, delay: i * 0.08, type: "spring", stiffness: 100 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="glass-card rounded-2xl overflow-hidden group relative transition-all hover:shadow-2xl hover:shadow-primary/20 border border-transparent hover:border-primary/30"
              data-testid={`portfolio-card-${i}`}
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/50 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="absolute bottom-6 left-6 right-6 flex flex-col items-center justify-end opacity-0 translate-y-6 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out z-10">
                  <Button
                    size="default"
                    className="w-full shadow-xl bg-primary hover:bg-primary/90 text-primary-foreground group/btn"
                    onClick={() => setSelectedProject(project)}
                  >
                    View Case Study <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1.5 transition-transform duration-300" />
                  </Button>
                </div>
              </div>

              <div className="p-6 relative z-10 bg-background/5 backdrop-blur-sm group-hover:bg-background/0 transition-colors duration-500">
                <h3 className="text-xl font-bold font-outfit text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4 group-hover:text-foreground/80 transition-colors duration-300">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t, idx) => (
                    <Badge
                      key={t}
                      variant="secondary"
                      className="text-xs font-normal bg-secondary/60 hover:bg-secondary/100 border border-transparent group-hover:border-primary/20 transition-all duration-300 delay-100"
                    >
                      {t}
                    </Badge>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Case Study Dialog */}
      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
          {selectedProject && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-outfit font-bold text-foreground">
                  {selectedProject.title}
                </DialogTitle>
                <DialogDescription className="text-muted-foreground">
                  {selectedProject.description}
                </DialogDescription>
              </DialogHeader>

              <div className="grid grid-cols-3 gap-4 my-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="w-4 h-4 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Client</p>
                    <p className="font-medium text-foreground">{selectedProject.caseStudy.client}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Duration</p>
                    <p className="font-medium text-foreground">{selectedProject.caseStudy.duration}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="w-4 h-4 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Team</p>
                    <p className="font-medium text-foreground">{selectedProject.caseStudy.team}</p>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="rounded-xl overflow-hidden my-4">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-48 object-cover"
                />
              </div>

              <div className="mb-5">
                <h4 className="text-sm font-semibold font-outfit text-foreground uppercase tracking-wider mb-2 text-rose-500">
                  The Challenge
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {selectedProject.caseStudy.challenge}
                </p>
              </div>

              <div className="mb-5">
                <h4 className="text-sm font-semibold font-outfit text-foreground uppercase tracking-wider mb-2 text-blue-500">
                  Our Solution
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {selectedProject.caseStudy.solution}
                </p>
              </div>

              <div className="mb-5">
                <h4 className="text-sm font-semibold font-outfit text-foreground uppercase tracking-wider mb-3 text-violet-500">
                  Key Features
                </h4>
                <div className="space-y-2">
                  {selectedProject.caseStudy.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              <div className="mt-5">
                <h4 className="text-sm font-semibold font-outfit text-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-emerald-500" />
                  <span className="text-emerald-500">Results & Impact</span>
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {selectedProject.caseStudy.results.map((result, i) => (
                    <div key={i} className="text-center p-3 rounded-xl bg-muted/50">
                      <p className="text-xl font-bold font-outfit bg-gradient-to-r from-blue-500 to-violet-500 bg-clip-text text-transparent">
                        {result.metric}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">{result.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-1.5">
                {selectedProject.tech.map((t) => (
                  <Badge key={t} variant="secondary" className="text-xs">
                    {t}
                  </Badge>
                ))}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
