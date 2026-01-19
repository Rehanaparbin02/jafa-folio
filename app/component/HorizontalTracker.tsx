"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

export default function HorizontalTracker() {
    const x = useMotionValue(0);
    const smoothX = useSpring(x, { stiffness: 120, damping: 20 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            // Center the 600px wide rectangle on the cursor
            x.set(e.clientX - 300);
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [x]);

    return (
        <div className="relative flex w-full items-center overflow-visible">
            <motion.div
                className="h-[350px] w-[600px] rounded-3xl bg-black shadow-2xl dark:bg-white dark:shadow-[0_20px_50px_rgba(255,255,255,0.1)]"
                style={{ x: smoothX }}
            />
        </div>
    );
}
