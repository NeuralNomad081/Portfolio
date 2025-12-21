"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Loader2, User, Bot } from "lucide-react";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Message {
    role: "user" | "assistant";
    content: string;
}

const Typewriter = ({ content }: { content: string }) => {
    const [displayedContent, setDisplayedContent] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (currentIndex < content.length) {
            const timeout = setTimeout(() => {
                setDisplayedContent((prev) => prev + content[currentIndex]);
                setCurrentIndex((prev) => prev + 1);
            }, 10);
            return () => clearTimeout(timeout);
        }
    }, [currentIndex, content]);

    return (
        <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
                a: ({ node, ...props }) => <a {...props} className="text-primary hover:underline" target="_blank" rel="noopener noreferrer" />,
                ul: ({ node, ...props }) => <ul {...props} className="list-disc list-outside ml-4 mt-1 space-y-1" />,
                li: ({ node, ...props }) => <li {...props} className="mb-1" />,
                p: ({ node, ...props }) => <p {...props} className="mb-2 last:mb-0" />
            }}
        >
            {displayedContent}
        </ReactMarkdown>
    );
};

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { role: "assistant", content: "Hi! I can answer questions about my experience and resume. Ask me anything!" },
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage = input.trim();
        setInput("");
        setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
        setIsLoading(true);

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ message: userMessage }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessages((prev) => [
                    ...prev,
                    { role: "assistant", content: data.response },
                ]);
            } else {
                setMessages((prev) => [
                    ...prev,
                    { role: "assistant", content: "Sorry, something went wrong. Please try again." },
                ]);
            }
        } catch (error) {
            console.error("Chat error:", error);
            setMessages((prev) => [
                ...prev,
                { role: "assistant", content: "Sorry, I couldn't reach the server. Please check your connection." },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <AnimatePresence>
                {!isOpen && (
                    <motion.button
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setIsOpen(true)}
                        className="fixed bottom-6 right-6 p-4 bg-primary text-white rounded-full shadow-lg z-50 hover:shadow-xl transition-shadow"
                        aria-label="Open Chat"
                    >
                        <MessageCircle size={28} />
                    </motion.button>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.9 }}
                        className="fixed bottom-6 right-6 w-80 md:w-96 h-[500px] bg-[var(--color-card-background)] backdrop-blur-md border border-[var(--color-border)] rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden font-[family-name:var(--font-vt323)]"
                    >
                        {/* Header */}
                        <div className="p-4 bg-primary/10 border-b border-[var(--color-border)] flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <div className="p-2 bg-primary/20 rounded-full">
                                    <Bot size={20} className="text-primary" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-white text-xl animate-glitch">Shashwat's AI Twin</h3>
                                    <p className="text-sm text-gray-400">Ask me anything! 🚀</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-1 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white"
                                aria-label="Close Chat"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {messages.map((msg, index) => (
                                <div
                                    key={index}
                                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                                >
                                    <div
                                        className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.role === "user"
                                            ? "bg-primary text-white rounded-br-none"
                                            : "bg-white/10 text-gray-200 rounded-bl-none"
                                            }`}
                                    >
                                        <div className="prose prose-sm prose-invert max-w-none break-words leading-relaxed font-[family-name:var(--font-vt323)] text-lg tracking-wide">
                                            {msg.role === "assistant" && index === messages.length - 1 && isLoading === false ? (
                                                <Typewriter content={msg.content} />
                                            ) : (
                                                <ReactMarkdown
                                                    remarkPlugins={[remarkGfm]}
                                                    components={{
                                                        a: ({ node, ...props }) => <a {...props} className="text-primary hover:underline" target="_blank" rel="noopener noreferrer" />,
                                                        ul: ({ node, ...props }) => <ul {...props} className="list-disc list-outside ml-4 mt-1 space-y-1" />,
                                                        li: ({ node, ...props }) => <li {...props} className="mb-1" />,
                                                        p: ({ node, ...props }) => <p {...props} className="mb-2 last:mb-0" />
                                                    }}
                                                >
                                                    {msg.content}
                                                </ReactMarkdown>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="bg-white/10 p-3 rounded-2xl rounded-bl-none">
                                        <Loader2 size={16} className="animate-spin text-gray-400" />
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <form onSubmit={handleSubmit} className="p-4 border-t border-[var(--color-border)] bg-[var(--color-card-background)]">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Ask about my experience..."
                                    className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary/50 placeholder:text-gray-500"
                                />
                                <button
                                    type="submit"
                                    disabled={!input.trim() || isLoading}
                                    className="p-2 bg-primary text-white rounded-full hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    aria-label="Send message"
                                >
                                    <Send size={18} />
                                </button>
                            </div>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
