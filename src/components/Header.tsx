
import React, { useState, useEffect } from 'react';
import { Menu, X, Search, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SearchBar from './SearchBar';

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
    <header className={`sticky top-0 z-50 backdrop-blur-md transition-all duration-300 ${
      isScrolled ? 'bg-cyber-dark/90 shadow-md' : 'bg-cyber-dark/60'
    } border-b border-cyber-purple/20`}>
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <a href="#" className="text-2xl font-orbitron font-bold purple-text">CWM</a>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#about" className="text-cyber-light hover:text-cyber-purple2 transition-colors">About</a>
          <div className="relative group">
            <button className="flex items-center text-cyber-light hover:text-cyber-purple2 transition-colors">
              Services <ChevronDown size={16} className="ml-1 transform group-hover:rotate-180 transition-transform" />
            </button>
            <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-cyber-dark/95 border border-cyber-purple/20 hidden group-hover:block">
              <div className="py-2">
                <a href="#teams" className="block px-4 py-2 text-sm text-cyber-light hover:bg-cyber-purple/20">Security Teams</a>
                <a href="#features" className="block px-4 py-2 text-sm text-cyber-light hover:bg-cyber-purple/20">Cybersecurity Services</a>
                <a href="#challenges" className="block px-4 py-2 text-sm text-cyber-light hover:bg-cyber-purple/20">CTF Challenges</a>
              </div>
            </div>
          </div>
          <a href="#courses" className="text-cyber-light hover:text-cyber-purple2 transition-colors">Courses</a>
          <a href="#content" className="text-cyber-light hover:text-cyber-purple2 transition-colors">Content</a>
          <a href="#projects" className="text-cyber-light hover:text-cyber-purple2 transition-colors">Projects</a>
          <a href="#contact" className="text-cyber-light hover:text-cyber-purple2 transition-colors">Contact</a>
          <button 
            onClick={toggleSearch}
            className="p-2 text-cyber-light hover:text-cyber-purple2 transition-colors"
          >
            <Search size={20} />
          </button>
          <Button 
            className="bg-gradient-purple hover:bg-gradient-purple-dark text-white"
            onClick={() => window.open("https://github.com/cyber-with-mohamed", "_blank")}
          >
            GitHub
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button 
            onClick={toggleSearch}
            className="p-2 mr-2 text-cyber-light hover:text-cyber-purple2 transition-colors"
          >
            <Search size={20} />
          </button>
          <button onClick={toggleMenu} className="p-2">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Search Bar */}
      {showSearch && (
        <div className="w-full py-3 px-4 border-t border-cyber-purple/20 bg-cyber-dark/90">
          <div className="container mx-auto">
            <SearchBar />
          </div>
        </div>
      )}

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-cyber-dark/95 border-t border-cyber-purple/20">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <a href="#about" className="text-cyber-light hover:text-cyber-purple2 transition-colors py-2" onClick={toggleMenu}>About</a>
            <a href="#teams" className="text-cyber-light hover:text-cyber-purple2 transition-colors py-2" onClick={toggleMenu}>Security Teams</a>
            <a href="#features" className="text-cyber-light hover:text-cyber-purple2 transition-colors py-2" onClick={toggleMenu}>Cybersecurity Services</a>
            <a href="#challenges" className="text-cyber-light hover:text-cyber-purple2 transition-colors py-2" onClick={toggleMenu}>CTF Challenges</a>
            <a href="#courses" className="text-cyber-light hover:text-cyber-purple2 transition-colors py-2" onClick={toggleMenu}>Courses</a>
            <a href="#content" className="text-cyber-light hover:text-cyber-purple2 transition-colors py-2" onClick={toggleMenu}>Content</a>
            <a href="#projects" className="text-cyber-light hover:text-cyber-purple2 transition-colors py-2" onClick={toggleMenu}>Projects</a>
            <a href="#contact" className="text-cyber-light hover:text-cyber-purple2 transition-colors py-2" onClick={toggleMenu}>Contact</a>
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
        </div>
      )}
    </header>
  );
};

export default Header;
