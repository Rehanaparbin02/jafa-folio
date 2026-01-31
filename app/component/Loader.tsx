// "use client";

// import { useEffect, useRef, useState } from "react";
// import gsap from "gsap";
// import { useLoader } from "../context/LoaderContext";

// export default function Loader() {
//     const containerRef = useRef<HTMLDivElement>(null);
//     const textRef = useRef<HTMLHeadingElement>(null);
//     const [displayText, setDisplayText] = useState("");
//     const { isLoading, loaderText, hideLoader } = useLoader();

//     // The final text we want to show (from context)
//     const finalWord = loaderText;
//     // Characters to scramble with
//     const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()_+";

//     useEffect(() => {
//         if (!isLoading) return;

//         const container = containerRef.current;
//         const text = textRef.current;
//         if (!container || !text) return;

//         // Reset state and styles for re-triggering
//         setDisplayText("");
//         document.body.style.overflow = "hidden";
//         container.style.display = "flex";

//         // Appear from top
//         gsap.fromTo(container,
//             { yPercent: -100 },
//             { yPercent: 0, duration: 0.8, ease: "power4.out" }
//         );
//         gsap.set(text, { y: 0, opacity: 1 });

//         let iteration = 0;
//         let interval: NodeJS.Timeout;

//         // The Scramble Logic
//         const startScramble = () => {
//             interval = setInterval(() => {
//                 setDisplayText((prev) => {
//                     return finalWord
//                         .split("")
//                         .map((letter, index) => {
//                             if (index < iteration) {
//                                 return finalWord[index];
//                             }
//                             return chars[Math.floor(Math.random() * chars.length)];
//                         })
//                         .join("");
//                 });

//                 if (iteration >= finalWord.length) {
//                     clearInterval(interval);
//                     setTimeout(() => {
//                         finishLoading();
//                     }, 400);
//                 }

//                 iteration += 1 / 3;
//             }, 30);
//         };

//         // Initial Delay before starting scramble
//         const initialDelay = setTimeout(() => {
//             startScramble();
//         }, 500);

//         const finishLoading = () => {
//             const tl = gsap.timeline({
//                 onComplete: () => {
//                     document.body.style.overflow = "";
//                     container.style.display = "none";
//                     hideLoader();
//                 }
//             });

//             tl.to(text, {
//                 y: 50,
//                 opacity: 0,
//                 duration: 0.5,
//                 ease: "power3.in"
//             })
//                 // Add a small delay before sliding the loader away
//                 // This gives time for the page content to render
//                 .to(container, {
//                     yPercent: 100,
//                     duration: 0.8,
//                     ease: "power4.inOut"
//                 }, "-=0.1"); // Reduced overlap for smoother transition
//         };

//         return () => {
//             clearInterval(interval);
//             clearTimeout(initialDelay);
//             document.body.style.overflow = "";
//         };
//     }, [isLoading, finalWord, hideLoader]);

//     return (
//         <div
//             ref={containerRef}
//             className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-zinc-950 text-white"
//         >
//             <div className="relative overflow-hidden">
//                 <h1
//                     ref={textRef}
//                     className="text-4xl font-black font-mono tracking-widest sm:text-6xl md:text-8xl"
//                 >
//                     {displayText}
//                 </h1>
//             </div>
//             {/* Optional decorative loading bar or subtext */}
//             <div className="mt-4 h-1 w-32 overflow-hidden rounded-full bg-zinc-800">
//                 <div className="h-full w-full origin-left animate-[loading_2s_ease-in-out_infinite] bg-white opacity-50" />
//             </div>
//             <style jsx>{`
//         @keyframes loading {
//             0% { transform: translateX(-100%); }
//             50% { transform: translateX(0%); }
//             100% { transform: translateX(100%); }
//         }
//       `}</style>
//         </div>
//     );
// }

"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useLoader } from "../context/LoaderContext";

export default function Loader() {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLHeadingElement>(null);
    const backdropRef = useRef<HTMLDivElement>(null);
    const [displayText, setDisplayText] = useState("");
    const { isLoading, loaderText, hideLoader } = useLoader();

    const finalWord = loaderText;
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()_+";

    useEffect(() => {
        if (!isLoading) return;

        const container = containerRef.current;
        const text = textRef.current;
        const backdrop = backdropRef.current;
        if (!container || !text || !backdrop) return;

        setDisplayText("");
        document.body.style.overflow = "hidden";
        container.style.display = "flex";
        backdrop.style.display = "block";

        gsap.fromTo(container,
            { yPercent: -100 },
            { yPercent: 0, duration: 0.8, ease: "power4.out" }
        );
        gsap.set(text, { y: 0, opacity: 1 });

        let iteration = 0;
        let interval: NodeJS.Timeout;

        const startScramble = () => {
            interval = setInterval(() => {
                setDisplayText((prev) => {
                    return finalWord
                        .split("")
                        .map((letter, index) => {
                            if (index < iteration) {
                                return finalWord[index];
                            }
                            return chars[Math.floor(Math.random() * chars.length)];
                        })
                        .join("");
                });

                if (iteration >= finalWord.length) {
                    clearInterval(interval);
                    setTimeout(() => {
                        finishLoading();
                    }, 400);
                }

                iteration += 1 / 3;
            }, 30);
        };

        const initialDelay = setTimeout(() => {
            startScramble();
        }, 500);

        const finishLoading = () => {
            const tl = gsap.timeline({
                onComplete: () => {
                    document.body.style.overflow = "";
                    container.style.display = "none";
                    backdrop.style.display = "none";
                    hideLoader();
                }
            });

            tl.to(text, {
                y: 50,
                opacity: 0,
                duration: 0.5,
                ease: "power3.in"
            })
                .to(container, {
                    yPercent: 100,
                    duration: 0.8,
                    ease: "power4.inOut"
                }, "-=0.1")
                // Fade out backdrop AFTER loader slides away
                .to(backdrop, {
                    opacity: 0,
                    duration: 0.4,
                    ease: "power2.out"
                }, "-=0.2");
        };

        return () => {
            clearInterval(interval);
            clearTimeout(initialDelay);
            document.body.style.overflow = "";
        };
    }, [isLoading, finalWord, hideLoader]);

    return (
        <>
            {/* Black backdrop that persists during transition */}
            <div
                ref={backdropRef}
                className="fixed inset-0 z-[9998] bg-black"
                style={{ display: 'none' }}
            />

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
        </>
    );
}