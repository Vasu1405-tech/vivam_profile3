import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Zap, Send, Loader2, CheckCircle2 } from 'lucide-react';
import axios from 'axios';
import { toast } from 'sonner';

const BACKEND_URL = (process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001').replace(/\/$/, '');
const API = `${BACKEND_URL}/api`;

export default function MarketingLeadForm() {
  const [form, setForm] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    website: '',
    businessType: '',
    serviceInterested: '',
    budget: '',
    description: '',
    contactMethod: 'Email'
  });
  const [status, setStatus] = useState('idle');

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.description) {
      toast.error('Please fill in your name, email, and project requirements.');
      return;
    }

    setStatus('loading');
    try {
      await axios.post(`${API}/contact`, {
        name: form.name,
        company: form.company,
        email: form.email,
        phone: form.phone,
        budget: form.budget,
        description: `[Digital Growth Strategy Request]
Website: ${form.website || 'N/A'}
Business Type: ${form.businessType || 'N/A'}
Service Interested: ${form.serviceInterested || 'N/A'}
Preferred Contact Method: ${form.contactMethod}
Requirements: ${form.description}`
      });

      setStatus('success');
      toast.success('Strategy consultation requested! Our strategists will reach out within 24 hours.');
      setForm({
        name: '',
        company: '',
        email: '',
        phone: '',
        website: '',
        businessType: '',
        serviceInterested: '',
        budget: '',
        description: '',
        contactMethod: 'Email'
      });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      setStatus('error');
      toast.error('Failed to submit request. Please email us at contact@support.vivamsofttech.com');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <section id="consultation-form" className="py-20 border-t border-border/40 bg-card/30 relative overflow-hidden">
      {/* Background design elements */}
      <div className="absolute top-10 -left-40 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 -right-40 w-[500px] h-[500px] bg-violet-500/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute inset-0 bg-grid-mesh opacity-25 pointer-events-none" />

      <div className="container-main max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center mb-12 space-y-4">
          <Badge variant="outline" className="px-4 py-1.5 border-emerald-500/40 bg-emerald-500/10 text-emerald-400 font-medium text-xs uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5 mr-2 inline" /> Free Digital Strategy Session
          </Badge>
          <h2 className="text-3xl md:text-5xl font-extrabold font-outfit text-foreground tracking-tight">
            Let's Build Your Digital Growth Strategy
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto">
            Tell us about your business, current marketing challenges, and expansion targets for an expert audit and action roadmap.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 md:p-12 rounded-3xl bg-card border border-border/70 shadow-2xl space-y-6">
          {/* Row 1: Name & Company */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Full Name *</label>
              <Input
                placeholder="John Doe"
                value={form.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className="bg-background/50 border-border/60 focus:border-primary"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Business / Company *</label>
              <Input
                placeholder="Acme Enterprises"
                value={form.company}
                onChange={(e) => handleChange('company', e.target.value)}
                className="bg-background/50 border-border/60 focus:border-primary"
                required
              />
            </div>
          </div>

          {/* Row 2: Email & Phone */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Work Email *</label>
              <Input
                type="email"
                placeholder="john@company.com"
                value={form.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className="bg-background/50 border-border/60 focus:border-primary"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Phone Number</label>
              <Input
                placeholder="+91 98765 43210"
                value={form.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                className="bg-background/50 border-border/60 focus:border-primary"
              />
            </div>
          </div>

          {/* Row 3: Website & Business Type */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Website URL</label>
              <Input
                placeholder="https://yourcompany.com"
                value={form.website}
                onChange={(e) => handleChange('website', e.target.value)}
                className="bg-background/50 border-border/60 focus:border-primary"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Business Type</label>
              <Select value={form.businessType} onValueChange={(val) => handleChange('businessType', val)}>
                <SelectTrigger className="bg-background/50 border-border/60">
                  <SelectValue placeholder="Select business model" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="B2B Enterprise">B2B Enterprise</SelectItem>
                  <SelectItem value="SaaS / Software">SaaS / Software</SelectItem>
                  <SelectItem value="E-commerce & Retail">E-commerce & Retail</SelectItem>
                  <SelectItem value="Local Business / Services">Local Business / Services</SelectItem>
                  <SelectItem value="Healthcare / Clinic">Healthcare / Clinic</SelectItem>
                  <SelectItem value="Real Estate / Construction">Real Estate / Construction</SelectItem>
                  <SelectItem value="Education & EdTech">Education & EdTech</SelectItem>
                  <SelectItem value="Startup">Startup</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Row 4: Service Interested & Budget */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Services Interested In</label>
              <Select value={form.serviceInterested} onValueChange={(val) => handleChange('serviceInterested', val)}>
                <SelectTrigger className="bg-background/50 border-border/60">
                  <SelectValue placeholder="Select primary growth service" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="SEO & Organic Search Growth">SEO & Organic Search Growth</SelectItem>
                  <SelectItem value="Performance PPC Advertising (Google/Meta)">Performance PPC Advertising</SelectItem>
                  <SelectItem value="Social Media Marketing & Branding">Social Media Marketing & Branding</SelectItem>
                  <SelectItem value="Website & Landing Page Development">Website & Landing Page Development</SelectItem>
                  <SelectItem value="AI Marketing & Lead Automation">AI Marketing & Lead Automation</SelectItem>
                  <SelectItem value="Full Digital Growth Package (All Services)">Full Digital Growth Package</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Monthly Marketing Budget</label>
              <Select value={form.budget} onValueChange={(val) => handleChange('budget', val)}>
                <SelectTrigger className="bg-background/50 border-border/60">
                  <SelectValue placeholder="Select budget range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Under ₹75,000 / $1,000">Under ₹75,000 / $1,000 per month</SelectItem>
                  <SelectItem value="₹75,000 - ₹2.5 Lakhs / $1k - $3k">₹75,000 - ₹2.5 Lakhs / $1k - $3k</SelectItem>
                  <SelectItem value="₹2.5 Lakhs - ₹8 Lakhs / $3k - $10k">₹2.5 Lakhs - ₹8 Lakhs / $3k - $10k</SelectItem>
                  <SelectItem value="₹8 Lakhs+ / $10,000+">₹8 Lakhs+ / $10,000+ per month</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Row 5: Preferred Contact Method */}
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Preferred Contact Method</label>
            <div className="flex gap-4">
              {['Email', 'Phone Call', 'WhatsApp'].map((method) => (
                <button
                  key={method}
                  type="button"
                  onClick={() => handleChange('contactMethod', method)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${
                    form.contactMethod === method
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'bg-background/50 border-border/60 text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {method}
                </button>
              ))}
            </div>
          </div>

          {/* Row 6: Project Requirements */}
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Project Requirements & Growth Goals *</label>
            <Textarea
              placeholder="Tell us about your target audience, revenue goals, current conversion challenges, or specific marketing requirements..."
              rows={4}
              value={form.description}
              onChange={(e) => handleChange('description', e.target.value)}
              className="bg-background/50 border-border/60 focus:border-primary"
              required
            />
          </div>

          {/* Submit CTA */}
          <Button
            type="submit"
            disabled={status === 'loading'}
            className="w-full py-6 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 text-white font-bold text-base shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 transition-all"
          >
            {status === 'loading' ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" /> Processing Request...
              </>
            ) : status === 'success' ? (
              <>
                <CheckCircle2 className="w-5 h-5 mr-2 text-emerald-300" /> Request Received Successfully!
              </>
            ) : (
              <>
                <Send className="w-5 h-5 mr-2" /> Request Free Strategy Consultation
              </>
            )}
          </Button>
        </form>
      </div>
    </section>
  );
}
