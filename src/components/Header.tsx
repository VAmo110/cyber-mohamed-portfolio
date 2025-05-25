
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Search, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SearchBar from './SearchBar';
import AnimatedLogo from './AnimatedLogo';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <motion.header 
      className={`sticky top-0 z-50 backdrop-blur-md transition-all duration-300 ${
        isScrolled ? 'bg-cyber-dark/90 shadow-md shadow-cyber-purple/20' : 'bg-cyber-dark/60'
      } border-b border-cyber-purple/20`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <motion.div 
          className="flex items-center"
          whileHover={{ scale: 1.05 }}
        >
          <a href="#" className="flex items-center gap-2">
            <AnimatedLogo />
            <span className="text-xl font-orbitron font-bold purple-text hidden sm:block">
              Cyber With Mohamed
            </span>
          </a>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {[
            { href: "#about", text: "About" },
            { href: "#courses", text: "Courses" },
            { href: "#knowledge-hub", text: "Knowledge" },
            { href: "#challenges", text: "Challenges" },
            { href: "#content", text: "Content" },
            { href: "#projects", text: "Projects" },
            { href: "#contact", text: "Contact" }
          ].map((item, index) => (
            <motion.a
              key={item.href}
              href={item.href}
              className="text-cyber-light hover:text-cyber-purple2 transition-colors relative group"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {item.text}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyber-purple2 transition-all duration-300 group-hover:w-full"></span>
            </motion.a>
          ))}
          
          <div className="relative group">
            <button className="flex items-center text-cyber-light hover:text-cyber-purple2 transition-colors">
              Services <ChevronDown size={16} className="ml-1 transform group-hover:rotate-180 transition-transform" />
            </button>
            <motion.div 
              className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-cyber-dark/95 border border-cyber-purple/20 hidden group-hover:block"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="py-2">
                <a href="#teams" className="block px-4 py-2 text-sm text-cyber-light hover:bg-cyber-purple/20 transition-colors">Security Teams</a>
                <a href="#features" className="block px-4 py-2 text-sm text-cyber-light hover:bg-cyber-purple/20 transition-colors">Cybersecurity Services</a>
                <a href="#interactive" className="block px-4 py-2 text-sm text-cyber-light hover:bg-cyber-purple/20 transition-colors">Interactive Lab</a>
              </div>
            </motion.div>
          </div>
          
          <motion.button 
            onClick={toggleSearch}
            className="p-2 text-cyber-light hover:text-cyber-purple2 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Search size={20} />
          </motion.button>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              className="bg-gradient-purple hover:bg-gradient-purple-dark text-white shadow-lg shadow-cyber-purple/30"
              onClick={() => window.open("https://github.com/cyber-with-mohamed", "_blank")}
            >
              GitHub
            </Button>
          </motion.div>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <motion.button 
            onClick={toggleSearch}
            className="p-2 mr-2 text-cyber-light hover:text-cyber-purple2 transition-colors"
            whileTap={{ scale: 0.95 }}
          >
            <Search size={20} />
          </motion.button>
          <motion.button 
            onClick={toggleMenu} 
            className="p-2"
            whileTap={{ scale: 0.95 }}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </div>

      {/* Search Bar */}
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ 
          height: showSearch ? 'auto' : 0, 
          opacity: showSearch ? 1 : 0 
        }}
        className="overflow-hidden w-full border-t border-cyber-purple/20 bg-cyber-dark/90"
      >
        <div className="container mx-auto py-3 px-4">
          <SearchBar />
        </div>
      </motion.div>

      {/* Mobile Navigation */}
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ 
          height: isMenuOpen ? 'auto' : 0, 
          opacity: isMenuOpen ? 1 : 0 
        }}
        className="md:hidden overflow-hidden bg-cyber-dark/95 border-t border-cyber-purple/20"
      >
        <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
          {[
            { href: "#about", text: "About" },
            { href: "#teams", text: "Security Teams" },
            { href: "#features", text: "Services" },
            { href: "#challenges", text: "Challenges" },
            { href: "#courses", text: "Courses" },
            { href: "#knowledge-hub", text: "Knowledge" },
            { href: "#content", text: "Content" },
            { href: "#projects", text: "Projects" },
            { href: "#contact", text: "Contact" }
          ].map((item) => (
            <motion.a
              key={item.href}
              href={item.href}
              className="text-cyber-light hover:text-cyber-purple2 transition-colors py-2"
              onClick={toggleMenu}
              whileTap={{ scale: 0.95 }}
            >
              {item.text}
            </motion.a>
          ))}
          <Button 
            className="bg-gradient-purple hover:bg-gradient-purple-dark text-white w-full"
            onClick={() => {
              window.open("https://github.com/cyber-with-mohamed", "_blank");
              toggleMenu();
            }}
          >
            GitHub
          </Button>
        </div>
      </motion.div>
    </motion.header>
  );
};

export default Header;
