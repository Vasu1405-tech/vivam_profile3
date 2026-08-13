import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

function lerpColor(colorA, colorB, t) {
  const parseColor = (c) => {
    if (c.startsWith('#')) {
      let hex = c.replace('#', '');
      if (hex.length === 3) hex = hex.split('').map((char) => char + char).join('');
      const num = parseInt(hex, 16);
      return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
    }
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = 1;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = c;
    ctx.fillRect(0, 0, 1, 1);
    const d = ctx.getImageData(0, 0, 1, 1).data;
    return [d[0], d[1], d[2]];
  };

  try {
    const a = parseColor(colorA);
    const b = parseColor(colorB);
    const r = Math.round(a[0] + (b[0] - a[0]) * t);
    const g = Math.round(a[1] + (b[1] - a[1]) * t);
    const bl = Math.round(a[2] + (b[2] - a[2]) * t);
    return `rgb(${r},${g},${bl})`;
  } catch (e) {
    return t > 0.5 ? colorB : colorA;
  }
}

function StaticGrid({ dotColor, dotSize, dotSpacing, dotOpacity, bgColor, style }) {
  const containerRef = useRef(null);
  const [size, setSize] = useState({ width: 800, height: 500 });

  useEffect(() => {
    if (!containerRef.current) return;
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        if (width > 0 && height > 0) {
          setSize({ width, height });
        }
      }
    });
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  const { width, height } = size;
  const cols = Math.floor(width / dotSpacing);
  const rows = Math.floor(height / dotSpacing);
  const offsetX = (width - cols * dotSpacing) / 2;
  const offsetY = (height - rows * dotSpacing) / 2;
  const dots = [];

  for (let r = 0; r <= rows; r++) {
    for (let c = 0; c <= cols; c++) {
      dots.push({ x: offsetX + c * dotSpacing, y: offsetY + r * dotSpacing, key: `${r}-${c}` });
    }
  }

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        backgroundColor: bgColor,
        pointerEvents: 'none',
        ...style
      }}
    >
      {dots.map((dot) => (
        <div
          key={dot.key}
          style={{
            position: 'absolute',
            left: dot.x - dotSize / 2,
            top: dot.y - dotSize / 2,
            width: dotSize,
            height: dotSize,
            borderRadius: '50%',
            backgroundColor: dotColor,
            opacity: dotOpacity
          }}
        />
      ))}
    </div>
  );
}

function AnimatedDotWrapper({ dot, dotSize, dotColor, dotOpacity, springStiffness, springDamping, onMount }) {
  const springX = useSpring(useMotionValue(0), { stiffness: springStiffness, damping: springDamping });
  const springY = useSpring(useMotionValue(0), { stiffness: springStiffness, damping: springDamping });
  const [color, setColor] = useState(dotColor);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    onMount({ springX, springY, setColor, setScale });
  }, [onMount, springX, springY]);

  return (
    <motion.div
      style={{
        position: 'absolute',
        left: dot.baseX - dotSize / 2,
        top: dot.baseY - dotSize / 2,
        width: dotSize,
        height: dotSize,
        borderRadius: '50%',
        backgroundColor: color,
        opacity: dotOpacity,
        x: springX,
        y: springY,
        scale
      }}
    />
  );
}

export default function MagneticGridBackground({
  dotColor = 'rgba(148, 163, 184, 0.3)',
  activeColor = '#3B82F6',
  bgColor = 'transparent',
  dotSize = 3.5,
  dotSpacing = 28,
  influenceRadius = 140,
  attractMode = false,
  maxDisplace = 14,
  springStiffness = 250,
  springDamping = 22,
  mobileCutoff = 768,
  dotOpacity = 0.5,
  className = '',
  style = {}
}) {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < mobileCutoff;
  const wrapperRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [dots, setDots] = useState([]);
  const cursorRef = useRef({ x: -9999, y: -9999 });
  const dotRefsMap = useRef({});
  const rafRef = useRef(null);
  const colorCacheRef = useRef({});

  const getCachedLerp = useCallback(
    (t) => {
      const key = Math.round(t * 100);
      if (colorCacheRef.current[key]) return colorCacheRef.current[key];
      const result = lerpColor(dotColor, activeColor, t);
      colorCacheRef.current[key] = result;
      return result;
    },
    [dotColor, activeColor]
  );

  useEffect(() => {
    colorCacheRef.current = {};
  }, [dotColor, activeColor]);

  useEffect(() => {
    if (!wrapperRef.current) return;
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        setDimensions({ width, height });
      }
    });
    ro.observe(wrapperRef.current);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (dimensions.width === 0 || dimensions.height === 0) return;
    let effectiveSpacing = dotSpacing;
    const rawCount = Math.ceil(dimensions.width / dotSpacing) * Math.ceil(dimensions.height / dotSpacing);
    if (rawCount > 800) {
      effectiveSpacing = Math.ceil(Math.sqrt((dimensions.width * dimensions.height) / 800));
    }
    const cols = Math.floor(dimensions.width / effectiveSpacing);
    const rows = Math.floor(dimensions.height / effectiveSpacing);
    const offsetX = (dimensions.width - cols * effectiveSpacing) / 2;
    const offsetY = (dimensions.height - rows * effectiveSpacing) / 2;
    const newDots = [];
    for (let r = 0; r <= rows; r++) {
      for (let c = 0; c <= cols; c++) {
        newDots.push({
          id: `${r}-${c}`,
          baseX: offsetX + c * effectiveSpacing,
          baseY: offsetY + r * effectiveSpacing
        });
      }
    }
    dotRefsMap.current = {};
    setDots(newDots);
  }, [dimensions, dotSpacing]);

  useEffect(() => {
    if (isMobile || dots.length === 0) return;
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const handleMouseMove = (e) => {
      const rect = wrapper.getBoundingClientRect();
      cursorRef.current.x = e.clientX - rect.left;
      cursorRef.current.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      cursorRef.current.x = -9999;
      cursorRef.current.y = -9999;
    };

    window.addEventListener('mousemove', handleMouseMove);
    wrapper.addEventListener('mouseleave', handleMouseLeave);

    const loop = () => {
      const cx = cursorRef.current.x;
      const cy = cursorRef.current.y;
      for (const dot of dots) {
        const ref = dotRefsMap.current[dot.id];
        if (!ref) continue;
        const dx = dot.baseX - cx;
        const dy = dot.baseY - cy;
        const dist = Math.hypot(dx, dy);
        const proximity = Math.max(0, 1 - dist / influenceRadius);
        let targetDx = 0;
        let targetDy = 0;
        if (proximity > 0 && dist > 0) {
          const nx = dx / dist;
          const ny = dy / dist;
          const dir = attractMode ? -1 : 1;
          targetDx = dir * nx * proximity * maxDisplace;
          targetDy = dir * ny * proximity * maxDisplace;
        }
        ref.springX.set(targetDx);
        ref.springY.set(targetDy);
        ref.setColor(proximity > 0 ? getCachedLerp(proximity) : dotColor);
        ref.setScale(1 + proximity * 1.2);
      }
      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      wrapper.removeEventListener('mouseleave', handleMouseLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [dots, isMobile, influenceRadius, attractMode, maxDisplace, dotColor, getCachedLerp]);

  if (isMobile) {
    return (
      <StaticGrid
        dotColor={dotColor}
        dotSize={dotSize}
        dotSpacing={dotSpacing}
        dotOpacity={Math.max(0.85, dotOpacity)}
        bgColor={bgColor}
        style={style}
      />
    );
  }

  return (
    <div
      ref={wrapperRef}
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      style={{
        backgroundColor: bgColor,
        ...style
      }}
    >
      {dots.map((dot) => (
        <AnimatedDotWrapper
          key={dot.id}
          dot={dot}
          dotSize={dotSize}
          dotColor={dotColor}
          dotOpacity={dotOpacity}
          springStiffness={springStiffness}
          springDamping={springDamping}
          onMount={(ctrl) => {
            dotRefsMap.current[dot.id] = ctrl;
          }}
        />
      ))}
    </div>
  );
}
