import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { BarChart3, TrendingUp, Users, Target, DollarSign, Search, Sparkles, Filter } from 'lucide-react';

export default function MarketingAnalytics() {
  const [selectedSource, setSelectedSource] = useState('All');

  const trafficSources = [
    { name: 'Organic Search', percentage: '42%', leads: '539', color: 'bg-emerald-500' },
    { name: 'Paid Search (PPC)', percentage: '28%', leads: '359', color: 'bg-blue-500' },
    { name: 'Social Media', percentage: '16%', leads: '205', color: 'bg-violet-500' },
    { name: 'Direct', percentage: '9%', leads: '115', color: 'bg-amber-500' },
    { name: 'Referral', percentage: '5%', leads: '66', color: 'bg-rose-500' }
  ];

  const campaignData = [
    { name: 'Google Search - Commercial Intent', spend: '$1,200', leads: '142', cpl: '$8.45', roas: '4.2x', status: 'Active' },
    { name: 'Meta Retargeting - High Intent', spend: '$850', leads: '98', cpl: '$8.67', roas: '3.8x', status: 'Active' },
    { name: 'LinkedIn B2B Decision Makers', spend: '$1,500', leads: '45', cpl: '$33.33', roas: '5.1x', status: 'Active' },
    { name: 'Technical SEO Content Pipeline', spend: 'Organic', leads: '310', cpl: 'N/A', roas: '6.5x', status: 'Scaling' }
  ];

  return (
    <section className="py-20 border-t border-border/40 bg-card/20 relative overflow-hidden">
      {/* Background design elements */}
      <div className="absolute top-10 left-10 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-violet-500/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute inset-0 bg-grid-mesh opacity-25 pointer-events-none" />

      <div className="container-main max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <Badge variant="outline" className="px-4 py-1.5 border-emerald-500/40 bg-emerald-500/10 text-emerald-400 font-medium text-xs tracking-wider uppercase">
            <BarChart3 className="w-3.5 h-3.5 mr-2 inline" /> Full Attribution
          </Badge>
          <h2 className="text-3xl md:text-5xl font-extrabold font-outfit text-foreground tracking-tight">
            Marketing You Can Measure
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
            Transparent reporting, custom event tracking, and attribution models to give full visibility into every marketing dollar spent.
          </p>
        </div>

        {/* Analytics Dashboard Visual */}
        <div className="p-6 md:p-8 rounded-3xl bg-card border border-border/70 shadow-2xl space-y-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-border/50">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <h3 className="text-lg font-bold font-outfit text-foreground">
                  Performance & Attribution Dashboard
                </h3>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">
                Illustrative campaign metrics overview
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-xs font-semibold">
                Live Data Simulation
              </Badge>
            </div>
          </div>

          {/* Top KPI Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-background/60 border border-border/50">
              <div className="flex items-center justify-between text-muted-foreground mb-1">
                <span className="text-xs font-medium">Total Traffic</span>
                <Users className="w-4 h-4 text-blue-400" />
              </div>
              <p className="text-2xl font-extrabold font-outfit text-foreground">24,850</p>
              <span className="text-[10px] font-semibold text-emerald-400">↑ +24% vs last month</span>
            </div>

            <div className="p-4 rounded-xl bg-background/60 border border-border/50">
              <div className="flex items-center justify-between text-muted-foreground mb-1">
                <span className="text-xs font-medium">Qualified Leads</span>
                <Target className="w-4 h-4 text-violet-400" />
              </div>
              <p className="text-2xl font-extrabold font-outfit text-foreground">1,284</p>
              <span className="text-[10px] font-semibold text-emerald-400">↑ +18% vs last month</span>
            </div>

            <div className="p-4 rounded-xl bg-background/60 border border-border/50">
              <div className="flex items-center justify-between text-muted-foreground mb-1">
                <span className="text-xs font-medium">Conversion Rate</span>
                <TrendingUp className="w-4 h-4 text-emerald-400" />
              </div>
              <p className="text-2xl font-extrabold font-outfit text-foreground">5.17%</p>
              <span className="text-[10px] font-semibold text-emerald-400">↑ +1.2% CRO uplift</span>
            </div>

            <div className="p-4 rounded-xl bg-background/60 border border-border/50">
              <div className="flex items-center justify-between text-muted-foreground mb-1">
                <span className="text-xs font-medium">Avg Campaign ROAS</span>
                <DollarSign className="w-4 h-4 text-amber-400" />
              </div>
              <p className="text-2xl font-extrabold font-outfit text-foreground">4.2x</p>
              <span className="text-[10px] font-semibold text-emerald-400">Positive Revenue ROI</span>
            </div>
          </div>

          {/* Traffic Breakdown & Attribution */}
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div className="space-y-4 p-5 rounded-2xl bg-background/40 border border-border/50">
              <h4 className="text-sm font-bold font-outfit text-foreground">Traffic Source Breakdown</h4>
              <div className="space-y-3">
                {trafficSources.map((src) => (
                  <div key={src.name} className="space-y-1">
                    <div className="flex items-center justify-between text-xs font-medium">
                      <span className="text-foreground">{src.name}</span>
                      <span className="text-muted-foreground">{src.percentage} ({src.leads} leads)</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-muted/60 overflow-hidden">
                      <div className={`h-full ${src.color} rounded-full`} style={{ width: src.percentage }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4 p-5 rounded-2xl bg-background/40 border border-border/50">
              <h4 className="text-sm font-bold font-outfit text-foreground">Campaign Performance Table</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-border/50 text-muted-foreground">
                      <th className="pb-2 font-semibold">Campaign</th>
                      <th className="pb-2 font-semibold">Leads</th>
                      <th className="pb-2 font-semibold">Avg CPL</th>
                      <th className="pb-2 font-semibold">ROAS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/30">
                    {campaignData.map((c) => (
                      <tr key={c.name} className="hover:bg-muted/30 transition-colors">
                        <td className="py-2.5 font-medium text-foreground max-w-[150px] truncate">{c.name}</td>
                        <td className="py-2.5 text-muted-foreground">{c.leads}</td>
                        <td className="py-2.5 text-muted-foreground">{c.cpl}</td>
                        <td className="py-2.5 font-bold text-emerald-400">{c.roas}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
