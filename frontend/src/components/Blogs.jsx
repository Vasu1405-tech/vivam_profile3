import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight, MessageSquare, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';

const blogPosts = [
  {
    title: 'The Future of AI in Enterprise Solutions',
    excerpt: 'Explore how generative AI is transforming business automation and customer engagement in 2025.',
    category: 'AI & Innovation',
    date: 'March 15, 2025',
    author: 'Vasu',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop'
  },
  {
    title: 'Top 5 Web Trends for 2025',
    excerpt: 'Stay ahead of the curve with our insights into the latest web technologies and design patterns.',
    category: 'Development',
    date: 'March 10, 2025',
    author: 'Team Vivam',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop'
  },
  {
    title: 'Securing Your Cloud Infrastructure',
    excerpt: 'Best practices for protecting your data and applications in a multi-cloud environment.',
    category: 'Security',
    date: 'March 5, 2025',
    author: 'Security Lead',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop'
  }
];

export default function Blogs() {
  return (
    <section id="blog" className="section-padding">
      <div className="container-main">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6"
        >
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4">
              <BookOpen className="w-3.5 h-3.5" />
              Latest Insights
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground font-outfit">
              Our Blog & News
            </h2>
            <p className="mt-4 text-base md:text-lg text-muted-foreground">
              Deep dives into technology, industry updates, and stories from the Vivam team.
            </p>
          </div>
          <Button variant="outline" className="hidden md:flex rounded-full group">
            View All Posts <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, i) => (
            <motion.div
              key={post.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Card className="h-full glass-card overflow-hidden border-0 group hover:shadow-2xl hover:shadow-primary/5 transition-all flex flex-col">
                <CardHeader className="p-0 relative overflow-hidden h-52">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-background/80 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider text-primary">
                      {post.category}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="p-6 flex-1">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {post.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="w-3.5 h-3.5" />
                      {post.author}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold font-outfit text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-3">
                    {post.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </CardContent>
                <CardFooter className="p-6 pt-0 border-t border-white/5 mt-auto">
                  <Button variant="ghost" className="p-0 h-auto font-semibold hover:bg-transparent text-primary hover:text-primary/80 group/link">
                    Read More <ArrowRight className="ml-2 w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                  </Button>
                  <div className="ml-auto text-muted-foreground">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Mobile View All Button */}
        <div className="mt-10 md:hidden">
          <Button variant="outline" className="w-full rounded-full">
            View All Posts <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
