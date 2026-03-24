import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, Mail, Phone, Send, CheckCircle, Loader2 } from 'lucide-react';
import axios from 'axios';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function Contact() {
  const [form, setForm] = useState({
    name: '', company: '', email: '', phone: '', description: '', budget: ''
  });
  const [status, setStatus] = useState('idle'); // idle | loading | success | error

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.description) return;

    setStatus('loading');
    try {
      await axios.post(`${API}/contact`, form);
      setStatus('success');
      setForm({ name: '', company: '', email: '', phone: '', description: '', budget: '' });
      setTimeout(() => setStatus('idle'), 4000);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  return (
    <section id="contact" className="section-padding" data-testid="contact-section">
      <div className="container-main">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-medium tracking-wider uppercase text-primary mb-4">
            Get In Touch
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground font-outfit">
            Start Your Project
          </h2>
          <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Tell us about your project and we'll get back to you within 24 hours
          </p>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-8 md:gap-12">
          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="md:col-span-3 glass-card rounded-2xl p-6 md:p-8 space-y-5"
            data-testid="contact-form"
          >
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Name *</label>
                <Input
                  placeholder="Your name"
                  value={form.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  required
                  className="h-11"
                  data-testid="contact-name-input"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Company</label>
                <Input
                  placeholder="Company name"
                  value={form.company}
                  onChange={(e) => handleChange('company', e.target.value)}
                  className="h-11"
                  data-testid="contact-company-input"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Email *</label>
                <Input
                  type="email"
                  placeholder="you@company.com"
                  value={form.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  required
                  className="h-11"
                  data-testid="contact-email-input"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Phone</label>
                <Input
                  placeholder="+91 9876543210"
                  value={form.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  className="h-11"
                  data-testid="contact-phone-input"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Project Description *</label>
              <Textarea
                placeholder="Tell us about your project, goals, and timeline..."
                value={form.description}
                onChange={(e) => handleChange('description', e.target.value)}
                required
                rows={4}
                className="resize-none"
                data-testid="contact-description-input"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Budget Range</label>
              <Select value={form.budget} onValueChange={(val) => handleChange('budget', val)}>
                <SelectTrigger className="h-11" data-testid="contact-budget-select">
                  <SelectValue placeholder="Select budget range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5k-10k">₹5,000 - ₹10,000</SelectItem>
                  <SelectItem value="10k-25k">₹10,000 - ₹25,000</SelectItem>
                  <SelectItem value="25k-50k">₹25,000 - ₹50,000</SelectItem>
                  <SelectItem value="50k-100k">₹50,000 - ₹100,000</SelectItem>
                  <SelectItem value="100k+">₹100,000+</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              type="submit"
              disabled={status === 'loading'}
              className="w-full rounded-full bg-gradient-to-r from-blue-500 to-violet-600 text-white hover:opacity-90 border-0 h-12 text-base"
              data-testid="contact-submit-btn"
            >
              {status === 'loading' ? (
                <><Loader2 className="w-4 h-4 animate-spin mr-2" /> Sending...</>
              ) : status === 'success' ? (
                <><CheckCircle className="w-4 h-4 mr-2" /> Message Sent!</>
              ) : (
                <><Send className="w-4 h-4 mr-2" /> Send Message</>
              )}
            </Button>

            {status === 'error' && (
              <p className="text-sm text-destructive text-center" data-testid="contact-error-msg">
                Something went wrong. Please try again.
              </p>
            )}
          </motion.form>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="md:col-span-2 space-y-6"
          >
            <div className="glass-card rounded-2xl p-6 space-y-6" data-testid="contact-info">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-0.5">Office Address</h3>
                  <p className="text-sm text-muted-foreground">
                    Vivam Software Services<br />
                    2-217, Teacher's Colony, Rayudupalem, Ramanayyapeta, Andhra Pradesh 533005.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-0.5">Email</h3>
                  <p className="text-sm text-muted-foreground">contact@vivamsofttech.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-0.5">Phone</h3>
                  <p className="text-sm text-muted-foreground">+91 9177593322</p>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="glass-card rounded-2xl overflow-hidden h-48 md:h-auto md:flex-1" data-testid="contact-map">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d909.0907761872646!2d82.248041269561!3d17.0138259989882!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTfCsDAwJzQ5LjgiTiA4MsKwMTQnNTUuMyJF!5e1!3m2!1sen!2sin!4v1772825483798!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '200px' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Vivam Office Location"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
