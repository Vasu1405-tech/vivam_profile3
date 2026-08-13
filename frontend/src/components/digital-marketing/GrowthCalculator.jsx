import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { TrendingUp, ArrowRight, IndianRupee, Sparkles, AlertCircle, CheckCircle2, MessageSquare } from 'lucide-react';

export default function GrowthCalculator({ onTalkToVivam }) {
  // Inputs
  const [monthlyVisitors, setMonthlyVisitors] = useState([10000]);
  const [currentConversion, setCurrentConversion] = useState([2.5]);
  const [averageLeadValue, setAverageLeadValue] = useState('5000');
  const [expectedImprovement, setExpectedImprovement] = useState([25]); // 25% improvement
  const [customMonthlyLeads, setCustomMonthlyLeads] = useState('');

  // Formula Calculations
  const visitorCount = monthlyVisitors[0];
  const conversionPercent = currentConversion[0];
  
  // Current Monthly Leads
  const calculatedCurrentLeads = Math.round((visitorCount * conversionPercent) / 100);
  const currentLeads = customMonthlyLeads !== '' ? Number(customMonthlyLeads) : calculatedCurrentLeads;

  // Expected Improvement & Potential Conversion Rate
  const improvementPercent = expectedImprovement[0];
  const potentialConversionRate = Number((conversionPercent * (1 + improvementPercent / 100)).toFixed(2));

  // Potential Leads
  const potentialLeads = Math.round((visitorCount * potentialConversionRate) / 100);
  const additionalLeads = Math.max(0, potentialLeads - currentLeads);

  // Potential Value calculation in Indian Rupees (INR)
  const leadValNum = Number(averageLeadValue.replace(/[^0-9]/g, '')) || 0;
  const potentialAdditionalValue = additionalLeads * leadValNum;

  // Format currency in Indian numbering system (e.g. ₹3,15,000)
  const formatINR = (val) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-8 md:p-10 rounded-3xl bg-card border border-border/70 shadow-2xl space-y-8"
    >
      {/* Header */}
      <div className="text-center max-w-xl mx-auto space-y-2">
        <h3 className="text-2xl font-bold font-outfit text-foreground">
          Calculate Your Potential Lead Growth
        </h3>
        <p className="text-xs text-muted-foreground">
          Adjust monthly traffic, current conversion rate, and average lead value to project your revenue expansion with Vivam's growth engine.
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Sliders & Numerical Inputs (Left Column - 7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Input 1: Monthly Visitors */}
          <div className="p-5 rounded-2xl bg-background/60 border border-border/60 space-y-3">
            <div className="flex justify-between items-center text-sm font-semibold">
              <span className="text-foreground">Current Monthly Visitors</span>
              <span className="text-primary font-bold text-base">{visitorCount.toLocaleString('en-IN')}</span>
            </div>
            <Slider
              value={monthlyVisitors}
              onValueChange={setMonthlyVisitors}
              min={1000}
              max={100000}
              step={1000}
              className="w-full"
            />
            <div className="flex justify-between text-[10px] text-muted-foreground font-mono">
              <span>1,000</span>
              <span>50,000</span>
              <span>100,000+</span>
            </div>
          </div>

          {/* Input 2: Conversion Rate */}
          <div className="p-5 rounded-2xl bg-background/60 border border-border/60 space-y-3">
            <div className="flex justify-between items-center text-sm font-semibold">
              <span className="text-foreground">Current Conversion Rate (%)</span>
              <span className="text-violet-400 font-bold text-base">{conversionPercent}%</span>
            </div>
            <Slider
              value={currentConversion}
              onValueChange={setCurrentConversion}
              min={0.5}
              max={5.0}
              step={0.1}
              className="w-full"
            />
            <div className="flex justify-between text-[10px] text-muted-foreground font-mono">
              <span>0.5%</span>
              <span>2.5%</span>
              <span>5.0%</span>
            </div>
          </div>

          {/* Input 3: Expected Improvement % */}
          <div className="p-5 rounded-2xl bg-background/60 border border-border/60 space-y-3">
            <div className="flex justify-between items-center text-sm font-semibold">
              <span className="text-foreground">Expected Conversion Improvement (%)</span>
              <span className="text-emerald-400 font-bold text-base">+{improvementPercent}%</span>
            </div>
            <Slider
              value={expectedImprovement}
              onValueChange={setExpectedImprovement}
              min={10}
              max={100}
              step={5}
              className="w-full"
            />
            <div className="flex justify-between text-[10px] text-muted-foreground font-mono">
              <span>+10%</span>
              <span>+25% (Standard)</span>
              <span>+100%</span>
            </div>
          </div>

          {/* Optional Inputs: Lead Value & Current Leads */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-foreground mb-1.5 flex items-center gap-1">
                <IndianRupee className="w-3.5 h-3.5 text-emerald-400" /> Average Lead Value (₹)
              </label>
              <Input
                type="number"
                placeholder="e.g. 5000"
                value={averageLeadValue}
                onChange={(e) => setAverageLeadValue(e.target.value)}
                className="bg-background/60 text-sm py-5 rounded-xl border-border/60"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-foreground mb-1.5">
                Current Monthly Leads (Optional)
              </label>
              <Input
                type="number"
                placeholder={`Calculated: ${calculatedCurrentLeads}`}
                value={customMonthlyLeads}
                onChange={(e) => setCustomMonthlyLeads(e.target.value)}
                className="bg-background/60 text-sm py-5 rounded-xl border-border/60"
              />
            </div>
          </div>
        </div>

        {/* Results Visualization Card (Right Column - 5 cols) */}
        <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-blue-950/40 via-card to-violet-950/40 border border-primary/30 text-center space-y-6 shadow-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" /> Projecting Revenue Opportunity
          </div>

          {/* 3 Metric Cards */}
          <div className="grid grid-cols-3 gap-2 py-2">
            <div className="p-3 rounded-2xl bg-background/60 border border-border/50 text-center">
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block">CURRENT</span>
              <span className="text-xl font-extrabold font-outfit text-foreground">{currentLeads}</span>
              <span className="text-[9px] text-muted-foreground block">Leads/mo</span>
            </div>

            <div className="p-3 rounded-2xl bg-background/60 border border-border/50 text-center">
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block">POTENTIAL</span>
              <span className="text-xl font-extrabold font-outfit text-emerald-400">{potentialLeads}</span>
              <span className="text-[9px] text-emerald-400 block">Leads/mo</span>
            </div>

            <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block">OPPORTUNITY</span>
              <span className="text-xl font-extrabold font-outfit text-emerald-400">+{additionalLeads}</span>
              <span className="text-[9px] text-emerald-400 block">Additional</span>
            </div>
          </div>

          {/* Potential Additional Revenue Value */}
          {leadValNum > 0 && (
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-1">
              <span className="text-xs font-semibold text-emerald-300">Potential Additional Monthly Revenue</span>
              <p className="text-3xl font-black font-outfit text-emerald-400 tracking-tight">
                {formatINR(potentialAdditionalValue)}
              </p>
            </div>
          )}

          {/* Conversion rate comparison */}
          <div className="p-4 rounded-xl bg-background/60 border border-border/50 text-left text-xs space-y-2">
            <div className="flex justify-between text-muted-foreground">
              <span>Current Conversion Rate:</span>
              <span className="font-bold text-foreground">{conversionPercent}%</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Potential Conversion Rate:</span>
              <span className="font-bold text-emerald-400">{potentialConversionRate}%</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Additional Monthly Leads:</span>
              <span className="font-bold text-emerald-400">+{additionalLeads}</span>
            </div>
          </div>

          {/* Mandatory Disclaimer */}
          <div className="p-3 rounded-xl bg-muted/30 border border-border/40 text-left text-[11px] text-muted-foreground flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <span>
              Illustrative estimate only. Actual results depend on traffic quality, conversion performance, market conditions and other factors.
            </span>
          </div>

          {/* CTA */}
          <div className="space-y-2 pt-2">
            <p className="text-xs font-semibold text-foreground">Want to turn this potential into actual growth?</p>
            <Button
              onClick={() => onTalkToVivam && onTalkToVivam({ visitorCount, currentLeads, potentialLeads, additionalLeads, potentialAdditionalValue })}
              className="w-full rounded-full bg-gradient-to-r from-blue-600 via-violet-600 to-emerald-600 text-white font-bold py-6 text-xs shadow-lg"
            >
              <MessageSquare className="w-4 h-4 mr-2" /> Talk to Vivam Growth Team
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
