"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface PageWrapperProps {
  children: ReactNode;
  className?: string;
}

const variants = {
  initial: { opacity: 0, y: 20, filter: 'blur(4px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
  exit: { opacity: 0, y: -10 },
};

const transition = {
  duration: 0.4,
  ease: [0.25, 0.46, 0.45, 0.94],
};

export default function PageWrapper({ children, className }: PageWrapperProps) {
  return (
    <motion.main
      initial="initial"
      animate="animate"
      exit="exit"
      variants={variants}
      transition={transition}
      className={className}
    >
      {children}
    </motion.main>
  );
}
