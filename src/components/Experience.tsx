"use client";
import { motion } from "framer-motion";
import { Calendar, Briefcase } from "lucide-react";

const experiences = [
    {
        company: "BiltzenTech Solutions",
        role: "Data Science Intern",
        date: "Jul 2025 - Present",
        location: "Bangalore, Karnataka",
        description: [
            "Managed end-to-end development on Azure DevOps, deploying a RAG-based system for contextual Q&A.",
            "Automated data workflows, reducing manual processing time by 40% across key operational processes.",
            "Enhanced data reliability by 60% through cleaning procedures and improved decision-making accuracy by 35%."
        ]
    },
    {
        company: "Red Panda Games",
        role: "AI/ML Engineering Intern",
        date: "May 2025 - Jul 2025",
        location: "Bangalore, Karnataka",
        description: [
            "Engineered scalable data pipelines with Hunyuan2.1 3D and GPU-accelerated AWS EC2 instances.",
            "Optimized task orchestration using Redis and Celery, reducing job latency by 35%.",
            "Enhanced asset quality via advanced prompt engineering, improving output realism by 25%."
        ]
    },
    {
        company: "Streamly",
        role: "AI SDE Associate",
        date: "Apr 2025 - Jun 2025",
        location: "Dublin, Ireland",
        description: [
            "Engineered multi-agent systems with LLMs, enhancing natural language understanding by 40%.",
            "Developed and deployed over 15 RESTful APIs with FastAPI, reducing system latency by 30%.",
            "Implemented desktop automation solutions using showUI, increasing automation efficiency by 25%."
        ]
    }
];

export default function Experience() {
    return (
        <section className="py-20 px-4 md:px-10 max-w-6xl mx-auto">
            <motion.h2
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="text-4xl font-bold mb-12 text-center text-glow text-primary"
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

                        <div className="glass-card p-6 rounded-xl hover:bg-[rgba(255,255,255,0.05)] transition-colors">
                            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                                <div>
                                    <h3 className="text-2xl font-semibold text-white">{exp.role}</h3>
                                    <p className="text-secondary font-medium">{exp.company}</p>
                                </div>
                                <div className="flex flex-col md:items-end mt-2 md:mt-0 text-gray-400 text-sm">
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
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
