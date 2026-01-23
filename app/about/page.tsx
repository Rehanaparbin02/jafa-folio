"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import localFont from 'next/font/local';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useScroll, useTransform } from "framer-motion";
import { Shield, Target, Zap, Code, Cpu, Mail, MapPin, Globe, ArrowRight } from "lucide-react";
import { useLoader } from "../context/LoaderContext";
import Background from "../component/Background";

const gondens = localFont({ src: '../fonts/Gondens-DEMO.otf' });

gsap.registerPlugin(ScrollTrigger);

const ExperienceItem = ({ year, company, role, description }: { year: string, company: string, role: string, description: string }) => (
    <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="group relative border-l border-zinc-700 pl-8 pb-12 last:pb-0"
    >
        <div className="absolute left-[-5px] top-0 h-2.5 w-2.5 rounded-full bg-zinc-500 transition-colors group-hover:bg-green-500" />
        <span className="mb-2 block text-sm font-mono text-zinc-500">{year}</span>
        <h3 className="text-4xl tracking-wider text-green-500 uppercase leading-[1.1] font-jakarta font-extrabold">{role}</h3>
        <p className="text-zinc-400 font-medium">{company}</p>
        <p className="mt-4 max-w-xl text-zinc-500 leading-relaxed">{description}</p>
    </motion.div>
);

const SkillBadge = ({ skill }: { skill: string }) => (
    <span className="relative overflow-hidden rounded-full border border-zinc-800 bg-zinc-900/50 px-6 py-2 text-sm font-medium text-zinc-300 backdrop-blur-sm transition-all hover:border-zinc-600 hover:text-white group">
        <div className="absolute inset-0 translate-y-full bg-zinc-800 transition-transform duration-300 group-hover:translate-y-0 -z-10" />
        {skill}
    </span>
);

export default function Page() {
    const containerRef = useRef<HTMLDivElement>(null);
    const heroRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const { isLoading } = useLoader();

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -100]);
    const opacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

    useEffect(() => {
        if (isLoading) return;
        if (!containerRef.current) return;

        const ctx = gsap.context(() => {
            // Parallax effect for the main portrait
            gsap.to(".parallax-img", {
                y: -100,
                ease: "none",
                scrollTrigger: {
                    trigger: ".parallax-img",
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true,
                },
            });

            // Split text reveal for headings
            const h2s = document.querySelectorAll("h2");
            h2s.forEach((h2) => {
                gsap.from(h2, {
                    y: 60,
                    opacity: 0,
                    duration: 1,
                    scrollTrigger: {
                        trigger: h2,
                        start: "top 90%",
                        toggleActions: "play none none reverse",
                    },
                });
            });
        }, containerRef);

        return () => ctx.revert();
    }, [isLoading]);

    return (
        <div ref={containerRef} className="min-h-screen w-full bg-black text-white selection:bg-zinc-100 selection:text-black">
            {/* Vanta NET Background */}
            <Background />

            {/* Noise Overlay */}
            <div className="bg-noise pointer-events-none fixed inset-0 z-50 opacity-10" />

            {/* Hero Section */}
            <section ref={heroRef} className="relative flex h-screen w-full flex-col items-center justify-center overflow-visible px-6 z-10">
                <motion.div style={{ y: heroY, opacity }} className="relative z-10 flex flex-col items-center text-center">
                    <div className="mb-4 flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/50 px-4 py-1.5 backdrop-blur-sm">
                        <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-mono">Status: Ready for research</span>
                    </div>
                    <h1
                        ref={titleRef}
                        className="text-[15vw] font-black leading-none sm:text-[18vw] uppercase tracking-[0.25em] mr-[-0.25em]"
                        style={{ fontFamily: 'var(--font-anton)' }}
                    >
                        ABOUT
                    </h1>
                    <p className="text-2xl tracking-[0.5em] text-green-500 sm:text-3xl uppercase font-jakarta font-bold -mt-4">
                        Jafar Sarif
                    </p>
                </motion.div>

                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
                    <span className="text-[10px] uppercase tracking-[0.3em] text-green-500/60 font-mono">Scroll to explore</span>
                    <div className="h-12 w-[1px] bg-gradient-to-b from-green-500/40 to-transparent" />
                </div>
            </section>

            {/* Main Content */}
            <div className="relative z-10 mx-auto max-w-7xl px-6 py-24 sm:px-12">

                {/* Intro Section with Image */}
                <div className="grid gap-20 lg:grid-cols-2 items-start">
                    <div className="relative group">
                        <div className="overflow-hidden rounded-2xl bg-zinc-900/80 backdrop-blur-sm border border-zinc-800 aspect-[4/5] parallax-img">
                            <Image
                                src="/assets/jafar_portrait.png"
                                alt="Jafar Sarif Portrait"
                                fill
                                className="object-cover grayscale hover:grayscale-0 transition-all duration-1000 scale-110 group-hover:scale-100"
                            />
                        </div>
                        {/* Decorative frame overlay */}
                        <div className="absolute -inset-4 border border-zinc-100/10 rounded-3xl -z-10 group-hover:-inset-6 transition-all duration-700" />

                        <div className="mt-8 flex gap-8">
                            <div>
                                <p className="text-[10px] uppercase text-zinc-600 font-mono mb-2">Based in</p>
                                <p className="flex items-center gap-2 text-zinc-300">
                                    <MapPin size={16} className="text-green-500" />
                                    Bengaluru, IND
                                </p>
                            </div>
                            <div>
                                <p className="text-[10px] uppercase text-zinc-600 font-mono mb-2">Focus</p>
                                <p className="flex items-center gap-2 text-zinc-300">
                                    <Shield size={16} className="text-green-500" />
                                    Security Research
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-12">
                        <div className="space-y-6">
                            <h2 className="text-4xl sm:text-6xl uppercase tracking-tight leading-[1.1] font-jakarta font-extrabold">
                                Cracking code,<br />
                                <span className="text-green-500">securing horizons.</span>
                            </h2>
                            <div className="h-1 w-20 bg-zinc-100" />
                            <p className="text-xl leading-relaxed text-zinc-400 font-light">
                                I&apos;m a Security Research Engineer with a passion for uncovering the unseen.
                                With over five years of experience in the shadows of code, I specialize in
                                penetration testing, vulnerability research, and architecting systems that
                                remain resilient against the most sophisticated threats.
                            </p>
                        </div>

                        <div className="grid gap-8 sm:grid-cols-2">
                            <div className="space-y-3">
                                <div className="flex items-center gap-3 text-white">
                                    <Target size={20} className="text-green-500" />
                                    <h4 className="font-bold uppercase tracking-widest text-sm">Mission</h4>
                                </div>
                                <p className="text-zinc-500 text-sm leading-relaxed">
                                    To push the boundaries of digital security and build a safer internet for
                                    critical infrastructure worldwide.
                                </p>
                            </div>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3 text-white">
                                    <Zap size={20} className="text-green-500" />
                                    <h4 className="font-bold uppercase tracking-widest text-sm">Approach</h4>
                                </div>
                                <p className="text-zinc-500 text-sm leading-relaxed">
                                    Analytical, adversarial, and iterative. Every vulnerability found is a
                                    lesson learned in defense.
                                </p>
                            </div>
                        </div>

                        <div className="pt-8">
                            <div className="flex items-center gap-3 mb-6">
                                <Code size={20} className="text-green-500" />
                                <h4 className="font-bold uppercase tracking-widest text-sm text-zinc-400">Core Expertise</h4>
                            </div>
                            <div className="flex flex-wrap gap-3">
                                {["Vulnerability Research", "Exploit Dev", "Reverse Engineering", "Malware Analysis", "Cloud Security", "Kernel Hacking"].map((skill) => (
                                    <SkillBadge key={skill} skill={skill} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Experience Section */}
                <div className="mt-48">
                    <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <h2 className="text-4xl sm:text-7xl uppercase leading-none font-jakarta font-extrabold">
                            The <span className="text-green-500">Journey</span>
                        </h2>
                        <p className="max-w-xs text-zinc-500 text-sm uppercase tracking-widest">
                            A decade-long pursuit of digital excellence and systemic security.
                        </p>
                    </div>

                    <div className="grid gap-16 lg:grid-cols-3">
                        <div className="lg:col-span-2 space-y-4">
                            <ExperienceItem
                                year="2020 — PRE"
                                company="CITRIX"
                                role="Security Research Engineer"
                                description="Leading edge vulnerability research on enterprise virtualization and cloud infrastructure. Discovering and mitigating critical zero-day vulnerabilities."
                            />
                            <ExperienceItem
                                year="2018 — 2020"
                                company="INFRASEC SYSTEMS"
                                role="Senior Security Analyst"
                                description="Conducted comprehensive penetration tests and security architecture reviews for Fortune 500 clients in the energy sector."
                            />
                            <ExperienceItem
                                year="2016 — 2018"
                                company="CYBERDOME"
                                role="Security Researcher"
                                description="focused on malware analysis and behavioral threat detection mechanisms for localized infrastructure."
                            />
                        </div>

                        <div className="space-y-8 lg:border-l lg:border-zinc-800 lg:pl-16">
                            <div className="p-8 rounded-2xl bg-zinc-900/50 backdrop-blur-sm border border-zinc-800">
                                <h5 className="font-mono text-[10px] uppercase text-zinc-500 mb-6 flex items-center gap-2">
                                    <Cpu size={14} /> System Specs
                                </h5>
                                <ul className="space-y-4">
                                    {[
                                        { label: "OS", value: "Arch Linux / Kali" },
                                        { label: "Hardware", value: "Custom Lab Build" },
                                        { label: "Editor", value: "Neovim / VS Code" },
                                        { label: "Coffee", value: "Double Espresso" }
                                    ].map((spec) => (
                                        <li key={spec.label} className="flex justify-between items-center text-sm">
                                            <span className="text-zinc-600 uppercase tracking-tighter">{spec.label}</span>
                                            <span className="text-zinc-300 font-mono">{spec.value}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="group relative overflow-hidden rounded-2xl p-8 bg-zinc-100 text-black">
                                <h5 className="font-bold uppercase tracking-tight text-xl mb-4">Let&apos;s collaborate</h5>
                                <p className="text-zinc-600 text-sm mb-8">Currently open for research collaborations and high-stakes security consulting.</p>
                                <a
                                    href="mailto:jafarsarif10@gmail.com"
                                    className="flex items-center justify-between w-full border-b border-black/20 pb-2 hover:border-green-500 transition-colors"
                                >
                                    <span className="font-medium">Get in touch</span>
                                    <ArrowRight size={18} className="text-green-600" />
                                </a>
                                {/* Decorative element */}
                                <div className="absolute -bottom-4 -right-4 h-24 w-24 bg-black/5 rounded-full" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quote Section */}
                <section className="mt-48 flex flex-col items-center justify-center py-24 text-center border-t border-zinc-900">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                    >
                        <div className="mb-8 text-green-500/40">
                            <Globe size={48} className="mx-auto animate-[spin_10s_linear_infinite]" />
                        </div>
                        <blockquote className="max-w-4xl text-3xl sm:text-5xl font-light italic leading-tight text-zinc-300">
                            &ldquo;Security is not a destination, but a relentless journey through the layers of complexity.&rdquo;
                        </blockquote>
                        <p className="mt-8 font-mono text-zinc-600 uppercase tracking-widest text-xs">&mdash; JAFAR SARIF, 2026</p>
                    </motion.div>
                </section>

            </div>

            {/* Footer-like Contact Block */}
            <footer className="relative z-10 w-full px-6 py-12 border-t border-zinc-900 bg-black/50 backdrop-blur-md">
                <div className="mx-auto max-w-7xl flex flex-col md:flex-row justify-between items-center gap-8">
                    <p className="text-zinc-500 text-xs font-mono tracking-tighter uppercase">© 2026 Jafar Sarif • Domain Research</p>
                    <div className="flex gap-12 text-zinc-400">
                        <a href="#" className="hover:text-white transition-colors flex items-center gap-2">
                            <Globe size={14} /> <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-600">Twitter</span>
                        </a>
                        <a href="#" className="hover:text-white transition-colors flex items-center gap-2">
                            <Code size={14} /> <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-600">GitHub</span>
                        </a>
                        <a href="#" className="hover:text-white transition-colors flex items-center gap-2">
                            <Mail size={14} /> <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-600">Email</span>
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
}