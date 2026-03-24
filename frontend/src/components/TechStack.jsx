import React from 'react';
import { motion } from 'framer-motion';

const techCategories = [
  {
    title: 'Frontend',
    items: [
      { name: 'React', icon: 'https://cdn.simpleicons.org/react/61DAFB', color: '#61DAFB' },
      { name: 'Next.js', icon: 'https://cdn.simpleicons.org/nextdotjs/FFFFFF', color: '#FFFFFF' },
      { name: 'TypeScript', icon: 'https://cdn.simpleicons.org/typescript/3178C6', color: '#3178C6' },
      { name: 'Tailwind CSS', icon: 'https://cdn.simpleicons.org/tailwindcss/06B6D4', color: '#06B6D4' },
    ],
  },
  {
    title: 'Backend',
    items: [
      { name: 'Spring Boot', icon: 'https://cdn.simpleicons.org/springboot/6DB33F', color: '#6DB33F' },
      { name: 'Node.js', icon: 'https://cdn.simpleicons.org/nodedotjs/5FA04E', color: '#5FA04E' },
      { name: 'Python', icon: 'https://cdn.simpleicons.org/python/3776AB', color: '#3776AB' },
      { name: 'FastAPI', icon: 'https://cdn.simpleicons.org/fastapi/009688', color: '#009688' },
    ],
  },
  {
    title: 'Databases',
    items: [
      { name: 'MongoDB', icon: 'https://cdn.simpleicons.org/mongodb/47A248', color: '#47A248' },
      { name: 'MySQL', icon: 'https://cdn.simpleicons.org/mysql/4479A1', color: '#4479A1' },
      { name: 'Redis', icon: 'https://cdn.simpleicons.org/redis/DC382D', color: '#DC382D' },
      { name: 'PostgreSQL', icon: 'https://cdn.simpleicons.org/postgresql/4169E1', color: '#4169E1' },
    ],
  },
];

const allTechs = techCategories.flatMap(c => c.items);

export default function TechStack() {
  return (
    <section id="techstack" className="section-padding overflow-hidden" data-testid="techstack-section">
      <div className="container-main">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-medium tracking-wider uppercase text-primary mb-4">
            Technology Stack
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground font-outfit">
            Powered by Modern Tech
          </h2>
        </motion.div>

        {/* Marquee */}
        <div className="relative mb-16">
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10" />
          <div className="flex animate-marquee">
            {[...allTechs, ...allTechs].map((tech, i) => (
              <div
                key={`${tech.name}-${i}`}
                className="flex-shrink-0 mx-6 flex flex-col items-center gap-3 group"
              >
                <div className="w-16 h-16 rounded-2xl glass-card flex items-center justify-center grayscale group-hover:grayscale-0 transition-all duration-300 hover:scale-110">
                  <img src={tech.icon} alt={tech.name} className="w-8 h-8" />
                </div>
                <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Category grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {techCategories.map((cat, ci) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: ci * 0.1 }}
              className="glass-card rounded-2xl p-6"
              data-testid={`tech-category-${ci}`}
            >
              <h3 className="text-lg font-semibold font-outfit text-foreground mb-5">{cat.title}</h3>
              <div className="grid grid-cols-2 gap-3">
                {cat.items.map((tech) => (
                  <div
                    key={tech.name}
                    className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                  >
                    <img src={tech.icon} alt={tech.name} className="w-6 h-6" />
                    <span className="text-sm font-medium text-foreground">{tech.name}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
