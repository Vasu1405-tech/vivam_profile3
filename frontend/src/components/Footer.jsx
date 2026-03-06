import React from 'react';
import { Separator } from '@/components/ui/separator';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';

const footerLinks = {
  Services: ['Custom Software', 'Web Development', 'Mobile Apps', 'Cloud Solutions', 'AI & Automation'],
  Company: ['About Us', 'Careers', 'Case Studies', 'Blog', 'Contact'],
  Resources: ['Documentation', 'Tech Stack', 'Industries', 'FAQ', 'Support'],
};

const socialLinks = [
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Github, href: '#', label: 'GitHub' },
  { icon: Mail, href: 'mailto:contact@vivamsofttech.com', label: 'Email' },
];

export default function Footer() {
  return (
    <footer className="border-t border-border/50 bg-card/30" data-testid="footer">
      <div className="container-main py-16 md:py-20">
        <div className="grid md:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center">
                <span className="text-white font-outfit font-bold text-lg">V</span>
              </div>
              <span className="font-outfit font-bold text-xl tracking-tight text-foreground">
                Vivam
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mb-6">
              Transforming businesses with scalable software solutions. Enterprise-grade development for modern companies.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-9 h-9 rounded-lg bg-muted/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                  data-testid={`footer-social-${social.label.toLowerCase()}`}
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-sm font-semibold text-foreground font-outfit mb-4">{title}</h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      data-testid={`footer-link-${link.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-10 bg-border/50" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Vivam Software Services. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors" data-testid="footer-privacy">
              Privacy Policy
            </a>
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors" data-testid="footer-terms">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
