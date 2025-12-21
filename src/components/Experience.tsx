"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, Briefcase } from "lucide-react";

import { experiences } from "@/lib/data";

const ExcelAnimation = () => {
    const [cells, setCells] = useState(Array(20).fill(""));

    useEffect(() => {
        const interval = setInterval(() => {
            setCells(prev => prev.map(() => {
                const rand = Math.random();
                if (rand > 0.9) return "ERROR";
                if (rand > 0.7) return Math.floor(Math.random() * 1000);
                if (rand > 0.5) return "NaN";
                if (rand > 0.3) return "REF!";
                return "-";
            }));
        }, 500);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30 z-0 font-mono text-xs text-green-500/50">
            <div className="grid grid-cols-4 gap-1 p-2 h-full content-center">
                {cells.map((cell, i) => (
                    <div key={i} className="border border-green-500/20 p-1 flex items-center justify-center truncate">
                        {cell}
                    </div>
                ))}
            </div>
        </div>
    );
};

const StickmanAnimation = () => {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20 z-0">
            <div className="relative w-full h-full flex items-center justify-center">
                {/* Agent A */}
                <div className="absolute left-10 md:left-20 w-12 h-16 border-2 border-primary/50 rounded flex items-center justify-center">
                    <span className="text-[10px] text-primary/70">AGT-A</span>
                </div>
                {/* Agent B */}
                <div className="absolute right-10 md:right-20 w-12 h-16 border-2 border-primary/50 rounded flex items-center justify-center">
                    <span className="text-[10px] text-primary/70">AGT-B</span>
                </div>

                {/* Stickman & Wire */}
                <motion.svg
                    viewBox="0 0 200 100"
                    className="w-64 h-32 stroke-white fill-none stroke-2"
                    initial="idle"
                    animate="shock"
                >
                    {/* Head */}
                    <circle cx="100" cy="30" r="10" />
                    {/* Body */}
                    <line x1="100" y1="40" x2="100" y2="70" />
                    {/* Legs */}
                    <line x1="100" y1="70" x2="90" y2="90" />
                    <line x1="100" y1="70" x2="110" y2="90" />

                    {/* Arms (Animated) */}
                    <motion.path
                        d="M 100 50 L 90 60"
                        variants={{
                            idle: { d: "M 100 50 L 90 60" },
                            shock: {
                                d: ["M 100 50 L 60 50", "M 100 50 L 60 50", "M 100 50 L 90 60"],
                                transition: { duration: 4, times: [0.2, 0.8, 1], repeat: Infinity }
                            }
                        }}
                    />
                    <motion.path
                        d="M 100 50 L 110 60"
                        variants={{
                            idle: { d: "M 100 50 L 110 60" },
                            shock: {
                                d: ["M 100 50 L 140 50", "M 100 50 L 140 50", "M 100 50 L 110 60"],
                                transition: { duration: 4, times: [0.2, 0.8, 1], repeat: Infinity }
                            }
                        }}
                    />

                    {/* Shock Effect */}
                    <motion.path
                        d="M 80 50 L 90 40 L 100 60 L 110 40 L 120 50"
                        className="stroke-yellow-400 stroke-[3px]"
                        variants={{
                            idle: { opacity: 0 },
                            shock: {
                                opacity: [0, 1, 0, 1, 0],
                                pathLength: [0, 1],
                                transition: { duration: 0.5, delay: 1.5, repeat: Infinity, repeatDelay: 3.5 }
                            }
                        }}
                    />
                </motion.svg>
            </div>
        </div>
    );
};

const PacmanBackground = () => {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20 z-0">
            <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute top-1/2 left-0 w-full flex items-center"
            >
                {/* Pacman */}
                <div className="relative">
                    <motion.div
                        animate={{ clipPath: ["circle(50% at 50% 50%)", "polygon(100% 74%, 44% 48%, 100% 21%, 100% 0, 0 0, 0 100%, 100% 100%)", "circle(50% at 50% 50%)"] }}
                        transition={{ duration: 0.5, repeat: Infinity }}
                        className="w-12 h-12 bg-yellow-400 rounded-full"
                    />
                </div>
                {/* Dots */}
                <div className="flex gap-12 ml-12">
                    {[...Array(10)].map((_, i) => (
                        <div key={i} className="w-3 h-3 bg-pink-300 rounded-full" />
                    ))}
                </div>
            </motion.div>
        </div>
    );
};

export default function Experience() {
    return (
        <section className="py-20 px-4 md:px-10 max-w-6xl mx-auto">
            <motion.h2
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="text-5xl md:text-6xl font-bold mb-12 text-center text-glow text-primary animate-glitch font-[family-name:var(--font-vt323)] tracking-wider"
            >
                Work Experience
            </motion.h2>

            <div className="relative border-l border-gray-700 ml-4 md:ml-10 space-y-12">
                {experiences.map((exp, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="relative pl-8 md:pl-12"
                    >
                        <span className="absolute -left-[5px] top-2 h-3 w-3 rounded-full bg-secondary ring-4 ring-[rgba(112,0,255,0.2)]" />

                        <div className="glass-card p-6 rounded-xl hover:bg-[rgba(255,255,255,0.05)] transition-colors flex flex-col lg:flex-row gap-6 relative overflow-hidden group">
                            {/* Conditional Pacman Animation */}
                            {exp.company === "Red Panda Games" && <PacmanBackground />}
                            {/* Conditional Excel Animation */}
                            {exp.company === "BiltzenTech Solutions" && <ExcelAnimation />}
                            {/* Conditional Stickman Animation */}
                            {exp.company === "Streamly" && <StickmanAnimation />}

                            <div className="flex-1 relative z-10">
                                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                                    <div>
                                        <h3 className="text-2xl font-semibold text-white">{exp.role}</h3>
                                        <p className="text-secondary font-medium">{exp.company}</p>
                                    </div>
                                    <div className="flex flex-col md:items-end mt-2 md:mt-0 text-gray-400 text-sm font-[family-name:var(--font-vt323)] tracking-wide text-lg">
                                        <div className="flex items-center gap-1">
                                            <Calendar size={14} />
                                            <span>{exp.date}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Briefcase size={14} />
                                            <span>{exp.location}</span>
                                        </div>
                                    </div>
                                </div>

                                <ul className="list-disc list-inside space-y-2 text-gray-300">
                                    {exp.description.map((item, i) => (
                                        <li key={i}>{item}</li>
                                    ))}
                                </ul>
                            </div>

                            {/* Retro GIF Display */}
                            {/* @ts-ignore - Dynamic data field */}
                            {exp.gif && (
                                <div className="hidden lg:block w-48 shrink-0 self-center">
                                    <div className="rounded-lg overflow-hidden border border-primary/30 shadow-[0_0_15px_rgba(0,240,255,0.1)]">
                                        <img
                                            // @ts-ignore
                                            src={exp.gif}
                                            alt="Context GIF"
                                            className="w-full h-auto object-cover opacity-90"
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
