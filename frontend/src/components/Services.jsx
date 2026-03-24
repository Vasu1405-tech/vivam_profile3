import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Code2, Globe, Smartphone, Cloud, BrainCircuit, Building2, ArrowRight, CheckCircle, Layers, Settings2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const services = [
  {
    icon: Code2,
    title: 'Custom Software Development',
    slug: 'custom-software',
    description: 'Tailored software solutions designed to meet your unique business requirements and workflows.',
    color: 'text-blue-500 bg-blue-500/10',
    details: {
      overview: 'We build bespoke software tailored to your operational needs. Instead of forcing your business into off-the-shelf software constraints, we design systems that adapt to how you work.',
      benefits: [
        'Complete ownership of source code and IP',
        'Built to scale with your business growth',
        'Seamless integration with your existing legacy systems',
        'Customized tailored user experiences for your team'
      ],
      technologies: ['React', 'Node.js', 'Python', 'Java', 'PostgreSQL', 'Docker'],
      process: 'Discovery → Architecture Design → Agile Development → Testing → Deployment → Maintenance'
    }
  },
  {
    icon: Globe,
    title: 'Web Application Development',
    slug: 'web-development',
    description: 'Modern, responsive web applications built with cutting-edge frameworks and best practices.',
    color: 'text-violet-500 bg-violet-500/10',
    details: {
      overview: 'From complex SaaS platforms to enterprise portals, we engineer high-performance web applications that provide native-like experiences in the browser.',
      benefits: [
        'Responsive design working flawlessly on any device',
        'Progressive Web App (PWA) capabilities for offline use',
        'SEO-optimized architecture for public-facing apps',
        'Lightning-fast load times with edge caching'
      ],
      technologies: ['Next.js', 'React', 'Vue', 'Tailwind CSS', 'GraphQL', 'Vercel'],
      process: 'UI/UX Design → Frontend Engineering → Backend Integration → Performance Audit → Launch'
    }
  },
  {
    icon: Smartphone,
    title: 'Mobile App Development',
    slug: 'mobile-apps',
    description: 'Native and cross-platform mobile applications that deliver exceptional user experiences.',
    color: 'text-emerald-500 bg-emerald-500/10',
    details: {
      overview: 'We bring your business to the pockets of your users. Whether you need a cross-platform solution or a high-performance native app, we deliver engaging mobile experiences.',
      benefits: [
        'Cost-effective cross-platform development (React Native/Flutter)',
        'Native iOS and Android capabilities when required',
        'Secure local data storage and offline sync',
        'App Store and Google Play publishing assistance'
      ],
      technologies: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Firebase'],
      process: 'Prototyping → Mobile App Dev → API Integration → Beta Testing → Store Launch'
    }
  },
  {
    icon: Cloud,
    title: 'Cloud Solutions',
    slug: 'cloud-solutions',
    description: 'Scalable cloud infrastructure and migration services for enterprise workloads.',
    color: 'text-cyan-500 bg-cyan-500/10',
    details: {
      overview: 'Modernize your infrastructure with cloud-native architectures. We help businesses migrate, optimize, and manage their cloud environments for maximum reliability and cost-efficiency.',
      benefits: [
        'High availability and disaster recovery built-in',
        'Auto-scaling resources to handle traffic spikes',
        'Optimized cloud spend through architecture audits',
        'Enhanced security and compliance (SOC2, HIPAA)'
      ],
      technologies: ['AWS', 'Google Cloud', 'Azure', 'Kubernetes', 'Terraform'],
      process: 'Infrastucture Audit → Cloud Strategy → Migration Execution → Security Hardening → Managed Support'
    }
  },
  {
    icon: BrainCircuit,
    title: 'AI & Automation',
    slug: 'ai-automation',
    description: 'Intelligent automation and AI-powered solutions to streamline business processes.',
    color: 'text-amber-500 bg-amber-500/10',
    details: {
      overview: 'Transform your operations using Artificial Intelligence. We build custom machine learning models, smart chatbots, and robotic process automation (RPA) tools to eliminate manual work.',
      benefits: [
        'Significant reduction in manual data entry and errors',
        'Predictive analytics for smarter business decisions',
        '24/7 intelligent customer support via custom LLMs',
        'Automated document processing and data extraction'
      ],
      technologies: ['Python', 'TensorFlow', 'PyTorch', 'OpenAI API', 'LangChain'],
      process: 'Data Assessment → Model Training/Tuning → Integration → Validation → Continuous Learning'
    }
  },
  {
    icon: Building2,
    title: 'Enterprise Systems',
    slug: 'enterprise-systems',
    description: 'Robust enterprise-grade systems built for reliability, security, and scale.',
    color: 'text-rose-500 bg-rose-500/10',
    details: {
      overview: 'We engineer mission-critical systems designed to handle vast amounts of data and complex business rules, acting as the digital backbone of large organizations.',
      benefits: [
        'Microservices architecture for team agility',
        'Event-driven communication for real-time processing',
        'Comprehensive audit logging and role-based access',
        'High-throughput data pipelines and warehouses'
      ],
      technologies: ['Java Spring Boot', 'Go', 'Kafka', 'Elasticsearch', 'Redis'],
      process: 'Requirements Engineering → System Architecture → Core Engineering → Load Testing → Enterprise Rollout'
    }
  },
];

export default function Services() {
  const [selectedService, setSelectedService] = useState(null);

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
              id={`service-${service.slug}`}
              onClick={() => setSelectedService(service)}
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

      {/* Service Details Dialog */}
      <Dialog open={!!selectedService} onOpenChange={() => setSelectedService(null)}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
          {selectedService && (
            <>
              <DialogHeader>
                <div className={`w-14 h-14 rounded-2xl ${selectedService.color} flex items-center justify-center mb-4`}>
                  <selectedService.icon className="w-7 h-7" />
                </div>
                <DialogTitle className="text-2xl font-outfit font-bold text-foreground">
                  {selectedService.title}
                </DialogTitle>
                <DialogDescription className="text-base text-muted-foreground mt-2 leading-relaxed">
                  {selectedService.details.overview}
                </DialogDescription>
              </DialogHeader>

              <Separator className="my-2" />

              {/* Benefits */}
              <div className="my-4">
                <h4 className="text-sm font-semibold font-outfit text-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  Key Benefits
                </h4>
                <div className="grid sm:grid-cols-2 gap-3">
                  {selectedService.details.benefits.map((benefit, i) => (
                    <div key={i} className="flex items-start gap-2.5 bg-muted/30 p-3 rounded-lg border border-border/50">
                      <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground leading-snug">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies */}
              <div className="my-6">
                <h4 className="text-sm font-semibold font-outfit text-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-blue-500" />
                  Primary Technologies
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedService.details.technologies.map((tech) => (
                    <Badge key={tech} variant="secondary" className="px-3 py-1 text-sm font-normal bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 border-blue-500/20">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>

              <Separator className="my-2" />

              {/* Process */}
              <div className="mt-4 bg-muted/30 p-4 rounded-xl border border-border/50">
                <h4 className="text-sm font-semibold font-outfit text-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Settings2 className="w-4 h-4 text-violet-500" />
                  Our Process
                </h4>
                <p className="text-sm font-medium text-muted-foreground leading-relaxed flex flex-wrap gap-x-2 gap-y-1 items-center">
                  {selectedService.details.process.split('→').map((step, index, array) => (
                    <React.Fragment key={index}>
                      <span className="text-foreground">{step.trim()}</span>
                      {index < array.length - 1 && <ArrowRight className="w-3 h-3 text-muted-foreground" />}
                    </React.Fragment>
                  ))}
                </p>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
