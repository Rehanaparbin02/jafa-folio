"use client";

import { useEffect, useRef } from 'react';

interface VantaNetEffect {
    destroy: () => void;
}

declare global {
    interface Window {
        VANTA?: {
            NET: (options: any) => VantaNetEffect;
        };
        THREE?: any;
    }
}

export default function Background() {
    const vantaRef = useRef<HTMLDivElement>(null);
    const vantaEffect = useRef<VantaNetEffect | null>(null);

    useEffect(() => {
        // Load Three.js
        const threeScript = document.createElement('script');
        threeScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
        threeScript.async = true;

        threeScript.onload = () => {
            // Load Vanta NET effect
            const vantaScript = document.createElement('script');
            vantaScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/vanta/0.5.24/vanta.net.min.js';
            vantaScript.async = true;

            vantaScript.onload = () => {
                if (window.VANTA && vantaRef.current && !vantaEffect.current) {
                    vantaEffect.current = window.VANTA.NET({
                        el: vantaRef.current,
                        mouseControls: true,
                        touchControls: true,
                        gyroControls: false,
                        minHeight: 200.00,
                        minWidth: 200.00,
                        scale: 1.00,
                        scaleMobile: 1.00,
                        color: 0x3715, // green-500
                        backgroundColor: 0x000000, // black
                        points: 18.00,
                        maxDistance: 18.00,
                        spacing: 10.00,
                        showDots: false
                    });
                }
            };

            document.body.appendChild(vantaScript);
        };

        document.body.appendChild(threeScript);

        // Cleanup
        return () => {
            if (vantaEffect.current) {
                vantaEffect.current.destroy();
                vantaEffect.current = null;
            }
        };
    }, []);

    return <div ref={vantaRef} className="fixed inset-0 z-0 opacity-80" />;
}