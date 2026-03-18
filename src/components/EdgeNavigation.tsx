import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface EdgeNavigationProps {
  isExpanded: boolean;
}

const navItems = [
  { label: "Resume", path: "/resume", position: "top-left" },
  { label: "Projects", path: "/projects", position: "left-top" },
  { label: "About", path: "/about", position: "bottom-left" },
  { label: "Skills", path: "/skills", position: "bottom-right" },
  { label: "Experience", path: "/experience", position: "right" },
  { label: "Blog", path: "/blog", position: "right-bottom" },
  { label: "Say hi..", path: "mailto:arunpandi47777@gmail.com", position: "top-right", isExternal: true },
];

const EdgeNavigation = ({ isExpanded }: EdgeNavigationProps) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  const getPositionClasses = (position: string) => {
    switch (position) {
      case "top-left":
        return "fixed top-6 lg:top-10 left-20 lg:left-24";
      case "left-top":
        return "fixed left-[70px] lg:left-[90px] top-[35%] -translate-y-1/2 writing-vertical rotate-180";
      case "bottom-left":
        return "fixed bottom-6 lg:bottom-10 left-[30%] -translate-x-1/2";
      case "bottom-right":
        return "fixed bottom-6 lg:bottom-10 right-[30%] translate-x-1/2";
      case "right":
        return "fixed right-6 lg:right-10 top-[35%] -translate-y-1/2 writing-vertical";
      case "right-bottom":
        return "fixed right-6 lg:right-10 top-[65%] -translate-y-1/2 writing-vertical";
      case "top-right":
        return "fixed top-6 lg:top-10 right-6 lg:right-10";
      default:
        return "";
    }
  };

  return (
    <motion.nav
      variants={containerVariants}
      initial="hidden"
      animate={isExpanded ? "visible" : "hidden"}
      className="pointer-events-none hidden sm:block"
    >
      {navItems.map((item) => (
        <motion.div
          key={item.label}
          variants={itemVariants}
          className={`${getPositionClasses(item.position)} pointer-events-auto z-50`}
        >
          {item.isExternal ? (
            <a
              href={item.path}
              className="nav-link text-[11px] md:text-xs lg:text-sm hover:text-accent transition-colors duration-300 whitespace-nowrap"
            >
              {item.label}
            </a>
          ) : (
            <Link
              to={item.path}
              className="nav-link text-[11px] md:text-xs lg:text-sm hover:text-accent transition-colors duration-300 whitespace-nowrap"
            >
              {item.label}
            </Link>
          )}
        </motion.div>
      ))}
    </motion.nav>
  );
};

export default EdgeNavigation;
