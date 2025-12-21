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
                    <h1 className="text-6xl md:text-9xl font-bold bg-clip-text text-transparent bg-linear-to-r from-primary to-secondary mb-4 text-glow animate-glitch font-[family-name:var(--font-vt323)] tracking-wider">
                        Shashwat Pandey
                    </h1>
                    <p className="text-2xl md:text-4xl text-gray-300 max-w-2xl mx-auto font-[family-name:var(--font-vt323)] tracking-widest text-primary/80">
                        AI/ML Engineer | Data Science
                    </p>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 1 }}
                        className="mt-6 flex flex-col items-center gap-6 pointer-events-auto"
                    >
                        {/* CTA Buttons */}
                        <div className="flex justify-center gap-4">
                            {/* ... buttons ... */}
                        </div>

                        {/* Retro Welcome GIF */}
                        <div className="w-32 h-32 md:w-48 md:h-48 rounded-lg overflow-hidden border-2 border-primary/30 shadow-[0_0_20px_rgba(0,240,255,0.3)]">
                            <img
                                src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExYWQwc2R3Y2tyZ3dyYXJ1dGhuem90ODBhenZpdjhnNnN4Zmgyam55ayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/JqmupuTVZYaQX5s094/giphy.gif"
                                alt="Retro Welcome"
                                className="w-full h-full object-cover opacity-80 mix-blend-screen"
                            />
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
