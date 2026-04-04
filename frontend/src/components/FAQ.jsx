import React from 'react';
import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: "What services does Vivam Software Services & IT Trainings offer?",
    answer: "We offer a wide range of services including Custom Software Development, Web Application Development, Mobile App Development (iOS & Android), Cloud Solutions, AI & Automation integration, and Enterprise Systems modernization."
  },
  {
    question: "How long does a typical software project take?",
    answer: "Project timelines vary based on complexity. A simple web application might take 4-8 weeks, while complex enterprise systems or mobile apps can take 3-6 months or more. We provide a detailed project roadmap during the consultation phase."
  },
  {
    question: "Do you provide post-launch support and maintenance?",
    answer: "Yes, we offer comprehensive support and maintenance packages to ensure your software remains secure, updated, and performs optimally as your business grows."
  },
  {
    question: "Can you help with app store submissions?",
    answer: "Absolutely! We handle the entire process of deploying your applications to the Apple App Store and Google Play Store, managing all technical requirements and guidelines."
  },
  {
    question: "What is your pricing model?",
    answer: "We offer flexible pricing models including Fixed Price for well-defined projects and Time & Materials for more dynamic requirements. We'll recommend the best approach after understanding your needs."
  }
];

export default function FAQ() {
  return (
    <section id="faq" className="section-padding bg-muted/30">
      <div className="container-main">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4">
            <HelpCircle className="w-3.5 h-3.5" />
            Got Questions?
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground font-outfit">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-base text-muted-foreground max-w-2xl mx-auto">
            Find answers to common queries about our services, process, and support.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto glass-card rounded-2xl p-6 md:p-8">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b border-white/10 last:border-0">
                <AccordionTrigger className="text-left font-semibold text-foreground hover:text-primary transition-colors py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
