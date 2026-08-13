import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { X, Sparkles, Send, CheckCircle2, ShieldCheck, Loader2 } from 'lucide-react';
import axios from 'axios';
import { toast } from 'sonner';

const BACKEND_URL = (process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001').replace(/\/$/, '');
const API = `${BACKEND_URL}/api`;

const SERVICE_OPTIONS = [
  'Search Engine Optimization (SEO)',
  'Pay-Per-Click (PPC) Advertising',
  'Social Media Marketing (SMM)',
  'Conversion Rate Optimization (CRO)',
  'Content Marketing & Strategy',
  'Full Digital Growth Suite'
];

export default function AuditLeadFormModal({ isOpen, onClose, auditData, defaultKeyword = '', defaultWebsite = '' }) {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    website: defaultWebsite || auditData?.url || '',
    targetKeyword: defaultKeyword || auditData?.targetKeyword || '',
    servicesInterested: ['SEO & Digital Growth'],
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleServiceToggle = (service) => {
    setFormData((prev) => {
      const exists = prev.servicesInterested.includes(service);
      if (exists) {
        return {
          ...prev,
          servicesInterested: prev.servicesInterested.filter((s) => s !== service)
        };
      } else {
        return {
          ...prev,
          servicesInterested: [...prev.servicesInterested, service]
        };
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) {
      toast.error('Please provide your name and work email.');
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        name: formData.name.trim(),
        company: formData.company.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        website: formData.website || auditData?.url || '',
        targetKeyword: formData.targetKeyword || auditData?.targetKeyword || '',
        servicesInterested: formData.servicesInterested,
        message: formData.message.trim(),
        auditId: auditData?.auditId || ''
      };

      const response = await axios.post(`${API}/digital-marketing/lead`, payload);

      if (response.data && response.data.success) {
        setIsSubmitting(false);
        setIsSubmitted(true);
        toast.success('Your growth plan request has been submitted!');
      } else {
        throw new Error('Form submission failed');
      }
    } catch (err) {
      console.warn('Backend lead endpoint fallback to standard contact:', err);
      try {
        await axios.post(`${API}/contact`, {
          name: formData.name,
          company: formData.company,
          email: formData.email,
          phone: formData.phone,
          budget: 'Digital Marketing Audit Growth Plan',
          description: `[Growth Plan Lead] Website: ${formData.website || auditData?.url} | Keyword: ${formData.targetKeyword} | AuditID: ${auditData?.auditId} | Services: ${formData.servicesInterested.join(', ')} | Message: ${formData.message}`
        });
        setIsSubmitting(false);
        setIsSubmitted(true);
        toast.success('Your growth plan request has been submitted!');
      } catch (fallbackErr) {
        setIsSubmitting(false);
        toast.error('Unable to submit request right now. Please try again.');
      }
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-2xl bg-card border border-border rounded-3xl shadow-2xl overflow-hidden my-8"
        >
          {/* Top Bar Accent */}
          <div className="h-2 bg-gradient-to-r from-blue-600 via-violet-600 to-emerald-500" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors z-10"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="p-6 sm:p-10 space-y-6">
            {!isSubmitted ? (
              <>
                <div className="space-y-2 text-center sm:text-left">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>90-Day Customized Growth Strategy</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold font-outfit text-foreground tracking-tight">
                    Get My Detailed Growth Plan
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Our digital marketing strategists will audit your competitors, map a 90-day lead expansion roadmap, and fix detected vulnerabilities.
                  </p>
                  {auditData && (
                    <div className="p-3 rounded-xl bg-muted/40 border border-border/50 text-xs text-muted-foreground flex items-center justify-between">
                      <span>Audit Target: <strong className="text-primary">{auditData.domain || auditData.url}</strong></span>
                      <span className="font-bold text-emerald-400">Score: {auditData.score}/100</span>
                    </div>
                  )}
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-foreground mb-1.5">Full Name *</label>
                      <Input
                        required
                        type="text"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="bg-background/60 text-sm py-5 rounded-xl"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-foreground mb-1.5">Work Email *</label>
                      <Input
                        required
                        type="email"
                        placeholder="john@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="bg-background/60 text-sm py-5 rounded-xl"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-foreground mb-1.5">Phone Number</label>
                      <Input
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="bg-background/60 text-sm py-5 rounded-xl"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-foreground mb-1.5">Company / Brand Name</label>
                      <Input
                        type="text"
                        placeholder="Acme Tech"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="bg-background/60 text-sm py-5 rounded-xl"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-foreground mb-1.5">Website URL</label>
                      <Input
                        type="text"
                        placeholder="https://yourwebsite.com"
                        value={formData.website}
                        onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                        className="bg-background/60 text-sm py-5 rounded-xl"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-foreground mb-1.5">Target Keyword</label>
                      <Input
                        type="text"
                        placeholder="e.g. digital marketing Hyderabad"
                        value={formData.targetKeyword}
                        onChange={(e) => setFormData({ ...formData, targetKeyword: e.target.value })}
                        className="bg-background/60 text-sm py-5 rounded-xl"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-2">Services Interested In</label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {SERVICE_OPTIONS.map((srv) => {
                        const active = formData.servicesInterested.includes(srv);
                        return (
                          <button
                            key={srv}
                            type="button"
                            onClick={() => handleServiceToggle(srv)}
                            className={`p-2.5 rounded-xl text-[11px] font-medium border text-left transition-all flex items-center justify-between ${
                              active
                                ? 'bg-primary/10 border-primary text-primary font-bold'
                                : 'bg-background/40 border-border/60 text-muted-foreground hover:text-foreground'
                            }`}
                          >
                            <span className="truncate">{srv}</span>
                            {active && <CheckCircle2 className="w-3.5 h-3.5 ml-1 shrink-0 text-primary" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1.5">Additional Notes / Goals</label>
                    <Textarea
                      rows={3}
                      placeholder="Tell us about your target leads, budget, or primary growth challenges..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="bg-background/60 text-sm rounded-xl"
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-between gap-4">
                    <p className="text-[11px] text-muted-foreground flex items-center gap-1">
                      <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                      Strict NDA & privacy protection guaranteed.
                    </p>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="rounded-full bg-gradient-to-r from-blue-600 via-violet-600 to-emerald-600 text-white font-bold py-5 px-8 text-xs shadow-lg"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Submitting...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" /> Request Custom Roadmap
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </>
            ) : (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold font-outfit text-foreground">Growth Plan Request Received!</h3>
                <p className="text-sm text-muted-foreground max-w-md mx-auto">
                  Our Senior Growth Strategist is reviewing your website audit data (<strong className="text-foreground">{formData.website || auditData?.url}</strong>) and will send your 90-day execution roadmap to <strong className="text-foreground">{formData.email}</strong> within 24 hours.
                </p>
                <div className="pt-4">
                  <Button onClick={onClose} variant="outline" className="rounded-full px-8 py-5 text-xs font-bold">
                    Done
                  </Button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
