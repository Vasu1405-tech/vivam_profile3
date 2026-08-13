import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, XCircle, ShieldCheck, Sparkles } from 'lucide-react';

const comparisonRows = [
  {
    feature: 'Core Expertise & Delivery Model',
    generic: 'Social media posts & basic manual ad boosts',
    vivam: 'Full-stack software engineering, performance PPC, SEO & AI automation'
  },
  {
    feature: 'Technology & Web Engineering',
    generic: 'Outsourced templates, slow WordPress plugins, zero custom code',
    vivam: 'Dedicated React/Next.js developers, custom API integrations, Core Web Vitals speed'
  },
  {
    feature: 'AI & Automation Workflows',
    generic: 'Manual lead copy-pasting into spreadsheets',
    vivam: 'Instant AI lead scoring, automated CRM routing, WhatsApp & email workflows'
  },
  {
    feature: 'Analytics & Attribution',
    generic: 'Vague monthly PDF summaries with vanity metrics',
    vivam: 'Transparent GA4 multi-touch attribution dashboards with real ROAS & CPL tracking'
  },
  {
    feature: 'IP Ownership & Code Rights',
    generic: 'Proprietary lock-in or rental templates',
    vivam: '100% full client ownership of all source code, assets, and ad account data'
  },
  {
    feature: 'Account Support & SLA',
    generic: 'Junior account manager handling 30+ clients',
    vivam: 'Dedicated Senior Growth Strategist & Technical Lead with weekly review calls'
  }
];

export default function AgencyComparisonMatrix() {
  return (
    <section className="py-20 border-t border-border/40 bg-card/10 relative overflow-hidden">
      {/* Background design elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-primary/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute inset-0 bg-dot-pattern opacity-25 pointer-events-none" />

      <div className="container-main max-w-5xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <Badge variant="outline" className="px-4 py-1.5 border-primary/40 bg-primary/10 text-primary font-semibold text-xs tracking-wider uppercase">
            <ShieldCheck className="w-3.5 h-3.5 mr-2 inline" /> Why Clients Choose Vivam
          </Badge>
          <h2 className="text-3xl md:text-5xl font-extrabold font-outfit text-foreground tracking-tight">
            Traditional Agency vs. Vivam Growth Ecosystem
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
            See how combining digital marketing with software engineering, AI, and attribution creates an unfair competitive advantage.
          </p>
        </div>

        <div className="rounded-3xl bg-card border border-border/70 overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border/60 bg-muted/30">
                  <th className="p-6 text-sm font-bold font-outfit text-foreground w-1/3">Feature Capability</th>
                  <th className="p-6 text-sm font-bold font-outfit text-muted-foreground w-1/3 border-l border-border/40">Generic Marketing Agencies</th>
                  <th className="p-6 text-sm font-extrabold font-outfit text-primary w-1/3 border-l border-border/40 bg-primary/5">
                    <span className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-primary" /> Vivam Technology + Growth
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40 text-xs md:text-sm">
                {comparisonRows.map((row, idx) => (
                  <tr key={row.feature} className="hover:bg-muted/20 transition-colors">
                    <td className="p-6 font-semibold font-outfit text-foreground">
                      {row.feature}
                    </td>

                    <td className="p-6 text-muted-foreground border-l border-border/40 bg-card/40">
                      <div className="flex items-start gap-2.5">
                        <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                        <span>{row.generic}</span>
                      </div>
                    </td>

                    <td className="p-6 font-semibold text-foreground border-l border-border/40 bg-primary/5">
                      <div className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{row.vivam}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
