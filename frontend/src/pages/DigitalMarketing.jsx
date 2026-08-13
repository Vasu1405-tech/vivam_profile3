import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Modular Components
import DigitalMarketingHero from '@/components/digital-marketing/DigitalMarketingHero';
import CapabilityStrip from '@/components/digital-marketing/CapabilityStrip';
import InteractiveAuditCalculator from '@/components/digital-marketing/InteractiveAuditCalculator';
import MarketingTechnologySection from '@/components/digital-marketing/MarketingTechnologySection';
import MarketingServices from '@/components/digital-marketing/MarketingServices';
import AgencyComparisonMatrix from '@/components/digital-marketing/AgencyComparisonMatrix';
import MarketingTools from '@/components/digital-marketing/MarketingTools';
import GrowthFunnel from '@/components/digital-marketing/GrowthFunnel';
import AIMarketingSection from '@/components/digital-marketing/AIMarketingSection';
import MarketingAnalytics from '@/components/digital-marketing/MarketingAnalytics';
import IndustryGrid from '@/components/digital-marketing/IndustryGrid';
import DigitalGrowthProcess from '@/components/digital-marketing/DigitalGrowthProcess';
import MarketingCaseStudies from '@/components/digital-marketing/MarketingCaseStudies';
import MarketingPackages from '@/components/digital-marketing/MarketingPackages';
import MarketingFAQ from '@/components/digital-marketing/MarketingFAQ';
import LeadMagnetBanner from '@/components/digital-marketing/LeadMagnetBanner';
import MarketingLeadForm from '@/components/digital-marketing/MarketingLeadForm';
import MarketingCTA from '@/components/digital-marketing/MarketingCTA';

export default function DigitalMarketing() {

  // Update SEO Head Tags dynamically
  useEffect(() => {
    document.title = 'Digital Marketing Agency & Real-Time SEO Audit Services | Vivam Software Services';

    // Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }
    metaDesc.content =
      'Vivam Software Services is a top Digital Marketing Agency providing real-time SEO audits, Google & Meta Ads management, conversion optimization, social media marketing, and full-funnel digital growth.';

    // Meta Keywords
    let metaKw = document.querySelector('meta[name="keywords"]');
    if (!metaKw) {
      metaKw = document.createElement('meta');
      metaKw.name = 'keywords';
      document.head.appendChild(metaKw);
    }
    metaKw.content = 'Digital Marketing Agency, SEO Audit Services, Real-Time Website Audit, Google Ads Management, PPC Growth, Conversion Rate Optimization, Social Media Marketing';


    // Canonical Tag
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = 'https://vivamsofttech.com/digital-marketing-services';

    // Open Graph Tags
    const ogTags = [
      { property: 'og:title', content: 'Digital Marketing Services | Vivam' },
      {
        property: 'og:description',
        content: 'Data-driven digital marketing, performance campaigns and intelligent automation solutions.'
      },
      { property: 'og:url', content: 'https://vivamsofttech.com/digital-marketing-services' },
      { property: 'og:type', content: 'website' }
    ];

    ogTags.forEach((tag) => {
      let ogMeta = document.querySelector(`meta[property="${tag.property}"]`);
      if (!ogMeta) {
        ogMeta = document.createElement('meta');
        ogMeta.setAttribute('property', tag.property);
        document.head.appendChild(ogMeta);
      }
      ogMeta.content = tag.content;
    });

    // JSON-LD Schema Markup
    const schemaData = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Service',
          name: 'Digital Marketing Services',
          provider: {
            '@type': 'Organization',
            name: 'Vivam Software Services and IT Trainings Pvt Ltd',
            url: 'https://vivamsofttech.com'
          },
          serviceType: 'Digital Growth & Performance Marketing',
          description:
            'Data-driven digital marketing, performance campaigns, SEO, and intelligent automation designed to turn digital activity into measurable business growth.',
          areaServed: 'Global'
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Home',
              item: 'https://vivamsofttech.com/'
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'Digital Marketing Services',
              item: 'https://vivamsofttech.com/digital-marketing-services'
            }
          ]
        }
      ]
    };

    let scriptTag = document.querySelector('#jsonld-digital-marketing');
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'jsonld-digital-marketing';
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }
    scriptTag.text = JSON.stringify(schemaData);
  }, []);

  const scrollToConsultation = () => {
    document.getElementById('consultation-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToServices = () => {
    document.getElementById('services-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-white">
      {/* 1. Header (Navbar) */}
      <Navbar />

      <main>
        {/* 2. Hero Section */}
        <DigitalMarketingHero
          onConsultationClick={scrollToConsultation}
          onExploreServicesClick={scrollToServices}
        />

        {/* 3. Capability Strip */}
        <CapabilityStrip />

        {/* 4. Interactive Client Attraction Tool: Instant Website Audit & ROI Calculator */}
        <InteractiveAuditCalculator onClaimAudit={scrollToConsultation} />

        {/* 5. Marketing + Technology Positioning Section */}
        <MarketingTechnologySection />

        {/* 6. Services Section */}
        <MarketingServices onSelectService={scrollToConsultation} />

        {/* 7. Client Attraction Feature: Agency vs Vivam Ecosystem Comparison */}
        <AgencyComparisonMatrix />

        {/* 8. Tools & Platforms */}
        <MarketingTools />

        {/* 9. Growth Funnel */}
        <GrowthFunnel />

        {/* 10. AI Marketing Section */}
        <AIMarketingSection onExploreAI={scrollToConsultation} />

        {/* 11. Analytics & Attribution Section */}
        <MarketingAnalytics />

        {/* 12. Industries Section */}
        <IndustryGrid />

        {/* 13. Growth Process Section */}
        <DigitalGrowthProcess />

        {/* 14. Case Studies / Portfolio Section */}
        <MarketingCaseStudies onConsultationClick={scrollToConsultation} />

        {/* 15. Strategy Packages */}
        <MarketingPackages onSelectPackage={scrollToConsultation} />

        {/* 16. FAQ Section */}
        <MarketingFAQ />

        {/* 17. Client Attraction Lead Magnet: Free Executive Playbook */}
        <LeadMagnetBanner />

        {/* 18. Consultation Lead Form */}
        <MarketingLeadForm />

        {/* 19. Final CTA */}
        <MarketingCTA
          onPrimaryClick={scrollToConsultation}
          onSecondaryClick={() => (window.location.href = '/#services')}
        />
      </main>

      {/* 20. Footer */}
      <Footer />
    </div>
  );
}
