"use client";
import { motion } from "framer-motion";

const skillIcons: Record<string, string> = {
    "Python": "python",
    "C": "c",
    "Java": "openjdk",
    "JavaScript": "javascript",
    "TypeScript": "typescript",
    "SQL": "postgresql",
    "HTML/CSS": "html5",
    "TensorFlow": "tensorflow",
    "PyTorch": "pytorch",
    "Keras": "keras",
    "Scikit-learn": "scikitlearn",
    "React": "react",
    "Next.js": "nextdotjs",
    "FastAPI": "fastapi",
    "Flask": "flask",
    "Django": "django",
    "Git": "git",
    "Docker": "docker",
    "Kubernetes": "kubernetes",
    "AWS": "/aws-logo.png",
    "Azure": "/azure-logo.png",
    "Google Cloud": "googlecloud",
    "Postman": "postman",
    "Jira": "jira"
};

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
                className="text-5xl md:text-6xl font-bold mb-12 text-center text-glow text-primary animate-glitch font-[family-name:var(--font-vt323)] tracking-wider"
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
                        <h3 className="text-2xl font-bold text-secondary mb-6 border-b border-gray-700 pb-2 font-[family-name:var(--font-vt323)] tracking-wide">{category}</h3>
                        <div className="flex flex-wrap gap-3">
                            {items.map((skill) => (
                                <span
                                    key={skill}
                                    className="px-3 py-1 bg-accent/50 rounded-md text-lg text-gray-300 border border-gray-700 hover:border-primary hover:text-white transition-colors cursor-default font-[family-name:var(--font-vt323)] tracking-wide flex items-center gap-2 group"
                                >
                                    {skillIcons[skill] && (
                                        <img
                                            src={skillIcons[skill].startsWith("/") ? skillIcons[skill] : `https://cdn.simpleicons.org/${skillIcons[skill]}/ffffff`}
                                            alt={skill}
                                            className={`w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity ${skillIcons[skill].startsWith("/") ? "invert" : ""}`}
                                        />
                                    )}
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
