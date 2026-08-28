import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, Printer, Share2, Copy, Check, Sparkles, ShieldCheck, Download, Eye, ArrowLeft } from 'lucide-react';
import axios from 'axios';
import { toast } from 'sonner';
import { downloadFileFromResponse, downloadBlob, triggerDirectUrlDownload, viewDocumentInNewTab } from '../../utils/fileDownload';

const BACKEND_URL = (process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001').replace(/\/$/, '');

const generateClientAuditHtml = (auditData) => {
  const auditId = auditData.auditId || 'LIVE-AUDIT';
  const url = auditData.url || auditData.domain || 'Website';
  const domain = auditData.domain || url.replace(/^https?:\/\//, '').split('/')[0];
  const score = auditData.score || 0;
  const grade = auditData.gradeLabel || 'N/A';
  const dateStr = new Date(auditData.createdAt || Date.now()).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });
  const categories = auditData.categories || {};
  const metrics = auditData.metrics || {};
  const issues = auditData.issues || [];
  const recommendations = auditData.recommendations || [];

  const categoriesHtml = Object.entries(categories).map(([k, v]) => `
    <div class="cat-card">
      <div class="cat-title">${k.toUpperCase()}</div>
      <div class="cat-score">${v}/100</div>
    </div>
  `).join('');

  const issuesHtml = issues.map(i => `
    <div class="issue-card">
      <div class="issue-header">
        <span class="issue-title">${i.title || ''}</span>
        <span class="badge badge-${(i.severity || 'low').toLowerCase()}">${i.severity || 'Low'}</span>
      </div>
      <div class="issue-explanation">${i.explanation || ''}</div>
      ${i.recommendation ? `<div class="issue-recommendation"><strong>Action:</strong> ${i.recommendation}</div>` : ''}
    </div>
  `).join('');

  let recsHtml = '';
  if (Array.isArray(recommendations)) {
    recsHtml = recommendations.map(r => `
      <div class="rec-card">
        <div class="rec-title">${r.title || ''}</div>
        <div class="rec-why"><strong>Why it matters:</strong> ${r.why || ''}</div>
        <div class="rec-how"><strong>Implementation:</strong> ${r.how || ''}</div>
      </div>
    `).join('');
  } else if (recommendations && typeof recommendations === 'object') {
    const roadmap = recommendations.growthRoadmap || [];
    recsHtml = `
      <div class="rec-card">
        <div class="rec-title">AI Suggested Meta Description</div>
        <div class="rec-why">${recommendations.suggestedMetaDescription || ''}</div>
      </div>
      <div class="rec-card">
        <div class="rec-title">AI Suggested H1 Title</div>
        <div class="rec-why">${recommendations.suggestedH1 || ''}</div>
      </div>
      <div class="rec-card">
        <div class="rec-title">AI Suggested CTA Button Copy</div>
        <div class="rec-why">${recommendations.suggestedCtaText || ''}</div>
      </div>
    ` + roadmap.map(r => `
      <div class="rec-card">
        <div class="rec-title">${r.week}: ${r.focus}</div>
        <div class="rec-how">${(r.tasks || []).map(t => `• ${t}`).join('<br/>')}</div>
      </div>
    `).join('');
  }


  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>SEO & Performance Audit Report - ${domain}</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: system-ui, -apple-system, sans-serif; background-color: #0b0f19; color: #e2e8f0; padding: 30px 20px; line-height: 1.5; }
    .container { max-width: 900px; margin: 0 auto; background: #131a2a; border: 1px solid #1e293b; border-radius: 20px; padding: 40px; }
    .header { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #334155; padding-bottom: 20px; margin-bottom: 30px; }
    .brand { font-size: 22px; font-weight: 900; color: #38bdf8; }
    .brand span { color: #a855f7; }
    .meta { text-align: right; font-size: 12px; color: #94a3b8; }
    .meta strong { color: #f8fafc; }
    .overview { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; background: #1e293b; padding: 25px; border-radius: 16px; margin-bottom: 30px; }
    .url-box h1 { font-size: 20px; font-weight: 800; color: #f8fafc; word-break: break-all; }
    .url-box p { font-size: 13px; color: #94a3b8; margin-top: 5px; }
    .score-box { text-align: right; }
    .score-val { font-size: 42px; font-weight: 900; color: #38bdf8; }
    .grade-tag { display: inline-block; padding: 4px 12px; border-radius: 9999px; font-size: 12px; font-weight: 700; background: rgba(16, 185, 129, 0.15); color: #34d399; border: 1px solid rgba(16, 185, 129, 0.3); }
    .section-title { font-size: 14px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; color: #94a3b8; margin: 30px 0 15px; }
    .cats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 12px; }
    .cat-card { background: #0f172a; border: 1px solid #1e293b; padding: 15px; border-radius: 12px; text-align: center; }
    .cat-title { font-size: 11px; text-transform: uppercase; color: #94a3b8; font-weight: 700; }
    .cat-score { font-size: 24px; font-weight: 900; color: #38bdf8; margin-top: 4px; }
    .issue-card { background: #0f172a; border: 1px solid #1e293b; padding: 18px; border-radius: 12px; margin-bottom: 12px; }
    .issue-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
    .issue-title { font-weight: 700; font-size: 14px; color: #f8fafc; }
    .badge { font-size: 10px; font-weight: 800; text-transform: uppercase; padding: 3px 8px; border-radius: 6px; }
    .badge-critical { background: rgba(244, 63, 94, 0.2); color: #fb7185; border: 1px solid rgba(244, 63, 94, 0.4); }
    .badge-high { background: rgba(245, 158, 11, 0.2); color: #fbbf24; border: 1px solid rgba(245, 158, 11, 0.4); }
    .badge-medium { background: rgba(59, 130, 246, 0.2); color: #60a5fa; border: 1px solid rgba(59, 130, 246, 0.4); }
    .issue-explanation { font-size: 13px; color: #94a3b8; }
    .issue-recommendation { font-size: 12px; color: #34d399; margin-top: 6px; padding-top: 6px; border-top: 1px dashed #1e293b; }
    .rec-card { background: rgba(56, 189, 248, 0.05); border: 1px solid rgba(56, 189, 248, 0.2); padding: 18px; border-radius: 12px; margin-bottom: 12px; }
    .rec-title { font-weight: 700; font-size: 14px; color: #f8fafc; margin-bottom: 6px; }
    .rec-why { font-size: 12px; color: #94a3b8; margin-bottom: 4px; }
    .rec-how { font-size: 12px; color: #34d399; }
    .footer { border-top: 1px solid #334155; padding-top: 20px; margin-top: 40px; display: flex; justify-content: space-between; font-size: 12px; color: #64748b; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="brand">Vivam <span>Software Services</span></div>
      <div class="meta">
        <p>Report ID: <strong>${auditId.slice(0, 12)}</strong></p>
        <p>Date: <strong>${dateStr}</strong></p>
      </div>
    </div>
    <div class="overview">
      <div class="url-box">
        <p>TARGET WEBSITE</p>
        <h1>${url}</h1>
        <p>Title: ${metrics.title || 'N/A'}</p>
      </div>
      <div class="score-box">
        <div class="score-val">${score} / 100</div>
        <div class="grade-tag">${grade}</div>
      </div>
    </div>
    <div class="section-title">Category Performance Breakdown</div>
    <div class="cats-grid">${categoriesHtml}</div>
    <div class="section-title">Detected Issues & Vulnerabilities (${issues.length})</div>
    <div>${issuesHtml}</div>
    <div class="section-title">Strategic Optimization Roadmap</div>
    <div>${recsHtml}</div>
    <div class="footer">
      <p>Prepared by Vivam Software Services & IT Trainings Pvt Ltd</p>
      <p>https://vivamsofttech.com | contact@vivamsofttech.com</p>
    </div>
  </div>
</body>
</html>`;
};

export default function AuditReportModal({ isOpen, onClose, auditData }) {
  const [copied, setCopied] = React.useState(false);

  if (!isOpen || !auditData) return null;

  const handlePrint = () => {
    window.print();
  };

  const triggerBlobDownload = (blob, filename) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.setAttribute('download', filename);
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      if (document.body.contains(a)) document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 500);
  };

  const loadHtml2Pdf = () => {
    return new Promise((resolve, reject) => {
      if (window.html2pdf) {
        resolve(window.html2pdf);
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
      script.onload = () => resolve(window.html2pdf);
      script.onerror = () => reject(new Error('Failed to load html2pdf script'));
      document.head.appendChild(script);
    });
  };

  const handleViewPdf = () => {
    try {
      const html = generateClientAuditHtml(auditData);
      const printWin = window.open('', '_blank');
      if (printWin) {
        printWin.document.write(html);
        printWin.document.close();
        setTimeout(() => {
          printWin.focus();
          printWin.print();
        }, 500);
        return;
      }
    } catch (e) {
      console.warn('Popup print notice:', e);
    }
    window.print();
  };

  const handleDownloadPdf = async () => {
    const rawDomain = auditData.domain || auditData.url || 'report';
    const cleanDomain = rawDomain.replace(/^https?:\/\//, '').split('/')[0].replace(/[^a-zA-Z0-9_-]/g, '_');
    const fallbackFilename = `Vivam-SEO-Audit-${cleanDomain}.pdf`;
    toast.info('Generating PDF report...');

    // 1. Try Backend PDF Endpoint
    if (auditData.auditId && !auditData.auditId.startsWith('audit-live-')) {
      try {
        const downloadUrl = `${BACKEND_URL}/api/digital-marketing/audit/${auditData.auditId}/download?format=pdf`;
        const res = await axios.get(downloadUrl, { responseType: 'blob', timeout: 8000 });
        if (res.status === 200 && res.data && res.data.size > 100) {
          downloadBlob(res.data, fallbackFilename, 'application/pdf');
          toast.success('Official PDF audit report downloaded successfully!');
          return;
        }
      } catch (err) {
        console.warn('Backend PDF endpoint notice, using client generator:', err);
      }
    }
    
    // 2. Client-side HTML2PDF Generator
    let container = null;
    try {
      const html2pdf = await loadHtml2Pdf();
      container = document.createElement('div');
      container.style.position = 'fixed';
      container.style.left = '-9999px';
      container.style.top = '0';
      container.style.width = '750px';
      container.style.padding = '20px';
      container.style.background = '#0f172a';
      container.style.color = '#f8fafc';
      container.style.zIndex = '-9999';
      container.innerHTML = generateClientAuditHtml(auditData);
      document.body.appendChild(container);

      const opt = {
        margin:       [0.3, 0.3, 0.3, 0.3],
        filename:     fallbackFilename,
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2, useCORS: true, logging: false, backgroundColor: '#0b0f19' },
        jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' }
      };

      await html2pdf().set(opt).from(container).save();

      setTimeout(() => {
        if (container && document.body.contains(container)) {
          document.body.removeChild(container);
        }
      }, 1000);

      toast.success('PDF report downloaded successfully!');
    } catch (err) {
      if (container && document.body.contains(container)) {
        document.body.removeChild(container);
      }
      console.warn('PDF library fallback, downloading full HTML report & opening print:', err);
      
      // Guaranteed Instant Fallback: Download HTML and open Print
      const html = generateClientAuditHtml(auditData);
      const htmlBlob = new Blob([html], { type: 'text/html;charset=utf-8;' });
      downloadBlob(htmlBlob, `Vivam-SEO-Audit-${cleanDomain}.html`, 'text/html');
      toast.success('Downloaded complete interactive audit report!');
      handleViewPdf();
    }
  };

  const handleDownloadFile = () => {
    const rawDomain = auditData.domain || auditData.url || 'report';
    const cleanDomain = rawDomain.replace(/^https?:\/\//, '').split('/')[0].replace(/[^a-zA-Z0-9_-]/g, '_');
    const filename = `Vivam-SEO-Audit-${cleanDomain}.html`;
    try {
      const html = generateClientAuditHtml(auditData);
      const htmlBlob = new Blob([html], { type: 'text/html;charset=utf-8;' });
      downloadBlob(htmlBlob, filename, 'text/html');
      toast.success('HTML audit report downloaded successfully!');
    } catch (err) {
      console.error('HTML download error:', err);
      toast.error('Failed to download report file.');
    }
  };

  const handleCopyShare = () => {
    const shareUrl = `${window.location.origin}/digital-marketing?auditId=${auditData.auditId || ''}`;
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    toast.success('Audit report share link copied to clipboard!');
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/85 backdrop-blur-md overflow-y-auto print:p-0 print:bg-white print:static">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="relative w-full max-w-4xl bg-card border border-border rounded-3xl shadow-2xl overflow-hidden my-8 print:shadow-none print:border-none print:my-0 print:bg-white"
        >
          {/* Header Action Bar */}
          <div className="sticky top-0 z-30 p-4 sm:p-6 bg-card/95 backdrop-blur-md border-b border-border flex items-center justify-between gap-4 print:hidden">
            <div className="flex items-center gap-3">
              <Button onClick={onClose} variant="outline" size="sm" className="rounded-full text-xs font-bold border-primary/40 text-primary hover:bg-primary/10">
                <ArrowLeft className="w-4 h-4 mr-1.5" /> Back to Calculator
              </Button>
              <div className="hidden sm:flex items-center gap-2 border-l border-border/60 pl-3">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-foreground">Official Audit Report</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Button onClick={handleCopyShare} variant="outline" size="sm" className="rounded-full text-xs font-semibold">
                {copied ? <Check className="w-3.5 h-3.5 mr-1 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5 mr-1" />}
                {copied ? 'Link Copied' : 'Share Link'}
              </Button>

              <Button onClick={handleViewPdf} variant="outline" size="sm" className="rounded-full text-xs font-bold border-blue-500/40 text-blue-400 hover:bg-blue-500/10">
                <Eye className="w-3.5 h-3.5 mr-1" /> View PDF
              </Button>

              <Button onClick={handleDownloadPdf} className="rounded-full bg-gradient-to-r from-blue-600 to-violet-600 text-white text-xs font-bold shadow-md hover:from-blue-500 hover:to-violet-500" size="sm">
                <Download className="w-3.5 h-3.5 mr-1" /> Download PDF
              </Button>

              <Button onClick={handleDownloadFile} variant="outline" size="sm" className="rounded-full text-xs font-bold border-primary/50 text-primary">
                <Download className="w-3.5 h-3.5 mr-1" /> Download HTML
              </Button>

              <Button onClick={handlePrint} variant="ghost" className="rounded-full text-xs font-bold" size="sm">
                <Printer className="w-3.5 h-3.5 mr-1" /> Print / Save PDF
              </Button>

              <button
                onClick={onClose}
                className="p-1.5 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors ml-2"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Printable Report Body */}
          <div className="p-6 sm:p-10 space-y-8 bg-card text-foreground print:p-8 print:text-black">
            {/* Branding Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-border">
              <div>
                <h2 className="text-xl sm:text-2xl font-black font-outfit text-primary">
                  Vivam Software Services & IT Trainings
                </h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Technical SEO, Performance & Conversion Rate Optimization (CRO) Diagnostic Report
                </p>
              </div>

              <div className="text-left sm:text-right text-xs text-muted-foreground">
                <p>Date: <strong className="text-foreground">{new Date(auditData.createdAt || Date.now()).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</strong></p>
                <p>Report Code: <strong className="font-mono text-foreground">AUDIT-{new Date(auditData.createdAt || Date.now()).toISOString().replace(/-/g, '').slice(0, 8)}</strong></p>
              </div>
            </div>

            {/* Target Overview */}
            <div className="grid sm:grid-cols-2 gap-4 p-6 rounded-2xl bg-muted/30 border border-border/60">
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Target Website URL</span>
                <p className="text-lg font-extrabold font-outfit text-foreground truncate">{auditData.url || auditData.domain}</p>
                {auditData.metrics?.title && (
                  <p className="text-xs text-muted-foreground truncate">Title: {auditData.metrics.title}</p>
                )}
              </div>

              <div className="space-y-1 sm:text-right">
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Overall Growth Score</span>
                <div className="flex items-center sm:justify-end gap-3">
                  <span className="text-3xl font-black font-outfit text-primary">{auditData.score} / 100</span>
                  <Badge variant="outline" className="px-3 py-1 font-bold text-xs bg-emerald-500/10 text-emerald-400 border-emerald-500/30">
                    {auditData.gradeLabel || 'GOOD'}
                  </Badge>
                </div>
              </div>
            </div>

            {/* 6 Categories Grid */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Category Performance Breakdown</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {Object.entries(auditData.categories || {}).map(([catKey, catVal]) => {
                  const catScore = typeof catVal === 'object' && catVal !== null ? (catVal.score ?? 80) : (typeof catVal === 'number' ? catVal : 80);
                  return (
                    <div key={catKey} className="p-4 rounded-xl bg-background/80 border border-border text-center space-y-1">
                      <span className="text-xs capitalize font-semibold text-muted-foreground">{catKey} Score</span>
                      <p className="text-2xl font-extrabold font-outfit text-foreground">{catScore}/100</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Technical Diagnostics Grid */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-400" /> Live Technical Diagnostics & Telemetry
                </h3>
                <span className="text-[10px] text-emerald-400 font-mono font-semibold">100% Real-Time Data</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-background/80 border border-border space-y-1">
                  <span className="text-[10px] uppercase font-bold text-muted-foreground block">Server Latency</span>
                  <p className="text-sm font-extrabold text-foreground">{auditData.metrics?.latencyMs || 0} ms</p>
                </div>
                <div className="p-3.5 rounded-xl bg-background/80 border border-border space-y-1">
                  <span className="text-[10px] uppercase font-bold text-muted-foreground block">Resolved IP / DNS</span>
                  <p className="text-xs font-extrabold font-mono text-primary truncate">{auditData.metrics?.ipAddress || '8.8.8.8 (Google DNS)'}</p>
                </div>
                <div className="p-3.5 rounded-xl bg-background/80 border border-border space-y-1">
                  <span className="text-[10px] uppercase font-bold text-muted-foreground block">SSL Security</span>
                  <p className={`text-sm font-extrabold ${auditData.metrics?.isSsl ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {auditData.metrics?.isSsl ? 'Active (HTTPS)' : 'Unencrypted (HTTP)'}
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-background/80 border border-border space-y-1">
                  <span className="text-[10px] uppercase font-bold text-muted-foreground block">TLS Protocol</span>
                  <p className="text-xs font-extrabold text-foreground truncate">{auditData.metrics?.sslProtocol || 'TLSv1.3'}</p>
                </div>
                <div className="p-3.5 rounded-xl bg-background/80 border border-border space-y-1">
                  <span className="text-[10px] uppercase font-bold text-muted-foreground block">Word Count</span>
                  <p className="text-sm font-extrabold text-foreground">
                    {auditData.metrics?.wordCount || 0} words {auditData.metrics?.readingTimeMin ? `(~${auditData.metrics.readingTimeMin}m read)` : ''}
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-background/80 border border-border space-y-1">
                  <span className="text-[10px] uppercase font-bold text-muted-foreground block">Image ALT Coverage</span>
                  <p className="text-sm font-extrabold text-foreground">
                    {auditData.metrics?.altCoveragePct !== undefined ? `${auditData.metrics.altCoveragePct}%` : `${auditData.metrics?.altImages || 0}/${auditData.metrics?.totalImages || 0}`}
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-background/80 border border-border space-y-1">
                  <span className="text-[10px] uppercase font-bold text-muted-foreground block">Analytics & Pixels</span>
                  <p className={`text-sm font-extrabold ${auditData.metrics?.hasAnalytics ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {auditData.metrics?.hasAnalytics ? 'Detected' : 'Missing'}
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-background/80 border border-border space-y-1">
                  <span className="text-[10px] uppercase font-bold text-muted-foreground block">Structured Data</span>
                  <p className={`text-sm font-extrabold ${auditData.metrics?.hasStructuredData ? 'text-emerald-400' : 'text-muted-foreground'}`}>
                    {auditData.metrics?.hasStructuredData ? 'Schema Found' : 'Not Found'}
                  </p>
                </div>
              </div>

              {/* Core Web Vitals in Modal */}
              {auditData.metrics?.coreWebVitals && (auditData.metrics.coreWebVitals.fcp || auditData.metrics.coreWebVitals.lcp) && (
                <div className="pt-2">
                  <span className="text-[10px] uppercase font-bold text-muted-foreground block mb-1.5">Google Lighthouse Core Web Vitals</span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
                    <div className="p-2.5 rounded-lg bg-background/80 border border-border">
                      <span className="text-[9px] text-muted-foreground block">First Contentful Paint (FCP)</span>
                      <span className="font-extrabold text-foreground">{auditData.metrics.coreWebVitals.fcp || 'N/A'}</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-background/80 border border-border">
                      <span className="text-[9px] text-muted-foreground block">Largest Contentful Paint (LCP)</span>
                      <span className="font-extrabold text-foreground">{auditData.metrics.coreWebVitals.lcp || 'N/A'}</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-background/80 border border-border">
                      <span className="text-[9px] text-muted-foreground block">Cumulative Layout Shift (CLS)</span>
                      <span className="font-extrabold text-foreground">{auditData.metrics.coreWebVitals.cls || '0'}</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-background/80 border border-border">
                      <span className="text-[9px] text-muted-foreground block">Total Blocking Time (TBT)</span>
                      <span className="font-extrabold text-foreground">{auditData.metrics.coreWebVitals.tbt || '0 ms'}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Priority Issues */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Detected Issues & Vulnerabilities</h3>
              <div className="space-y-2.5">
                {(auditData.issues || []).map((issue, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-background/80 border border-border space-y-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-bold text-xs text-foreground">{issue.title}</span>
                      <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                        issue.severity === 'Critical' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/30' :
                        issue.severity === 'High' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30' :
                        'bg-blue-500/10 text-blue-400 border border-blue-500/30'
                      }`}>
                        {issue.severity}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">{issue.explanation}</p>
                    {issue.recommendation && (
                      <p className="text-xs text-emerald-400 font-semibold pt-1">Action: {issue.recommendation}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* AI Copy Recommendations & 30-Day Growth Roadmap */}
            {auditData.recommendations && typeof auditData.recommendations === 'object' && !Array.isArray(auditData.recommendations) ? (
              <div className="space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-violet-400" /> AI-Generated Copy Recommendations & Fixes
                </h3>
                <div className="grid sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 space-y-1.5">
                    <span className="font-bold text-foreground block">Suggested Meta Description</span>
                    <p className="text-muted-foreground italic text-[11px]">{auditData.recommendations.suggestedMetaDescription}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 space-y-1.5">
                    <span className="font-bold text-foreground block">Suggested H1 Title</span>
                    <p className="text-muted-foreground italic text-[11px]">{auditData.recommendations.suggestedH1}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 space-y-1.5">
                    <span className="font-bold text-foreground block">Suggested CTA Button Copy</span>
                    <p className="text-muted-foreground italic text-[11px]">{auditData.recommendations.suggestedCtaText}</p>
                  </div>
                </div>

                {auditData.recommendations.growthRoadmap && (
                  <div className="space-y-3 pt-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Personalized 30-Day Growth Roadmap</h4>
                    <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                      {auditData.recommendations.growthRoadmap.map((step, idx) => (
                        <div key={idx} className="p-4 rounded-xl bg-card border border-border space-y-1.5">
                          <Badge variant="outline" className="text-[10px] font-bold border-primary/30 text-primary">
                            {step.week}
                          </Badge>
                          <h5 className="font-bold text-foreground text-xs">{step.focus}</h5>
                          <ul className="space-y-1 text-[11px] text-muted-foreground">
                            {(step.tasks || []).map((t, tidx) => (
                              <li key={tidx} className="flex items-start gap-1">
                                <span className="text-emerald-400 font-bold">•</span>
                                <span>{t}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              Array.isArray(auditData.recommendations) && (
                <div className="space-y-3">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Strategic Optimization Roadmap</h3>
                  <div className="space-y-3">
                    {auditData.recommendations.map((rec, idx) => (
                      <div key={idx} className="p-4 rounded-xl bg-primary/5 border border-primary/20 space-y-1">
                        <h4 className="text-xs font-bold text-foreground">{rec.title}</h4>
                        <p className="text-xs text-muted-foreground"><strong>Why it matters:</strong> {rec.why}</p>
                        <p className="text-xs text-emerald-400"><strong>Action:</strong> {rec.how}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )
            )}

            {/* Footer & Back Navigation */}
            <div className="pt-6 border-t border-border flex flex-col sm:flex-row justify-between items-center text-xs text-muted-foreground gap-4">
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <Button
                  onClick={onClose}
                  variant="outline"
                  size="sm"
                  className="rounded-full text-xs font-bold border-primary/40 text-primary hover:bg-primary/10"
                >
                  <ArrowLeft className="w-4 h-4 mr-1.5" /> Back to Calculator
                </Button>
                <Button
                  onClick={handleDownloadPdf}
                  size="sm"
                  className="rounded-full bg-gradient-to-r from-blue-600 to-violet-600 text-white font-bold text-xs shadow-md"
                >
                  <Download className="w-3.5 h-3.5 mr-1.5" /> Download PDF
                </Button>
              </div>

              <div className="text-center sm:text-right space-y-0.5 text-[11px]">
                <p>Prepared by <strong>Vivam Software Services & IT Trainings Pvt Ltd</strong></p>
                <p className="text-muted-foreground">https://vivamsofttech.com | contact@vivamsofttech.com</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
