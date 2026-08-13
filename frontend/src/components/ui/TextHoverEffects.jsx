import React, { useRef, useMemo, useCallback, useEffect } from 'react';
import { animate } from 'framer-motion';

const DEFAULT_TEXT = 'Ready to Turn Your Digital Presence Into Business Growth?';
const SINE_EASE = [0.37, 0, 0.63, 1];
const BASE_ANIM = { scaleY: 1, scaleX: 1, skewX: 0, x: 0, y: 0 };

/**
 * TextHoverEffects — Per-Character Interactive Ripple Text Component
 * Based on Framer TextHoverEffects architecture
 */
export default function TextHoverEffects({
  text = DEFAULT_TEXT,
  color = 'inherit',
  preset = 'Bounce', // 'Bounce' | 'Scale' | 'Jelly' | 'Tilt' | 'Magnetic'
  centerScaleY = 1.35,
  neighborScaleY = 1.15,
  tiltAngle = 15,
  magnetStrength = 12,
  neighborDistance = 1,
  duration = 0.4,
  colorRipple = true,
  accentColor = '#3B82F6',
  Tag = 'h2',
  className = '',
  style = {}
}) {
  const letterEls = useRef([]);
  const hoveredRef = useRef(null);

  // Split text into words and characters with flat global indexing
  const wordGroups = useMemo(() => {
    const tokens = String(text).split(/(\s+)/);
    let letterIndex = 0;
    return tokens.map((token, gi) => {
      if (/^\s+$/.test(token)) {
        return { isSpace: true, key: `space-${gi}` };
      }
      const chars = Array.from(token).map((char) => ({ char, index: letterIndex++ }));
      return { isSpace: false, key: `word-${gi}`, chars };
    });
  }, [text]);

  const totalLetters = useMemo(() => {
    let count = 0;
    wordGroups.forEach((g) => {
      if (!g.isSpace) count += g.chars.length;
    });
    return count;
  }, [wordGroups]);

  const getAffectedIndices = useCallback(
    (center) => {
      if (center === null) return new Set();
      const result = new Set();
      for (let d = 0; d <= neighborDistance; d++) {
        const left = center - d;
        const right = center + d;
        if (left >= 0) result.add(left);
        if (d > 0 && right < totalLetters) result.add(right);
      }
      return result;
    },
    [neighborDistance, totalLetters]
  );

  const computeLetterState = useCallback(
    (index, hoveredIndex) => {
      const delta = index - hoveredIndex;
      const distance = Math.abs(delta);
      const direction = Math.sign(delta);
      const t = distance === 0 ? 1 : 1 - (distance - 1) / neighborDistance;
      let state = { ...BASE_ANIM };

      if (distance === 0) {
        switch (preset) {
          case 'Scale':
            state = { ...BASE_ANIM, scaleY: centerScaleY };
            break;
          case 'Jelly':
            state = { ...BASE_ANIM, scaleY: centerScaleY, scaleX: Math.max(0.5, 1 - (centerScaleY - 1) * 0.45) };
            break;
          case 'Tilt':
            state = { ...BASE_ANIM, skewX: -tiltAngle, scaleY: 1.08 };
            break;
          case 'Magnetic':
            state = { ...BASE_ANIM, scaleY: 1.2, y: -8 };
            break;
          case 'Bounce':
          default:
            state = { ...BASE_ANIM, scaleY: centerScaleY };
            break;
        }
        if (colorRipple) state.color = accentColor;
      } else {
        switch (preset) {
          case 'Scale':
          case 'Bounce': {
            const s = 1 + (neighborScaleY - 1) * t;
            state = { ...BASE_ANIM, scaleY: s };
            break;
          }
          case 'Jelly': {
            const s = 1 + (neighborScaleY - 1) * t;
            state = { ...BASE_ANIM, scaleY: s, scaleX: Math.max(0.85, 1 - (s - 1) * 0.25) };
            break;
          }
          case 'Tilt':
            state = { ...BASE_ANIM, skewX: -tiltAngle * t * 0.5 };
            break;
          case 'Magnetic':
            state = { ...BASE_ANIM, x: -direction * magnetStrength * t };
            break;
        }
        if (colorRipple) state.color = color;
      }
      return state;
    },
    [preset, centerScaleY, neighborScaleY, tiltAngle, magnetStrength, neighborDistance, colorRipple, accentColor, color]
  );

  const animateTo = useCallback(
    (el, state) => {
      if (!el) return;
      const { color: stateColor, ...transforms } = state;
      const target = { ...transforms };
      if (colorRipple && stateColor !== undefined) target.color = stateColor;
      const opts =
        preset === 'Bounce'
          ? { type: 'spring', stiffness: 360, damping: 14, mass: 0.8 }
          : { duration, ease: SINE_EASE };
      animate(el, target, opts);
    },
    [preset, duration, colorRipple]
  );

  const baseState = useMemo(() => (colorRipple ? { ...BASE_ANIM, color } : BASE_ANIM), [colorRipple, color]);

  const handleMouseEnter = useCallback(
    (index) => {
      const prev = hoveredRef.current;
      hoveredRef.current = index;
      const prevSet = getAffectedIndices(prev);
      const nextSet = getAffectedIndices(index);

      prevSet.forEach((i) => {
        if (!nextSet.has(i)) {
          const el = letterEls.current[i];
          if (el) animateTo(el, baseState);
        }
      });

      nextSet.forEach((i) => {
        const el = letterEls.current[i];
        if (el) animateTo(el, computeLetterState(i, index));
      });
    },
    [getAffectedIndices, animateTo, computeLetterState, baseState]
  );

  const handleMouseLeave = useCallback(() => {
    const prev = hoveredRef.current;
    hoveredRef.current = null;
    getAffectedIndices(prev).forEach((i) => {
      const el = letterEls.current[i];
      if (el) animateTo(el, baseState);
    });
  }, [getAffectedIndices, animateTo, baseState]);

  useEffect(() => {
    hoveredRef.current = null;
    letterEls.current.forEach((el) => {
      if (el) animate(el, baseState, { duration: 0 });
    });
  }, [preset, centerScaleY, neighborScaleY, tiltAngle, magnetStrength, neighborDistance, colorRipple, accentColor, color, baseState]);

  useEffect(() => {
    hoveredRef.current = null;
  }, [text]);

  const transformOrigin = preset === 'Tilt' || preset === 'Magnetic' ? 'center center' : 'center bottom';
  const ComponentTag = Tag || 'h2';

  return (
    <ComponentTag
      className={`inline-block select-none ${className}`}
      style={{ color, ...style }}
      onMouseLeave={handleMouseLeave}
    >
      {wordGroups.map((group) => {
        if (group.isSpace) {
          return (
            <span key={group.key} className="inline-block">
              &nbsp;
            </span>
          );
        }
        return (
          <span key={group.key} className="inline-block whitespace-nowrap">
            {group.chars.map(({ char, index }) => (
              <span
                key={index}
                ref={(el) => {
                  letterEls.current[index] = el;
                }}
                onMouseEnter={() => handleMouseEnter(index)}
                className="inline-block transition-colors duration-150"
                style={{
                  transformOrigin,
                  cursor: 'pointer',
                  willChange: 'transform',
                  ...(colorRipple ? { color } : {})
                }}
              >
                {char}
              </span>
            ))}
          </span>
        );
      })}
    </ComponentTag>
  );
}
