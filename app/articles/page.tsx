"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import localFont from 'next/font/local';
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLoader } from "../context/LoaderContext";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Background from "../component/Background";

const gondens = localFont({ src: '../fonts/Gondens-DEMO.otf' });

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function ArticlesPage() {
    const router = useRouter();
    const { showLoader, isLoading } = useLoader();
    const containerRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const descRef = useRef<HTMLParagraphElement>(null);

    const handleNavigate = (href: string, text: string) => {
        showLoader(text);
        setTimeout(() => {
            router.push(href);
        }, 500);
    };

    useEffect(() => {
        if (isLoading) return;

        const ctx = gsap.context(() => {
            // On load animation for title and description
            gsap.fromTo(titleRef.current,
                { opacity: 0, y: 50 },
                { opacity: 1, y: 0, duration: 1, ease: "power4.out", delay: 0.2 }
            );

            gsap.fromTo(descRef.current,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.4 }
            );

            // On scroll animation for bento cards
            const cards = gsap.utils.toArray<HTMLElement>(".bento-card");
            cards.forEach((card) => {
                gsap.fromTo(card,
                    { opacity: 0, y: 60, scale: 0.95 },
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 0.8,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: card,
                            start: "top bottom-=100px",
                            toggleActions: "play none none reverse",
                        },
                    }
                );
            });
        }, containerRef);

        return () => ctx.revert();
    }, [isLoading]);

    return (
        <div ref={containerRef} className="min-h-screen bg-black text-white font-sans bg-noise selection:bg-emerald-500/30 selection:text-emerald-400">
            {/* Vanta NET Background */}
            <Background />
            <main className="max-w-7xl mx-auto px-6  md:py-24">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-32">
                    <h1
                        ref={titleRef}
                        className={`${gondens.className} text-5xl md:text-[6rem] font-medium tracking-tight max-w-4xl leading-[11rem] md:leading-[1.8] uppercase opacity-0`}
                    >
                        Knowledge is the ultimate defense in <span className="text-emerald-500">sophistication</span>
                    </h1>
                    <p
                        ref={descRef}
                        className="text-zinc-400 text-lg md:text-xl max-w-sm relative top-[27rem] opacity-0"
                    >
                        Exploring the frontiers of security research, zero-day analysis, and modern cryptographic architectures.
                    </p>
                </div>

                {/* Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:auto-rows-[minmax(320px,auto)]">
                    {/* Main Long Card (Left) */}
                    <div
                        onClick={() => handleNavigate("/articles/network-intrusion", "SECURITY RESEARCH")}
                        className="bento-card md:col-span-2 md:row-span-2 relative group overflow-hidden rounded-[2.5rem] bg-zinc-900 border border-white/5 cursor-pointer opacity-0"
                    >
                        <Image
                            src="/assets/articles/security_research.png"
                            alt="Security Research"
                            fill
                            className="object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                        <div className="absolute top-8 right-8">
                            <motion.div
                                whileHover={{ scale: 1.1, rotate: 45 }}
                                className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20"
                            >
                                <ArrowUpRight className="w-5 h-5 text-white" />
                            </motion.div>
                        </div>

                        <div className="absolute bottom-10 left-10">
                            <h3 className="text-4xl font-semibold mb-2 text-white">Network Intrusion</h3>
                            <p className="text-zinc-300">Advanced strategies for perimeter defense.</p>
                        </div>
                    </div>

                    {/* Small Image Card (Middle Top) */}
                    <div
                        onClick={() => handleNavigate("/articles/vulnerability-database", "INTELLIGENCE")}
                        className="bento-card md:col-span-1 md:row-span-1 relative group overflow-hidden rounded-[2.5rem] bg-zinc-900 border border-white/5 cursor-pointer opacity-0"
                    >
                        <Image
                            src="/assets/articles/vulnerability_db.png"
                            alt="Data Matrix"
                            fill
                            className="object-cover opacity-50 group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                            <ArrowUpRight className="w-5 h-5 text-emerald-400" />
                        </div>
                        <div className="absolute bottom-8 left-8">
                            <h3 className="text-2xl font-semibold text-white">Vulnerability<br />Database</h3>
                        </div>
                    </div>

                    {/* Article Card (Middle Bottom) */}
                    <div
                        onClick={() => handleNavigate("/articles/crypto-arch", "CRYPTOGRAPHY")}
                        className="bento-card md:col-span-1 md:row-span-1 relative group overflow-hidden rounded-[2.5rem] bg-zinc-900 border border-white/5 cursor-pointer opacity-0"
                    >
                        <Image
                            src="/assets/articles/vulnerability_db.png"
                            alt="Crypto Architecture"
                            fill
                            className="object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                            <ArrowUpRight className="w-5 h-5 text-emerald-400" />
                        </div>
                        <div className="absolute bottom-8 left-8">
                            <h3 className="text-2xl font-semibold text-white leading-tight">Cryptographic<br />Architectures</h3>
                            <p className="text-emerald-400/80 text-[10px] font-bold uppercase tracking-widest mt-2">New Release</p>
                        </div>
                    </div>

                    {/* Long Vertical Card (Right) */}
                    <div
                        onClick={() => handleNavigate("/articles/deep-dive-lab", "LAB ANALYSIS")}
                        className="bento-card md:col-span-2 md:row-span-1 relative group overflow-hidden rounded-[2.5rem] bg-zinc-900 border border-white/5 cursor-pointer opacity-0"
                    >
                        <Image
                            src="/assets/articles/deep_dive.png"
                            alt="Analysis Lab"
                            fill
                            className="object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                        <div className="absolute bottom-10 left-8 right-8">
                            <h3 className="text-3xl font-semibold mb-2 text-white">Deep Dive Lab</h3>
                            <p className="text-zinc-400 text-sm mb-6">Unmasking the most complex exploits in the wild.</p>
                            <div className="w-full py-3 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm text-sm font-medium group-hover:bg-white/10 transition-colors flex items-center justify-center gap-2 text-white">
                                Read More <ArrowUpRight className="w-4 h-4" />
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
