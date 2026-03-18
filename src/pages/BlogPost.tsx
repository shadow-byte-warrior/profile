import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { supabase } from "@/lib/supabase";
import PageTransition from "@/components/PageTransition";
import Logo from "@/components/Logo";
import SocialBar from "@/components/SocialBar";
import { ArrowLeft, Calendar, Clock, Plus, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface BlogPost {
  title: string;
  content: string;
  created_at: string;
  cover_url?: string;
}

import JigsawPuzzle from "@/components/JigsawPuzzle";
import BlogSidebar from "@/components/BlogSidebar";

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [isUnlocked, setIsUnlocked] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .eq("slug", slug)
        .single();

      if (data) setPost(data);
      setLoading(false);
    };

    fetchPost();
  }, [slug]);

  if (loading) return (
    <div className="min-h-screen bg-background flex items-center justify-center animate-pulse">
      <div className="w-12 h-12 rounded-full border-4 border-accent border-t-transparent animate-spin" />
    </div>
  );
  
  if (!post) return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4">
      <h2 className="text-2xl font-display font-bold">Thread Missing</h2>
      <Link to="/blog" className="text-accent underline">Return to Timeline</Link>
    </div>
  );

  return (
    <PageTransition>
      <div className="min-h-screen bg-background relative flex flex-col md:flex-row">
        <BlogSidebar />
        
        <div className="flex-1 md:ml-20 xl:ml-64 pb-20 md:pb-0 transition-all duration-300">
          <div className="container max-w-4xl mx-auto px-4 sm:px-6 md:px-8 py-12 md:py-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
            
            <div className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-accent group transition-colors"
              >
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                <span>Back to Timeline</span>
              </Link>
              
              <div className="flex items-center gap-4 text-[10px] uppercase tracking-widest font-bold text-muted-foreground bg-card/40 px-4 py-2 rounded-full border border-border/50">
                <Calendar size={12} className="text-accent" />
                <span>{new Date(post.created_at).toLocaleDateString()}</span>
                <span className="w-1 h-1 bg-border rounded-full" />
                <Clock size={12} className="text-accent" />
                <span>8 min read</span>
              </div>
            </div>

            {post.cover_url && (
              <div className="mb-16">
                <JigsawPuzzle 
                  imageUrl={post.cover_url} 
                  onSolve={() => setIsUnlocked(true)} 
                />
              </div>
            )}

            <motion.div 
              animate={{ opacity: isUnlocked ? 1 : 0.6, y: 0 }}
              className="space-y-8"
            >
              <h1 className="text-4xl md:text-6xl font-display font-bold mb-8 leading-tight tracking-tight">
                {post.title}
              </h1>

              <div className={cn(
                "prose prose-invert max-w-none prose-lg prose-p:leading-relaxed prose-headings:font-display prose-headings:font-bold prose-accent prose-img:rounded-3xl transition-all duration-1000",
                !isUnlocked && post.cover_url ? "blur-md select-none opacity-20" : "blur-0"
              )}>
                <ReactMarkdown>{post.content}</ReactMarkdown>
              </div>

              {!isUnlocked && post.cover_url && (
                <div className="text-center py-12 bg-card/10 rounded-3xl border border-dashed border-border/50 mt-12">
                  <p className="text-muted-foreground italic mb-4">Solve the puzzle above to unlock the full thread.</p>
                  <Button 
                    variant="ghost" 
                    onClick={() => setIsUnlocked(true)}
                    className="text-xs uppercase tracking-widest text-accent font-bold hover:bg-accent/10"
                  >
                    Quick Unlock →
                  </Button>
                </div>
              )}
            </motion.div>

            {/* Social Interaction Bar (Threads Style) */}
            <div className="mt-20 border-t border-border/30 pt-10 flex items-center justify-around md:justify-start md:gap-12 text-muted-foreground">
              <button className="flex items-center gap-2 hover:text-accent transition-all group">
                <div className="p-3 rounded-full bg-card group-hover:bg-accent/10 transition-colors">
                  <Plus size={20} className="group-hover:scale-110 transition-transform rotate-45" />
                </div>
                <div className="flex flex-col items-start translate-y-[-1px]">
                  <span className="text-sm font-bold text-foreground">4.2k</span>
                  <span className="text-[10px] uppercase font-bold tracking-tighter opacity-50">Golds</span>
                </div>
              </button>

              <button className="flex items-center gap-2 hover:text-accent transition-all group">
                <div className="p-3 rounded-full bg-card group-hover:bg-accent/10 transition-colors">
                  <Plus size={20} className="group-hover:scale-110 transition-transform" />
                </div>
                <div className="flex flex-col items-start translate-y-[-1px]">
                  <span className="text-sm font-bold text-foreground">Interactions</span>
                  <span className="text-[10px] uppercase font-bold tracking-tighter opacity-50">Join the discussion</span>
                </div>
              </button>

              <button className="flex items-center gap-2 hover:text-accent transition-all group ml-auto md:ml-0">
                <div className="p-3 rounded-full bg-card group-hover:bg-accent/10 transition-colors">
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </div>
                <span className="text-sm font-bold hidden md:block">Share Thread</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default BlogPost;
