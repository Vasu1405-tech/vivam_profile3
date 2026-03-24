import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader({ onComplete }) {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        // Keep the preloader visible for the animation duration
        const timer = setTimeout(() => {
            setIsVisible(false);
            setTimeout(onComplete, 800); // Wait for exit animation to finish before unmounting/triggering app load
        }, 2500);

        return () => clearTimeout(timer);
    }, [onComplete]);

    // SVG Path animation variants
    const pathVariants = {
        hidden: { pathLength: 0, opacity: 0 },
        visible: {
            pathLength: 1,
            opacity: 1,
            transition: {
                duration: 2,
                ease: "easeInOut",
            }
        }
    };

    const textVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                delay: 0.8,
                ease: "easeOut"
            }
        }
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
                >
                    {/* Animated Vector Logo (Stylized 'V') */}
                    <div className="relative w-32 h-32 mb-8">
                        <motion.svg
                            viewBox="0 0 100 100"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-full h-full drop-shadow-2xl"
                        >
                            <defs>
                                <linearGradient id="v-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#3b82f6" /> {/* blue-500 */}
                                    <stop offset="100%" stopColor="#8b5cf6" /> {/* violet-500 */}
                                </linearGradient>
                                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                                    <feGaussianBlur stdDeviation="5" result="blur" />
                                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                                </filter>
                            </defs>

                            {/* Outer circle animation */}
                            <motion.circle
                                cx="50"
                                cy="50"
                                r="45"
                                stroke="url(#v-gradient)"
                                strokeWidth="2"
                                strokeDasharray="283"
                                variants={pathVariants}
                                initial="hidden"
                                animate="visible"
                                className="opacity-20"
                            />

                            {/* The 'V' Vector Path */}
                            <motion.path
                                d="M30 35 L50 65 L70 35"
                                stroke="url(#v-gradient)"
                                strokeWidth="8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                filter="url(#glow)"
                                variants={pathVariants}
                                initial="hidden"
                                animate="visible"
                            />
                        </motion.svg>

                        {/* Glowing background blur behind the V */}
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-violet-500 opacity-20 blur-2xl rounded-full mix-blend-screen" />
                    </div>

                    <motion.div
                        variants={textVariants}
                        initial="hidden"
                        animate="visible"
                        className="flex flex-col items-center"
                    >
                        <h1 className="text-3xl md:text-4xl font-bold font-outfit tracking-tight text-foreground mb-2">
                            Vivam
                        </h1>
                        <p className="text-sm font-medium tracking-[0.2em] text-muted-foreground uppercase">
                            Software Services
                        </p>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
