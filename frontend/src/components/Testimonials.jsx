import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';

const testimonials = [
  {
    quote: 'Vivam delivered our enterprise platform with excellent performance and scalability. Their team understood our complex requirements from day one.',
    name: 'Rajesh Kumar',
    role: 'CTO, TechVentures India',
    image: 'https://images.unsplash.com/photo-1655249481446-25d575f1c054?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2Mzl8MHwxfHNlYXJjaHwyfHxwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdCUyMHBvcnRyYWl0JTIwYnVzaW5lc3MlMjBwZXJzb258ZW58MHx8fHwxNzcyNzMwNjA5fDA&ixlib=rb-4.1.0&q=85',
  },
  {
    quote: 'The mobile app they built for us exceeded expectations. Clean code, great architecture, and delivered ahead of schedule. Highly recommended.',
    name: 'Sarah Mitchell',
    role: 'Product Manager, HealthFirst',
    image: 'https://images.unsplash.com/photo-1717068342612-64ed5d77124d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2Mzl8MHwxfHNlYXJjaHw0fHxwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdCUyMHBvcnRyYWl0JTIwYnVzaW5lc3MlMjBwZXJzb258ZW58MHx8fHwxNzcyNzMwNjA5fDA&ixlib=rb-4.1.0&q=85',
  },
  {
    quote: 'Working with Vivam was a game-changer for our startup. They built our MVP in record time and helped us secure our Series A funding.',
    name: 'David Chen',
    role: 'Founder, LogiTrack',
    image: 'https://images.unsplash.com/photo-1655249493799-9cee4fe983bb?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2Mzl8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdCUyMHBvcnRyYWl0JTIwYnVzaW5lc3MlMjBwZXJzb258ZW58MHx8fHwxNzcyNzMwNjA5fDA&ixlib=rb-4.1.0&q=85',
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent(prev => (prev + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent(prev => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section id="testimonials" className="section-padding" data-testid="testimonials-section">
      <div className="container-main">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-medium tracking-wider uppercase text-primary mb-4">
            Testimonials
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground font-outfit">
            What Clients Say
          </h2>
        </motion.div>

        <div className="max-w-3xl mx-auto relative">
          <div className="glass-card rounded-2xl p-8 md:p-12 min-h-[280px] flex flex-col items-center justify-center text-center">
            <Quote className="w-10 h-10 text-primary/30 mb-6" />

            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <p className="text-lg md:text-xl text-foreground leading-relaxed mb-8 font-outfit" data-testid="testimonial-quote">
                  "{testimonials[current].quote}"
                </p>
                <div className="flex items-center justify-center gap-4">
                  <img
                    src={testimonials[current].image}
                    alt={testimonials[current].name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-primary/30"
                    data-testid="testimonial-image"
                  />
                  <div className="text-left">
                    <p className="text-sm font-semibold text-foreground" data-testid="testimonial-name">
                      {testimonials[current].name}
                    </p>
                    <p className="text-xs text-muted-foreground" data-testid="testimonial-role">
                      {testimonials[current].role}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-center gap-4 mt-8">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full"
              onClick={prev}
              data-testid="testimonial-prev-btn"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>

            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${i === current ? 'w-6 bg-primary' : 'bg-muted-foreground/30'}`}
                  data-testid={`testimonial-dot-${i}`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              className="rounded-full"
              onClick={next}
              data-testid="testimonial-next-btn"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
