import { motion } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import Logo from "@/components/Logo";
import SocialBar from "@/components/SocialBar";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const routineStack = {
  "Intelligence Layer": [
    "PyTorch",
    "TensorFlow",
    "Scikit-learn",
    "CNN",
    "LSTM",
    "Attention Mechanisms",
    "Time-Series Analysis",
    "EEG Signal Processing"
  ],
  "Engineering Layer": [
    "Python",
    "FastAPI",
    "Supabase",
    "REST APIs"
  ],
  "Product & Deployment Layer": [
    "React",
    "Vite",
    "TypeScript",
    "Tailwind CSS",
    "ShadCN UI",
    "Vercel",
    "Render"
  ],
  "Advanced AI Stack": [
    "OpenAI API",
    "LangChain",
    "RAG",
    "FAISS",
    "Pinecone"
  ]
};

const Skills = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-background relative">
        <Logo />
        <SocialBar />

        {/* Centered Back button */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="fixed top-4 md:top-8 left-1/2 -translate-x-1/2 z-50"
        >
          <Link
            to="/"
            className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-foreground/30 hover:border-accent hover:text-accent transition-colors bg-background/50 backdrop-blur-sm"
          >
            <ArrowLeft size={18} />
          </Link>
        </motion.div>

        <div className="container mx-auto px-4 sm:px-6 md:px-8 py-24 md:py-32 lg:py-40">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-7xl font-display font-bold italic mb-16"
          >
            ROUTINE STACK
          </motion.h1>

          <div className="grid md:grid-cols-2 gap-x-12 gap-y-16">
            {Object.entries(routineStack).map(([category, items], categoryIndex) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + categoryIndex * 0.1 }}
                className="space-y-6"
              >
                <h2 className="text-xl font-display font-bold uppercase tracking-widest text-accent border-b border-accent/20 pb-2">
                  {category}
                </h2>
                <motion.ul
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="space-y-4"
                >
                  {items.map((skill) => (
                    <motion.li
                      key={skill}
                      variants={itemVariants}
                      className="text-foreground/80 text-sm md:text-base leading-relaxed flex items-start gap-3"
                    >
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                      {skill}
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Grid pattern */}
        <div 
          className="fixed inset-0 pointer-events-none opacity-[0.06] -z-10"
          style={{
            backgroundImage: `
              linear-gradient(hsl(var(--foreground) / 0.3) 1px, transparent 1px),
              linear-gradient(90deg, hsl(var(--foreground) / 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
        />
      </div>
    </PageTransition>
  );
};

export default Skills;
