"use client";

import { motion } from "framer-motion";
import localFont from 'next/font/local'

const gondens = localFont({ src: '../fonts/Gondens-DEMO.otf' })

const InfiniteText = () => {
    const text = "JAFAR'S DOMAIN";

    return (
        <div className="relative flex overflow-visible bg-transparent dark:bg-black py-12">
            {/* The motion.div contains two sets of the same text. 
        As the first set moves out of view, the second follows, 
        creating the infinite loop illusion.
      */}
            <motion.div
                className="flex whitespace-nowrap"
                animate={{ x: ["0%", "-50%"] }}
                transition={{
                    ease: "linear",
                    duration: 25, // Adjust speed here (higher = slower)
                    repeat: Infinity,
                }}
            >
                {/* Repeat the text multiple times to fill the screen */}
                {[...Array(6)].map((_, i) => (
                    <span
                        key={i}
                        className={`${gondens.className} text-8xl md:text-[12rem] text-black dark:text-white px-12 tracking-wide uppercase select-none`}
                    >
                        {text}
                    </span>
                ))}
            </motion.div>
        </div>
    );
};

export default InfiniteText;