import { motion } from "framer-motion";

interface YinYangProps {
  onClick?: () => void;
  isDark?: boolean;
}

const YinYang = ({ onClick, isDark = false }: YinYangProps) => {
  return (
    <motion.div
      className="relative cursor-pointer"
      onClick={onClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {/* Continuous rotation wrapper */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ 
          duration: 20, 
          repeat: Infinity, 
          ease: "linear" 
        }}
        className="relative"
      >
        {/* Inner rotation for theme toggle */}
        <motion.div
          animate={{ rotate: isDark ? 180 : 0 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* Martial arts style Yin Yang - clean, bold, simple */}
          <svg
            width="180"
            height="180"
            viewBox="0 0 180 180"
            className="drop-shadow-lg"
          >
            {/* Outer circle - thick bold stroke */}
            <circle
              cx="90"
              cy="90"
              r="85"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              className="text-foreground"
            />
            
            {/* White/Light half */}
            <path
              d="M90,5 A85,85 0 0,0 90,175 A42.5,42.5 0 0,0 90,90 A42.5,42.5 0 0,1 90,5"
              className="fill-background"
            />
            
            {/* Black/Dark half */}
            <path
              d="M90,5 A85,85 0 0,1 90,175 A42.5,42.5 0 0,1 90,90 A42.5,42.5 0 0,0 90,5"
              className="fill-foreground"
            />
            
            {/* Small white circle (in dark half) */}
            <circle
              cx="90"
              cy="132.5"
              r="14"
              className="fill-background"
            />
            
            {/* Small dark circle (in white half) */}
            <circle
              cx="90"
              cy="47.5"
              r="14"
              className="fill-foreground"
            />
          </svg>
        </motion.div>
      </motion.div>
      
      <motion.p
        className="text-center mt-8 text-sm tracking-[0.3em] uppercase font-body text-accent"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        click here
      </motion.p>
    </motion.div>
  );
};

export default YinYang;
