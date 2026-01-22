"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { ArrowLeft, Clock, Calendar, Share2, Bookmark } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import localFont from 'next/font/local';
import { useLoader } from "../../context/LoaderContext";

const gondens = localFont({ src: '../../fonts/Gondens-DEMO.otf' });

const ARTICLES_DATA: Record<string, any> = {
    "network-intrusion": {
        title: "Network Intrusion: Advanced Perimeter Defense",
        description: "Exploring modern strategies for securing corporate perimeters against sophisticated state-sponsored actors.",
        date: "Oct 24, 2024",
        readTime: "12 min read",
        category: "Security Research",
        image: "/assets/articles/security_research.png",
        content: [
            {
                type: "h2",
                text: "The Evolving Landscape of Network Security"
            },
            {
                type: "p",
                text: "In an era where perimeter-less architectures are becoming the norm, the concept of network intrusion defense has undergone a radical transformation. No longer can we rely solely on static firewalls and signature-based detection systems."
            },
            {
                type: "image",
                src: "/assets/articles/security_research.png",
                caption: "Visualization of a multi-vector intrusion attempt."
            },
            {
                type: "p",
                text: "Sophisticated attackers now use a combination of social engineering, zero-day vulnerabilities, and lateral movement to bypass traditional security measures. Modern defense requires a zero-trust approach where every request is verified, regardless of its origin."
            },
            {
                type: "h2",
                text: "Implementing Zero-Trust Architecture"
            },
            {
                type: "p",
                text: "The first step in modern perimeter defense is moving away from the 'castle and moat' mentality. Instead, we implement micro-segmentation and continuous identity verification. This ensures that even if an attacker gains initial access, their ability to move laterally within the network is severely restricted."
            },
            {
                type: "quote",
                text: "Security is not a product, but a process. It requires constant vigilance and adaptation to new threats as they emerge."
            }
        ]
    },
    "vulnerability-database": {
        title: "The Global Vulnerability Matrix",
        description: "A deep dive into how zero-day markets operate and the economics of vulnerability disclosure.",
        date: "Oct 20, 2024",
        readTime: "8 min read",
        category: "Intelligence",
        image: "/assets/articles/vulnerability_db.png",
        content: [
            {
                type: "h2",
                text: "The Economics of Zero-Days"
            },
            {
                type: "p",
                text: "The market for vulnerabilities has grown into a multi-billion dollar industry. From bug bounty programs to private vulnerability brokers, the value of a high-impact exploit has never been higher."
            },
            {
                type: "p",
                text: "Understanding this economy is crucial for defenders. It helps us prioritize which systems to harden first based on the 'cost to exploit' for an attacker."
            }
        ]
    },
    "deep-dive-lab": {
        title: "Deep Dive: Analyzing the latest UEFI Rootkits",
        description: "Unmasking the most complex exploits that live below the operating system layer.",
        date: "Oct 15, 2024",
        readTime: "15 min read",
        category: "Lab Analysis",
        image: "/assets/articles/deep_dive.png",
        content: [
            {
                type: "h2",
                text: "Below the OS: The Final Frontier"
            },
            {
                type: "p",
                text: "Rootkits that reside in the firmware are the ultimate stealth weapons. They can survive OS re-installs and disk wipes, making them incredibly difficult to detect and remove."
            },
            {
                type: "p",
                text: "In this lab analysis, we tear down a recently discovered firmware implant and show how it manages to hook the boot process before any security software can even initialize."
            }
        ]
    },
    "crypto-arch": {
        title: "Modern Cryptographic Architectures",
        description: "How post-quantum algorithms and hardware-backed security are shaping the future of digital trust.",
        date: "Oct 28, 2024",
        readTime: "10 min read",
        category: "Cryptography",
        image: "/assets/articles/vulnerability_db.png",
        content: [
            {
                type: "h2",
                text: "The Post-Quantum Era"
            },
            {
                type: "p",
                text: "As quantum computing capabilities advance, traditional asymmetric encryption like RSA and ECC face an existential threat. The transition to Post-Quantum Cryptography (PQC) is no longer a theoretical exercise but a practical necessity for long-term data security."
            },
            {
                type: "h2",
                text: "Hardware-Locked Security"
            },
            {
                type: "p",
                text: "Software alone cannot guarantee security. Modern architectures are moving towards hardware-backed keys and TEEs (Trusted Execution Environments) to ensure that even a compromised operating system cannot leak the most sensitive cryptographic secrets."
            }
        ]
    }
};

export default function ArticlePage() {
    const params = useParams();
    const router = useRouter();
    const { showLoader } = useLoader();
    const slug = params.slug as string;
    const article = ARTICLES_DATA[slug];

    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    if (!article) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">Article Not Found</h1>
                    <Link href="/articles" className="text-emerald-500 hover:underline">Back to Articles</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white font-sans selection:bg-emerald-500/30">
            {/* Reading Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-emerald-500 origin-left z-[110]"
                style={{ scaleX }}
            />

            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-[100] px-6 py-8 flex justify-between items-center pointer-events-none">
                <button
                    onClick={() => {
                        showLoader("RETURNING");
                        setTimeout(() => router.push("/articles"), 100);
                    }}
                    className="pointer-events-auto h-12 px-6 rounded-full bg-white/5 backdrop-blur-md border border-white/10 flex items-center gap-2 hover:bg-white/10 transition-all group"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    <span className="text-sm font-medium">Back</span>
                </button>

                <div className="flex gap-3 pointer-events-auto">
                    <button className="w-12 h-12 rounded-full bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all">
                        <Bookmark className="w-4 h-4" />
                    </button>
                    <button className="w-12 h-12 rounded-full bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all">
                        <Share2 className="w-4 h-4" />
                    </button>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative w-full h-[80vh] min-h-[600px] overflow-hidden">
                <motion.div
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 0.6 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="absolute inset-0"
                >
                    <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        className="object-cover"
                        priority
                    />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                <div className="absolute inset-0 flex flex-col justify-end max-w-5xl mx-auto px-6 pb-20 leading-tight">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                    >
                        <span className="px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold uppercase tracking-widest border border-emerald-500/20 mb-8 inline-block">
                            {article.category}
                        </span>
                        <h1 className={`${gondens.className} text-5xl md:text-8xl font-medium mb-8 leading-[1.3] md:leading-[1.2] uppercase tracking-tighter`}>
                            {article.title}
                        </h1>

                        <div className="flex flex-wrap items-center gap-8 text-zinc-400">
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-emerald-500/60" />
                                <span className="text-sm uppercase tracking-wider font-medium">{article.date}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-emerald-500/60" />
                                <span className="text-sm uppercase tracking-wider font-medium">{article.readTime}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-zinc-800 border border-white/10" />
                                <span className="text-sm uppercase tracking-wider font-medium">Jafar Sarif</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Content Section */}
            <main className="max-w-3xl mx-auto px-6 py-24">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="prose prose-invert prose-emerald max-w-none"
                >
                    <p className="text-xl md:text-2xl text-zinc-300 font-light leading-relaxed mb-16 italic border-l-2 border-emerald-500/30 pl-8">
                        {article.description}
                    </p>

                    {article.content.map((block: any, idx: number) => {
                        if (block.type === "h2") {
                            return (
                                <h2 key={idx} className="text-3xl md:text-4xl font-semibold mt-20 mb-8 text-white">
                                    {block.text}
                                </h2>
                            );
                        }
                        if (block.type === "p") {
                            return (
                                <p key={idx} className="text-lg md:text-xl text-zinc-400 leading-relaxed mb-8">
                                    {block.text}
                                </p>
                            );
                        }
                        if (block.type === "quote") {
                            return (
                                <blockquote key={idx} className="my-16 py-8 border-y border-white/10 relative overflow-hidden">
                                    <div className="absolute top-0 left-0 w-12 h-1 bg-emerald-500/40" />
                                    <p className="text-3xl md:text-4xl font-medium text-emerald-50 leading-tight">
                                        "{block.text}"
                                    </p>
                                </blockquote>
                            );
                        }
                        if (block.type === "image") {
                            return (
                                <figure key={idx} className="my-16">
                                    <div className="relative aspect-video rounded-[2rem] overflow-hidden border border-white/10">
                                        <Image src={block.src} alt={block.caption} fill className="object-cover" />
                                    </div>
                                    <figcaption className="text-center text-sm text-zinc-500 mt-4 uppercase tracking-widest">{block.caption}</figcaption>
                                </figure>
                            );
                        }
                        return null;
                    })}
                </motion.div>

                {/* Footer / CTA */}
                <footer className="mt-32 pt-16 border-t border-white/5">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                        <div>
                            <h4 className="text-sm font-bold text-zinc-500 uppercase tracking-widest mb-2">Next Article</h4>
                            <Link href="#" className="text-2xl font-semibold hover:text-emerald-400 transition-colors">Economics of Zero-Day Markets</Link>
                        </div>
                        <button className="px-8 py-4 rounded-full bg-emerald-500 text-black font-bold hover:bg-emerald-400 transition-all transform hover:scale-105">
                            Subscribe to Newsletter
                        </button>
                    </div>
                </footer>
            </main>
        </div>
    );
}
