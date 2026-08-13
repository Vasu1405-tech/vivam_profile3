import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Built-in Multi-Color Animated Character Vector Illustrations
const LOTTIE_ICONS = {
  // 1. Astronaut Riding Rocket Character
  astronaut_rocket: ({ speed = 1, glowColor = 'rgba(59, 130, 246, 0.4)' }) => (
    <div className="relative inline-flex items-center justify-center pointer-events-none select-none w-full h-full">
      <motion.div
        className="absolute inset-0 rounded-full blur-md"
        style={{ backgroundColor: glowColor }}
        animate={{ scale: [0.8, 1.25, 0.8], opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 1.6 / speed, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.svg
        viewBox="0 0 100 100"
        className="w-full h-full drop-shadow-xl"
        animate={{
          y: [-2, -6, -2],
          rotate: [-4, 4, -4]
        }}
        transition={{ duration: 1.8 / speed, repeat: Infinity, ease: "easeInOut" }}
      >
        <defs>
          <linearGradient id="rocketBody" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#1D4ED8" />
          </linearGradient>
          <linearGradient id="flameGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF7A00" />
            <stop offset="50%" stopColor="#FFB800" />
            <stop offset="100%" stopColor="#FFF500" />
          </linearGradient>
          <linearGradient id="visorGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF6B00" />
            <stop offset="100%" stopColor="#FFA800" />
          </linearGradient>
        </defs>

        {/* Thruster Flames (Animated) */}
        <motion.path
          d="M25 65 L10 82 Q20 78 28 72 Z"
          fill="url(#flameGrad)"
          animate={{ scale: [0.9, 1.15, 0.9], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 0.4 / speed, repeat: Infinity }}
        />
        <motion.path
          d="M32 72 L18 92 Q30 84 38 74 Z"
          fill="url(#flameGrad)"
          animate={{ scale: [1, 1.25, 1], opacity: [0.9, 1, 0.9] }}
          transition={{ duration: 0.5 / speed, repeat: Infinity, delay: 0.1 }}
        />

        {/* Rocket Fins */}
        <path d="M38 68 L22 76 L32 50 Z" fill="#F97316" />
        <path d="M58 40 L76 48 L68 28 Z" fill="#F97316" />

        {/* Main Rocket Body */}
        <path
          d="M30 65 C25 45 40 20 70 12 C78 35 60 60 38 68 Z"
          fill="url(#rocketBody)"
          stroke="#1E40AF"
          strokeWidth="2"
        />

        {/* Rocket Nose Tip & Accents */}
        <path d="M58 18 C65 14 70 12 70 12 C70 12 68 18 64 25 Z" fill="#60A5FA" />
        <circle cx="50" cy="40" r="7" fill="#1E293B" stroke="#60A5FA" strokeWidth="2" />
        <circle cx="50" cy="40" r="4" fill="#38BDF8" />

        {/* Astronaut Character Sitting on Rocket */}
        {/* Legs */}
        <path d="M42 34 Q36 38 34 46" stroke="#E2E8F0" strokeWidth="6" strokeLinecap="round" />
        {/* Body */}
        <ellipse cx="46" cy="28" rx="8" ry="10" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="2" />
        {/* Suit Badge */}
        <circle cx="48" cy="28" r="2.5" fill="#F97316" />
        {/* Helmet */}
        <circle cx="46" cy="16" r="10" fill="#FFFFFF" stroke="#94A3B8" strokeWidth="2" />
        {/* Helmet Visor */}
        <ellipse cx="48" cy="16" rx="6" ry="5" fill="url(#visorGrad)" />
        <ellipse cx="46" cy="14" rx="2" ry="1.5" fill="#FFFFFF" opacity="0.7" />
        {/* Waving Arm */}
        <motion.path
          d="M48 24 Q56 20 58 12"
          stroke="#F8FAFC"
          strokeWidth="4"
          strokeLinecap="round"
          animate={{ rotate: [-5, 10, -5] }}
          transition={{ duration: 1 / speed, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Sparkles around rocket */}
        <motion.path
          d="M80 30 L82 34 L86 36 L82 38 L80 42 L78 38 L74 36 L78 34 Z"
          fill="#FACC15"
          animate={{ scale: [0.7, 1.2, 0.7], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.2 / speed, repeat: Infinity }}
        />
        <motion.path
          d="M20 20 L22 23 L25 24 L22 25 L20 28 L18 25 L15 24 L18 23 Z"
          fill="#C084FC"
          animate={{ scale: [1, 0.6, 1], opacity: [0.8, 0.3, 0.8] }}
          transition={{ duration: 1.5 / speed, repeat: Infinity, delay: 0.3 }}
        />
      </motion.svg>
    </div>
  ),

  // 2. Cute Running Blue Blob Mascot Character
  blue_blob: ({ speed = 1, glowColor = 'rgba(59, 130, 246, 0.35)' }) => (
    <div className="relative inline-flex items-center justify-center pointer-events-none select-none w-full h-full">
      {/* Bouncing Shadow */}
      <motion.div
        className="absolute bottom-0 w-3/4 h-2 bg-slate-400/40 rounded-full blur-[2px]"
        animate={{ scale: [1, 0.6, 1], opacity: [0.6, 0.3, 0.6] }}
        transition={{ duration: 0.6 / speed, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.svg
        viewBox="0 0 100 100"
        className="w-full h-full drop-shadow-lg"
        animate={{
          y: [0, -8, 0],
          scaleY: [1, 0.92, 1]
        }}
        transition={{ duration: 0.6 / speed, repeat: Infinity, ease: "easeInOut" }}
      >
        <defs>
          <linearGradient id="blobBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#60A5FA" />
            <stop offset="60%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#2563EB" />
          </linearGradient>
        </defs>

        {/* Animated Feet */}
        <motion.ellipse
          cx="38" cy="84" rx="7" ry="5" fill="#1D4ED8"
          animate={{ y: [0, -6, 0], x: [0, 4, 0] }}
          transition={{ duration: 0.6 / speed, repeat: Infinity }}
        />
        <motion.ellipse
          cx="62" cy="84" rx="7" ry="5" fill="#1D4ED8"
          animate={{ y: [-6, 0, -6], x: [0, -4, 0] }}
          transition={{ duration: 0.6 / speed, repeat: Infinity }}
        />

        {/* Blob Main Body */}
        <path
          d="M50 15 C75 15 88 32 88 55 C88 78 72 82 50 82 C28 82 12 78 12 55 C12 32 25 15 50 15 Z"
          fill="url(#blobBodyGrad)"
          stroke="#1D4ED8"
          strokeWidth="2.5"
        />

        {/* Body Highlight Gloss */}
        <path
          d="M25 30 C30 22 45 20 52 21 C42 24 30 30 27 38 Z"
          fill="#FFFFFF"
          opacity="0.55"
        />

        {/* Large Cute Eyes */}
        {/* Left Eye */}
        <circle cx="40" cy="46" r="10" fill="#FFFFFF" />
        <circle cx="42" cy="46" r="5" fill="#0F172A" />
        <circle cx="44" cy="44" r="2" fill="#FFFFFF" />

        {/* Right Eye */}
        <circle cx="62" cy="46" r="10" fill="#FFFFFF" />
        <circle cx="64" cy="46" r="5" fill="#0F172A" />
        <circle cx="66" cy="44" r="2" fill="#FFFFFF" />

        {/* Cute Eyebrows */}
        <path d="M34 33 Q40 30 44 34" stroke="#1E40AF" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <path d="M58 34 Q62 30 68 33" stroke="#1E40AF" strokeWidth="2.5" strokeLinecap="round" fill="none" />

        {/* Happy Smile */}
        <path
          d="M45 62 Q51 68 57 62"
          stroke="#0F172A"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />

        {/* Cheeks Glow */}
        <ellipse cx="30" cy="54" rx="4" ry="2.5" fill="#F43F5E" opacity="0.4" />
        <ellipse cx="72" cy="54" rx="4" ry="2.5" fill="#F43F5E" opacity="0.4" />
      </motion.svg>
    </div>
  ),

  // 3. Cute Blue Mascot Bird Character (Perched & Fluttering)
  blue_bird: ({ speed = 1, glowColor = 'rgba(79, 70, 229, 0.4)' }) => (
    <div className="relative inline-flex items-center justify-center pointer-events-none select-none w-full h-full">
      <motion.svg
        viewBox="0 0 100 100"
        className="w-full h-full drop-shadow-md"
        animate={{
          y: [0, -3, 0],
          rotate: [0, 2, 0]
        }}
        transition={{ duration: 1.4 / speed, repeat: Infinity, ease: "easeInOut" }}
      >
        <defs>
          <linearGradient id="birdBody" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4338CA" />
            <stop offset="60%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#2563EB" />
          </linearGradient>
          <linearGradient id="birdWing" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#6D28D9" />
          </linearGradient>
        </defs>

        {/* Perched Branch Base */}
        <path d="M15 84 C35 82 65 84 85 83" stroke="#78350F" strokeWidth="6" strokeLinecap="round" />
        <ellipse cx="35" cy="85" rx="3" ry="1.5" fill="#15803D" />

        {/* Feet */}
        <path d="M42 74 L40 82 M44 74 L44 82 M46 74 L48 82" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
        <path d="M58 74 L56 82 M60 74 L60 82 M62 74 L64 82" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />

        {/* Bird Tail Feathers */}
        <path d="M28 58 L12 68 L24 74 Z" fill="#312E81" />
        <path d="M26 52 L8 60 L22 66 Z" fill="#4338CA" />

        {/* Bird Main Body */}
        <path
          d="M32 50 C32 30 50 20 70 30 C82 38 80 62 65 74 C50 80 32 72 32 50 Z"
          fill="url(#birdBody)"
          stroke="#312E81"
          strokeWidth="2"
        />

        {/* Cute Big Eye */}
        <circle cx="64" cy="38" r="11" fill="#FFFFFF" stroke="#1E1B4B" strokeWidth="1.5" />
        <circle cx="64" cy="38" r="7" fill="#10B981" />
        <circle cx="66" cy="36" r="4" fill="#0F172A" />
        <circle cx="68" cy="34" r="1.8" fill="#FFFFFF" />

        {/* Golden Beak */}
        <path d="M74 42 L90 47 L74 52 Z" fill="#F59E0B" stroke="#D97706" strokeWidth="1.5" />

        {/* Fluttering Wing */}
        <motion.path
          d="M42 52 C35 60 45 74 60 62 C58 54 50 48 42 52 Z"
          fill="url(#birdWing)"
          stroke="#4C1D95"
          strokeWidth="2"
          animate={{ rotate: [0, -12, 0] }}
          transition={{ duration: 0.4 / speed, repeat: Infinity, repeatDelay: 1 }}
        />
      </motion.svg>
    </div>
  ),

  // 4. Growth Rocket / Chart
  rocket: ({ speed = 1, glowColor = 'rgba(59, 130, 246, 0.4)' }) => (
    <LOTTIE_ICONS.astronaut_rocket speed={speed} glowColor={glowColor} />
  ),

  // 5. Sparkle Starburst
  sparkle: ({ speed = 1, glowColor = 'rgba(16, 185, 129, 0.4)' }) => (
    <div className="relative inline-flex items-center justify-center pointer-events-none select-none w-full h-full">
      <motion.div
        className="absolute inset-0 rounded-full blur-md"
        style={{ backgroundColor: glowColor }}
        animate={{ scale: [0.6, 1.3, 0.6], opacity: [0.2, 0.8, 0.2] }}
        transition={{ duration: 1.5 / speed, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.svg
        viewBox="0 0 24 24"
        className="w-full h-full text-emerald-400 drop-shadow-md"
        fill="currentColor"
        animate={{
          scale: [0.9, 1.15, 0.9],
          rotate: [0, 45, 0]
        }}
        transition={{ duration: 2 / speed, repeat: Infinity, ease: "easeInOut" }}
      >
        <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
      </motion.svg>
    </div>
  ),

  // 6. Growth Chart
  chart: ({ speed = 1, glowColor = 'rgba(139, 92, 246, 0.4)' }) => (
    <div className="relative inline-flex items-center justify-center pointer-events-none select-none w-full h-full">
      <motion.div
        className="absolute inset-0 rounded-full blur-sm"
        style={{ backgroundColor: glowColor }}
        animate={{ opacity: [0.2, 0.6, 0.2] }}
        transition={{ duration: 2 / speed, repeat: Infinity }}
      />
      <svg viewBox="0 0 24 24" className="w-full h-full text-violet-400 drop-shadow-md" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3v18h18" />
        <motion.path
          d="M18 9l-5 5-4-4-5 5"
          animate={{ strokeDashoffset: [20, 0] }}
          transition={{ duration: 1.5 / speed, repeat: Infinity, repeatType: "reverse" }}
        />
        <motion.path
          d="M14 9h4v4"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1.2 / speed, repeat: Infinity }}
        />
      </svg>
    </div>
  ),

  // 7. Target Crosshair
  target: ({ speed = 1, glowColor = 'rgba(236, 72, 153, 0.4)' }) => (
    <div className="relative inline-flex items-center justify-center pointer-events-none select-none w-full h-full">
      <motion.div
        className="absolute inset-0 rounded-full blur-sm"
        style={{ backgroundColor: glowColor }}
        animate={{ scale: [0.8, 1.2, 0.8] }}
        transition={{ duration: 1.8 / speed, repeat: Infinity }}
      />
      <motion.svg
        viewBox="0 0 24 24"
        className="w-full h-full text-pink-500 drop-shadow-md"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 8 / speed, repeat: Infinity, ease: "linear" }}
      >
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" fill="currentColor" />
      </motion.svg>
    </div>
  ),

  // 8. Lightning Flash
  lightning: ({ speed = 1, glowColor = 'rgba(245, 158, 11, 0.4)' }) => (
    <div className="relative inline-flex items-center justify-center pointer-events-none select-none w-full h-full">
      <motion.div
        className="absolute inset-0 rounded-full blur-md"
        style={{ backgroundColor: glowColor }}
        animate={{ opacity: [0.3, 0.9, 0.3], scale: [0.9, 1.2, 0.9] }}
        transition={{ duration: 1 / speed, repeat: Infinity }}
      />
      <motion.svg
        viewBox="0 0 24 24"
        className="w-full h-full text-amber-400 drop-shadow-md"
        fill="currentColor"
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 0.8 / speed, repeat: Infinity }}
      >
        <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" />
      </motion.svg>
    </div>
  )
};

export default function InlineLottieText({
  Tag = 'h1',
  text = '',
  triggers = [],
  className = '',
  debug: defaultDebug = false
}) {
  const [debugMode, setDebugMode] = useState(defaultDebug);
  const [activeTriggers, setActiveTriggers] = useState(triggers);

  // Check URL parameter ?lottieDebug=true
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get('lottieDebug') === 'true') {
        setDebugMode(true);
      }
    }
  }, []);

  const updateTriggerConfig = (index, field, value) => {
    setActiveTriggers((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  // Render text segments split by trigger words
  const renderContent = () => {
    if (!text) return null;

    let words = text.split(' ');

    return words.map((word, wIdx) => {
      // Clean word for matching
      const cleanWord = word.replace(/^[^\w]+|[^\w]+$/g, '');
      const matchIndex = activeTriggers.findIndex(
        (t) => t.word.toLowerCase() === cleanWord.toLowerCase() || t.word.toLowerCase() === word.toLowerCase()
      );

      if (matchIndex !== -1) {
        const config = activeTriggers[matchIndex];
        const IconComponent = LOTTIE_ICONS[config.type || 'astronaut_rocket'] || LOTTIE_ICONS.astronaut_rocket;

        const sizeStyle = config.size || '1.25em';
        const zoomScale = config.zoom || 1.0;
        const xOffset = config.x || 0;
        const yOffset = config.y || -2;
        const speed = config.speed || 1;

        return (
          <span key={wIdx} className="inline-flex items-baseline whitespace-nowrap">
            {/* Inline Vector Character Lottie Element right before the word */}
            <span
              className={`inline-flex items-center justify-center align-middle relative transition-transform shrink-0 ${
                debugMode ? 'ring-1 ring-amber-400 ring-dashed bg-amber-400/10 rounded px-0.5' : ''
              }`}
              style={{
                width: sizeStyle,
                height: sizeStyle,
                transform: `translate(${xOffset}px, ${yOffset}px) scale(${zoomScale})`,
                marginRight: '0.25em',
                marginLeft: '0.15em'
              }}
              title={debugMode ? `Lottie: ${config.type} (X:${xOffset}px, Y:${yOffset}px, Zoom:${zoomScale})` : undefined}
            >
              <IconComponent speed={speed} glowColor={config.glowColor} />
            </span>

            {/* The Trigger Word */}
            <span className={config.highlightClass || ''}>{word}</span>
            {wIdx < words.length - 1 ? '\u00A0' : ''}
          </span>
        );
      }

      return (
        <React.Fragment key={wIdx}>
          {word}
          {wIdx < words.length - 1 ? ' ' : ''}
        </React.Fragment>
      );
    });
  };

  const HtmlTag = Tag;

  return (
    <div className="relative group">
      <HtmlTag className={className}>
        {renderContent()}
      </HtmlTag>

      {/* DEBUG CONTROL PANEL OVERLAY */}
      {debugMode && (
        <div className="mt-4 p-4 rounded-2xl bg-black/90 border border-amber-400/40 text-amber-300 text-xs font-mono space-y-3 z-30 shadow-2xl backdrop-blur-md">
          <div className="flex items-center justify-between border-b border-amber-400/20 pb-2">
            <span className="font-bold uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              ⚡ Inline Vector Character Debugger
            </span>
            <button
              onClick={() => setDebugMode(false)}
              className="text-[10px] bg-amber-400/20 hover:bg-amber-400/40 text-amber-300 px-2 py-0.5 rounded"
            >
              Hide Debug
            </button>
          </div>

          <div className="space-y-3">
            {activeTriggers.map((trig, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-2">
                <div className="flex items-center justify-between text-white font-bold">
                  <span>Trigger Word: "{trig.word}"</span>
                  <span className="text-amber-400 uppercase text-[10px]">{trig.type}</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[10px]">
                  <div>
                    <label className="block text-muted-foreground mb-0.5">X Offset ({trig.x || 0}px)</label>
                    <input
                      type="range"
                      min="-20"
                      max="20"
                      value={trig.x || 0}
                      onChange={(e) => updateTriggerConfig(idx, 'x', Number(e.target.value))}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-muted-foreground mb-0.5">Y Offset ({trig.y || 0}px)</label>
                    <input
                      type="range"
                      min="-20"
                      max="20"
                      value={trig.y || 0}
                      onChange={(e) => updateTriggerConfig(idx, 'y', Number(e.target.value))}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-muted-foreground mb-0.5">Zoom ({trig.zoom || 1}x)</label>
                    <input
                      type="range"
                      min="0.5"
                      max="2.5"
                      step="0.1"
                      value={trig.zoom || 1}
                      onChange={(e) => updateTriggerConfig(idx, 'zoom', Number(e.target.value))}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-muted-foreground mb-0.5">Character Icon</label>
                    <select
                      value={trig.type || 'astronaut_rocket'}
                      onChange={(e) => updateTriggerConfig(idx, 'type', e.target.value)}
                      className="bg-black border border-amber-400/40 text-amber-300 rounded px-1 py-0.5 text-[10px] w-full"
                    >
                      <option value="astronaut_rocket">🚀 Astronaut Rocket</option>
                      <option value="blue_blob">🔵 Blue Blob Mascot</option>
                      <option value="blue_bird">🐦 Blue Mascot Bird</option>
                      <option value="sparkle">✨ Sparkle Star</option>
                      <option value="chart">📈 Growth Chart</option>
                      <option value="target">🎯 Target</option>
                      <option value="lightning">⚡ Lightning</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
