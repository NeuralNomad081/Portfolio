"use client";
import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";

const projects = [
    {
        title: "Recipe Generator",
        tech: ["React", "Vite", "Flask", "GROQ", "Docker"],
        description: "Deployed Flask/GROQ backend on Railway. Achieved 200ms API response time. Reduced deployment errors by 98% via Docker CI/CD.",
        github: "https://github.com/NeuralNomad081/recipe"
    },
    {
        title: "Dialogue Generator",
        tech: ["GPT-2", "FastAPI", "Python", "Full-Stack"],
        description: "Fine-tuned GPT-2 model (124M params) on custom dialogue dataset. Multi-module project with FastAPI backend and real-time inference.",
        github: "https://github.com/NeuralNomad081/HorizonDawn-Dialogue-Generator"
    },
    {
        title: "Credit Card Fraud Detection",
        tech: ["ML Pipeline", "SMOTE", "Python"],
        description: "Developed fraud detection pipeline using SMOTE to boost recall by 15%. Evaluated on 284k transactions with AUC-ROC > 0.95.",
        github: "https://github.com/NeuralNomad081"
    }
];

export default function Projects() {
    return (
        <section className="py-20 px-4 md:px-10 max-w-7xl mx-auto">
            <motion.h2
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="text-5xl md:text-6xl font-bold mb-12 text-center text-glow text-primary animate-glitch font-[family-name:var(--font-vt323)] tracking-wider"
            >
                Projects
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="glass-card rounded-xl overflow-hidden hover:border-primary/50 transition-all duration-300 group flex flex-col"
                    >
                        {/* Project Image/Meme */}
                        {/* @ts-ignore */}
                        {project.image && (
                            <div className="w-full h-48 overflow-hidden border-b border-gray-700 relative bg-black/50">
                                <div className="absolute inset-0 bg-primary/20 mix-blend-overlay z-10 hover:bg-transparent transition-all duration-300" />
                                <img
                                    // @ts-ignore
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-contain opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                                />
                            </div>
                        )}

                        <div className="p-6 h-full flex flex-col">
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">{project.title}</h3>
                                <div className="flex gap-2">
                                    {project.github && (
                                        <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                                            <Github size={20} />
                                        </a>
                                    )}
                                </div>
                            </div>

                            <p className="text-gray-300 mb-6 flex-grow">{project.description}</p>

                            <div className="flex flex-wrap gap-2 mt-auto">
                                {project.tech.map((tech) => (
                                    <span key={tech} className="text-sm px-2 py-1 rounded-full bg-[rgba(0,240,255,0.1)] text-primary border border-[rgba(0,240,255,0.2)] font-[family-name:var(--font-vt323)] tracking-wide">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
