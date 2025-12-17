"use client";
import { motion } from "framer-motion";

const skills = {
    Languages: ["Python", "C", "Java", "JavaScript", "TypeScript", "SQL", "HTML/CSS"],
    Frameworks: ["TensorFlow", "PyTorch", "Keras", "Scikit-learn", "React", "Next.js", "FastAPI", "Flask", "Django"],
    Tools: ["Git", "Docker", "Kubernetes", "AWS", "Azure", "Google Cloud", "Postman", "Jira"]
};

export default function Skills() {
    return (
        <section className="py-20 px-4 md:px-10 max-w-6xl mx-auto">
            <motion.h2
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="text-4xl font-bold mb-12 text-center text-glow text-primary"
            >
                Technical Skills
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {Object.entries(skills).map(([category, items], index) => (
                    <motion.div
                        key={category}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.2 }}
                        className="glass-card p-6 rounded-xl hover:bg-[rgba(255,255,255,0.05)] transition-colors"
                    >
                        <h3 className="text-xl font-bold text-secondary mb-6 border-b border-gray-700 pb-2">{category}</h3>
                        <div className="flex flex-wrap gap-3">
                            {items.map((skill) => (
                                <span
                                    key={skill}
                                    className="px-3 py-1 bg-accent/50 rounded-md text-sm text-gray-300 border border-gray-700 hover:border-primary hover:text-white transition-colors cursor-default"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
