"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const CustomCursor = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isHovering, setIsHovering] = useState(false);

    // Mouse position state
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    // Spring configuration for the follower to create a smooth trailing effect
    const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
    const followerX = useSpring(cursorX, springConfig);
    const followerY = useSpring(cursorY, springConfig);

    useEffect(() => {
        // Only run on client and if fine pointer (mouse) is available
        const isFinePointer = window.matchMedia("(pointer: fine)").matches;
        if (!isFinePointer) return;

        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
            if (!isVisible) setIsVisible(true);
        };

        const handleMouseDown = () => setIsHovering(true);
        const handleMouseUp = () => setIsHovering(false);

        // Add event listeners for hover effects on clickable elements
        const handleLinkHoverStart = () => setIsHovering(true);
        const handleLinkHoverEnd = () => setIsHovering(false);

        const attachHoverListeners = () => {
            const interactables = document.querySelectorAll("a, button, input, textarea, [role='button']");
            interactables.forEach((el) => {
                el.addEventListener("mouseenter", handleLinkHoverStart);
                el.addEventListener("mouseleave", handleLinkHoverEnd);
            });
        };

        const cleanHoverListeners = () => {
            const interactables = document.querySelectorAll("a, button, input, textarea, [role='button']");
            interactables.forEach((el) => {
                el.removeEventListener("mouseenter", handleLinkHoverStart);
                el.removeEventListener("mouseleave", handleLinkHoverEnd);
            });
        };

        window.addEventListener("mousemove", moveCursor);
        window.addEventListener("mousedown", handleMouseDown);
        window.addEventListener("mouseup", handleMouseUp);

        // Initial attachment
        attachHoverListeners();

        // Mutation observer to handle dynamically added elements
        const observer = new MutationObserver(attachHoverListeners);
        observer.observe(document.body, { childList: true, subtree: true });

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            window.removeEventListener("mousedown", handleMouseDown);
            window.removeEventListener("mouseup", handleMouseUp);
            cleanHoverListeners();
            observer.disconnect();
        };
    }, []);

    if (typeof window !== "undefined" && !window.matchMedia("(pointer: fine)").matches) {
        return null;
    }

    return (
        <>
            {/* Global style to hide default cursor */}
            <style jsx global>{`
                @media (pointer: fine) {
                    body, a, button, input, textarea, [role='button'] {
                        cursor: none !important;
                    }
                }
            `}</style>

            {/* Main Dot Cursor */}
            <motion.div
                className="fixed top-0 left-0 w-2.5 h-2.5 bg-white rounded-full z-[9999] pointer-events-none mix-blend-difference"
                style={{
                    x: cursorX,
                    y: cursorY,
                    translateX: "-50%",
                    translateY: "-50%",
                    opacity: isVisible ? 1 : 0,
                }}
            />

            {/* Follower Ring/Circle */}
            <motion.div
                className="fixed top-0 left-0 w-8 h-8 rounded-full border border-white z-[9998] pointer-events-none mix-blend-difference"
                style={{
                    x: followerX,
                    y: followerY,
                    translateX: "-50%",
                    translateY: "-50%",
                    opacity: isVisible ? 1 : 0,
                }}
                animate={{
                    scale: isHovering ? 2.5 : 1,
                    backgroundColor: isHovering ? "rgba(255, 255, 255, 1)" : "rgba(255, 255, 255, 0)",
                    borderColor: isHovering ? "transparent" : "white",
                }}
                transition={{
                    scale: { duration: 0.15 },
                    backgroundColor: { duration: 0.15 },
                    borderColor: { duration: 0.15 },
                }}
            />
        </>
    );
};

export default CustomCursor;
