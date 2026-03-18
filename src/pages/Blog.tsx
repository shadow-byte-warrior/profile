import { motion } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import Logo from "@/components/Logo";
import SocialBar from "@/components/SocialBar";
import { Link } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, ArrowRight } from "lucide-react";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import ReactMarkdown from "react-markdown";
import BlogProgressBoard from "@/components/BlogProgressBoard";
import { Plus, Compass, Sparkles, PlusSquare } from "lucide-react";
import BlogSidebar from "@/components/BlogSidebar";
import { Button } from "@/components/ui/button";
import JigsawPuzzle from "@/components/JigsawPuzzle";
import { toast } from "sonner";

const Blog = () => {
  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data, error } = await supabase
          .from("blogs")
          .select("*")
          .eq("is_published", true)
          .order("created_at", { ascending: false });
        
        if (error) {
          console.error("Supabase error fetching posts:", error.message);
          toast.error("Failed to load innovations: " + error.message);
          return;
        }

        if (data) {
          console.log(`Successfully fetched ${data.length} blog posts`);
          setBlogPosts(data);
        }
      } catch (err: any) {
        console.error("Unexpected error fetching posts:", err);
      } finally {
        setLoading(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'g') {
        e.preventDefault();
        toast.info("Goggle Command Activated: Searching Innovations...", {
          icon: <Sparkles className="text-accent" size={16} />,
          duration: 2000,
        });
      }
    };

    fetchPosts();
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <PageTransition>
      <div className="min-h-screen bg-background relative flex flex-col md:flex-row h-screen overflow-hidden">
        <BlogSidebar />
        
        {/* Main Reels Snap Container */}
        <div className="flex-1 md:ml-20 xl:ml-64 h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth hide-scrollbar no-scrollbar scrollbar-hide">
          {/* Innovations Header (Stickied to top or floating) */}
          <div className="fixed top-0 left-0 right-0 z-40 md:pl-20 xl:pl-64 flex justify-center p-6 md:p-8 pointer-events-none">
            <motion.div 
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="bg-card/40 backdrop-blur-2xl px-8 py-3 rounded-full border border-border/50 shadow-2xl flex items-center gap-4 pointer-events-auto"
            >
              <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center animate-pulse">
                <Sparkles size={16} className="text-white" />
              </div>
              <span className="font-display font-bold text-lg tracking-tighter uppercase italic">Innovation Hub</span>
              <div className="w-1 h-1 bg-border rounded-full mx-2" />
              <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Live {blogPosts.length}</div>
            </motion.div>
          </div>

          {loading ? (
            <div className="h-screen flex items-center justify-center">
              <div className="w-12 h-12 rounded-full border-4 border-accent border-t-transparent animate-spin" />
            </div>
          ) : (
            <div className="w-full">
              {blogPosts.length === 0 ? (
                <section className="h-screen snap-start flex flex-col items-center justify-center p-8 bg-gradient-to-b from-background to-card/10">
                   <Link to="/admin/create" className="group flex flex-col items-center gap-6">
                    <div className="w-24 h-24 rounded-[2rem] bg-accent/10 border-2 border-dashed border-accent/30 flex items-center justify-center group-hover:scale-110 group-hover:bg-accent/20 transition-all duration-500">
                      <PlusSquare size={40} className="text-accent" />
                    </div>
                    <div className="text-center">
                      <h2 className="text-3xl font-display font-bold mb-2">Initialize Your Innovation</h2>
                      <p className="text-muted-foreground">The first post is always the hardest. Start now.</p>
                    </div>
                  </Link>
                </section>
              ) : (
                blogPosts.map((post, index) => (
                  <section 
                    key={post.id} 
                    className="h-screen snap-start relative flex flex-col items-center justify-center p-4 md:p-12 lg:p-20 overflow-hidden bg-gradient-to-b from-background via-background to-card/5 border-b border-border/10"
                  >
                    <div className="container max-w-5xl mx-auto h-full flex flex-col md:flex-row items-center gap-8 md:gap-16">
                      
                      {/* Visual Content (Jigsaw) */}
                      <div className="flex-1 w-full flex items-center justify-center order-2 md:order-1">
                        <div className="w-full max-w-lg animate-in zoom-in duration-1000">
                          {post.cover_url ? (
                            <JigsawPuzzle imageUrl={post.cover_url} />
                          ) : (
                            <div className="aspect-square rounded-[3rem] bg-card/40 border border-border/50 flex items-center justify-center shadow-2xl">
                              <Compass size={64} className="text-muted-foreground/20 animate-spin-slow" />
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Text Content */}
                      <div className="flex-1 flex flex-col items-start text-left order-1 md:order-2 md:pt-12">
                        <motion.div
                          initial={{ x: 20, opacity: 0 }}
                          whileInView={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.2 }}
                        >
                          <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-accent to-purple-600 flex items-center justify-center text-xs font-bold text-white shadow-xl">AP</div>
                            <div className="flex flex-col">
                              <span className="font-bold text-lg">arun.pandian</span>
                              <span className="text-xs text-muted-foreground">
                                {post.created_at ? new Date(post.created_at).toLocaleDateString() : 'Date unavailable'}
                              </span>
                            </div>
                          </div>
                          
                          <h2 className="text-4xl md:text-5xl lg:text-7xl font-display font-bold leading-[0.9] tracking-tighter mb-8 bg-gradient-to-b from-foreground to-foreground/40 bg-clip-text text-transparent italic">
                            {post.title}
                          </h2>
                          
                          <div className="prose prose-invert max-w-none text-muted-foreground line-clamp-4 md:line-clamp-6 text-lg leading-relaxed mb-8">
                            <ReactMarkdown>{post.content}</ReactMarkdown>
                          </div>

                          <div className="flex items-center gap-6">
                            <Link to={`/blog/${post.slug}`}>
                              <Button className="bg-accent text-accent-foreground rounded-2xl px-10 py-7 text-lg shadow-xl shadow-accent/20 hover:scale-105 transition-all">
                                Open Thread
                              </Button>
                            </Link>
                            <button className="flex flex-col items-center gap-1 text-muted-foreground hover:text-accent transition-colors group">
                              <Plus size={24} className="rotate-45 group-hover:scale-110" />
                              <span className="text-[10px] font-bold uppercase">82</span>
                            </button>
                            <button className="flex flex-col items-center gap-1 text-muted-foreground hover:text-accent transition-colors group">
                              <Plus size={24} className="group-hover:scale-110" />
                              <span className="text-[10px] font-bold uppercase">Chat</span>
                            </button>
                          </div>
                        </motion.div>
                      </div>
                    </div>

                    {/* Scrolling Indicator (Small Dot/Bar) */}
                    <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden md:flex flex-col gap-3">
                      {blogPosts.map((p, i) => (
                        <div key={p.id} className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${i === index ? 'bg-accent h-8 shadow-[0_0_10px_rgba(244,114,182,0.8)]' : 'bg-muted'}`} />
                      ))}
                    </div>
                  </section>
                ))
              )}
            </div>
          )}
        </div>
      </div>
      
      {/* Goggle Command Bar Placeholder */}
      <div className="fixed bottom-20 md:bottom-12 left-1/2 -translate-x-1/2 z-50 w-full max-w-xs md:max-w-md px-4">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-background/80 backdrop-blur-3xl border border-white/10 rounded-2xl p-4 shadow-2xl flex items-center justify-between group cursor-pointer"
        >
          <div className="flex items-center gap-4">
             <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-muted-foreground group-hover:text-accent transition-colors">
              <span className="font-display font-bold text-xl tracking-tighter">G</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Innovation Search</span>
              <span className="text-sm font-medium">Command G to iterate</span>
            </div>
          </div>
          <div className="px-3 py-1 bg-white/5 rounded-lg border border-white/10 text-[10px] uppercase font-bold text-muted-foreground">
            ⌘ + G
          </div>
        </motion.div>
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </PageTransition>
  );
};

export default Blog;
