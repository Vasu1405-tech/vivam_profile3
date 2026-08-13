import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Download, Sparkles, CheckCircle2, BookOpen, Loader2 } from 'lucide-react';
import axios from 'axios';
import { toast } from 'sonner';

const BACKEND_URL = (process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001').replace(/\/$/, '');
const API = `${BACKEND_URL}/api`;

export default function LeadMagnetBanner() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [status, setStatus] = useState('idle');

  const handleDownloadPlaybook = async (e) => {
    e.preventDefault();
    if (!email || !name) {
      toast.error('Please enter your name and work email.');
      return;
    }

    setStatus('loading');
    try {
      await axios.post(`${API}/contact`, {
        name,
        email,
        description: `[Playbook Download Request] Requested 2026 Enterprise Digital Growth & AI Playbook PDF.`
      });

      setStatus('success');
      toast.success('Success! Your 2026 Digital Growth & AI Playbook download link has been sent to your email.');
      setEmail('');
      setName('');
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      setStatus('error');
      toast.error('Failed to request playbook. Please try again or email us.');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <section className="py-16 border-t border-border/40 bg-gradient-to-r from-blue-950/40 via-card to-violet-950/40 relative overflow-hidden">
      {/* Background design elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-emerald-500/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute inset-0 bg-dot-pattern opacity-20 pointer-events-none" />

      <div className="container-main max-w-5xl mx-auto px-6 relative z-10">
        <div className="p-8 md:p-12 rounded-3xl bg-card/80 border border-primary/30 backdrop-blur-xl shadow-2xl grid lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Playbook Teaser Text */}
          <div className="lg:col-span-7 space-y-4">
            <Badge variant="outline" className="px-3 py-1 border-emerald-500/40 bg-emerald-500/10 text-emerald-400 font-semibold text-xs uppercase tracking-wider">
              <BookOpen className="w-3.5 h-3.5 mr-1.5 inline" /> Free Executive Guide
            </Badge>

            <h3 className="text-2xl md:text-4xl font-extrabold font-outfit text-foreground tracking-tight leading-tight">
              Download the 2026 Enterprise Digital Growth & AI Playbook
            </h3>

            <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
              Get our comprehensive 25-page strategy blueprint covering technical SEO architectures, high-ROAS PPC bidding models, and AI lead qualification workflows.
            </p>

            <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground pt-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>15-Point SEO Checkup</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>AI Lead Scoring Framework</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>GA4 Attribution Guide</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>2026 Ad Budget Benchmarks</span>
              </div>
            </div>
          </div>

          {/* Right Column: Instant Form */}
          <div className="lg:col-span-5 p-6 rounded-2xl bg-background/60 border border-border/60 shadow-xl space-y-4">
            <h4 className="text-sm font-bold font-outfit text-foreground">Get Instant Free Access</h4>

            <form onSubmit={handleDownloadPlaybook} className="space-y-3">
              <Input
                placeholder="Your Name *"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-card border-border/60 focus:border-primary text-xs py-5"
                required
              />

              <Input
                type="email"
                placeholder="Work Email Address *"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-card border-border/60 focus:border-primary text-xs py-5"
                required
              />

              <Button
                type="submit"
                disabled={status === 'loading'}
                className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 text-white font-bold text-xs py-5 shadow-lg"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Sending Download Link...
                  </>
                ) : status === 'success' ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 mr-2 text-emerald-300" /> Download Sent to Email!
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4 mr-2" /> Download Free PDF Guide
                  </>
                )}
              </Button>
            </form>

            <p className="text-[10px] text-muted-foreground text-center">
              100% Free. Instant PDF download. We respect your privacy.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
