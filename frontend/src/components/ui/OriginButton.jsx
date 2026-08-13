import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

/**
 * OriginButton — Interactive Button with cursor-origin expanding ripple effect
 * Based on Framer OriginButton architecture
 */
export default function OriginButton({
  children,
  onClick,
  className = '',
  backgroundColor = 'rgba(255, 255, 255, 0.06)', // Default base background
  hoverColor = 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)', // Default expanding hover gradient
  textColor = 'inherit',
  hoverTextColor = '#FFFFFF',
  disabled = false,
  type = 'button',
  ...props
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  const scale = useMotionValue(0);
  const smoothScale = useSpring(scale, {
    stiffness: 85,
    damping: 18,
    restDelta: 0.001
  });
  const easedScale = useTransform(smoothScale, [0, 1], [0, 1], {
    ease: (t) => t * t
  });

  const handleMouseEnter = (e) => {
    if (disabled || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCursorPos({ x, y });
    setIsHovered(true);
    scale.set(1);
  };

  const handleMouseLeave = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCursorPos({ x, y });
    scale.set(0);
    setIsHovered(false);
  };

  const handleMouseMove = (e) => {
    if (!isHovered && containerRef.current) {
      handleMouseEnter(e);
    }
  };

  // Determine maximum dimension for circle to cover the entire button rectangle
  const maxDimension = 600;

  return (
    <button
      ref={containerRef}
      type={type}
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      className={`relative inline-flex items-center justify-center overflow-hidden font-bold transition-colors select-none ${
        disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
      } ${className}`}
      style={{
        background: backgroundColor,
        color: isHovered && hoverTextColor ? hoverTextColor : textColor
      }}
      {...props}
    >
      {/* Expanding Ripple Circle originating from cursor (x, y) */}
      <motion.div
        style={{
          position: 'absolute',
          left: cursorPos.x,
          top: cursorPos.y,
          width: maxDimension,
          height: maxDimension,
          borderRadius: '50%',
          background: hoverColor,
          scale: easedScale,
          x: '-50%',
          y: '-50%',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      {/* Button Content / Children */}
      <span className="relative z-10 inline-flex items-center justify-center gap-2 transition-colors duration-200">
        {children}
      </span>
    </button>
  );
}
