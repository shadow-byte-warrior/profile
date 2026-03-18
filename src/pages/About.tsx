import { motion } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import Logo from "@/components/Logo";
import SocialBar from "@/components/SocialBar";
import FloatingElement from "@/components/FloatingElement";
import ElectricBorder from "@/components/ElectricBorder";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import avatarCartoon from "@/assets/avatar-cartoon.png";
import profileRounded from "@/assets/profile-rounded.png";

const About = () => {
  return (
    <PageTransition>
      <div className="min-h-screen bg-background relative overflow-hidden">
        <Logo />
        <SocialBar />

        {/* Rounded Profile Photo in top right corner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="fixed top-4 right-4 md:top-6 md:right-6 z-40"
        >
          <div className="w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden border-2 border-accent shadow-lg">
            <img
              src={profileRounded}
              alt="Arun Pandian"
              className="w-full h-full object-cover object-top scale-110"
            />
          </div>
        </motion.div>

        {/* Background ABOUT text */}
        <div className="absolute top-16 md:top-24 left-4 md:left-16 pointer-events-none select-none">
          <span className="text-[20vw] md:text-[15vw] font-display font-bold text-foreground/5">
            ABOUT
          </span>
        </div>

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

        <div className="container mx-auto px-4 sm:px-6 md:px-16 py-24 md:py-32 lg:py-40">
          <div className="grid lg:grid-cols-5 gap-8 lg:gap-16 items-start">
            {/* Text Content */}
            <motion.div 
              className="lg:col-span-3 space-y-6 order-2 lg:order-1 z-10"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <ElectricBorder 
                color="hsl(var(--accent))" 
                speed={0.8} 
                chaos={0.08} 
                borderRadius={16}
              >
                <div className="bg-background rounded-2xl p-6 md:p-8 space-y-6">
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="text-base md:text-lg lg:text-xl text-foreground leading-relaxed italic font-body"
                  >
                    I specialize in architecting high-performance AI systems that bridge the gap between 
                    advanced research and commercial-grade SaaS delivery. My expertise lies in end-to-end 
                    AI engineering—from processing complex signal data like EEG to deploying scalable 
                    RAG-powered LLM applications.
                  </motion.p>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="text-base md:text-lg lg:text-xl text-foreground leading-relaxed italic font-body"
                  >
                    I combine a deep understanding of neural architectures (CNN, LSTM, Attention) 
                    with modern engineering stacks like FastAPI, Supabase, and React. My approach is 
                    purely capability-driven: I don't just build models; I design robust, intelligent 
                    infrastructures that solve mission-critical problems in healthcare and productivity.
                  </motion.p>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                    className="text-base md:text-lg lg:text-xl text-foreground font-body font-bold text-accent"
                  >
                    AI Systems Architect | Deep Learning Specialist | Full-Stack AI SaaS Developer
                  </motion.p>
                </div>
              </ElectricBorder>
            </motion.div>

            {/* Cartoon Avatar */}
            <div className="lg:col-span-2 relative flex justify-center lg:justify-end items-start order-1 lg:order-2">
              <FloatingElement duration={6} y={15}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="relative"
                >
                  {/* Decorative asterisk */}
                  <motion.div
                    className="absolute -top-4 -right-4 md:-top-6 md:-right-6 text-accent"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  >
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="currentColor">
                      <path d="M20 0L23 17L40 20L23 23L20 40L17 23L0 20L17 17Z" />
                    </svg>
                  </motion.div>
                  
                  {/* Cartoon Avatar image */}
                  <div className="relative w-56 h-auto sm:w-64 md:w-80 lg:w-96">
                    <img
                      src={avatarCartoon}
                      alt="Arun Pandian - Cartoon Avatar"
                      className="w-full h-auto object-contain"
                    />
                  </div>
                </motion.div>
              </FloatingElement>
            </div>
          </div>
        </div>
        
        {/* Grid pattern */}
        <div 
          className="fixed inset-0 pointer-events-none opacity-[0.06]"
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

export default About;
