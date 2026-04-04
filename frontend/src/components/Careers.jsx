import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, MapPin, Clock, ArrowRight, Star, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const jobOpenings = [
  {
    title: 'Senior Frontend Developer',
    department: 'Engineering',
    location: 'Remote / Kakinada',
    type: 'Full-time',
    experience: '3-5 years',
    description: 'We are looking for a React expert to lead our frontend initiatives and build high-performance user interfaces.'
  },
  {
    title: 'Python Backend Engineer',
    department: 'Engineering',
    location: 'Remote',
    type: 'Full-time',
    experience: '2-4 years',
    description: 'Join our team to build scalable APIs and microservices using FastAPI and MongoDB.'
  },
  {
    title: 'UI/UX Designer',
    department: 'Design',
    location: 'Remote',
    type: 'Contract',
    experience: '2+ years',
    description: 'Create beautiful, intuitive designs that enhance user experience across all our digital products.'
  },
  {
    title: 'Full Stack Intern',
    department: 'Engineering',
    location: 'Kakinada',
    type: 'Internship',
    experience: 'Fresher',
    description: 'A great opportunity for students to work on real-world projects and learn the MERN stack.'
  }
];

const perks = [
  "Remote-first culture",
  "Learning & Development budget",
  "Performance-based bonuses",
  "Flexible working hours",
  "Healthcare benefits",
  "Collaborative environment"
];

export default function Careers() {
  return (
    <section id="careers" className="section-padding overflow-hidden">
      <div className="container-main">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4">
            <Briefcase className="w-3.5 h-3.5" />
            Grow With Us
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground font-outfit">
            Career Opportunities
          </h2>
          <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Join a team of innovators and creators dedicated to building the future of software services.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12 items-start">
          {/* Why Join Us */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-1 space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold font-outfit text-foreground mb-4 flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                Why Join Vivam?
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                At Vivam, we believe in empowering our employees with the tools, freedom, and support they need to thrive. Work on global projects, learn from experts, and accelerate your career.
              </p>
            </div>

            <div className="space-y-3">
              {perks.map((perk, i) => (
                <div key={i} className="flex items-center gap-3 text-sm text-foreground/80">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  {perk}
                </div>
              ))}
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-500/10 to-violet-500/10 border border-primary/20">
              <h4 className="font-bold text-foreground mb-2">Can't find a fit?</h4>
              <p className="text-xs text-muted-foreground mb-4">Send your resume to our general pool and we'll contact you when a project matches your profile.</p>
              <Button variant="outline" className="w-full text-sm" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
                Submit General Application
              </Button>
            </div>
          </motion.div>

          {/* Job Listings */}
          <div className="lg:col-span-2 space-y-4">
            {jobOpenings.map((job, i) => (
              <motion.div
                key={job.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-6 rounded-2xl hover:shadow-xl hover:shadow-primary/5 transition-all group"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <Badge variant="outline" className="text-[10px] uppercase tracking-wider">{job.department}</Badge>
                      <Badge variant="secondary" className="text-[10px] uppercase tracking-wider">{job.type}</Badge>
                    </div>
                    <h3 className="text-xl font-bold font-outfit text-foreground group-hover:text-primary transition-colors cursor-pointer">
                      {job.title}
                    </h3>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5" />
                        {job.location}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        {job.experience}
                      </div>
                    </div>
                  </div>
                  <Button 
                    className="md:w-32 rounded-full group/btn" 
                    onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    Apply <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
