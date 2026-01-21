"use client";

import { useLoader } from "../context/LoaderContext";
import { motion, AnimatePresence } from "framer-motion";

export default function PageTransition({ children }: { children: React.ReactNode }) {
    const { isLoading } = useLoader();

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isLoading ? 0 : 1 }}
            transition={{ duration: 0.5, delay: 0 }}
        >
            {children}
        </motion.div>
    );
}
