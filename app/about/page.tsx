"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Page() {
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!contentRef.current) return;

        const ctx = gsap.context(() => {
            // Fade in content after the zoom transition
            gsap.fromTo(
                contentRef.current,
                { opacity: 0 },
                {
                    opacity: 1,
                    duration: 1,
                    delay: 0.5,
                    scrollTrigger: {
                        trigger: contentRef.current,
                        start: "top center",
                        toggleActions: "play none none reverse",
                    },
                }
            );
        }, contentRef);

        return () => ctx.revert();
    }, []);

    return (
        <div className="min-h-screen w-full bg-zinc-900 text-white">
            <div ref={contentRef} className="container mx-auto px-6 py-24">
                {/* Hero Section */}
                <div className="mb-24">
                    <h1 className="mb-6 text-7xl font-black uppercase tracking-tighter sm:text-9xl">
                        About Me
                    </h1>
                    <div className="h-1 w-32 bg-white"></div>
                </div>

                {/* Content Grid */}
                <div className="grid gap-16 lg:grid-cols-2">
                    {/* Left Column */}
                    <div className="space-y-8">
                        <div>
                            <h2 className="mb-4 text-3xl font-bold">Who I Am</h2>
                            <p className="text-lg leading-relaxed text-zinc-300">
                                I'm Jafar Sarif, a Security Research Engineer with over 5 years of experience
                                in cybersecurity. I specialize in vulnerability research, penetration testing,
                                and building secure systems that protect critical infrastructure.
                            </p>
                        </div>

                        <div>
                            <h2 className="mb-4 text-3xl font-bold">What I Do</h2>
                            <p className="text-lg leading-relaxed text-zinc-300">
                                My work involves deep diving into complex systems, identifying security
                                vulnerabilities, and developing innovative solutions to protect against
                                emerging threats. I'm passionate about making the digital world safer.
                            </p>
                        </div>

                        <div>
                            <h2 className="mb-4 text-3xl font-bold">Skills</h2>
                            <div className="flex flex-wrap gap-3">
                                {["Security Research", "Penetration Testing", "Reverse Engineering", "Threat Analysis", "Exploit Development", "Security Architecture"].map((skill) => (
                                    <span
                                        key={skill}
                                        className="rounded-full bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur-sm"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-8">
                        <div className="rounded-3xl bg-white/5 p-8 backdrop-blur-sm">
                            <h3 className="mb-6 text-2xl font-bold">Experience</h3>
                            <div className="space-y-6">
                                <div>
                                    <h4 className="text-xl font-semibold">Security Research Engineer</h4>
                                    <p className="text-zinc-400">CITRIX • 2020 - Present</p>
                                    <p className="mt-2 text-zinc-300">
                                        Leading security research initiatives and vulnerability assessments
                                        for enterprise solutions.
                                    </p>
                                </div>
                                <div>
                                    <h4 className="text-xl font-semibold">Security Analyst</h4>
                                    <p className="text-zinc-400">Previous Company • 2018 - 2020</p>
                                    <p className="mt-2 text-zinc-300">
                                        Conducted security audits and penetration testing for client systems.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-3xl bg-white/5 p-8 backdrop-blur-sm">
                            <h3 className="mb-6 text-2xl font-bold">Contact</h3>
                            <div className="space-y-4">
                                <div>
                                    <p className="text-sm text-zinc-400">Location</p>
                                    <p className="text-lg font-medium">Bengaluru, India</p>
                                </div>
                                <div>
                                    <p className="text-sm text-zinc-400">Email</p>
                                    <p className="text-lg font-medium">jafarsarif10@gmailcom</p>
                                </div>
                                <div>
                                    <p className="text-sm text-zinc-400">Website</p>
                                    <p className="text-lg font-medium">jafardomain.com</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quote Section */}
                <div className="mt-24 border-l-4 border-white pl-8">
                    <blockquote className="text-3xl font-light italic leading-relaxed text-zinc-300">
                        "Security is not a product, but a process. It's about building systems that can
                        adapt and evolve in the face of ever-changing threats."
                    </blockquote>
                </div>
            </div>
        </div>
    );
}