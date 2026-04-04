import React, { useState } from 'react';
import { Separator } from '@/components/ui/separator';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

const footerLinks = {
  Services: [
    { label: 'Custom Software', href: '#service-custom-software' },
    { label: 'Web Development', href: '#service-web-development' },
    { label: 'Mobile Apps', href: '#service-mobile-apps' },
    { label: 'Cloud Solutions', href: '#service-cloud-solutions' },
    { label: 'AI & Automation', href: '#service-ai-automation' },
  ],
  Company: [
    { label: 'About Us', href: '#about' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Contact', href: '#contact' },
  ],
  Resources: [
    { label: 'Tech Stack', href: '#techstack' },
    { label: 'Industries', href: '#industries' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Support', href: '#contact' },
  ],
};

const socialLinks = [
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Github, href: '#', label: 'GitHub' },
  { icon: Mail, href: 'mailto:contact@support.vivamsofttech.com', label: 'Email' },
];

export default function Footer() {
  const [activeModal, setActiveModal] = useState(null); // 'privacy' | 'terms' | null

  return (
    <>
      <footer className="border-t border-border/50 bg-card/30" data-testid="footer">
        <div className="container-main py-16 md:py-20">
          <div className="grid md:grid-cols-5 gap-10">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <img src="/vivam-logo.png" alt="Vivam Logo" className="w-10 h-10 rounded-full object-cover" />
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
                    <li key={link.label}>
                      <a
                        href={link.href}
                        onClick={(e) => {
                          e.preventDefault();
                          document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                        data-testid={`footer-link-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                      >
                        {link.label}
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
              &copy; {new Date().getFullYear()} Vivam Software Services & IT Trainings. All rights reserved.
            </p>
            <div className="flex gap-6">
              <button
                onClick={() => setActiveModal('privacy')}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors outline-none"
                data-testid="footer-privacy"
              >
                Privacy Policy
              </button>
              <button
                onClick={() => setActiveModal('terms')}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors outline-none"
                data-testid="footer-terms"
              >
                Terms of Service
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Legal Modals */}
      <Dialog open={!!activeModal} onOpenChange={() => setActiveModal(null)}>
        <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
          <DialogHeader className="mb-4">
            <DialogTitle className="text-2xl font-outfit font-bold text-foreground mb-2">
              {activeModal === 'privacy' ? 'Privacy Policy' : 'Terms of Service'}
            </DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">
              Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </DialogDescription>
          </DialogHeader>

          <div className="text-sm text-muted-foreground leading-relaxed space-y-6">
            {activeModal === 'privacy' && (
              <>
                <section>
                  <h3 className="text-base font-semibold text-foreground mb-2">1. Information We Collect</h3>
                  <p>When you interact with Vivam Software Services, we may collect personal information that you provide to us directly, such as your name, email address, phone number, and company details when you fill out our contact forms or engage our services. We also collect project specifications, budgets, and technical requirements to deliver our software solutions effectively.</p>
                </section>
                <section>
                  <h3 className="text-base font-semibold text-foreground mb-2">2. How We Use Your Information</h3>
                  <p>We use the information we collect to communicate with you regarding your project inquiries, deliver customized software solutions, provide customer support, and send administrative information. We do not sell, rent, or trade your personal information to third parties for marketing purposes.</p>
                </section>
                <section>
                  <h3 className="text-base font-semibold text-foreground mb-2">3. Data Security</h3>
                  <p>We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no internet transmission is ever completely secure, and we cannot guarantee absolute security of your data.</p>
                </section>
                <section>
                  <h3 className="text-base font-semibold text-foreground mb-2">4. Client Confidentiality (NDA)</h3>
                  <p>As a software development agency, we frequently handle sensitive business ideas and proprietary code. We are fully committed to protecting your intellectual property and routinely sign Non-Disclosure Agreements (NDAs) before discussing sensitive project details.</p>
                </section>
                <section>
                  <h3 className="text-base font-semibold text-foreground mb-2">5. Contact Us</h3>
                  <p>If you have any questions about this Privacy Policy or our data practices, please contact us at <strong>contact@support.vivamsofttech.com</strong>.</p>
                </section>
              </>
            )}

            {activeModal === 'terms' && (
              <>
                <section>
                  <h3 className="text-base font-semibold text-foreground mb-2">1. Agreement to Terms</h3>
                  <p>By accessing our website or engaging Vivam Software Services for development projects, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you are prohibited from using our site or services.</p>
                </section>
                <section>
                  <h3 className="text-base font-semibold text-foreground mb-2">2. Software Development Services</h3>
                  <p>Vivam provides custom software engineering, web and mobile app development, cloud infrastructure setup, and AI automation services. The specific scope, timelines, deliverables, and payment terms for each project will be outlined in a separate Statement of Work (SOW) or Master Services Agreement (MSA) signed by both parties.</p>
                </section>
                <section>
                  <h3 className="text-base font-semibold text-foreground mb-2">3. Intellectual Property Rights</h3>
                  <p>Upon final payment for a custom development project, all intellectual property rights, source code, and deliverables are fully transferred to the client, unless otherwise specified in the project agreement. Vivam retains the right to use non-proprietary, open-source underlying frameworks and generalized knowledge acquired during the project.</p>
                </section>
                <section>
                  <h3 className="text-base font-semibold text-foreground mb-2">4. Disclaimers</h3>
                  <p>The materials on our website are provided on an 'as is' basis. Vivam Software Services makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
                </section>
                <section>
                  <h3 className="text-base font-semibold text-foreground mb-2">5. Limitations of Liability</h3>
                  <p>In no event shall Vivam Software Services or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the software systems we develop, even if Vivam has been notified orally or in writing of the possibility of such damage.</p>
                </section>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
