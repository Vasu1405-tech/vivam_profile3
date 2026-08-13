import React, { useState, useRef, useId } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Twitter, Linkedin, Github, Mail, Facebook, Instagram, Youtube, MessageCircle, Link2 } from 'lucide-react';

// Platform Definitions & Lucide Icon Mapping
const PLATFORM_DEFS = {
  twitter: {
    name: 'Twitter',
    color: '#1DA1F2',
    IconComponent: Twitter,
    defaultUrl: (url, msg) => `https://twitter.com/intent/tweet?text=${encodeURIComponent(msg)}&url=${encodeURIComponent(url)}`
  },
  linkedin: {
    name: 'LinkedIn',
    color: '#0077B5',
    IconComponent: Linkedin,
    defaultUrl: (url) => `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
  },
  github: {
    name: 'GitHub',
    color: '#333333',
    IconComponent: Github,
    defaultUrl: () => 'https://github.com'
  },
  email: {
    name: 'Email',
    color: '#EA4335',
    IconComponent: Mail,
    defaultUrl: (url, msg) => `mailto:contact@vivamsofttech.com?subject=${encodeURIComponent(msg || 'Inquiry regarding Vivam Services')}&body=${encodeURIComponent(url)}`
  },
  facebook: {
    name: 'Facebook',
    color: '#1877F2',
    IconComponent: Facebook,
    defaultUrl: (url, msg) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
  },
  instagram: {
    name: 'Instagram',
    color: '#E4405F',
    IconComponent: Instagram,
    defaultUrl: () => 'https://www.instagram.com'
  },
  youtube: {
    name: 'YouTube',
    color: '#FF0000',
    IconComponent: Youtube,
    defaultUrl: () => 'https://www.youtube.com'
  },
  whatsapp: {
    name: 'WhatsApp',
    color: '#25D366',
    IconComponent: MessageCircle,
    defaultUrl: (url, msg) => `https://wa.me/?text=${encodeURIComponent((msg ? msg + ' ' : '') + url)}`
  },
  copylink: {
    name: 'Copy Link',
    color: '#6B7280',
    IconComponent: Link2,
    defaultUrl: null
  }
};

export default function SocialShareButtons({
  url = '',
  message = 'Check out Vivam Software Services & Digital Marketing Solutions!',
  platforms = ['twitter', 'linkedin', 'github', 'email'],
  socialUrls = {},
  iconStyle = 'minimal', // 'minimal' | 'brand' | 'monochrome' | 'outline'
  size = 46,
  gap = 12,
  hoverEffect = 'scale', // 'scale' | 'glow' | 'slide' | 'none'
  borderRadius = 16,
  showShadows = false,
  showTooltips = true,
  alignment = 'left',
  className = ''
}) {
  const [copiedState, setCopiedState] = useState(false);
  const [activePlatform, setActivePlatform] = useState(null);
  const copyTimeoutRef = useRef(null);
  const tooltipIdBase = useId();

  const resolvedUrl = url || (typeof window !== 'undefined' ? window.location.href : 'https://vivamsofttech.com');

  const handlePlatformClick = async (platformKey) => {
    if (socialUrls[platformKey]) {
      window.open(socialUrls[platformKey], '_blank', 'noopener,noreferrer');
      return;
    }

    const platformDef = PLATFORM_DEFS[platformKey];
    if (!platformDef) return;

    if (platformKey === 'copylink') {
      try {
        await navigator.clipboard.writeText(resolvedUrl);
        setCopiedState(true);
        if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
        copyTimeoutRef.current = setTimeout(() => setCopiedState(false), 2500);
      } catch (err) {
        console.error('Copy link failed:', err);
      }
      return;
    }

    if (platformDef.defaultUrl) {
      const shareUrl = platformDef.defaultUrl(resolvedUrl, message);
      window.open(shareUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const getButtonStyle = (platformKey, isActive) => {
    const config = PLATFORM_DEFS[platformKey];
    if (!config) return {};

    let backgroundColor = config.color;
    let iconColor = '#FFFFFF';
    let borderColor = 'transparent';

    if (iconStyle === 'minimal') {
      // Soft rounded squircle light/dark box style matching screenshot
      backgroundColor = isActive ? 'rgba(59, 130, 246, 0.12)' : 'rgba(241, 245, 249, 0.06)';
      iconColor = isActive ? '#3B82F6' : '#64748B';
      borderColor = isActive ? 'rgba(59, 130, 246, 0.3)' : 'rgba(226, 232, 240, 0.1)';
    } else if (iconStyle === 'monochrome') {
      backgroundColor = 'rgba(255, 255, 255, 0.08)';
      iconColor = 'var(--foreground, #FFFFFF)';
      borderColor = 'rgba(255, 255, 255, 0.15)';
    } else if (iconStyle === 'outline') {
      backgroundColor = 'transparent';
      iconColor = config.color;
      borderColor = config.color;
    }

    return {
      backgroundColor,
      color: iconColor,
      border: `1.5px solid ${borderColor}`,
      borderRadius: `${borderRadius}px`,
      width: `${size}px`,
      height: `${size}px`,
      padding: 0,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      position: 'relative',
      boxShadow: showShadows ? '0 4px 12px rgba(0, 0, 0, 0.1)' : 'none',
      outline: 'none',
      transition: 'all 0.2s ease'
    };
  };


  const hoverVariants = {
    hover: {
      scale: hoverEffect === 'scale' ? 1.15 : 1.05,
      y: hoverEffect === 'slide' ? -6 : -3,
      boxShadow: showShadows ? '0 8px 24px rgba(0, 0, 0, 0.25)' : undefined,
      transition: { type: 'spring', stiffness: 400, damping: 18 }
    },
    tap: {
      scale: 0.92,
      y: 0,
      transition: { type: 'spring', stiffness: 500, damping: 25 }
    }
  };

  const justifyClass =
    alignment === 'center' ? 'justify-center' : alignment === 'right' ? 'justify-end' : 'justify-start';

  return (
    <div className={`flex flex-wrap items-center ${justifyClass} ${className}`} style={{ gap: `${gap}px` }}>
      {platforms.map((platformKey) => {
        const config = PLATFORM_DEFS[platformKey];
        if (!config) return null;

        const isActive = activePlatform === platformKey;
        const isCopied = platformKey === 'copylink' && copiedState;
        const tooltipId = `${tooltipIdBase}-${platformKey}`;

        return (
          <div key={platformKey} className="relative inline-flex items-center justify-center shrink-0">
            {/* Hover Radial Glow Effect */}
            <AnimatePresence>
              {isActive && (hoverEffect === 'glow' || hoverEffect === 'scale') && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1.25 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="absolute inset-0 rounded-full blur-md pointer-events-none -z-10"
                  style={{ backgroundColor: `${config.color}50` }}
                />
              )}
            </AnimatePresence>

            {/* Social Share Button */}
            <motion.button
              style={getButtonStyle(platformKey, isActive)}
              variants={hoverVariants}
              whileHover="hover"
              whileFocus="hover"
              whileTap="tap"
              onClick={() => handlePlatformClick(platformKey)}
              onMouseEnter={() => setActivePlatform(platformKey)}
              onMouseLeave={() => setActivePlatform(null)}
              onFocus={() => setActivePlatform(platformKey)}
              onBlur={() => setActivePlatform(null)}
              aria-label={`Share or visit ${config.name}`}
              aria-describedby={showTooltips ? tooltipId : undefined}
            >
              {config.IconComponent && (
                <config.IconComponent style={{ width: size * 0.5, height: size * 0.5 }} aria-hidden="true" />
              )}
            </motion.button>

            {/* Animated Tooltip */}
            <AnimatePresence>
              {showTooltips && isActive && (
                <motion.div
                  id={tooltipId}
                  role="tooltip"
                  initial={{ opacity: 0, y: 6, scale: 0.92, x: '-50%' }}
                  animate={{ opacity: 1, y: 0, scale: 1, x: '-50%' }}
                  exit={{ opacity: 0, y: 6, scale: 0.92, x: '-50%' }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30, mass: 0.8 }}
                  className="absolute bottom-full left-1/2 mb-2 bg-black/90 text-white px-2.5 py-1 rounded-md text-[11px] font-semibold whitespace-nowrap shadow-xl z-50 pointer-events-none border border-white/10 backdrop-blur-md"
                >
                  {isCopied ? 'Link Copied!' : config.name}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[4px] border-r-[4px] border-t-[4px] border-l-transparent border-r-transparent border-t-black/90" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
