"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useLoader } from "../context/LoaderContext";

export default function BottomNav() {
    const pathname = usePathname();
    const router = useRouter();
    const { showLoader } = useLoader();
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    // Map routes to loader text
    const loaderTextMap: Record<string, string> = {
        "/": "JAFAR SARIF",
        "/about": "KNOW ME MORE",
        "/blog": "BEYOND THE CODE",
        "/contact": "SAY HELLO"
    };

    const menuItems = [
        {
            title: "Home",
            icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
            ),
            href: "/"
        },
        {
            title: "Blog",
            icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="7" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>
            ),
            href: "/blog"
        },
        {
            title: "About",
            icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
            ),
            href: "/about"
        },
        {
            title: "Connect",
            icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
            ),
            href: "/contact"
        }
    ];

    return (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100]">
            <motion.nav
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="relative flex items-center gap-1.5 p-2 rounded-[2.5rem] bg-zinc-950/90 backdrop-blur-3xl border border-white/10 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.7)]"
                onMouseLeave={() => setHoveredIndex(null)}
            >
                {/* Profile Section */}
                <div className="flex items-center gap-3 pl-2 pr-4 border-r border-white/5 group cursor-default">
                    <div className="relative h-11 w-11 overflow-hidden rounded-full border border-white/10 bg-zinc-900 shadow-inner">
                        <img
                            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Jason&backgroundColor=b6e3f4"
                            alt="Jafar"
                            className="h-full w-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-110"
                        />
                        <div className="absolute bottom-0.5 right-0.5 h-3 w-3 rounded-full border-2 border-zinc-950 bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xs font-black text-white tracking-tight uppercase leading-none mb-0.5">Jafar Sarif</span>
                        <div className="flex items-center gap-1.5">
                            <span className="relative flex h-1.5 w-1.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                            </span>
                            <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-[0.1em]">Online</span>
                        </div>
                    </div>
                </div>

                {/* Nav Items Container */}
                <div className="flex items-center gap-1">
                    {menuItems.map((item, index) => {
                        const isActive = pathname === item.href;
                        const isHovered = hoveredIndex === index;
                        const showLabel = isHovered || isActive;

                        return (
                            <button
                                key={item.title}
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (pathname !== item.href) {
                                        // Show loader with appropriate text
                                        showLoader(loaderTextMap[item.href] || "LOADING");
                                        // Navigate after a brief delay
                                        setTimeout(() => {
                                            router.push(item.href);
                                        }, 100);
                                    }
                                }}
                                onMouseEnter={() => setHoveredIndex(index)}
                                className="relative flex items-center justify-center h-11 px-4 rounded-[1.5rem] transition-all duration-500 group cursor-pointer"
                            >
                                {/* Liquid Hover Highlight */}
                                {isHovered && (
                                    <motion.div
                                        layoutId="nav-pill"
                                        className="absolute inset-0 bg-white/10 rounded-[1.5rem] z-0"
                                        transition={{ type: "spring", bounce: 0, duration: 0.5 }}
                                    />
                                )}

                                {/* Content Wrapper */}
                                <div className={`relative z-10 flex items-center gap-2 transition-all duration-300 ${isActive ? 'text-white' : 'text-zinc-500 group-hover:text-white'}`}>
                                    <span className={`transform transition-all duration-500 ${isHovered ? 'scale-110 rotate-[-5deg]' : 'scale-100 rotate-0'}`}>
                                        {item.icon}
                                    </span>

                                    {/* Label with width/opacity animation */}
                                    <motion.span
                                        initial={false}
                                        animate={{
                                            width: showLabel ? "auto" : 0,
                                            opacity: showLabel ? 1 : 0,
                                            marginRight: showLabel ? 4 : 0
                                        }}
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                        className="text-[11px] font-black uppercase tracking-[0.15em] overflow-hidden whitespace-nowrap pointer-events-none origin-left"
                                    >
                                        {item.title}
                                    </motion.span>
                                </div>

                                {/* Active Indicator Bar */}
                                {isActive && (
                                    <motion.div
                                        layoutId="active-nav-line"
                                        className="absolute bottom-1.5 left-1/2 -translate-x-1/2 h-0.5 w-3 rounded-full bg-white shadow-[0_0_8px_white]"
                                        transition={{ type: "spring", bounce: 0 }}
                                    />
                                )}
                            </button>
                        );
                    })}
                </div>

                {/* Mirror Reflection Overlay */}
                <div className="pointer-events-none absolute inset-0 rounded-[2.5rem] bg-gradient-to-tr from-white/5 via-white/[0.02] to-transparent z-[-1]" />
            </motion.nav>

            {/* Premium Floor Shadow */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-4/5 h-16 bg-black/40 blur-[40px] z-[-2] pointer-events-none" />
        </div>
    );
}
