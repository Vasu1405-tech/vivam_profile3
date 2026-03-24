import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, X, CheckCircle, TrendingUp, Users, Clock, Briefcase, Sparkles, UsersRound } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';

const comingSoonProducts = [
  {
    icon: Briefcase,
    title: 'AI Job Assist',
    description: 'An intelligent AI-powered job assistance platform that helps job seekers find the right opportunities, auto-generate tailored resumes, prepare for interviews with AI mock sessions, and get personalized career recommendations — all in one place.',
    tech: ['React', 'Node.js', 'OpenAI', 'MongoDB', 'Python'],
    gradient: 'from-blue-500 to-violet-500',
  },
  {
    icon: UsersRound,
    title: 'Employee Management System',
    description: 'A comprehensive employee management platform with payroll processing, attendance tracking, leave management, performance reviews, and HR analytics — designed to streamline workforce operations for growing businesses.',
    tech: ['React', 'Spring Boot', 'PostgreSQL', 'Docker'],
    gradient: 'from-emerald-500 to-teal-400',
  },
];

const projects = [
  {
    title: 'Learning Management Platform',
    description: 'A comprehensive LMS with live classes, assessments, and progress tracking for 50K+ students.',
    tech: ['React', 'Node.js', 'MongoDB', 'AWS'],
    image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=600&h=400&fit=crop',
    caseStudy: {
      client: 'EduTech Academy',
      duration: '6 months',
      team: '8 developers',
      challenge: 'The client needed a scalable learning platform to support 50,000+ concurrent students with live video classes, real-time assessments, and detailed analytics — replacing an outdated system that frequently crashed during peak hours.',
      solution: 'We built a cloud-native LMS using React for the frontend, Node.js microservices on the backend, and MongoDB for flexible content storage. AWS services (EC2, S3, CloudFront, MediaLive) were used for video streaming and global content delivery.',
      features: [
        'Live video classes with real-time Q&A and screen sharing',
        'Adaptive assessments with automated grading',
        'Student progress dashboards and analytics',
        'Mobile-responsive design for on-the-go learning',
        'Admin panel for course management and instructor tools',
      ],
      results: [
        { metric: '50K+', label: 'Active Students' },
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
      client: 'TechCorp Industries',
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
      client: 'GlobalServe Inc.',
      duration: '4 months',
      team: '5 developers',
      challenge: 'The client\'s support team handled 10,000+ tickets monthly across 3 languages. Response times averaged 4 hours and customer satisfaction was declining — they needed an AI-first approach to handle routine queries instantly.',
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
      client: 'MegaCorp Enterprises',
      duration: '7 months',
      team: '9 developers',
      challenge: 'The client had over 200 manual business processes across departments — approvals, data entry, report generation — consuming thousands of employee hours monthly with high error rates.',
      solution: 'We designed a visual workflow builder (drag-and-drop) in TypeScript/React, backed by a Node.js orchestration engine. PostgreSQL handles state management and audit logs. AWS Lambda functions power individual workflow steps for serverless scalability.',
      features: [
        'Visual drag-and-drop workflow designer',
        'Conditional branching and parallel execution',
        'Template library with 50+ pre-built automations',
        'Real-time monitoring and execution dashboards',
        'API connectors for Slack, Email, Google Sheets, SAP',
      ],
      results: [
        { metric: '80%', label: 'Process Automation' },
        { metric: '200+', label: 'Workflows Automated' },
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
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-0 h-auto text-primary hover:bg-transparent"
                  data-testid={`view-case-study-${i}`}
                  onClick={() => setSelectedProject(project)}
                >
                  View Case Study <ArrowRight className="ml-1 w-3.5 h-3.5" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Coming Soon — AI Products */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="text-center mt-24 mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-5">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Coming Soon</span>
          </div>
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-foreground font-outfit">
            Our Products
          </h3>
          <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Innovative applications we're building to transform businesses
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-5">
          {comingSoonProducts.map((product, i) => (
            <motion.div
              key={product.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card rounded-2xl p-8 relative overflow-hidden group hover:scale-[1.02] transition-all duration-300"
              data-testid={`coming-soon-card-${i}`}
            >
              {/* Subtle gradient glow behind card */}
              <div className={`absolute -top-20 -right-20 w-48 h-48 bg-gradient-to-br ${product.gradient} rounded-full opacity-10 blur-3xl group-hover:opacity-20 transition-opacity duration-500`} />

              {/* Coming Soon Badge */}
              <div className="absolute top-5 right-5">
                <div className="relative">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${product.gradient} shadow-lg`}>
                    <span className="relative flex h-2 w-2">
                      <span className={`animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75`}></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                    </span>
                    Coming Soon
                  </span>
                </div>
              </div>

              <div className="flex gap-5 relative z-10">
                {/* Icon */}
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${product.gradient} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                  <product.icon className="w-6 h-6 text-white" />
                </div>
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h4 className="text-lg font-semibold font-outfit text-foreground mb-2">
                    {product.title}
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    {product.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {product.tech.map((t) => (
                      <Badge key={t} variant="secondary" className="text-xs font-normal">
                        {t}
                      </Badge>
                    ))}
                  </div>
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

              {/* Project Meta */}
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

              {/* Project Image */}
              <div className="rounded-xl overflow-hidden my-4">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-48 object-cover"
                />
              </div>

              {/* Challenge */}
              <div className="mb-5">
                <h4 className="text-sm font-semibold font-outfit text-foreground uppercase tracking-wider mb-2 text-rose-500">
                  The Challenge
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {selectedProject.caseStudy.challenge}
                </p>
              </div>

              {/* Solution */}
              <div className="mb-5">
                <h4 className="text-sm font-semibold font-outfit text-foreground uppercase tracking-wider mb-2 text-blue-500">
                  Our Solution
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {selectedProject.caseStudy.solution}
                </p>
              </div>

              {/* Key Features */}
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

              {/* Results */}
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

              {/* Tech Stack */}
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
