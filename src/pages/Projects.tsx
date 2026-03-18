import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Github, Users, Calendar, ExternalLink, Star, GitFork } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import Logo from "@/components/Logo";
import SocialBar from "@/components/SocialBar";
import ElectricBorder from "@/components/ElectricBorder";
import GitHubHeatmap from "@/components/GitHubHeatmap";
import { useRef, useEffect, useState } from "react";
import { fetchGitHubProjects, GitHubRepo } from "@/lib/github";

import projectUber from "@/assets/project-uber.png";
import projectDisease from "@/assets/project-disease.png";

const featuredProjects = [
  {
    id: 1,
    title: "Seizure Detection AI",
    tech: ["Python", "FastAPI", "TensorFlow", "CNN-LSTM", "Attention"],
    year: "2024",
    description: "Deep learning-powered API for real-time seizure detection from EEG data using CNN-LSTM-Attention architectures validated on the CHB-MIT dataset.",
    color: "#8B5CF6",
    image: projectDisease,
    githubUrl: "https://github.com/shadow-byte-warrior/Prediction-backend",
    hasDemo: false,
    hasGithub: true,
  },
  {
    id: 2,
    title: "QR Code Companion (AI SaaS)",
    tech: ["Vite", "React", "TypeScript", "Supabase", "Vercel"],
    year: "2024",
    description: "A premium AI SaaS architecture featuring secure authentication, real-time data syncing, and a modern dashboard for intelligent asset management.",
    color: "#EF4444",
    image: projectUber,
    githubUrl: "https://github.com/shadow-byte-warrior/qr-code-companion",
    hasDemo: false,
    hasGithub: true,
  },
];

const Projects = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [githubRepos, setGithubRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRepos = async () => {
      const repos = await fetchGitHubProjects("shadow-byte-warrior");
      // Filter out featured ones by name if possible, or just show others
      const filtered = repos.filter(repo => 
        !featuredProjects.some(fp => fp.githubUrl.endsWith(repo.name))
      );
      setGithubRepos(filtered);
      setLoading(false);
    };
    loadRepos();
  }, []);

  return (
    <PageTransition>
      <div className="min-h-screen bg-background relative overflow-hidden">
        <Logo />
        <SocialBar />
        
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8 md:mb-12"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground">
                PROJECTS
              </h1>
              <a 
                href="https://github.com/shadow-byte-warrior"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-foreground text-background rounded-full hover:bg-accent transition-colors text-sm font-medium"
              >
                <Github size={16} />
                shadow-byte-warrior
              </a>
            </div>
            
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Users size={14} />
                <span className="font-medium text-foreground">0</span> followers
              </span>
              <span>·</span>
              <span className="flex items-center gap-1.5">
                <span className="font-medium text-foreground">2</span> following
              </span>
              <span>·</span>
              <span className="flex items-center gap-1.5">
                <Calendar size={14} />
                Joined last week
              </span>
            </div>
          </motion.div>

          <div className="mb-10">
            <GitHubHeatmap />
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-muted-foreground text-sm mb-8"
          >
            Featured systems & research
          </motion.p>

          <div 
            ref={scrollContainerRef}
            className="flex gap-6 md:gap-8 overflow-x-auto pb-8 -mx-4 px-4 md:-mx-8 md:px-8 scrollbar-hide snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="flex-shrink-0 w-[85vw] sm:w-[70vw] md:w-[450px] lg:w-[500px] snap-center"
              >
                <ElectricBorder
                  color={project.color}
                  speed={1.2}
                  chaos={0.15}
                  borderRadius={24}
                  className="h-full"
                >
                  <article className="bg-card/90 backdrop-blur-sm rounded-3xl overflow-hidden h-full min-h-[420px] flex flex-col">
                    <div className="relative h-48 overflow-hidden">
                      <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-card/90 to-transparent" />
                    </div>
                    <div className="p-6 md:p-8 flex flex-col flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <span className="text-xs font-mono text-muted-foreground">{project.year}</span>
                        <div className="flex gap-2">
                          <motion.a href={project.githubUrl} target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.1 }} className="p-2 rounded-full bg-foreground text-background hover:bg-accent"><Github size={16}/></motion.a>
                        </div>
                      </div>
                      <h2 className="text-xl md:text-2xl font-display font-bold mb-3 text-foreground">{project.title}</h2>
                      <p className="text-sm text-muted-foreground mb-4 flex-grow">{project.description}</p>
                      <div className="flex flex-wrap gap-2 mt-auto">
                        {project.tech.map((t, i) => (
                          <span key={i} className="px-3 py-1 text-xs font-mono rounded-full border border-foreground/20 text-foreground/70">{t}</span>
                        ))}
                      </div>
                    </div>
                  </article>
                </ElectricBorder>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-muted-foreground text-sm mb-8 mt-12"
          >
            Real-time GitHub activity
          </motion.p>

          {loading ? (
            <div className="text-muted-foreground">Syncing repos...</div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {githubRepos.map((repo, index) => (
                <motion.a
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-card/30 border border-border p-5 rounded-2xl hover:border-accent/50 hover:bg-card/50 transition-all group"
                >
                  <div className="flex flex-col h-full">
                    <div className="flex justify-between items-start mb-2 text-muted-foreground">
                      <h3 className="text-lg font-bold text-foreground group-hover:text-accent transition-colors truncate pr-4">{repo.name}</h3>
                      <div className="flex items-center gap-3 shrink-0">
                         <span className="flex items-center gap-1"><Star size={12}/> {repo.stargazers_count}</span>
                         <span className="flex items-center gap-1"><GitFork size={12}/> {repo.forks_count}</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-grow">{repo.description || "No description provided."}</p>
                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className="text-accent">{repo.language || "TypeScript"}</span>
                      <span className="text-muted-foreground">Updated {new Date(repo.updated_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          )}
        </div>

        <div 
          className="fixed inset-0 pointer-events-none opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
        />
      </div>
    </PageTransition>
  );
};

export default Projects;
