import { motion } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import Logo from "@/components/Logo";
import SocialBar from "@/components/SocialBar";
import { Link } from "react-router-dom";
import { ArrowLeft, MapPin, Calendar } from "lucide-react";

const experiences = [
  {
    company: "Carpedium Technology",
    role: "AI Software Engineer Intern",
    period: "Dec 2025 – Jan 2026",
    location: "Coimbatore",
    highlights: [
      "Designed and developed a full-stack healthcare web application using Python and Streamlit",
      "Integrated machine learning models into the backend for efficient and low-latency inference",
      "Implemented SQL database for structured storage and retrieval of medical records",
    ],
  },
  {
    company: "Rinex.AI",
    role: "AI Engineering Intern",
    period: "July 2025 – Oct 2025",
    location: "Bangalore, Karnataka",
    highlights: [
      "Developed and integrated machine learning models into a web-based application",
      "Designed modular backend services to enable low-latency model inference",
      "Built interactive user interfaces and connected database systems",
    ],
  },
  {
    company: "Lovely Cards Private Ltd",
    role: "Graphics Designer & Intern",
    period: "Jan 2025 – Feb 2025",
    location: "Sivakasi",
    highlights: [
      "Worked with a crew of students on 3 real-time projects",
      "Gained hands-on experience in graphic design software and web design",
    ],
  },
];

const Experience = () => {
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
            EXPERIENCE
          </motion.h1>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 md:left-8 top-0 bottom-0 w-px bg-border" />

            <div className="space-y-16">
              {experiences.map((exp, index) => (
                <motion.div
                  key={exp.company}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.15 }}
                  className="relative pl-8 md:pl-20"
                >
                  {/* Timeline dot */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.4 + index * 0.15 }}
                    className="absolute left-0 md:left-8 -translate-x-1/2 w-4 h-4 rounded-full bg-accent border-4 border-background"
                  />

                  <div className="space-y-4">
                    <div>
                      <h2 className="text-2xl md:text-3xl font-display font-bold">{exp.company}</h2>
                      <p className="text-accent font-medium">{exp.role}</p>
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar size={14} />
                        {exp.period}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin size={14} />
                        {exp.location}
                      </span>
                    </div>

                    <ul className="space-y-2">
                      {exp.highlights.map((highlight, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 + index * 0.15 + i * 0.1 }}
                          className="text-muted-foreground flex items-start gap-2"
                        >
                          <span className="text-accent mt-1.5">•</span>
                          {highlight}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
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

export default Experience;
