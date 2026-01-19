"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function BottomNav() {
    const [isOpen, setIsOpen] = useState(false);

    // Menu items data
    const menuItems = [
        {
            title: "Home",
            icon: "https://ui-avatars.com/api/?name=H&background=FFFFFF&color=000000&size=64", // Placeholder
            label: "itsjay.us",
            isImage: true
        },
        {
            title: "BLOG",
            icon: "https://ui-avatars.com/api/?name=L&background=FF5733&color=FFFFFF&size=64", // Placeholder
            label: "",
            isImage: false
        },
        {
            title: "ABOUT",
            icon: "https://ui-avatars.com/api/?name=W&background=333333&color=FFFFFF&size=64", // Placeholder
            label: "",
            isImage: false
        },
        {
            title: "CONTACT",
            icon: "https://ui-avatars.com/api/?name=L&background=FF5733&color=FFFFFF&size=64", // Placeholder
            label: "",
            isImage: false
        }
    ];

    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center">
            <motion.div
                layout
                className="relative overflow-hidden shadow-2xl border border-white/10 min-w-[400px]"
                style={{ borderRadius: 32 }}
                initial={{ backgroundColor: "#111", backdropFilter: "blur(0px)" }}
                animate={{
                    width: "auto",
                    backgroundColor: isOpen ? "rgba(17,17,17,0.8)" : "#111",
                    backdropFilter: isOpen ? "blur(12px)" : "blur(0px)"
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
                {/* Glossy Sheen */}
                <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/10 to-transparent pointer-events-none z-0" />

                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="flex flex-col"
                        >
                            <div className="flex flex-col gap-2 p-4 pb-0">
                                {menuItems.map((item, idx) => (
                                    <motion.div
                                        key={item.title}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.1 }}
                                        className="group flex items-center gap-4 p-2 rounded-2xl hover:bg-white/5 cursor-pointer transition-colors"
                                    >
                                        <div className="w-12 h-12 rounded-xl bg-white overflow-hidden flex items-center justify-center shrink-0 border border-white/10">
                                            {/* Use simple img for now as next/image requires configuration for external domains */}
                                            <img src={item.icon} alt={item.title} className="w-full h-full object-cover" />
                                        </div>
                                        <span className="text-xl font-bold text-white">{item.title}</span>
                                    </motion.div>
                                ))}
                            </div>

                            <div className="h-px bg-white/10 w-[calc(100%-32px)] mx-auto mt-4 mb-2" />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Bottom Toggle Bar */}
                <div
                    className="flex items-center gap-4 p-3 pr-6 cursor-pointer"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-zinc-800 shrink-0 border border-white/10">
                        {/* Avatar Placeholder: Memoji style */}
                        <img
                            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Jason&backgroundColor=b6e3f4"
                            alt="Jafar"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <div className="flex flex-col flex-1 min-w-0 mr-4">
                        <span className="text-white font-bold uppercase tracking-wide text-sm whitespace-nowrap">
                            Jafar Sarif
                        </span>
                        <div className="overflow-hidden relative w-full">
                            <span className="text-zinc-500 text-[10px] uppercase tracking-wider block truncate">
                                Security Research Engineer
                            </span>
                        </div>
                    </div>

                    <div className="text-white shrink-0">
                        {isOpen ? (
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                        ) : (
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
                        )}
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
