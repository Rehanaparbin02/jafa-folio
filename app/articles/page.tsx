"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import localFont from 'next/font/local';
import { useRouter } from "next/navigation";
import { useLoader } from "../context/LoaderContext";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Background from "../component/Background";
import { ARTICLES } from "./articles-data";

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
            gsap.fromTo(titleRef.current,
                { opacity: 0, y: 50 },
                { opacity: 1, y: 0, duration: 1, ease: "power4.out", delay: 0.2 }
            );

            gsap.fromTo(descRef.current,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.4 }
            );

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

    // Auto-layout helper
    const getLayoutClasses = (layout: string) => {
        switch (layout) {
            case "large":
                return "md:col-span-2 md:row-span-2";
            case "medium":
                return "md:col-span-2 md:row-span-1";
            case "small":
            default:
                return "md:col-span-1 md:row-span-1";
        }
    };

    return (
        <div ref={containerRef} className="min-h-screen bg-black text-white font-sans bg-noise selection:bg-emerald-500/30 selection:text-emerald-400">
            <Background />
            <main className="max-w-7xl mx-auto px-6 md:py-24">
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

                {/* Auto-Layout Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:auto-rows-[minmax(320px,auto)]">
                    {ARTICLES.map((article) => (
                        <div
                            key={article.slug}
                            onClick={() => handleNavigate(`/articles/${article.slug}`, article.category.toUpperCase())}
                            className={`bento-card ${getLayoutClasses(article.layout)} relative group overflow-hidden rounded-[2.5rem] bg-zinc-900 border border-white/5 cursor-pointer opacity-0`}
                        >
                            <Image
                                src={article.image}
                                alt={article.title}
                                fill
                                className="object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                            {/* Arrow Icon */}
                            <div className="absolute top-8 right-8">
                                <motion.div
                                    whileHover={{ scale: 1.1, rotate: 45 }}
                                    className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20"
                                >
                                    <ArrowUpRight className="w-5 h-5 text-white" />
                                </motion.div>
                            </div>

                            {/* Featured Badge */}
                            {article.featured && (
                                <div className="absolute top-8 left-8">
                                    <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-widest border border-emerald-500/30">
                                        Featured
                                    </span>
                                </div>
                            )}

                            {/* Content */}
                            <div className={`absolute ${article.layout === "large" ? "bottom-10 left-10" : "bottom-8 left-8"}`}>
                                <h3 className={`${article.layout === "large" ? "text-4xl" : "text-2xl"} font-semibold mb-2 text-white`}>
                                    {article.title}
                                </h3>
                                {article.layout !== "small" && (
                                    <p className="text-zinc-300 text-sm">{article.description}</p>
                                )}
                            </div>

                            {/* Read More Button for Medium/Large */}
                            {article.layout === "medium" && (
                                <div className="absolute bottom-8 left-8 right-8">
                                    <div className="w-full py-3 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm text-sm font-medium group-hover:bg-white/10 transition-colors flex items-center justify-center gap-2 text-white mt-4">
                                        Read More <ArrowUpRight className="w-4 h-4" />
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}