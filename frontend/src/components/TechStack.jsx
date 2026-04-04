import React from 'react';
import { motion } from 'framer-motion';

const techCategories = [
  {
    title: 'Frontend',
    items: [
      { name: 'React', icon: 'https://cdn.simpleicons.org/react/61DAFB' },
      { name: 'Next.js', icon: 'https://cdn.simpleicons.org/nextdotjs/FFFFFF' },
      { name: 'TypeScript', icon: 'https://cdn.simpleicons.org/typescript/3178C6' },
      { name: 'Tailwind CSS', icon: 'https://cdn.simpleicons.org/tailwindcss/06B6D4' },
    ],
  },
  {
    title: 'Backend',
    items: [
      { name: 'Spring Boot', icon: 'https://cdn.simpleicons.org/springboot/6DB33F' },
      { name: 'Node.js', icon: 'https://cdn.simpleicons.org/nodedotjs/5FA04E' },
      { name: 'Python', icon: 'https://cdn.simpleicons.org/python/3776AB' },
      { name: 'FastAPI', icon: 'https://cdn.simpleicons.org/fastapi/009688' },
    ],
  },
  {
    title: 'Databases',
    items: [
      { name: 'MongoDB', icon: 'https://cdn.simpleicons.org/mongodb/47A248' },
      { name: 'MySQL', icon: 'https://cdn.simpleicons.org/mysql/4479A1' },
      { name: 'Redis', icon: 'https://cdn.simpleicons.org/redis/DC382D' },
      { name: 'PostgreSQL', icon: 'https://cdn.simpleicons.org/postgresql/4169E1' },
    ],
  },
  {
    title: 'AI Tools',
    items: [
      { name: 'TensorFlow', icon: 'https://cdn.simpleicons.org/tensorflow/FF6F00' },
      { name: 'PyTorch', icon: 'https://cdn.simpleicons.org/pytorch/EE4C2C' },
      { name: 'OpenAI', icon: 'https://www.svgrepo.com/show/306500/openai.svg' },
      { name: 'LangChain', icon: 'https://cdn.simpleicons.org/langchain/1C3C3C' },
      { name: 'Hugging Face', icon: 'https://cdn.simpleicons.org/huggingface/FFD21E' },
      { name: 'Gemini', icon: 'https://cdn.simpleicons.org/googlegemini/8E75B2' },
    ],
  },
  {
    title: 'DevOps & Cloud',
    items: [
      { name: 'Docker', icon: 'https://cdn.simpleicons.org/docker/2496ED' },
      { name: 'Kubernetes', icon: 'https://cdn.simpleicons.org/kubernetes/326CE5' },
      { name: 'AWS', icon: 'https://www.svgrepo.com/show/448266/aws.svg' },
      { name: 'GitHub Actions', icon: 'https://cdn.simpleicons.org/githubactions/2088FF' },
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
          <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            We leverage cutting-edge technologies and AI tools to build intelligent, scalable solutions
          </p>
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
                <div className="w-16 h-16 rounded-2xl glass-card flex items-center justify-center transition-all duration-300 hover:scale-110">
                  <img src={tech.icon} alt={tech.name} className="w-8 h-8" />
                </div>
                <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Category grid - Row 1 */}
        <div className="grid md:grid-cols-3 gap-6">
          {techCategories.slice(0, 3).map((cat, ci) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: ci * 0.1 }}
              className="glass-card rounded-2xl p-6 hover:scale-[1.01] transition-all duration-300"
              data-testid={`tech-category-${ci}`}
            >
              <h3 className="text-lg font-bold font-outfit text-foreground mb-6 uppercase tracking-wide">{cat.title}</h3>
              <div className="grid grid-cols-2 gap-3">
                {cat.items.map((tech) => (
                  <div
                    key={tech.name}
                    className="flex items-center gap-3 p-3 rounded-xl bg-muted/30 hover:bg-muted/60 transition-colors border border-border/20 group"
                  >
                    <img src={tech.icon} alt={tech.name} className="w-6 h-6 transition-all duration-300" />
                    <span className="text-sm font-medium text-foreground">{tech.name}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Category grid - Row 2 (Centered) */}
        <div className="grid md:grid-cols-2 gap-6 mt-6 max-w-4xl mx-auto">
          {techCategories.slice(3).map((cat, ci) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: (ci + 3) * 0.1 }}
              className="glass-card rounded-2xl p-6 hover:scale-[1.01] transition-all duration-300"
              data-testid={`tech-category-${ci + 3}`}
            >
              <h3 className="text-lg font-bold font-outfit text-foreground mb-6 uppercase tracking-wide">{cat.title}</h3>
              <div className="grid grid-cols-2 gap-3">
                {cat.items.map((tech) => (
                  <div
                    key={tech.name}
                    className="flex items-center gap-3 p-3 rounded-xl bg-muted/30 hover:bg-muted/60 transition-colors border border-border/20 group"
                  >
                    <img src={tech.icon} alt={tech.name} className="w-6 h-6 transition-all duration-300" />
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
