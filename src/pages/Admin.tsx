import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { motion } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import Logo from "@/components/Logo";
import { Plus, Edit, Trash, LogOut, PlusSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

import BlogSidebar from "@/components/BlogSidebar";

import { toast } from "sonner";

const Admin = () => {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("blogs").select("*").order("created_at", { ascending: false });
    if (error) toast.error("Failed to fetch threads");
    if (data) setBlogs(data);
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure? This action is permanent!")) {
      try {
        const { error } = await supabase.from("blogs").delete().eq("id", id);
        if (error) {
          console.error("Delete error:", error);
          toast.error(`Delete failed: ${error.message}`);
        } else {
          toast.success("Thread deleted successfully");
          // Update local state immediately for snappy UI
          setBlogs(prev => prev.filter(b => b.id !== id));
        }
      } catch (err) {
        toast.error("An unexpected error occurred");
      }
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-background relative flex flex-col md:flex-row">
        <BlogSidebar />
        
        <div className="flex-1 md:ml-20 xl:ml-64 pb-20 md:pb-0 transition-all duration-300">
          <div className="max-w-4xl mx-auto px-4 py-12 md:py-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
              <div>
                <h1 className="text-4xl font-display font-bold tracking-tight">Dashboard</h1>
                <p className="text-muted-foreground mt-1">Manage your threads and interactions.</p>
              </div>
              <Link to="/admin/create">
                <Button className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg shadow-accent/20 px-6 py-6 rounded-2xl flex gap-2 group">
                  <PlusSquare size={20} className="group-hover:scale-110 transition-transform" />
                  <span>New Thread</span>
                </Button>
              </Link>
            </div>

            <div className="grid gap-4">
              {blogs.length === 0 ? (
                <div className="text-center py-20 border-2 border-dashed border-border rounded-3xl bg-card/10">
                  <p className="text-muted-foreground italic">Your timeline is silent. Start a new thread.</p>
                </div>
              ) : (
                blogs.map(blog => (
                  <motion.div 
                    key={blog.id} 
                    layout
                    className="bg-card/40 backdrop-blur-sm p-6 border border-border/50 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:border-accent/40 transition-colors group"
                  >
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-lg truncate group-hover:text-accent transition-colors">{blog.title}</h3>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-xs text-muted-foreground font-mono">/{blog.slug}</span>
                        <span className="text-[10px] text-border px-2 py-0.5 rounded-full border border-border uppercase">
                          {blog.is_published ? "Published" : "Draft"}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2 w-full sm:w-auto mt-2 sm:mt-0">
                      <Button variant="outline" className="flex-1 sm:flex-none h-11 px-4 rounded-xl border-border/50 hover:bg-muted" onClick={() => navigate(`/admin/edit/${blog.id}`)}>
                        <Edit size={16} className="text-muted-foreground" />
                      </Button>
                      <Button variant="outline" className="flex-1 sm:flex-none h-11 px-4 rounded-xl border-border/50 hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30" onClick={() => handleDelete(blog.id)}>
                        <Trash size={16} />
                      </Button>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Admin;
