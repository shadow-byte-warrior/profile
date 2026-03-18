import { motion } from "framer-motion";
import { ReactNode } from "react";

interface FloatingElementProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  y?: number;
}

const FloatingElement = ({ 
  children, 
  delay = 0, 
  duration = 6, 
  y = 20 
}: FloatingElementProps) => {
  return (
    <motion.div
      animate={{
        y: [0, -y, 0],
        rotate: [0, 2, -2, 0],
      }}
      transition={{
        duration,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut",
        delay,
      }}
    >
      {children}
    </motion.div>
  );
};

export default FloatingElement;
