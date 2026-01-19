"use client";

import { motion } from "framer-motion";

const InfiniteText = () => {
    const text = "JAFAR'S DOMAIN";

    return (
        <div className="relative flex overflow-hidden bg-transparent dark:bg-black py-10">
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
                        className="font-anton text-8xl md:text-[12rem] text-black dark:text-white px-8 uppercase select-none"
                        style={{ fontFamily: "var(--font-anton)" }}
                    >
                        {text}
                    </span>
                ))}
            </motion.div>
        </div>
    );
};

export default InfiniteText;