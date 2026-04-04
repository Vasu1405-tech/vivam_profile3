import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, Users, Calendar, Presentation, Sparkles, ArrowRight, Laptop, Award, X, Maximize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const workshopCategories = [
  {
    icon: GraduationCap,
    title: 'Industrial IT Training',
    description: 'Hands-on technical training in React, Node.js, Cloud Computing, and AI Fundamentals to make students job-ready.',
    features: ['Real-world Projects', 'Industry Mentors', 'Latest Tech Stack', 'Certification'],
    color: 'from-blue-500/20 to-blue-600/5',
    iconColor: 'text-blue-500'
  },
  {
    icon: Users,
    title: 'Career Success Workshops',
    description: 'Specialized sessions on resume building, mock interviews, and professional communication skills.',
    features: ['Resume Optimization', 'Aptitude Training', 'Soft Skills', 'Placement Support'],
    color: 'from-violet-500/20 to-violet-600/5',
    iconColor: 'text-violet-500'
  },
  {
    icon: Presentation,
    title: 'Expert Tech Seminars',
    description: 'Inspiring seminars by industry leaders on the future of technology and emerging career paths.',
    features: ['Guest Lectures', 'Tech Trends 2025', 'Q&A Sessions', 'Networking'],
    color: 'from-emerald-500/20 to-emerald-600/5',
    iconColor: 'text-emerald-500'
  }
];

const galleryImages = [
  {
    url: '/assets/events/pic-1.jpg',
    caption: 'Expert Seminar on Career Growth',
    size: 'md:col-span-2 md:row-span-2'
  },
  {
    url: '/assets/events/pic-2.jpg',
    caption: 'Technical Workshop Session',
    size: 'md:col-span-1 md:row-span-1'
  },
  {
    url: '/assets/events/pic-3.jpg',
    caption: 'Student Interaction & Q&A',
    size: 'md:col-span-1 md:row-span-2'
  },
  {
    url: '/assets/events/pic-8.jpeg',
    caption: 'Industry Insights Session',
    size: 'md:col-span-1 md:row-span-1'
  },
  {
    url: '/assets/events/pic-9.jpeg',
    caption: 'Future Tech Trends Discussion',
    size: 'md:col-span-2 md:row-span-1'
  },
  {
    url: '/assets/events/pic-5.jpg',
    caption: 'Skill Development Session',
    size: 'md:col-span-1 md:row-span-1'
  },
  {
    url: '/assets/events/pic-14.jpeg',
    caption: 'Technical Q&A Round',
    size: 'md:col-span-1 md:row-span-1'
  },
  {
    url: '/assets/events/pic-13.jpeg',
    caption: 'Career Roadmap Seminar',
    size: 'md:col-span-2 md:row-span-2'
  },
  {
    url: '/assets/events/pic-18.jpeg',
    caption: 'Advanced Technology Overview',
    size: 'md:col-span-2 md:row-span-1'
  },
  {
    url: '/assets/events/pic-7.jpg',
    caption: 'Workshop Graduation Ceremony',
    size: 'md:col-span-1 md:row-span-1'
  },
  {
    url: '/assets/events/pic-17.jpeg',
    caption: 'Corporate Culture Training',
    size: 'md:col-span-1 md:row-span-1'
  },
  {
    url: '/assets/events/pic-20.jpeg',
    caption: 'Seminar Closing Ceremony',
    size: 'md:col-span-4 md:row-span-2'
  }
];

export default function Workshops() {
  const [selectedImg, setSelectedImg] = useState(null);

  return (
    <section id="workshops" className="section-padding overflow-hidden">
      <div className="container-main">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            Empowering Next Gen Talent
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground font-outfit">
            Workshops & IT Training
          </h2>
          <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            We bridge the gap between academic learning and industry requirements through expert-led sessions and hands-on technical training.
          </p>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {workshopCategories.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`glass-card rounded-2xl p-8 border-l-4 border-l-transparent hover:border-l-primary transition-all duration-300 bg-gradient-to-br ${item.color}`}
            >
              <div className={`w-12 h-12 rounded-xl bg-background/50 flex items-center justify-center mb-6 shadow-sm`}>
                <item.icon className={`w-6 h-6 ${item.iconColor}`} />
              </div>
              <h3 className="text-xl font-bold font-outfit text-foreground mb-3">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">{item.description}</p>

              <ul className="space-y-3 mb-8">
                {item.features.map(feature => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-foreground/80">
                    <Award className="w-3.5 h-3.5 text-primary" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Button
                variant="ghost"
                className="group p-0 h-auto hover:bg-transparent text-primary font-semibold"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Inquire Now <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          ))}
        </div>

        {/* Gallery Section */}
        <div className="mt-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4"
          >
            <div>
              <h3 className="text-2xl font-bold font-outfit text-foreground">Event Highlights</h3>
              <p className="text-muted-foreground mt-1">Sneak peek into our recent sessions and workshops in 2025</p>
            </div>
            <div className="flex items-center gap-2 text-sm font-medium text-primary cursor-pointer hover:underline">
              View All Moments <ArrowRight className="w-4 h-4" />
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[200px]">
            {galleryImages.map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative group overflow-hidden rounded-2xl cursor-pointer ${img.size}`}
                onClick={() => setSelectedImg(img)}
              >
                <img
                  src={img.url}
                  alt={img.caption}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <div className="flex items-center justify-between">
                    <p className="text-white text-sm font-medium transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      {img.caption}
                    </p>
                    <Maximize2 className="w-4 h-4 text-white/70 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75" />
                  </div>
                </div>
              </motion.div>
            ))}

            {/* CTA Card in Gallery */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="md:col-span-1 md:row-span-1 glass-card rounded-2xl p-6 flex flex-col items-center justify-center text-center border-dashed border-2 border-primary/20 hover:border-primary/50 transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-3">
                <Laptop className="w-5 h-5" />
              </div>
              <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-1">Upcoming</p>
              <p className="text-sm font-bold text-foreground leading-tight px-2">AI Mastery Workshop 2026</p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 md:p-10"
            onClick={() => setSelectedImg(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-5xl w-full h-full flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-0 right-0 md:-top-12 md:-right-12 p-2 text-white/70 hover:text-white transition-colors"
                onClick={() => setSelectedImg(null)}
              >
                <X className="w-8 h-8" />
              </button>

              <div className="relative w-full h-[80vh] rounded-xl overflow-hidden glass-card border-white/10 shadow-2xl">
                <img
                  src={selectedImg.url}
                  alt={selectedImg.caption}
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="mt-6 text-center">
                <h4 className="text-xl font-bold font-outfit text-white mb-1">{selectedImg.caption}</h4>
                <p className="text-white/60 text-sm">Vivam Software Services & IT Trainings &bull; Workshop Highlights</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
