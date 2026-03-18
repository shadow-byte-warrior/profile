import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";

const socials = [
  { icon: Linkedin, href: "https://linkedin.com/in/arunpandian-sh2030", label: "LinkedIn" },
  { icon: Github, href: "https://github.com/shadow-byte-warrior", label: "GitHub" },
  { icon: Mail, href: "mailto:arunpandi47777@gmail.com", label: "Email" },
];

const SocialBar = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="fixed left-6 bottom-0 hidden md:flex flex-col items-center gap-4 z-40"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {socials.map((social) => (
        <motion.a
          key={social.label}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          variants={itemVariants}
          whileHover={{ scale: 1.2, y: -2 }}
          className="p-2 text-foreground/60 hover:text-accent transition-colors duration-300 bg-background/80 backdrop-blur-sm rounded-full"
          aria-label={social.label}
        >
          <social.icon size={18} />
        </motion.a>
      ))}
      <div className="w-px h-20 bg-foreground/20" />
    </motion.div>
  );
};

export default SocialBar;
