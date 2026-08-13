import {
  Search,
  ChartNoAxesCombined,
  Share2,
  PenTool,
  Palette,
  Globe2,
  Bot,
  UsersRound,
  TrendingUp,
  BrainCircuit,
  Megaphone,
  Code2,
  Workflow,
  Sparkles,
  Zap,
  Target,
  BarChart3,
  Layers,
  MessageSquare,
  Building2,
  ShieldCheck,
  MousePointerClick,
  Mail,
  MessageCircle,
  ShoppingCart,
  MapPin,
  Stethoscope,
  GraduationCap,
  Store,
  Building,
  Utensils,
  Briefcase,
  Rocket
} from 'lucide-react';

export const capabilityStripItems = [
  { name: 'SEO', icon: Search, desc: 'Organic Search Authority' },
  { name: 'Performance Marketing', icon: ChartNoAxesCombined, desc: 'ROI Paid Acquisition' },
  { name: 'Social Media', icon: Share2, desc: 'Brand & Engagement' },
  { name: 'Content', icon: PenTool, desc: 'Authority & Storytelling' },
  { name: 'Web & Landing Pages', icon: Globe2, desc: 'High-Converting UI/UX' },
  { name: 'AI Automation', icon: Bot, desc: 'Workflows & Intelligence' },
  { name: 'Analytics', icon: BarChart3, desc: 'Data & Attribution' },
  { name: 'Lead Generation', icon: UsersRound, desc: 'Qualified Funnels' }
];

export const marketingTechPillars = [
  {
    icon: Megaphone,
    title: 'MARKETING',
    tag: 'Acquisition & Reach',
    color: 'from-blue-500/20 to-cyan-500/20 text-blue-400 border-blue-500/30',
    items: [
      'Search Engine Optimization (SEO)',
      'Multi-Channel Paid Advertising (PPC)',
      'Social Media Branding & Engagement',
      'Content Marketing & Thought Leadership'
    ]
  },
  {
    icon: Code2,
    title: 'TECHNOLOGY',
    tag: 'Web & Infrastructure',
    color: 'from-violet-500/20 to-indigo-500/20 text-violet-400 border-violet-500/30',
    items: [
      'High-Performance Web Applications',
      'Conversion-Optimized Landing Pages',
      'E-Commerce & Digital Storefronts',
      'Seamless CRM & API Integrations'
    ]
  },
  {
    icon: BrainCircuit,
    title: 'INTELLIGENCE',
    tag: 'Automation & Data',
    color: 'from-emerald-500/20 to-teal-500/20 text-emerald-400 border-emerald-500/30',
    items: [
      'AI Lead Qualification & Chat Assistants',
      'Automated Drip Workflows & Follow-ups',
      'GA4 Multi-Touch Attribution Dashboards',
      'Predictive Customer Lifetime Value (CLV)'
    ]
  }
];

export const marketingServicesList = [
  {
    number: '01',
    icon: Search,
    title: 'SEO & ORGANIC GROWTH',
    description: 'Improve search visibility, attract qualified organic traffic and build long-term online discoverability.',
    features: [
      'Technical SEO',
      'Keyword Research',
      'On-Page SEO',
      'Local SEO',
      'Content Optimization',
      'Search Console',
      'SEO Audits'
    ],
    color: 'from-blue-500/20 to-cyan-500/20 text-blue-400',
    badge: 'High ROI Organic'
  },
  {
    number: '02',
    icon: ChartNoAxesCombined,
    title: 'PERFORMANCE MARKETING',
    description: 'Data-driven advertising campaigns designed around measurable acquisition and conversion goals.',
    features: [
      'Google Ads',
      'Meta Ads',
      'LinkedIn Ads',
      'YouTube Ads',
      'Retargeting',
      'Conversion Tracking',
      'Campaign Optimization'
    ],
    color: 'from-purple-500/20 to-pink-500/20 text-purple-400',
    badge: 'Instant Traffic'
  },
  {
    number: '03',
    icon: Share2,
    title: 'SOCIAL MEDIA MARKETING',
    description: 'Build brand presence and engage target audiences across top social channels.',
    features: [
      'Instagram',
      'Facebook',
      'LinkedIn',
      'YouTube',
      'Content Strategy',
      'Campaign Management',
      'Community Engagement'
    ],
    color: 'from-emerald-500/20 to-teal-500/20 text-emerald-400',
    badge: 'Community & Reach'
  },
  {
    number: '04',
    icon: PenTool,
    title: 'CONTENT MARKETING',
    description: 'Compelling technical articles, blogs, case studies, and copy that establish industry leadership.',
    features: [
      'SEO Content',
      'Blog Writing',
      'Website Content',
      'Social Content',
      'Case Studies',
      'Thought Leadership',
      'Brand Storytelling'
    ],
    color: 'from-amber-500/20 to-orange-500/20 text-amber-400',
    badge: 'Thought Leadership'
  },
  {
    number: '05',
    icon: Palette,
    title: 'BRAND & CREATIVE DESIGN',
    description: 'High-impact visual assets, ad creatives, and brand identity designed for conversion.',
    features: [
      'Brand Identity',
      'Marketing Creatives',
      'Ad Creatives',
      'Social Designs',
      'Campaign Visuals',
      'Presentation Design',
      'Landing Page Design'
    ],
    color: 'from-rose-500/20 to-red-500/20 text-rose-400',
    badge: 'Visual Distinction'
  },
  {
    number: '06',
    icon: Globe2,
    title: 'WEBSITE & LANDING PAGES',
    description: 'Fast, mobile-responsive, conversion-optimized websites engineered for lead generation.',
    features: [
      'Business Websites',
      'Landing Pages',
      'Lead Generation Pages',
      'E-commerce',
      'Conversion Optimization',
      'Performance Optimization',
      'SEO-Ready Development'
    ],
    color: 'from-cyan-500/20 to-blue-500/20 text-cyan-400',
    badge: 'Conversion Engine'
  },
  {
    number: '07',
    icon: Bot,
    title: 'AI MARKETING & AUTOMATION',
    description: 'Use AI and automation to accelerate marketing workflows, qualify leads and create more intelligent customer experiences.',
    features: [
      'AI Chatbots',
      'AI Content Workflows',
      'Lead Qualification',
      'WhatsApp Automation',
      'CRM Automation',
      'Customer Follow-ups',
      'Marketing Personalization'
    ],
    color: 'from-violet-500/30 via-purple-500/30 to-indigo-500/30 text-violet-300',
    badge: 'Featured Capability',
    isProminent: true
  },
  {
    number: '08',
    icon: BarChart3,
    title: 'ANALYTICS & GROWTH INTELLIGENCE',
    description: 'Full transparency into campaign performance, user behavior, and revenue attribution.',
    features: [
      'Google Analytics',
      'Search Console',
      'Conversion Tracking',
      'Campaign Reporting',
      'Funnel Analytics',
      'KPI Dashboards',
      'ROI Reporting'
    ],
    color: 'from-indigo-500/20 to-blue-500/20 text-indigo-400',
    badge: 'Full Attribution'
  }
];

export const marketingToolsCategories = [
  {
    category: 'SEARCH & SEO',
    icon: Search,
    color: 'from-blue-500/20 to-cyan-500/20 text-blue-400',
    tools: [
      { name: 'Google Analytics', desc: 'Web Traffic & Conversion Analytics' },
      { name: 'Google Search Console', desc: 'Indexing & Crawl Performance' },
      { name: 'Google Business Profile', desc: 'Local Search Visibility' },
      { name: 'Semrush', desc: 'Competitor & Keyword Intelligence' },
      { name: 'Ahrefs', desc: 'Backlink & Domain Authority' }
    ]
  },
  {
    category: 'ADVERTISING',
    icon: MousePointerClick,
    color: 'from-purple-500/20 to-pink-500/20 text-purple-400',
    tools: [
      { name: 'Google Ads', desc: 'Search, Shopping & Display Campaigns' },
      { name: 'Meta Ads', desc: 'Facebook & Instagram Retargeting' },
      { name: 'LinkedIn Ads', desc: 'B2B Enterprise Decision Makers' },
      { name: 'YouTube Ads', desc: 'High-Impact Video Advertising' }
    ]
  },
  {
    category: 'SOCIAL',
    icon: Share2,
    color: 'from-emerald-500/20 to-teal-500/20 text-emerald-400',
    tools: [
      { name: 'Instagram', desc: 'Visual Branding & Reels' },
      { name: 'Facebook', desc: 'Community & Group Engagement' },
      { name: 'LinkedIn', desc: 'Corporate B2B Authority' },
      { name: 'YouTube', desc: 'Long-Form Video & Channel Growth' }
    ]
  },
  {
    category: 'CRM & AUTOMATION',
    icon: Workflow,
    color: 'from-amber-500/20 to-orange-500/20 text-amber-400',
    tools: [
      { name: 'HubSpot', desc: 'Inbound Lead CRM & Automation' },
      { name: 'Zoho CRM', desc: 'Enterprise Sales & Lead Pipeline' },
      { name: 'WhatsApp Business', desc: 'Instant Conversational Leads' },
      { name: 'n8n', desc: 'Open Source Workflow Automation' },
      { name: 'Make', desc: 'Multi-App Visual Workflows' }
    ]
  },
  {
    category: 'DESIGN',
    icon: Palette,
    color: 'from-rose-500/20 to-red-500/20 text-rose-400',
    tools: [
      { name: 'Figma', desc: 'UI/UX & Landing Page Wireframing' },
      { name: 'Canva', desc: 'Social Media Banner Creatives' },
      { name: 'Adobe Creative Cloud', desc: 'Professional Media Production' }
    ]
  },
  {
    category: 'AI INTELLIGENCE',
    icon: Bot,
    color: 'from-violet-500/20 to-indigo-500/20 text-violet-400',
    tools: [
      { name: 'OpenAI', desc: 'Custom GPT Assistants & Automation' },
      { name: 'Gemini', desc: 'Multimodal Research & Analysis' },
      { name: 'Claude', desc: 'Advanced Long-Context Copywriting' },
      { name: 'Hugging Face', desc: 'Open Source NLP & Models' }
    ]
  }
];

export const growthFunnelSteps = [
  {
    step: '01',
    title: 'DISCOVER',
    subtitle: 'Build Top-Funnel Visibility',
    description: 'Attract relevant audience via organic search, social media presence, and high-intent targeted search ads.',
    channels: ['SEO', 'Social', 'Paid Search'],
    icon: Search
  },
  {
    step: '02',
    title: 'ATTRACT',
    subtitle: 'Engage Interest',
    description: 'Capture attention with value-driven content, responsive landing pages, and persuasive ad creatives.',
    channels: ['Content', 'Landing Pages', 'Creative'],
    icon: Target
  },
  {
    step: '03',
    title: 'ENGAGE',
    subtitle: 'Nurture Connections',
    description: 'Interact with potential leads through social engagement, instant WhatsApp messaging, email drips, and AI bots.',
    channels: ['Social', 'WhatsApp', 'Email', 'AI'],
    icon: MessageSquare
  },
  {
    step: '04',
    title: 'CONVERT',
    subtitle: 'Capture Qualified Prospects',
    description: 'Turn visitors into inbound leads through frictionless forms, CRM routing, and automated sales notifications.',
    channels: ['Forms', 'CRM', 'Automation'],
    icon: Zap
  },
  {
    step: '05',
    title: 'RETAIN',
    subtitle: 'Build Long-Term Value',
    description: 'Nurture existing clients with retargeting campaigns, CRM follow-ups, and ongoing educational content.',
    channels: ['Remarketing', 'CRM', 'Customer Engagement'],
    icon: UsersRound
  },
  {
    step: '06',
    title: 'SCALE',
    subtitle: 'Multiply What Works',
    description: 'Analyze performance data, optimize acquisition costs, and scale high-performing acquisition channels.',
    channels: ['Analytics', 'Optimization', 'Automation'],
    icon: TrendingUp
  }
];

export const aiMarketingCards = [
  {
    title: 'AI Lead Qualification',
    desc: 'Automatically classify, score, and prioritize incoming lead inquiries based on intent signals.',
    icon: Zap
  },
  {
    title: 'AI Chat Assistants',
    desc: 'Answer complex customer questions 24/7 and instantly capture prospective business inquiries.',
    icon: Bot
  },
  {
    title: 'Marketing Automation',
    desc: 'Connect web forms directly to CRM pipelines, automated email sequences, and team alerts.',
    icon: Workflow
  },
  {
    title: 'Intelligent Content Workflows',
    desc: 'Accelerate SEO content production, social posts, and ad copywriting using structured AI pipelines.',
    icon: PenTool
  },
  {
    title: 'Lead Intelligence',
    desc: 'Turn user browsing signals and chat interactions into actionable sales insights.',
    icon: BrainCircuit
  },
  {
    title: 'Personalization',
    desc: 'Deliver tailored content recommendations and dynamic landing page experiences per audience segment.',
    icon: Sparkles
  }
];

export const industriesList = [
  { name: 'Healthcare', icon: Stethoscope, desc: 'Patient acquisition & Local SEO' },
  { name: 'Education', icon: GraduationCap, desc: 'Student enrollment funnels' },
  { name: 'E-commerce', icon: Store, desc: 'ROAS & Shopping ad optimization' },
  { name: 'Real Estate', icon: Building, desc: 'High-intent property lead generation' },
  { name: 'Food & Restaurants', icon: Utensils, desc: 'Local search & social engagement' },
  { name: 'Professional Services', icon: Briefcase, desc: 'B2B inbound lead pipelines' },
  { name: 'Startups', icon: Rocket, desc: 'Rapid growth & acquisition strategy' },
  { name: 'Local Businesses', icon: MapPin, desc: 'Google Map Pack & hyper-local search' }
];

export const growthProcessSteps = [
  {
    step: '01',
    title: 'DISCOVER',
    desc: 'Understand business model, target persona, revenue targets, and growth challenges.'
  },
  {
    step: '02',
    title: 'AUDIT',
    desc: 'Analyze current website health, SEO crawlability, competitor positioning, and ad spend efficiency.'
  },
  {
    step: '03',
    title: 'STRATEGIZE',
    desc: 'Create bespoke multi-channel acquisition roadmap with concrete KPIs and milestones.'
  },
  {
    step: '04',
    title: 'BUILD',
    desc: 'Develop high-converting landing pages, ad creatives, tracking pixels, and automation workflows.'
  },
  {
    step: '05',
    title: 'LAUNCH',
    desc: 'Deploy campaigns across Google, Meta, LinkedIn, and organic search channels.'
  },
  {
    step: '06',
    title: 'OPTIMIZE',
    desc: 'Refine targeting, A/B test ad copy, lower Cost Per Lead (CPL), and improve conversion rates.'
  },
  {
    step: '07',
    title: 'SCALE',
    desc: 'Reinvest into top-performing channels to drive sustainable long-term revenue expansion.'
  }
];

export const packagesList = [
  {
    name: 'STARTER GROWTH',
    target: 'For Small Businesses & Local Brands',
    features: [
      'SEO Foundation & Local Search Audit',
      'Google Business Profile Setup & Optimization',
      'Social Media Management (2 Channels)',
      'Monthly Content Creation & Posting',
      'Basic GA4 Analytics Dashboard',
      'Monthly Performance Strategy Review'
    ],
    ctaText: 'Talk to an Expert'
  },
  {
    name: 'BUSINESS GROWTH',
    target: 'For Growing Companies & B2B Services',
    popular: true,
    features: [
      'Comprehensive Technical & On-Page SEO',
      'Google Ads & Meta Paid Campaign Setup',
      'Conversion-Optimized Landing Page Design',
      'Social Media Strategy (3 Channels)',
      'CRM Contact Form & Lead Routing',
      'Bi-Weekly ROI Reporting & Strategy Sessions'
    ],
    ctaText: 'Talk to an Expert'
  },
  {
    name: 'PERFORMANCE GROWTH',
    target: 'For Scale-ups Focused on Rapid Acquisition',
    features: [
      'Full-Funnel Multi-Channel Paid Ads (Google, Meta, LinkedIn)',
      'Advanced Conversion Rate Optimization (CRO)',
      'Custom Content & Blog Marketing Workflow',
      'Automated Lead Nurturing & Email Drips',
      'Multi-Touch Attribution Dashboard',
      'Dedicated Marketing Strategist & Weekly Calls'
    ],
    ctaText: 'Request Strategy'
  },
  {
    name: 'ENTERPRISE DIGITAL GROWTH',
    target: 'For Enterprises Requiring Technology + Growth Integration',
    features: [
      'Custom Software & Web Application Development',
      'AI Lead Qualification Chatbots & Automation',
      'Omnichannel Paid Media Strategy & Execution',
      'Enterprise SEO & Global Search Expansion',
      'Deep CRM, ERP & Data Warehouse Integration',
      'Custom SLA & Executive Strategy Consulting'
    ],
    ctaText: 'Build Your Growth Strategy'
  }
];

export const faqItems = [
  {
    q: 'What digital marketing services does Vivam provide?',
    a: 'Vivam provides end-to-end digital growth services including Search Engine Optimization (SEO), Performance Marketing (Google, Meta, and LinkedIn Ads), Social Media Management, Content Marketing, Web & Landing Page Development, AI Lead Automation, and Marketing Analytics.'
  },
  {
    q: 'Do you provide SEO and Google Ads management?',
    a: 'Yes. We engineer technical, on-page, and local SEO campaigns for long-term organic authority, alongside high-converting Google Search, Shopping, and Display ad campaigns focused on lowering your Cost Per Acquisition (CPA).'
  },
  {
    q: 'Can Vivam build our website and manage digital marketing?',
    a: 'Absolutely. Because Vivam is a full-service technology company, we build high-performance websites and web applications and seamlessly connect them with performance marketing, analytics, and CRM automation under one team.'
  },
  {
    q: 'Do you provide social media marketing?',
    a: 'Yes. We manage corporate and brand presence across LinkedIn, Instagram, Facebook, and YouTube, focusing on creative ad visual design, content calendars, community engagement, and B2B leadership.'
  },
  {
    q: 'Can you integrate marketing with our CRM?',
    a: 'Yes. We integrate web lead forms and ad campaigns directly into HubSpot, Zoho CRM, Salesforce, custom backends, or WhatsApp automation so your sales team gets instant notifications.'
  },
  {
    q: 'Do you provide AI marketing automation?',
    a: 'Yes. We implement custom AI chat assistants, automated lead scoring, AI content pipelines, and automated follow-up workflows to reduce manual work and increase response speed.'
  },
  {
    q: 'How do you measure marketing performance?',
    a: 'We set up transparent GA4 tracking, Search Console monitoring, custom event dashboards, and attribution models so you can see cost per lead, traffic growth, conversion rates, and estimated ROI.'
  },
  {
    q: 'Do you work with startups and small businesses?',
    a: 'Yes. We offer tailored strategy packages for startups, local businesses, growing companies, and enterprise organizations.'
  },
  {
    q: 'Do you provide monthly reporting?',
    a: 'Yes. Every client receives structured reporting dashboards alongside regular strategy review calls to discuss performance and campaign optimizations.'
  },
  {
    q: 'Can you create custom digital marketing strategies?',
    a: 'Yes. We evaluate your specific industry, competitive landscape, target audience, and business goals to build a bespoke strategy tailored to your acquisition targets.'
  }
];
