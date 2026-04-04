import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function CTA() {
  return (
    <section className="section-padding" data-testid="cta-section">
      <div className="container-main">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-violet-600 to-indigo-600" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent)]" />

          <div className="relative z-10 py-20 md:py-28 px-8 md:px-16 text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white font-outfit">
              Ready to Build Your Next Big Thing?
            </h2>
            <p className="mt-4 text-base md:text-lg text-white/80 max-w-xl mx-auto">
              Let's build something amazing together. Transform your vision into a scalable, high-performance digital product.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Button
                size="lg"
                className="rounded-full bg-white text-blue-600 hover:bg-white/90 px-8 h-12 text-base font-semibold border-0"
                data-testid="cta-start-project-btn"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Get a Free Consultation
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="rounded-full px-8 h-12 text-base border-white/30 text-white hover:bg-white/10 hover:text-white"
                data-testid="cta-contact-btn"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Talk to Our Experts
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
