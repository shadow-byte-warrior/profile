import { motion } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import BlogSidebar from "@/components/BlogSidebar";
import { Sparkles, Zap, Box, Cpu, Globe, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

const Archive = () => {
  const innovations = [
    { title: "Agentic Swarms", status: "Active", icon: Cpu, color: "text-blue-500" },
    { title: "Glassmorphic OS", status: "Beta", icon: Box, color: "text-purple-500" },
    { title: "RAG Pipeline v4", status: "Staging", icon: Zap, color: "text-yellow-500" },
    { title: "Neural UI", status: "Concept", icon: Sparkles, color: "text-pink-500" },
  ];

  return (
    <PageTransition>
      <div className="min-h-screen bg-background relative flex flex-col md:flex-row h-screen overflow-hidden">
        <BlogSidebar />
        
        <div className="flex-1 md:ml-20 xl:ml-64 p-4 sm:p-8 md:p-12 overflow-y-auto">
          <div className="max-w-6xl mx-auto py-8 md:py-12">
            <header className="mb-12 md:mb-20 text-center flex flex-col items-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="w-20 h-20 rounded-3xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-6 shadow-2xl shadow-accent/20"
              >
                <Sparkles size={40} className="text-accent animate-pulse" />
              </motion.div>
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-display font-bold italic tracking-tighter bg-gradient-to-b from-foreground to-foreground/40 bg-clip-text text-transparent mb-4 uppercase">
                Archive
              </h1>
              <p className="text-muted-foreground text-sm md:text-lg max-w-2xl px-4">
                A collection of past experiments, research notes, and architectural deep-dives. The evolution of my engineering journey.
              </p>
            </header>

            {/* Goggle Style Search / Command Bar */}
            <div className="mb-20">
              <div className="relative max-w-2xl mx-auto group">
                <div className="absolute inset-0 bg-accent/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="relative bg-card/40 backdrop-blur-3xl border border-white/10 rounded-[2rem] p-6 shadow-2xl flex items-center gap-6">
                  <div className="w-10 h-10 md:w-14 md:h-14 rounded-xl bg-white/5 flex items-center justify-center text-accent shadow-inner">
                    <Search size={20} className="md:w-6 md:h-6" />
                  </div>
                   <input 
                    type="text" 
                    placeholder="Search Archive..." 
                    className="bg-transparent border-none focus:ring-0 text-lg md:text-2xl font-display font-bold w-full placeholder:text-muted-foreground/30"
                  />
                  <div className="hidden md:flex flex-col items-end text-right min-w-max">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Command</span>
                    <span className="text-sm font-bold text-accent">Archive Hub</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {innovations.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="bg-card/20 backdrop-blur-md border border-white/5 rounded-3xl p-8 hover:bg-card/40 hover:border-accent/30 transition-all duration-300 group shadow-xl"
                >
                  <div className={`mb-6 p-4 rounded-2xl bg-white/5 inline-block ${item.color} group-hover:scale-110 transition-transform`}>
                    <item.icon size={32} />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">{item.status}</span>
                  </div>
                  <Button variant="outline" className="w-full rounded-xl border-white/10 hover:bg-accent/10 hover:text-accent font-bold text-xs uppercase tracking-widest py-6">
                    Launch Lab
                  </Button>
                </motion.div>
              ))}
            </div>

            {/* Archive Roadmap */}
            <div className="mt-32 p-12 rounded-[3.5rem] bg-gradient-to-br from-card/30 to-background border border-white/5 shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 right-0 p-12 opacity-10">
                <Globe size={200} className="text-accent" />
              </div>
              <div className="relative z-10 max-w-3xl">
                <h2 className="text-4xl font-display font-bold italic mb-6">The Multi-Model Archive</h2>
                <p className="text-base md:text-lg text-muted-foreground mb-8 md:mb-12">
                  Building the next generation of digital infrastructure. From synchronized cross-platform states to decentralized AI agents.
                </p>
                <div className="flex flex-wrap gap-4">
                  {['Web3 Integration', 'Agentic Workflows', 'Motion Engine 3.0', 'Synced Cloud Store'].map(tag => (
                    <span key={tag} className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-muted-foreground uppercase tracking-wider">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Archive;
