"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Loader() {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLHeadingElement>(null);
    const [displayText, setDisplayText] = useState("");

    // The final text we want to show
    const finalWord = "JAFAR SARIF";
    // Characters to scramble with
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()_+";

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return; // Guard clause

        // Prevent scrolling while loading
        document.body.style.overflow = "hidden";

        let iteration = 0;
        let interval: NodeJS.Timeout;

        // The Scramble Logic
        const startScramble = () => {
            interval = setInterval(() => {
                setDisplayText((prev) => {
                    return finalWord
                        .split("")
                        .map((letter, index) => {
                            // If the character is already "revealed" (index < iteration), return the real letter
                            if (index < iteration) {
                                return finalWord[index];
                            }
                            // Otherwise return a random character
                            return chars[Math.floor(Math.random() * chars.length)];
                        })
                        .join("");
                });

                // Speed of the reveal
                if (iteration >= finalWord.length) {
                    clearInterval(interval);

                    // Once text is fully revealed, wait a bit then animate out
                    setTimeout(() => {
                        finishLoading();
                    }, 800);
                }

                // Increment iteration slowly to "reveal" the text
                // You can make this faster or slower. 
                // 1/3 provides a nice "decoding" speed relative to the interval
                iteration += 1 / 3;
            }, 30);
        };

        // Initial Delay before starting scramble
        const initialDelay = setTimeout(() => {
            startScramble();
        }, 500);

        const finishLoading = () => {
            const tl = gsap.timeline({
                onComplete: () => {
                    // Restore scrolling and hide/remove loader
                    document.body.style.overflow = "";
                    if (containerRef.current) {
                        containerRef.current.style.display = "none";
                    }
                }
            });

            // Animate the text up/fade out
            tl.to(textRef.current, {
                y: -50,
                opacity: 0,
                duration: 0.8,
                ease: "power3.in"
            })
                // Animate the container (curtain effect - slide up)
                .to(containerRef.current, {
                    yPercent: -100,
                    duration: 1.2,
                    ease: "power4.inOut"
                }, "-=0.4");
        };

        return () => {
            clearInterval(interval);
            clearTimeout(initialDelay);
            document.body.style.overflow = "";
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-zinc-950 text-white"
        >
            <div className="relative overflow-hidden">
                <h1
                    ref={textRef}
                    className="text-4xl font-black font-mono tracking-widest sm:text-6xl md:text-8xl"
                >
                    {displayText}
                </h1>
            </div>
            {/* Optional decorative loading bar or subtext */}
            <div className="mt-4 h-1 w-32 overflow-hidden rounded-full bg-zinc-800">
                <div className="h-full w-full origin-left animate-[loading_2s_ease-in-out_infinite] bg-white opacity-50" />
            </div>
            <style jsx>{`
        @keyframes loading {
            0% { transform: translateX(-100%); }
            50% { transform: translateX(0%); }
            100% { transform: translateX(100%); }
        }
      `}</style>
        </div>
    );
}
