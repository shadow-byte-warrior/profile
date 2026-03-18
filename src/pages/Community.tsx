import { motion } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import BlogSidebar from "@/components/BlogSidebar";
import { Hash, MessageSquare, Users, Settings, Plus, Send } from "lucide-react";
import { useState } from "react";

const Community = () => {
  const [activeChannel, setActiveChannel] = useState("general");

  const channels = [
    { id: "general", name: "General Channel", description: "Talk about daily logs and ideas." },
    { id: "ai-labs", name: "AI Research", description: "Share your agentic and RAG breakthroughs." },
    { id: "design-systems", name: "Future of UI", description: "Discuss glassmorphism and motion." },
    { id: "announcements", name: "Global Logs", description: "Official updates for the log." },
  ];

  const messages = [
    { id: 1, user: "arun.pandian", content: "Just landed the new Reels-style scrolling! What do you guys think?", time: "2:34 PM" },
    { id: 2, user: "system", content: "New log uploaded: Agentic SaaS v2.1", time: "3:01 PM" },
    { id: 3, user: "researcher_alpha", content: "The jigsaw reveal is a great attraction method. Increased my dwell time by 40%.", time: "3:15 PM" },
  ];

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#0F0F12] text-foreground relative flex flex-col md:flex-row h-screen overflow-hidden">
        <BlogSidebar />
        
        <div className="flex-1 md:ml-20 xl:ml-64 flex flex-row h-full">
          
          {/* Discord-style Channels Sidebar */}
          <div className="w-64 bg-[#1E1F22] border-r border-white/5 hidden lg:flex flex-col p-4 shadow-xl">
            <div className="flex items-center justify-between mb-8 px-2">
              <h2 className="font-display font-bold text-lg tracking-tighter uppercase italic">Community</h2>
              <Settings size={16} className="text-muted-foreground hover:text-foreground cursor-pointer" />
            </div>

            <nav className="space-y-1">
              {channels.map(channel => (
                <button
                  key={channel.id}
                  onClick={() => setActiveChannel(channel.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${
                    activeChannel === channel.id 
                      ? "bg-white/10 text-white font-medium" 
                      : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                  }`}
                >
                  <Hash size={18} className={activeChannel === channel.id ? "text-accent" : "text-muted-foreground"} />
                  <span className="text-sm truncate">{channel.name}</span>
                </button>
              ))}
            </nav>

            <div className="mt-auto pt-4 border-t border-white/5 flex items-center gap-3 px-2">
              <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center text-[10px] font-bold text-white uppercase shadow-lg shadow-accent/20">AP</div>
              <div className="flex flex-col">
                <span className="text-xs font-bold">arun.pandian</span>
                <span className="text-[10px] text-green-500 font-bold uppercase tracking-widest">Online</span>
              </div>
            </div>
          </div>

          {/* Main Chat Area */}
          <div className="flex-1 flex flex-col h-full bg-[#313338]">
            <header className="h-14 border-b border-black/20 flex items-center px-6 gap-3 shadow-sm bg-[#313338]/80 backdrop-blur-md">
              <Hash size={24} className="text-muted-foreground" />
              <h1 className="font-bold">{channels.find(c => c.id === activeChannel)?.name}</h1>
              <div className="w-px h-6 bg-white/10 mx-2" />
              <p className="text-xs text-muted-foreground hidden md:block">{channels.find(c => c.id === activeChannel)?.description}</p>
              
              <div className="ml-auto flex items-center gap-4 text-muted-foreground">
                <MessageSquare size={20} className="hover:text-foreground cursor-pointer" />
                <Users size={20} className="hover:text-foreground cursor-pointer" />
                <Plus size={20} className="hover:text-foreground cursor-pointer" />
              </div>
            </header>

            <div className="flex-1 overflow-y-auto p-6 space-y-6 flex flex-col">
              <div className="mt-auto" /> {/* Push messages to bottom */}
              
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-4 border border-white/10">
                  <Hash size={40} className="text-accent" />
                </div>
                <h3 className="text-2xl font-bold">Welcome to #{activeChannel}!</h3>
                <p className="text-muted-foreground max-w-xs mx-auto mt-2">This is the start of the {activeChannel} history.</p>
              </div>

              {messages.map(msg => (
                <div key={msg.id} className="flex gap-4 group">
                  <div className="w-10 h-10 rounded-[1rem] bg-indigo-600 flex items-center justify-center text-xs font-bold text-white shadow-lg overflow-hidden flex-shrink-0">
                    {msg.user.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-white hover:underline cursor-pointer">{msg.user}</span>
                      <span className="text-[10px] text-muted-foreground">{msg.time}</span>
                    </div>
                    <p className="text-gray-300 leading-relaxed">{msg.content}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <div className="p-4">
              <div className="bg-[#383A40] rounded-xl flex items-center px-4 py-2 gap-4 shadow-inner">
                <div className="p-2 hover:bg-white/5 rounded-full text-muted-foreground cursor-pointer">
                  <Plus size={20} />
                </div>
                <input 
                  type="text" 
                  placeholder={`Message #${activeChannel}`} 
                  className="bg-transparent border-none focus:ring-0 text-foreground w-full py-2 placeholder:text-muted-foreground"
                />
                <button className="p-2 bg-accent/20 text-accent rounded-lg hover:bg-accent/30 transition-colors">
                  <Send size={18} />
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </PageTransition>
  );
};

export default Community;
