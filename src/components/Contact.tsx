"use client";
import React from 'react';
import { motion } from "framer-motion";
import { Mail, Linkedin, Github, Send } from "lucide-react";

export default function Contact() {
    return (
        <section className="py-20 px-4 md:px-10 max-w-4xl mx-auto text-center">
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-5xl md:text-6xl font-bold mb-8 text-glow text-primary animate-glitch font-[family-name:var(--font-vt323)] tracking-wider"
            >
                Get In Touch
            </motion.h2>

            <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="text-xl text-gray-400 mb-12"
            >
                I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
            </motion.p>

            <div className="flex flex-col md:flex-row justify-center gap-6">
                <motion.a
                    href="mailto:shashwatp011@gmail.com"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="glass-card flex items-center justify-center gap-3 px-8 py-4 rounded-full text-white hover:bg-primary/20 hover:border-primary transition-all group"
                >
                    <Mail className="group-hover:text-primary transition-colors" />
                    <span>shashwatp011@gmail.com</span>
                </motion.a>

                <motion.a
                    href="https://linkedin.com/in/shashwat-pandey-900a09197"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="glass-card flex items-center justify-center gap-3 px-8 py-4 rounded-full text-white hover:bg-secondary/20 hover:border-secondary transition-all group"
                >
                    <Linkedin className="group-hover:text-secondary transition-colors" />
                    <span>LinkedIn</span>
                </motion.a>

                <motion.a
                    href="https://github.com/NeuralNomad081"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="glass-card flex items-center justify-center gap-3 px-8 py-4 rounded-full text-white hover:bg-white/10 hover:border-white transition-all group"
                >
                    <Github className="group-hover:text-white transition-colors" />
                    <span>GitHub</span>
                </motion.a>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-16 p-8 glass-card rounded-2xl max-w-2xl mx-auto"
            >
                <h3 className="text-3xl font-bold mb-4 font-[family-name:var(--font-vt323)] tracking-wide text-primary">Send a direct message</h3>
                <ContactForm />
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="mt-12 flex justify-center"
            >
                <div className="w-64 h-auto rounded-lg overflow-hidden border border-secondary/30 shadow-[0_0_15px_rgba(112,0,255,0.2)]">
                    <img
                        src="https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3dGphdGJscm1sZWVha2R0dWVrazFtazN2eG1idmxmMm5venkyZ2hsYyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/MT5UUV1d4CXE2A37Dg/giphy.gif"
                        alt="Signing Off"
                        className="w-full h-full object-cover"
                    />
                </div>
            </motion.div>

            <footer className="mt-20 text-gray-600 text-sm">
                © {new Date().getFullYear()} Shashwat Pandey. All rights reserved.
            </footer>
        </section>
    );
}

function ContactForm() {
    const [status, setStatus] = React.useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = React.useState('');

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setStatus('loading');
        setErrorMessage('');

        const formData = new FormData(event.currentTarget);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            message: formData.get('message'),
        };

        try {
            const response = await fetch('/api/send', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Failed to send message');
            }

            setStatus('success');
            (event.target as HTMLFormElement).reset();
        } catch (error) {
            console.error(error);
            setStatus('error');
            setErrorMessage(error instanceof Error ? error.message : 'Something went wrong');
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                    name="name"
                    required
                    type="text"
                    placeholder="Name"
                    disabled={status === 'loading'}
                    className="w-full bg-accent/30 border border-gray-700 rounded-lg p-3 focus:border-primary focus:outline-none text-white disabled:opacity-50"
                />
                <input
                    name="email"
                    required
                    type="email"
                    placeholder="Email"
                    disabled={status === 'loading'}
                    className="w-full bg-accent/30 border border-gray-700 rounded-lg p-3 focus:border-primary focus:outline-none text-white disabled:opacity-50"
                />
            </div>
            <textarea
                name="message"
                required
                placeholder="Message"
                rows={4}
                disabled={status === 'loading'}
                className="w-full bg-accent/30 border border-gray-700 rounded-lg p-3 focus:border-primary focus:outline-none text-white disabled:opacity-50"
            ></textarea>

            {status === 'error' && (
                <p className="text-red-400 text-sm">{errorMessage}</p>
            )}

            {status === 'success' && (
                <p className="text-green-400 text-sm">Message sent successfully! I'll get back to you soon.</p>
            )}

            <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full bg-gradient-to-r from-primary to-secondary text-white font-bold py-3 rounded-lg hover:opacity-90 transition-opacity flex justify-center items-center gap-2 font-[family-name:var(--font-vt323)] text-xl tracking-wider disabled:opacity-70 disabled:cursor-not-allowed"
            >
                {status === 'loading' ? (
                    <>Sending...</>
                ) : (
                    <><Send size={18} /> Send Message</>
                )}
            </button>
        </form>
    );
}
