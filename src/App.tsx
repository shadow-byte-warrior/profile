import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import ParticleCanvas from "@/components/ParticleCanvas";
import SplashCursor from "@/components/SplashCursor";
import MobileNav from "@/components/MobileNav";
import Index from "@/pages/Index";
import About from "@/pages/About";
import Projects from "@/pages/Projects";
import Skills from "@/pages/Skills";
import Experience from "@/pages/Experience";
import Resume from "@/pages/Resume";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";
import Archive from "@/pages/Archive";
import Community from "@/pages/Community";
import Admin from "@/pages/Admin";
import BlogEditor from "@/pages/BlogEditor";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <ParticleCanvas />
        <SplashCursor />
        <BrowserRouter>
          <MobileNav />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/archive" element={<Archive />} />
            <Route path="/community" element={<Community />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/create" element={<BlogEditor />} />
            <Route path="/admin/edit/:id" element={<BlogEditor />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
