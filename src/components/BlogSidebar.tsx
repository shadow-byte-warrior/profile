import { Home, Sparkles, MessageSquare, PlusSquare, User, Menu, LogOut } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const BlogSidebar = () => {
  const location = useLocation();

  const menuItems = [
    { icon: Home, label: "Home", path: "/blog" },
    { icon: Sparkles, label: "Archive", path: "/archive" },
    { icon: MessageSquare, label: "Community", path: "/community" },
    { icon: PlusSquare, label: "Create", path: "/admin/create" },
    { icon: User, label: "Profile", path: "/admin" },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="fixed left-0 top-0 h-screen w-20 xl:w-64 border-r border-border bg-background/80 backdrop-blur-xl z-50 hidden md:flex flex-col py-8 px-4 transition-all duration-300">
        <Link to="/" className="mb-12 px-2 flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-purple-600 flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
            Ap
          </div>
          <span className="hidden xl:block font-display font-bold text-2xl tracking-tighter">Daily Log</span>
        </Link>

        <nav className="flex-1 space-y-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            
            return (
              <Link
                key={item.label}
                to={item.path}
                className={cn(
                  "flex items-center gap-4 p-3 rounded-xl transition-all duration-200 group relative",
                  isActive 
                    ? "bg-accent/10 text-accent font-bold" 
                    : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                )}
              >
                <Icon className={cn("w-6 h-6 transition-transform duration-300 group-hover:scale-110", isActive && "text-accent")} />
                <span className="hidden xl:block text-sm">{item.label}</span>
                {isActive && <div className="absolute left-[-16px] w-1 h-6 bg-accent rounded-r-full" />}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto space-y-2">
           <button className="w-full flex items-center gap-4 p-3 rounded-xl text-muted-foreground hover:bg-muted/50 hover:text-foreground transition-all duration-200 group">
            <Menu className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
            <span className="hidden xl:block text-sm">More</span>
          </button>
        </div>
      </aside>

      {/* Mobile Bottom Bar */}
      <nav className="fixed bottom-0 left-0 right-0 h-16 bg-background/80 backdrop-blur-xl border-t border-border z-50 flex items-center justify-around px-4 md:hidden">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.label}
              to={item.path}
              className={cn(
                "p-2 rounded-lg transition-colors",
                isActive ? "text-accent scale-110" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className="w-6 h-6" />
            </Link>
          );
        })}
      </nav>
    </>
  );
};

export default BlogSidebar;
