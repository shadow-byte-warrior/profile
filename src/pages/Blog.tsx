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
          toast.error("Failed to load posts: " + error.message);
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

    fetchPosts();
  }, []);

  return (
    <PageTransition>
      <div className="min-h-screen bg-background relative flex flex-col md:flex-row h-screen overflow-hidden">
        <BlogSidebar />
        
        {/* Main Reels Snap Container */}
        <div className="flex-1 md:ml-20 xl:ml-64 h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth hide-scrollbar no-scrollbar scrollbar-hide">

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
                      <h2 className="text-2xl md:text-3xl font-display font-bold mb-2">Initialize Your Log</h2>
                      <p className="text-sm md:text-base text-muted-foreground">The first post is always the hardest. Start now.</p>
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
                          
                          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-display font-bold leading-[0.9] tracking-tighter mb-6 md:mb-8 bg-gradient-to-b from-foreground to-foreground/40 bg-clip-text text-transparent italic">
                            {post.title}
                          </h2>
                          
                          <div className="prose prose-invert max-w-none text-muted-foreground line-clamp-3 md:line-clamp-6 text-base md:text-lg leading-relaxed mb-6 md:mb-8">
                            <ReactMarkdown>{post.content}</ReactMarkdown>
                          </div>

                          <div className="flex items-center gap-6">
                            <Link to={`/blog/${post.slug}`}>
                              <Button className="bg-accent text-accent-foreground rounded-2xl px-6 md:px-10 py-5 md:py-7 text-base md:text-lg shadow-xl shadow-accent/20 hover:scale-105 transition-all">
                                Open Post
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
      

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </PageTransition>
  );
};

export default Blog;
