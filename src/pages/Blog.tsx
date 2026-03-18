import { motion } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import Logo from "@/components/Logo";
import SocialBar from "@/components/SocialBar";
import { Link } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, ArrowRight, Heart, MessageCircle, Send, MoreHorizontal, Search, Settings, Sparkles, PlusSquare, Compass, Plus } from "lucide-react";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import ReactMarkdown from "react-markdown";
import BlogSidebar from "@/components/BlogSidebar";
import { Button } from "@/components/ui/button";
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
      <div className="min-h-screen bg-black relative flex flex-col md:flex-row h-screen overflow-hidden text-white">
        <BlogSidebar />
        
        {/* Instagram-Style Top Header (Mobile) */}
        <div className="fixed top-0 left-0 right-0 h-16 flex items-center justify-between px-6 z-40 md:hidden bg-gradient-to-b from-black/80 to-transparent">
          <h1 className="font-display font-bold text-2xl tracking-tight">arun.pandian</h1>
          <div className="flex items-center gap-6">
            <Heart size={24} className="hover:scale-110 active:scale-95 transition-transform" />
            <div className="relative hover:scale-110 active:scale-95 transition-transform">
              <MessageCircle size={24} />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-[10px] font-bold border-2 border-black">1</div>
            </div>
          </div>
        </div>

        {/* Main Reels Snap Container */}
        <div className="flex-1 md:ml-20 xl:ml-64 h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth hide-scrollbar no-scrollbar scrollbar-hide bg-black">
          {loading ? (
            <div className="h-screen flex items-center justify-center">
              <div className="w-12 h-12 rounded-full border-4 border-accent border-t-transparent animate-spin" />
            </div>
          ) : (
            <div className="w-full">
              {blogPosts.length === 0 ? (
                <section className="h-screen snap-start flex flex-col items-center justify-center p-8 bg-black">
                   <Link to="/admin/create" className="group flex flex-col items-center gap-6">
                    <div className="w-24 h-24 rounded-[2rem] bg-accent/10 border-2 border-dashed border-accent/30 flex items-center justify-center group-hover:scale-110 group-hover:bg-accent/20 transition-all duration-500">
                      <PlusSquare size={40} className="text-accent" />
                    </div>
                    <div className="text-center">
                      <h2 className="text-2xl md:text-3xl font-display font-bold mb-2">Initialize Your Log</h2>
                      <p className="text-sm md:text-base text-zinc-500">The first post is always the hardest. Start now.</p>
                    </div>
                  </Link>
                </section>
              ) : (
                blogPosts.map((post, index) => (
                  <section 
                    key={post.id} 
                    className="h-screen w-full snap-start relative flex flex-col items-center justify-center overflow-hidden bg-black"
                  >
                    {/* Background / Main Content */}
                    <div className="absolute inset-0 w-full h-full">
                      {post.cover_url ? (
                        <div className="relative w-full h-full">
                          {/* Blurred background for non-standard aspect ratios */}
                          <div 
                            className="absolute inset-0 bg-cover bg-center blur-3xl opacity-40 scale-125"
                            style={{ backgroundImage: `url(${post.cover_url})` }}
                          />
                          {/* Main Image in "Phone" Frame Aspect Ratio */}
                          <div className="relative w-full h-full flex items-center justify-center md:p-12">
                             <motion.img 
                              src={post.cover_url} 
                              alt={post.title}
                              className="w-full h-full md:max-w-md md:h-[90%] object-cover md:rounded-[3rem] shadow-[0_0_80px_rgba(0,0,0,0.9)]"
                              initial={{ opacity: 0, scale: 1.15 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 1, ease: "easeOut" }}
                            />
                            {/* Gradient Overlay for Text Readability */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/40 md:max-w-md md:h-[90%] md:left-1/2 md:-translate-x-1/2 md:rounded-[3rem]" />
                          </div>
                        </div>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-zinc-900">
                          <Compass size={64} className="text-zinc-700 animate-spin-slow" />
                        </div>
                      )}
                    </div>

                    {/* Reels UI Overlay Container */}
                    <div className="absolute inset-0 w-full h-full pointer-events-none flex flex-col justify-end p-6 pb-24 md:pb-16 lg:p-16">
                      <div className="flex w-full items-end justify-between max-w-4xl mx-auto pointer-events-auto">
                        
                        {/* Bottom Left Info */}
                        <motion.div 
                          className="flex-1 max-w-[85%]"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 }}
                        >
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 p-[2px] shadow-lg">
                              <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-[10px] font-bold">AP</div>
                            </div>
                            <span className="font-bold text-sm tracking-tight drop-shadow-md">arun.pandian</span>
                            <span className="text-zinc-400 text-xs">•</span>
                            <button className="text-xs font-bold border border-white/40 px-4 py-1.5 rounded-lg backdrop-blur-md hover:bg-white/10 transition-colors">Follow</button>
                          </div>
                          
                          <h2 className="text-xl md:text-3xl font-bold mb-3 drop-shadow-lg">{post.title}</h2>
                          
                          <div className="text-sm md:text-base text-zinc-100 line-clamp-2 md:line-clamp-3 mb-6 max-w-lg drop-shadow-md font-medium leading-relaxed">
                            <ReactMarkdown>{post.content}</ReactMarkdown>
                          </div>
                          
                          <div className="flex items-center gap-3 opacity-80 text-[10px] md:text-xs font-bold uppercase tracking-widest bg-black/20 backdrop-blur-sm w-fit px-3 py-1.5 rounded-full border border-white/5">
                            <Calendar size={12} className="text-accent" />
                            <span>{new Date(post.created_at).toLocaleDateString()}</span>
                            <span className="w-1 h-1 bg-white/40 rounded-full" />
                            <Sparkles size={12} className="text-yellow-400" />
                            <span>Original Content</span>
                          </div>
                        </motion.div>

                        {/* Right Side Action Bar */}
                        <div className="flex flex-col items-center gap-7 md:gap-9 pb-4">
                          <button className="flex flex-col items-center gap-1.5 group">
                            <div className="p-2.5 rounded-full bg-black/10 backdrop-blur-md hover:bg-black/30 group-active:scale-150 transition-all">
                              <Heart className="w-7 h-7 sm:w-9 sm:h-9 hover:text-red-500 transition-colors drop-shadow-lg" />
                            </div>
                            <span className="text-xs font-bold drop-shadow-lg">4.2k</span>
                          </button>
                          
                          <button className="flex flex-col items-center gap-1.5 group">
                            <div className="p-2.5 rounded-full bg-black/10 backdrop-blur-md hover:bg-black/30 transition-all">
                              <MessageCircle className="w-7 h-7 sm:w-9 sm:h-9 drop-shadow-lg" />
                            </div>
                            <span className="text-xs font-bold drop-shadow-lg">128</span>
                          </button>
                          
                          <button className="flex flex-col items-center group">
                            <div className="p-2.5 rounded-full bg-black/10 backdrop-blur-md hover:bg-black/30 transition-all">
                              <Send className="w-7 h-7 sm:w-9 sm:h-9 drop-shadow-lg hover:translate-x-1 hover:-translate-y-1 transition-transform" />
                            </div>
                          </button>
                          
                          <button className="flex flex-col items-center group">
                            <div className="p-2.5 rounded-full bg-black/10 backdrop-blur-md hover:bg-black/30 transition-all">
                              <MoreHorizontal className="w-7 h-7 sm:w-9 sm:h-9 drop-shadow-lg" />
                            </div>
                          </button>
                          
                          <div className="w-9 h-9 md:w-11 md:h-11 rounded-xl border-2 border-white/80 overflow-hidden mt-2 shadow-2xl relative">
                            <img src={post.cover_url} className="w-full h-full object-cover animate-spin-slow" alt="disc" />
                            <div className="absolute inset-0 bg-black/20" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Desktop Hover Open Link */}
                    <div className="absolute top-8 right-12 hidden md:block">
                         <Link to={`/blog/${post.slug}`}>
                            <button className="flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full font-bold hover:bg-white hover:text-black transition-all group pointer-events-auto">
                                <span>Expand Post</span>
                                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </Link>
                    </div>

                    {/* Scrolling Dots (Vertical) */}
                    <div className="absolute left-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-4">
                      {blogPosts.map((p, i) => (
                        <div 
                          key={p.id} 
                          className={`w-1 rounded-full transition-all duration-500 ${i === index ? 'bg-accent h-10 shadow-[0_0_15px_rgba(244,114,182,0.8)]' : 'bg-white/20 h-3'}`} 
                        />
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
