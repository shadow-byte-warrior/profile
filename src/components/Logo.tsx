import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <motion.div
      className="fixed top-4 md:top-8 left-4 md:left-8 z-50"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <Link to="/" className="group relative block">
        {/* Unique handwritten style logo */}
        <svg 
          width="60" 
          height="40" 
          viewBox="0 0 60 40" 
          className="text-foreground group-hover:text-accent transition-colors duration-300"
        >
          {/* Stylized cursive AP */}
          <text
            x="0"
            y="32"
            className="font-display italic"
            style={{
              fontSize: '36px',
              fontWeight: 700,
              fill: 'currentColor',
              fontStyle: 'italic',
            }}
          >
            Ap
          </text>
          {/* Underline flourish */}
          <path
            d="M5 36 Q15 40 30 36 Q45 32 55 36"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            className="opacity-60"
          />
        </svg>
      </Link>
    </motion.div>
  );
};

export default Logo;
