"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function MiniAbout() {
    const containerRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const bodyTextRef = useRef<HTMLParagraphElement>(null);
    const statsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const container = containerRef.current;
        if (!container) return;

        const ctx = gsap.context(() => {
            // 1. Title Animation: Slide in from left with opacity
            gsap.fromTo(
                titleRef.current,
                { x: -100, opacity: 0 },
                {
                    x: 0,
                    opacity: 1,
                    duration: 1.5,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: container,
                        start: "top 80%",
                        end: "top 20%",
                        scrub: 1,
                    },
                }
            );

            // 2. Body Text Reveal: Split text effect (words slide up)
            const words = bodyTextRef.current?.querySelectorAll(".word");
            if (words && words.length > 0) {
                gsap.fromTo(
                    words,
                    { y: 50, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        stagger: 0.05,
                        duration: 1,
                        ease: "back.out(1.7)",
                        scrollTrigger: {
                            trigger: bodyTextRef.current,
                            start: "top 85%",
                            toggleActions: "play none none reverse",
                        },
                    }
                );
            }

            // 3. Stats Fade Up
            const statItems = statsRef.current?.children;
            if (statItems && statItems.length > 0) {
                gsap.fromTo(
                    statItems,
                    { y: 30, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        stagger: 0.1,
                        duration: 1,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: statsRef.current,
                            start: "top 90%",
                        }
                    }
                )
            }
        }, container);

        return () => ctx.revert();
    }, []);

    const text =
        "I'm a passionate developer creating digital experiences that bridge the gap between aesthetics and functionality. With a keen eye for detail and a love for smooth animations, I build websites that leave a lasting impression.";

    return (
        <section
            ref={containerRef}
            className="relative w-full overflow-hidden bg-white py-24 dark:bg-zinc-950 sm:py-32"
        >
            {/* Background Decorative Gradient */}
            <div className="pointer-events-none absolute left-0 top-0 -z-10 h-full w-full opacity-30 blur-3xl">
                <div className="absolute right-0 top-0 h-[500px] w-[500px] -translate-y-1/2 translate-x-1/2 rounded-full bg-gradient-to-b from-blue-100 to-transparent dark:from-blue-900/20" />
            </div>

            <div className="container mx-auto px-4 sm:px-6">
                <div className="relative z-10 mx-auto max-w-4xl">
                    {/* Header */}
                    <div className="mb-12 overflow-hidden">
                        <h2
                            ref={titleRef}
                            className="text-6xl font-black uppercase tracking-tighter text-zinc-900 dark:text-white sm:text-8xl md:text-9xl"
                        >
                            About Me
                        </h2>
                    </div>

                    {/* Body Text */}
                    <div className="mb-16">
                        <p
                            ref={bodyTextRef}
                            className="flex flex-wrap text-2xl font-light leading-relaxed text-zinc-700 dark:text-zinc-300 sm:text-3xl"
                        >
                            {text.split(" ").map((word, i) => (
                                <span key={i} className="overflow-hidden mr-2 mb-1 inline-block">
                                    <span className="word inline-block origin-bottom">
                                        {word}
                                    </span>
                                </span>
                            ))}
                        </p>
                    </div>

                    {/* Stats Grid */}
                    <div
                        ref={statsRef}
                        className="grid grid-cols-2 gap-8 border-t border-zinc-200 pt-12 dark:border-zinc-800 sm:grid-cols-4"
                    >
                        {[
                            { label: "Location", value: "San Francisco, CA" },
                            { label: "Experience", value: "5+ Years" },
                            { label: "Studio", value: "Independent" },
                            { label: "Focus", value: "Web & Mobile" },
                        ].map((item, index) => (
                            <div key={index} className="group">
                                <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                                    {item.label}
                                </h3>
                                <p className="text-xl font-medium text-zinc-900 dark:text-zinc-100 sm:text-2xl transition-colors duration-300 group-hover:text-blue-600">
                                    {item.value}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

