"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function HorizontalTracker() {
    const containerRef = useRef<HTMLDivElement>(null);
    const boxRef = useRef<HTMLDivElement>(null);
    const innerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!boxRef.current || !containerRef.current || !innerRef.current) return;

        let xTo: gsap.QuickToFunc;
        let rotateTo: gsap.QuickToFunc;

        const ctx = gsap.context(() => {
            // Setup quickTo for smooth mouse following
            xTo = gsap.quickTo(boxRef.current, "x", {
                duration: 0.8,
                ease: "power3.out"
            });

            rotateTo = gsap.quickTo(boxRef.current, "rotation", {
                duration: 1.2,
                ease: "power3.out"
            });

            // Scroll-triggered animations on the INNER element to avoid conflict with xTo
            gsap.fromTo(
                innerRef.current,
                {
                    scale: 0.4,
                    opacity: 0,
                    y: 100
                },
                {
                    scale: 1,
                    opacity: 1,
                    y: 0,
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top bottom",
                        end: "center center",
                        scrub: 1.5,
                        // markers: true, // Uncomment for debugging
                    },
                    ease: "power2.out",
                }
            );

            // Zoom out effect when scrolling past
            gsap.to(innerRef.current, {
                scale: 0.8,
                opacity: 0.5,
                y: -100,
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "center center",
                    end: "bottom top",
                    scrub: 1.5,
                },
                ease: "power2.in",
            });
        }, containerRef);

        const handleMouseMove = (e: MouseEvent) => {
            if (!xTo || !rotateTo) return;

            // Calculate position relative to the viewport
            // We want the box (700px wide) to be centered on the mouse
            const targetX = e.clientX - 350;
            xTo(targetX);

            // Subtle rotation based on mouse position
            const tilt = (e.clientX / window.innerWidth - 0.5) * 12;
            rotateTo(tilt);
        };

        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            ctx.revert();
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="relative flex w-full min-h-[60vh] items-center overflow-visible py-20"
        >
            {/* SVG Noise Filter */}
            <svg className="pointer-events-none absolute h-0 w-0">
                <filter id="noiseFilter">
                    <feTurbulence
                        type="fractalNoise"
                        baseFrequency="0.6"
                        numOctaves="3"
                        stitchTiles="stitch"
                    />
                    <feColorMatrix type="saturate" values="0" />
                </filter>
            </svg>

            {/* Mouse Follower Wrapper */}
            <div
                ref={boxRef}
                className="pointer-events-none relative w-[700px] will-change-transform"
            >
                {/* Inner Animated Box */}
                <div
                    ref={innerRef}
                    className="pointer-events-auto relative h-[450px] overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-zinc-900 via-zinc-800 to-black shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] dark:from-white dark:via-zinc-100 dark:to-zinc-200"
                >
                    {/* Noise Overlay */}
                    <div
                        className="pointer-events-none absolute inset-0 opacity-[0.15] mix-blend-overlay"
                        style={{ filter: "url(#noiseFilter)" }}
                    />

                    {/* Content */}
                    <div className="relative z-10 flex h-full flex-col items-center justify-center p-12 text-center">
                        <span className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-white/30 dark:text-black/30">
                            Interactive Experience
                        </span>
                        <h2 className="text-5xl font-black tracking-tighter text-white dark:text-black sm:text-7xl">
                            JAFAR'S<br />DOMAIN
                        </h2>
                        <div className="mt-8 flex items-center gap-4">
                            <div className="h-[1px] w-12 bg-white/20 dark:bg-black/20" />
                            <span className="text-sm font-medium text-white/50 dark:text-black/50">
                                SCROLL TO EXPLORE
                            </span>
                            <div className="h-[1px] w-12 bg-white/20 dark:bg-black/20" />
                        </div>
                    </div>

                    {/* Decorative Blobs */}
                    <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-blue-500/10 blur-[100px]" />
                    <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-purple-500/10 blur-[100px]" />
                </div>
            </div>
        </div>
    );
}