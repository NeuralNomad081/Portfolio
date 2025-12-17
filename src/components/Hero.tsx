"use client";
import ThreeBackground from "./ThreeBackground";
import { motion } from "framer-motion";

export default function Hero() {
    return (
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
            <ThreeBackground />
            <div className="relative z-10 text-center px-4 pointer-events-none">
                {/* pointer-events-none allow clicking through to canvas if needed, mostly for visual clarity here */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-linear-to-r from-primary to-secondary mb-4 text-glow">
                        Shashwat Pandey
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto">
                        AI/ML Engineer | Data Science
                    </p>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 1 }}
                        className="mt-6 flex justify-center gap-4 pointer-events-auto"
                    >
                        {/* Future CTA buttons can go here */}
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
