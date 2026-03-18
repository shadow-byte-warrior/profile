import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { motion } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { ArrowLeft, PlusSquare } from "lucide-react";

import BlogSidebar from "@/components/BlogSidebar";

const BlogEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");
  const [coverUrl, setCoverUrl] = useState("");
  const [isPublished, setIsPublished] = useState(true);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (id) {
      supabase.from("blogs").select("*").eq("id", id).single().then(({ data }) => {
        if (data) {
          setTitle(data.title);
          setSlug(data.slug);
          setContent(data.content);
          setCoverUrl(data.cover_url);
          setIsPublished(data.is_published);
        }
      });
    }
  }, [id]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `covers/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('blog-images')
      .upload(filePath, file);

    if (uploadError) {
      alert(uploadError.message);
      setUploading(false);
      return;
    }

    const { data: { publicUrl } } = supabase.storage
      .from('blog-images')
      .getPublicUrl(filePath);

    setCoverUrl(publicUrl);
    setUploading(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const postData = { title, slug, content, cover_url: coverUrl, is_published: isPublished, updated_at: new Date().toISOString() };

    if (id) {
      const { error } = await supabase.from("blogs").update(postData).eq("id", id);
      if (!error) navigate("/admin");
      else alert(error.message);
    } else {
      const { error } = await supabase.from("blogs").insert([postData]);
      if (!error) navigate("/admin");
      else alert(error.message);
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-background relative flex flex-col md:flex-row">
        <BlogSidebar />
        
        <div className="flex-1 md:ml-20 xl:ml-64 pb-20 md:pb-0 transition-all duration-300">
          <div className="max-w-4xl mx-auto px-4 py-12 md:py-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex items-center gap-4 mb-12">
              <Button variant="ghost" onClick={() => navigate("/admin")} className="rounded-xl hover:bg-muted group">
                <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
              </Button>
              <h1 className="text-3xl font-display font-bold">{id ? "Edit Thread" : "New Thread"}</h1>
            </div>
            
            <form onSubmit={handleSave} className="space-y-8 bg-card/40 backdrop-blur-md border border-border/50 p-8 md:p-12 rounded-[2.5rem] shadow-2xl shadow-accent/5">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold ml-1">Title</label>
                <input 
                  value={title} 
                  onChange={e => setTitle(e.target.value)} 
                  placeholder="What's on your mind?" 
                  className="w-full text-3xl md:text-4xl font-display font-bold bg-transparent border-none outline-none focus:ring-0 placeholder:text-muted-foreground/30"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold ml-1">Slug</label>
                  <input 
                    value={slug} 
                    onChange={e => setSlug(e.target.value)} 
                    placeholder="thread-slug" 
                    className="w-full bg-background/50 p-4 border border-border/50 rounded-2xl text-sm focus:border-accent/50 transition-colors outline-none"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold ml-1">Cover Image</label>
                  <div className="flex gap-2">
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleFileUpload} 
                      className="hidden" 
                      id="cover-upload"
                      disabled={uploading}
                    />
                    <label 
                      htmlFor="cover-upload" 
                      className={`flex-1 p-4 border border-dashed border-border/50 rounded-2xl text-center cursor-pointer hover:bg-muted/50 transition-all text-xs flex items-center justify-center gap-2 ${uploading ? 'opacity-50' : 'hover:border-accent/40'}`}
                    >
                      {uploading ? (
                        <span className="animate-pulse">Uploading...</span>
                      ) : (
                        <>
                          <PlusSquare size={16} />
                          <span>{coverUrl ? "Change" : "Upload"}</span>
                        </>
                      )}
                    </label>
                    <input 
                      value={coverUrl} 
                      onChange={e => setCoverUrl(e.target.value)} 
                      placeholder="Paste URL" 
                      className="flex-[2] bg-background/50 p-4 border border-border/50 rounded-2xl text-sm focus:border-accent/50 transition-colors outline-none"
                    />
                  </div>
                </div>
              </div>

              {coverUrl && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="relative group rounded-3xl overflow-hidden aspect-video border border-border/50 shadow-inner bg-muted/20"
                >
                  <img src={coverUrl} alt="Cover Preview" className="w-full h-full object-cover transition-transform group-hover:scale-[1.02] duration-700" />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
                  <Button 
                    type="button" 
                    variant="destructive" 
                    size="sm" 
                    className="absolute top-4 right-4 rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => setCoverUrl("")}
                  >
                    Remove
                  </Button>
                </motion.div>
              )}

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold ml-1">Content (Markdown)</label>
                <textarea 
                  value={content} 
                  onChange={e => setContent(e.target.value)} 
                  placeholder="Tell your story... (markdown supported)" 
                  className="w-full h-[30rem] bg-background/30 p-8 border border-border/50 rounded-[2rem] font-sans text-lg leading-relaxed focus:border-accent/50 transition-all outline-none resize-none placeholder:italic placeholder:text-muted-foreground/20"
                />
              </div>

              <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-6 border-t border-border/20">
                <div className="flex items-center gap-3 bg-muted/30 px-6 py-3 rounded-full border border-border/50">
                  <input 
                    type="checkbox" 
                    id="published" 
                    checked={isPublished} 
                    onChange={e => setIsPublished(e.target.checked)} 
                    className="w-4 h-4 rounded border-border text-accent focus:ring-accent accent-accent"
                  />
                  <label htmlFor="published" className="text-sm font-bold cursor-pointer select-none">Make thread public</label>
                </div>
                
                <Button 
                  type="submit" 
                  disabled={uploading} 
                  className="bg-accent text-accent-foreground px-12 py-7 text-lg rounded-[1.5rem] w-full md:w-auto shadow-xl shadow-accent/20 hover:shadow-accent/30 hover:scale-[1.02] transition-all font-bold group"
                >
                  {uploading ? (
                    "Processing..."
                  ) : (
                    <>
                      <span>{id ? "Update Thread" : "Post Thread"}</span>
                      <PlusSquare size={20} className="ml-2 group-hover:rotate-90 transition-transform" />
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default BlogEditor;
