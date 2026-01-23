"use client";

import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
    Mail,
    MapPin,
    Send,
    Twitter,
    Linkedin,
    Github,
    MessageSquare,
    CheckCircle2,
    Sparkles,
    Clock,
    ArrowUpRight,
    Download,
} from "lucide-react";
import { useLoader } from "../context/LoaderContext";
import localFont from 'next/font/local';
import Background from "../component/Background";

const gondens = localFont({ src: '../fonts/Gondens-DEMO.otf' });

gsap.registerPlugin(ScrollTrigger);


const ContactMethod = ({
    icon: Icon,
    title,
    value,
    href,
    delay = 0,
    download = false
}: {
    icon: any,
    title: string,
    value: string,
    href?: string,
    delay?: number,
    download?: boolean
}) => (
    <motion.a
        href={href}
        target={href?.startsWith('http') ? "_blank" : undefined}
        rel={href?.startsWith('http') ? "noopener noreferrer" : undefined}
        download={download ? true : undefined}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay }}
        viewport={{ once: true }}
        className="contact-method group relative overflow-hidden rounded-3xl border border-zinc-800/50 bg-gradient-to-br from-zinc-900/80 to-zinc-900/40 p-8 backdrop-blur-xl transition-all hover:border-emerald-500/50 hover:shadow-2xl hover:shadow-emerald-500/10"
    >
        <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-emerald-500/10 blur-3xl transition-all duration-500 group-hover:h-40 group-hover:w-40 group-hover:bg-emerald-500/20" />

        <div className="relative z-10">
            <div className="mb-6 flex items-start justify-between">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-800/50 text-emerald-500 backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-black group-hover:shadow-lg group-hover:shadow-emerald-500/50">
                    <Icon size={24} strokeWidth={2} />
                </div>
                <ArrowUpRight
                    size={20}
                    className="translate-x-[-8px] translate-y-[8px] text-zinc-600 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:text-emerald-500 group-hover:opacity-100"
                />
            </div>

            <h3 className="mb-2 text-2xl font-bold text-white transition-colors group-hover:text-emerald-400">
                {title}
            </h3>
            <p className="text-base text-zinc-400 transition-colors group-hover:text-zinc-300">
                {value}
            </p>
        </div>
    </motion.a>
);


const SocialButton = ({
    icon: Icon,
    name,
    href,
    delay = 0
}: {
    icon: any,
    name: string,
    href: string,
    delay?: number
}) => (
    <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay }}
        viewport={{ once: true }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="group flex items-center gap-3 rounded-full border border-zinc-800/50 bg-zinc-900/50 px-6 py-3 backdrop-blur-sm transition-all hover:border-emerald-500/50 hover:bg-zinc-800/50 hover:shadow-lg hover:shadow-emerald-500/10"
    >
        <Icon size={18} className="text-zinc-500 transition-colors group-hover:text-emerald-500" />
        <span className="text-sm font-semibold uppercase tracking-wider text-zinc-400 transition-colors group-hover:text-white">
            {name}
        </span>
    </motion.a>
);

export default function ContactPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { isLoading } = useLoader();
    const [formState, setFormState] = useState<'idle' | 'sending' | 'sent'>('idle');
    const [newsletterState, setNewsletterState] = useState<'idle' | 'sending' | 'subscribed'>('idle');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [newsletterEmail, setNewsletterEmail] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setFormState('sending');
        setTimeout(() => {
            setFormState('sent');
            setTimeout(() => {
                setFormState('idle');
                setFormData({ name: '', email: '', message: '' });
            }, 3000);
        }, 1500);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleNewsletterSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setNewsletterState('sending');
        setTimeout(() => {
            setNewsletterState('subscribed');
            setTimeout(() => {
                setNewsletterState('idle');
                setNewsletterEmail('');
            }, 3000);
        }, 1500);
    };

    useEffect(() => {
        if (isLoading) return;

        const ctx = gsap.context(() => {
            const titleChars = gsap.utils.toArray<HTMLElement>(".hero-char");
            gsap.from(titleChars, {
                y: 120,
                opacity: 0,
                rotationX: -90,
                stagger: 0.05,
                duration: 1.2,
                ease: "expo.out",
            });

            gsap.from(".hero-subtitle", {
                y: 30,
                opacity: 0,
                duration: 1,
                delay: 0.5,
                ease: "power3.out",
            });

            gsap.to(".floating-orb", {
                y: (i) => (i % 2 === 0 ? 50 : -50),
                x: (i) => (i % 2 === 0 ? -30 : 30),
                duration: 8,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                stagger: 1,
            });

            gsap.from(".form-container", {
                opacity: 0,
                y: 60,
                duration: 1,
                scrollTrigger: {
                    trigger: ".form-container",
                    start: "top 80%",
                },
            });

            const stats = gsap.utils.toArray<HTMLElement>(".stat-number");
            stats.forEach((stat) => {
                gsap.from(stat, {
                    textContent: 0,
                    duration: 2,
                    ease: "power1.out",
                    snap: { textContent: 1 },
                    scrollTrigger: {
                        trigger: stat,
                        start: "top 85%",
                    },
                });
            });
        }, containerRef);

        return () => ctx.revert();
    }, [isLoading]);

    return (
        <div ref={containerRef} className="min-h-screen w-full bg-black text-white selection:bg-emerald-500/30 selection:text-emerald-400">
            <Background />

            <div className="bg-noise pointer-events-none fixed inset-0 z-50 opacity-10" />

            {/* Sticky Social Media Buttons */}
            <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4">
                <motion.a
                    href="https://twitter.com/jafar"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="group flex h-12 w-12 items-center justify-center rounded-full border-2 border-emerald-500/30 bg-black/50 backdrop-blur-sm transition-all hover:border-emerald-500 hover:bg-emerald-500/10 hover:shadow-lg hover:shadow-emerald-500/50"
                >
                    <Twitter size={20} className="text-emerald-500 transition-transform group-hover:scale-110" />
                </motion.a>
                <motion.a
                    href="https://linkedin.com/in/jafar"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="group flex h-12 w-12 items-center justify-center rounded-full border-2 border-emerald-500/30 bg-black/50 backdrop-blur-sm transition-all hover:border-emerald-500 hover:bg-emerald-500/10 hover:shadow-lg hover:shadow-emerald-500/50"
                >
                    <Linkedin size={20} className="text-emerald-500 transition-transform group-hover:scale-110" />
                </motion.a>
                <motion.a
                    href="https://github.com/jafar"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="group flex h-12 w-12 items-center justify-center rounded-full border-2 border-emerald-500/30 bg-black/50 backdrop-blur-sm transition-all hover:border-emerald-500 hover:bg-emerald-500/10 hover:shadow-lg hover:shadow-emerald-500/50"
                >
                    <Github size={20} className="text-emerald-500 transition-transform group-hover:scale-110" />
                </motion.a>
            </div>

            <div className="pointer-events-none fixed inset-0 overflow-hidden opacity-50">
                <div className="floating-orb absolute -left-[15%] top-[10%] h-[500px] w-[500px] rounded-full bg-emerald-500/10 blur-[150px]" />
                <div className="floating-orb absolute -right-[15%] top-[50%] h-[600px] w-[600px] rounded-full bg-purple-500/5 blur-[180px]" />
                <div className="floating-orb absolute left-[40%] top-[70%] h-[400px] w-[400px] rounded-full bg-blue-500/5 blur-[120px]" />
            </div>

            <section className="relative z-10 flex min-h-[85vh] w-full flex-col items-center justify-center px-6 pt-32 pb-20">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-8 flex items-center gap-3 rounded-full border border-emerald-500/30 bg-emerald-500/5 px-5 py-2 backdrop-blur-xl"
                >
                    <span className="relative flex h-2.5 w-2.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
                    </span>
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-400">
                        working in CITRIX
                    </span>
                </motion.div>

                <h1 className={`${gondens.className} mb-6 flex flex-col items-center text-center text-[12vw] font-bold leading-[1.9] tracking-[19px] sm:text-[10vw] lg:text-[8vw] uppercase`}>
                    <div className="overflow-hidden">
                        <span className="hero-char inline-block">L</span>
                        <span className="hero-char inline-block">E</span>
                        <span className="hero-char inline-block">T</span>
                        <span className="hero-char inline-block">'</span>
                        <span className="hero-char inline-block">S</span>
                    </div>
                    <div className="overflow-hidden">
                        <span className="hero-char inline-block text-emerald-500">C</span>
                        <span className="hero-char inline-block text-emerald-500">O</span>
                        <span className="hero-char inline-block text-emerald-500">N</span>
                        <span className="hero-char inline-block text-emerald-500">N</span>
                        <span className="hero-char inline-block text-emerald-500">E</span>
                        <span className="hero-char inline-block text-emerald-500">C</span>
                        <span className="hero-char inline-block text-emerald-500">T</span>
                    </div>
                </h1>

                <p className="hero-subtitle mb-12 max-w-2xl text-center text-lg text-zinc-400 sm:text-xl font-light leading-relaxed">
                    Need a security audit or vulnerability assessment?
                    <br className="hidden sm:block" />
                    Let's discuss how I can help secure your infrastructure and protect your systems.
                </p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="flex flex-wrap items-center justify-center gap-8 sm:gap-12"
                >
                    <div className="text-center">
                        <div className="mb-1 flex items-center justify-center gap-2">
                            <Clock size={16} className="text-emerald-500" />
                            <span className="stat-number text-2xl font-bold text-white">24</span>
                        </div>
                        <p className="text-xs uppercase tracking-wider text-zinc-500">Hour Response</p>
                    </div>
                    <div className="h-8 w-px bg-zinc-800" />
                    <div className="text-center">
                        <div className="mb-1 flex items-center justify-center gap-2">
                            <Sparkles size={16} className="text-emerald-500" />
                            <span className="stat-number text-2xl font-bold text-white">150</span>
                            <span className="text-2xl font-bold text-white">+</span>
                        </div>
                        <p className="text-xs uppercase tracking-wider text-zinc-500">Vulnerabilities Found</p>
                    </div>
                    <div className="h-8 w-px bg-zinc-800" />
                    <div className="text-center">
                        <div className="mb-1 flex items-center justify-center gap-2">
                            <MapPin size={16} className="text-emerald-500" />
                            <span className="text-2xl font-bold text-white">IND</span>
                        </div>
                        <p className="text-xs uppercase tracking-wider text-zinc-500">GMT +5:30</p>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1.2 }}
                    className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 "
                >
                    <span className="text-[10px] uppercase tracking-[0.3em] text-emerald-500 font-mono">
                        Reach Out
                    </span>
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="h-16 w-[1px] bg-gradient-to-b from-emerald-500/60 to-transparent"
                    />
                </motion.div>
            </section>

            <div className="relative z-10 mx-auto max-w-7xl px-6 py-24">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="mb-16 text-center"
                >
                    <h2 className="mb-4 text-4xl font-bold uppercase tracking-tight sm:text-5xl">
                        Get in <span className="text-emerald-500">Touch</span>
                    </h2>
                    <p className="text-zinc-500">Choose your preferred way to connect</p>
                </motion.div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-24">
                    <ContactMethod
                        icon={Mail}
                        title="Email Me"
                        value="jafar@itsjay.us"
                        href="mailto:jafar@itsjay.us"
                        delay={0}
                    />
                    <ContactMethod
                        icon={Download}
                        title="Download Resume"
                        value="View my complete profile"
                        href="/assets/resume.pdf"
                        download={true}
                        delay={0.1}
                    />
                    <ContactMethod
                        icon={MapPin}
                        title="Location"
                        value="Bengaluru, India (GMT +5:30)"
                        delay={0.2}
                    />
                </div>

                <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-start">
                    <div className="space-y-12">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                        >
                            <h3 className="mb-6 text-3xl font-bold uppercase tracking-tight sm:text-4xl">
                                Secure Your <span className="text-zinc-500">Infrastructure</span>
                            </h3>
                            <p className="mb-8 max-w-lg text-lg leading-relaxed text-zinc-400">
                                Specializing in penetration testing, vulnerability research, and security architecture.
                                With expertise in discovering zero-day vulnerabilities and securing critical infrastructure,
                                I help organizations stay ahead of emerging threats.
                            </p>

                            {/* <div className="space-y-4">
                                <p className="text-sm font-bold uppercase tracking-wider text-zinc-600">
                                    Connect on Social
                                </p>
                                <div className="flex flex-wrap gap-3">
                                    <SocialButton
                                        icon={Twitter}
                                        name="Twitter"
                                        href="https://twitter.com/jafar"
                                        delay={0}
                                    />
                                    <SocialButton
                                        icon={Linkedin}
                                        name="LinkedIn"
                                        href="https://linkedin.com/in/jafar"
                                        delay={0.1}
                                    />
                                    <SocialButton
                                        icon={Github}
                                        name="GitHub"
                                        href="https://github.com/jafar"
                                        delay={0.2}
                                    />
                                </div>
                            </div> */}
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            viewport={{ once: true }}
                            className="relative overflow-hidden rounded-3xl border border-zinc-800/50 bg-gradient-to-br from-zinc-900/80 to-zinc-900/40 p-8 backdrop-blur-xl"
                        >
                            <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-emerald-500/5 blur-3xl" />
                            <div className="relative z-10">
                                <Sparkles className="mb-4 text-emerald-500" size={32} />
                                <h4 className="mb-3 text-xl font-bold">Security Services</h4>
                                <ul className="space-y-3 text-sm text-zinc-400">
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 size={18} className="mt-0.5 flex-shrink-0 text-emerald-500" />
                                        <span>Comprehensive security audits</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 size={18} className="mt-0.5 flex-shrink-0 text-emerald-500" />
                                        <span>Penetration testing & red teaming</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 size={18} className="mt-0.5 flex-shrink-0 text-emerald-500" />
                                        <span>Vulnerability research & analysis</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 size={18} className="mt-0.5 flex-shrink-0 text-emerald-500" />
                                        <span>Security architecture consulting</span>
                                    </li>
                                </ul>
                            </div>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        id="contact-form"
                        className="form-container relative overflow-hidden rounded-3xl border border-zinc-800/50 bg-gradient-to-br from-zinc-900/80 to-zinc-900/40 p-8 sm:p-10 backdrop-blur-xl"
                    >
                        <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-emerald-500/10 blur-3xl" />

                        <div className="relative z-10">
                            <AnimatePresence mode="wait">
                                {formState === 'sent' ? (
                                    <motion.div
                                        key="success"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 1.1 }}
                                        className="flex min-h-[500px] flex-col items-center justify-center text-center"
                                    >
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                                            className="mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500"
                                        >
                                            <CheckCircle2 size={48} strokeWidth={2} />
                                        </motion.div>
                                        <h3 className="mb-3 text-3xl font-bold text-white">Message Sent!</h3>
                                        <p className="mb-2 text-zinc-400">
                                            Thanks for reaching out, I'll get back to you soon.
                                        </p>
                                        <p className="text-sm text-zinc-500">
                                            Usually within 24 hours
                                        </p>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="form"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                    >
                                        <div className="mb-8">
                                            <h3 className="mb-2 text-2xl font-bold">Send a Message</h3>
                                            <p className="text-sm text-zinc-500">
                                                Fill out the form below and I'll respond as soon as possible
                                            </p>
                                        </div>

                                        <form className="space-y-6" onSubmit={handleSubmit}>
                                            <div>
                                                <label htmlFor="name" className="mb-2 block text-sm font-semibold text-zinc-400">
                                                    Your Name
                                                </label>
                                                <input
                                                    id="name"
                                                    name="name"
                                                    type="text"
                                                    required
                                                    value={formData.name}
                                                    onChange={handleInputChange}
                                                    placeholder="John Doe"
                                                    className="w-full rounded-2xl border border-zinc-700/50 bg-zinc-800/30 px-6 py-4 text-white placeholder-zinc-600 backdrop-blur-sm transition-all focus:border-emerald-500 focus:bg-zinc-800/50 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                                                />
                                            </div>

                                            <div>
                                                <label htmlFor="email" className="mb-2 block text-sm font-semibold text-zinc-400">
                                                    Email Address
                                                </label>
                                                <input
                                                    id="email"
                                                    name="email"
                                                    type="email"
                                                    required
                                                    value={formData.email}
                                                    onChange={handleInputChange}
                                                    placeholder="john@example.com"
                                                    className="w-full rounded-2xl border border-zinc-700/50 bg-zinc-800/30 px-6 py-4 text-white placeholder-zinc-600 backdrop-blur-sm transition-all focus:border-emerald-500 focus:bg-zinc-800/50 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                                                />
                                            </div>

                                            <div>
                                                <label htmlFor="message" className="mb-2 block text-sm font-semibold text-zinc-400">
                                                    Your Message
                                                </label>
                                                <textarea
                                                    id="message"
                                                    name="message"
                                                    required
                                                    value={formData.message}
                                                    onChange={handleInputChange}
                                                    placeholder="Tell me about your project..."
                                                    rows={5}
                                                    className="w-full resize-none rounded-2xl border border-zinc-700/50 bg-zinc-800/30 px-6 py-4 text-white placeholder-zinc-600 backdrop-blur-sm transition-all focus:border-emerald-500 focus:bg-zinc-800/50 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                                                />
                                            </div>

                                            <motion.button
                                                type="submit"
                                                disabled={formState === 'sending'}
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-600 px-8 py-4 font-bold text-black shadow-lg shadow-emerald-500/30 transition-all hover:shadow-xl hover:shadow-emerald-500/40 disabled:cursor-not-allowed disabled:opacity-50"
                                            >
                                                <span className="relative z-10">
                                                    {formState === 'sending' ? 'Sending...' : 'Send Message'}
                                                </span>
                                                {formState !== 'sending' && (
                                                    <Send
                                                        size={20}
                                                        className="relative z-10 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                                                    />
                                                )}
                                                <div className="absolute inset-0 -z-0 bg-gradient-to-r from-emerald-400 to-emerald-500 opacity-0 transition-opacity group-hover:opacity-100" />
                                            </motion.button>
                                        </form>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </div>
            </div>

            <section className="relative z-10 mx-auto max-w-7xl px-6 py-24">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="relative overflow-hidden rounded-[3rem] border border-zinc-800/50 bg-gradient-to-br from-zinc-900/90 to-black/90 p-12 sm:p-16 backdrop-blur-xl"
                >
                    <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-emerald-500/10 blur-[100px]" />
                    <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-purple-500/5 blur-[100px]" />

                    <div className="relative z-10 grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
                        <div>
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                viewport={{ once: true }}
                                className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2"
                            >
                                <Sparkles size={16} className="text-emerald-500" />
                                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                                    Security Intelligence
                                </span>
                            </motion.div>

                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                                viewport={{ once: true }}
                                className="mb-6 text-4xl font-bold uppercase tracking-tight sm:text-5xl lg:text-6xl"
                            >
                                Stay <span className="text-emerald-500">Ahead</span> of Threats
                            </motion.h2>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                                viewport={{ once: true }}
                                className="mb-8 text-lg leading-relaxed text-zinc-400"
                            >
                                Subscribe to receive exclusive insights on the latest vulnerabilities,
                                zero-day discoveries, security research findings, and threat intelligence
                                updates directly to your inbox.
                            </motion.p>

                            <motion.ul
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.5 }}
                                viewport={{ once: true }}
                                className="space-y-3"
                            >
                                <li className="flex items-center gap-3 text-zinc-300">
                                    <CheckCircle2 size={20} className="flex-shrink-0 text-emerald-500" />
                                    <span>Monthly threat intelligence reports</span>
                                </li>
                                <li className="flex items-center gap-3 text-zinc-300">
                                    <CheckCircle2 size={20} className="flex-shrink-0 text-emerald-500" />
                                    <span>Exclusive vulnerability research</span>
                                </li>
                                <li className="flex items-center gap-3 text-zinc-300">
                                    <CheckCircle2 size={20} className="flex-shrink-0 text-emerald-500" />
                                    <span>Security best practices & tips</span>
                                </li>
                                <li className="flex items-center gap-3 text-zinc-300">
                                    <CheckCircle2 size={20} className="flex-shrink-0 text-emerald-500" />
                                    <span>Early access to new articles</span>
                                </li>
                            </motion.ul>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <div className="relative overflow-hidden rounded-3xl border border-zinc-800/50 bg-zinc-900/50 p-8 backdrop-blur-sm">
                                <AnimatePresence mode="wait">
                                    {newsletterState === 'subscribed' ? (
                                        <motion.div
                                            key="success"
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 1.1 }}
                                            className="flex min-h-[280px] flex-col items-center justify-center text-center"
                                        >
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                                                className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500"
                                            >
                                                <CheckCircle2 size={40} strokeWidth={2} />
                                            </motion.div>
                                            <h3 className="mb-3 text-2xl font-bold text-white">You're Subscribed!</h3>
                                            <p className="text-zinc-400">
                                                Welcome to the security intelligence network.
                                            </p>
                                            <p className="mt-2 text-sm text-zinc-500">
                                                Check your inbox for confirmation.
                                            </p>
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="form"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                        >
                                            <div className="mb-6">
                                                <h3 className="mb-2 text-2xl font-bold">Join the Network</h3>
                                                <p className="text-sm text-zinc-500">
                                                    Get security insights delivered to your inbox
                                                </p>
                                            </div>

                                            <form onSubmit={handleNewsletterSubmit} className="space-y-4">
                                                <div>
                                                    <label htmlFor="newsletter-email" className="mb-2 block text-sm font-semibold text-zinc-400">
                                                        Email Address
                                                    </label>
                                                    <input
                                                        id="newsletter-email"
                                                        type="email"
                                                        required
                                                        value={newsletterEmail}
                                                        onChange={(e) => setNewsletterEmail(e.target.value)}
                                                        placeholder="your@email.com"
                                                        className="w-full rounded-2xl border border-zinc-700/50 bg-zinc-800/30 px-6 py-4 text-white placeholder-zinc-600 backdrop-blur-sm transition-all focus:border-emerald-500 focus:bg-zinc-800/50 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                                                    />
                                                </div>

                                                <motion.button
                                                    type="submit"
                                                    disabled={newsletterState === 'sending'}
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                    className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-600 px-8 py-4 font-bold text-black shadow-lg shadow-emerald-500/30 transition-all hover:shadow-xl hover:shadow-emerald-500/40 disabled:cursor-not-allowed disabled:opacity-50"
                                                >
                                                    <span className="relative z-10">
                                                        {newsletterState === 'sending' ? 'Subscribing...' : 'Subscribe Now'}
                                                    </span>
                                                    {newsletterState !== 'sending' && (
                                                        <ArrowUpRight
                                                            size={20}
                                                            className="relative z-10 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                                                        />
                                                    )}
                                                    <div className="absolute inset-0 -z-0 bg-gradient-to-r from-emerald-400 to-emerald-500 opacity-0 transition-opacity group-hover:opacity-100" />
                                                </motion.button>

                                                <p className="text-center text-xs text-zinc-600">
                                                    No spam. Unsubscribe anytime. Your data is secure.
                                                </p>
                                            </form>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </section>

            <footer className="relative z-10 border-t border-zinc-900 bg-black/50 px-6 py-12 backdrop-blur-md">
                <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 sm:flex-row">
                    <p className="text-xs font-mono uppercase tracking-widest text-zinc-600">
                        © 2026 Jafar Sarif • All Rights Reserved
                    </p>
                    <p className="text-xs font-mono uppercase tracking-widest text-zinc-600">
                        Bengaluru, India • Available Worldwide
                    </p>
                </div>
            </footer>
        </div>
    );
}