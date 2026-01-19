"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

export default function HorizontalTracker() {
    const x = useMotionValue(0);
    const smoothX = useSpring(x, { stiffness: 120, damping: 20 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            // Update x to the mouse's clientX position
            x.set(e.clientX);
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [x]);

    return (
        <div className="relative flex w-full flex-1 items-center overflow-visible min-h-[368px]">
            {/* Background track line (optional, purely aesthetic to show the path) */}
            <div className="absolute left-0 right-0 h-px bg-zinc-200 dark:bg-zinc-800" />

            <motion.div
                style={{ x: smoothX }}
                className="absolute top-1/2 h-80 w-150 -translate-y-1/2 -translate-x-1/2 rounded-2xl bg-zinc-100 shadow-2xl backdrop-blur-sm dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800"
            />
        </div>
    );
}
