"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import localFont from 'next/font/local';

const gondens = localFont({ src: '../fonts/Gondens-DEMO.otf' });

export default function ArticlesPage() {
    return (
        <div className="min-h-screen h-auto bg-black text-white font-sans bg-noise selection:bg-emerald-500/30 selection:text-emerald-400">
            <main className="max-w-7xl mx-auto px-6 py-16 md:py-24 pb-20">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-16">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className={`${gondens.className} text-4xl md:text-[6rem] font-medium tracking-tight max-w-4xl leading-[11rem] uppercase `}
                    >
                        Knowledge is the ultimate defense in <span className="text-emerald-500">sophistication</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-zinc-400 text-lg md:text-xl max-w-sm relative top-[27rem]"
                    >
                        Exploring the frontiers of security research, zero-day analysis, and modern cryptographic architectures.
                    </motion.p>
                </div>

                {/* Action Buttons */}
                {/* <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex flex-wrap gap-4 mb-16"
                >
                    <button className="px-8 py-3 bg-white text-black rounded-full font-medium hover:bg-zinc-200 transition-colors flex items-center gap-2 group">
                        Explore Research <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </button>
                    <button className="px-8 py-3 bg-transparent border border-zinc-700 text-white rounded-full font-medium hover:bg-zinc-900 transition-colors">
                        2024 Archive
                    </button>
                </motion.div> */}

                {/* Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:auto-rows-[minmax(320px,auto)]">
                    {/* Main Long Card (Left) */}
                    <div className="md:col-span-2 md:row-span-2 relative group overflow-hidden rounded-[2.5rem] bg-zinc-900 border border-white/5">
                        <Image
                            src="/assets/articles/security_research.png"
                            alt="Security Research"
                            fill
                            className="object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                        <div className="absolute top-8 right-8">
                            <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                                <ArrowUpRight className="w-5 h-5 text-white" />
                            </div>
                        </div>

                        <div className="absolute bottom-10 left-10">
                            <h3 className="text-4xl font-semibold mb-2 text-white">Network Intrusion</h3>
                            <p className="text-zinc-300">Advanced strategies for perimeter defense.</p>
                        </div>
                    </div>

                    {/* Small Image Card (Middle Top) */}
                    <div className="md:col-span-1 md:row-span-1 relative group overflow-hidden rounded-[2.5rem] bg-zinc-900 border border-white/5">
                        <Image
                            src="/assets/articles/vulnerability_db.png"
                            alt="Data Matrix"
                            fill
                            className="object-cover opacity-50 group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute bottom-8 left-8">
                            <h3 className="text-2xl font-semibold text-white">Vulnerability<br />Database</h3>
                        </div>
                    </div>

                    {/* Text Highlight Card (Middle Bottom) */}
                    <div className="md:col-span-1 md:row-span-1 p-8 flex flex-col justify-between rounded-[2.5rem] bg-emerald-950/20 border border-emerald-500/20 group hover:border-emerald-500/40 transition-all relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4">
                            <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold uppercase tracking-wider border border-emerald-500/20">
                                Global insight
                            </span>
                        </div>
                        <div className="mt-8">
                            <p className="text-2xl font-medium leading-tight text-emerald-50 text-balance">
                                Stay persistent in your quest for <span className="text-emerald-400 underline decoration-emerald-400/30 underline-offset-4">knowledge</span>.
                            </p>
                        </div>
                        <div className="mt-4">
                            <p className="text-sm text-emerald-400/70">Updates delivered every Tuesday.</p>
                        </div>
                    </div>

                    {/* Long Vertical Card (Right) */}
                    <div className="md:col-span-1 md:row-span-2 relative group overflow-hidden rounded-[2.5rem] bg-zinc-900 border border-white/5 w-[39rem] h-[20rem]">
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
                            <button className="w-full py-3 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm text-sm font-medium hover:bg-white/10 transition-colors flex items-center justify-center gap-2 text-white">
                                Read More <ArrowUpRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
