import { useClerk, useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { AiToolsData } from "../assets/assets";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const AiTools = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { openSignIn } = useClerk();
  
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };

  const handleCardClick = (path) => {
    if (user) {
      navigate(path);
      return;
    }

    openSignIn({
      redirectUrl: path,
      afterSignInUrl: path,
    });
  };

  return (
    <section className="relative py-24 overflow-hidden bg-black">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/5 via-transparent to-transparent"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-400 text-sm font-medium mb-4">
            AI-Powered Tools
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-4 mb-6">
            Powerful AI Tools for <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Creators</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            Everything you need to create, enhance, and optimize your content with
            cutting-edge AI technology.
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {AiToolsData.map((tool, index) => (
            <motion.div
              key={index}
              className="group relative p-8 rounded-2xl bg-gray-900/50 backdrop-blur-lg border border-gray-800 hover:border-blue-500/30 transition-all duration-300 cursor-pointer overflow-hidden"
              onClick={() => handleCardClick(tool.path)}
              variants={itemVariants}
              whileHover={{ 
                y: -8,
                boxShadow: "0 20px 40px -10px rgba(0, 0, 0, 0.3)",
                borderColor: "rgba(59, 130, 246, 0.3)"
              }}
            >
              {/* Hover effect background */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Tool icon with gradient background */}
              <div className="relative z-10">
                <div 
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110"
                  style={{
                    background: `linear-gradient(135deg, ${tool.bg.from} 0%, ${tool.bg.to} 100%)`,
                    boxShadow: `0 4px 15px ${tool.bg.from}40`
                  }}
                >
                  <tool.Icon className="w-7 h-7 text-white" />
                </div>
                
                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-blue-400 transition-colors">
                  {tool.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  {tool.description}
                </p>
                
                <div className="flex items-center text-blue-400 text-sm font-medium">
                  <span>Get started</span>
                  <svg 
                    className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
              
              {/* Glow effect */}
              <div 
                className="absolute -right-10 -bottom-10 w-40 h-40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: `radial-gradient(circle, ${tool.bg.to}20 0%, transparent 70%)`
                }}
              ></div>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <p className="text-gray-400 mb-6">And many more tools to help you create amazing content</p>
          <button 
            onClick={() => navigate("/ai")}
            className="inline-flex items-center px-8 py-3.5 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300"
          >
            Explore all tools
            <svg 
              className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default AiTools;
