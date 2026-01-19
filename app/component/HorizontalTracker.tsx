// "use client";

// import { useRef, useEffect } from "react";
// import gsap from "gsap";

// export default function HorizontalTracker() {
//     const boxRef = useRef<HTMLDivElement>(null);

//     useEffect(() => {
//         if (!boxRef.current) return;

//         // quickTo provides optimized performance for frequent updates like mouse movement.
//         // A duration of 0.5s with power3.out offers a smooth, high-end feel with low latency (low friction).
//         const xTo = gsap.quickTo(boxRef.current, "x", {
//             duration: 0.5,
//             ease: "power3.out"
//         });

//         const handleMouseMove = (e: MouseEvent) => {
//             // Center the 600px wide element on the cursor (offset by 300px)
//             xTo(e.clientX - 300);
//         };

//         window.addEventListener("mousemove", handleMouseMove);
//         return () => window.removeEventListener("mousemove", handleMouseMove);
//     }, []);

//     return (
//         <div className="relative flex w-full items-center overflow-visible">
//             <div
//                 ref={boxRef}
//                 className="h-[350px] w-[600px] rounded-3xl bg-black shadow-2xl dark:bg-white dark:shadow-[0_20px_50px_rgba(255,255,255,0.1)]"
//             />
//         </div>
//     );
// }


"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";

export default function HorizontalTracker() {
    const boxRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!boxRef.current) return;

        // quickTo for position
        const xTo = gsap.quickTo(boxRef.current, "x", {
            duration: 0.6,
            ease: "power3.out"
        });

        // Optional: Adding a slight tilt (rotation) for extra character
        const rotateTo = gsap.quickTo(boxRef.current, "rotation", {
            duration: 0.8,
            ease: "power3.out"
        });

        const handleMouseMove = (e: MouseEvent) => {
            const centerX = e.clientX - 300;
            xTo(centerX);

            // Tilts the box slightly based on mouse velocity/position
            const tilt = (e.clientX / window.innerWidth - 0.5) * 10;
            rotateTo(tilt);
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <div className="relative flex w-full items-center overflow-visible">
            {/* SVG Noise Filter Definition */}
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

            <div
                ref={boxRef}
                className="relative h-[350px] w-[600px] overflow-hidden rounded-3xl bg-zinc-900 shadow-2xl dark:bg-zinc-100"
            >
                {/* Noise Overlay */}
                <div
                    className="pointer-events-none absolute inset-0 opacity-[0.15] mix-blend-overlay"
                    style={{ filter: "url(#noiseFilter)" }}
                />

                {/* Content Placeholder */}
                <div className="relative z-10 flex h-full items-center justify-center">
                    <span className="text-sm font-medium uppercase tracking-widest text-white/20 dark:text-black/20">
                        Textured Surface
                    </span>
                </div>
            </div>
        </div>
    );
}