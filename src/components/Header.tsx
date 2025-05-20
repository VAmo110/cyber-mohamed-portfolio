
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-cyber-dark/80 border-b border-cyber-purple/20">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <a href="#" className="text-2xl font-orbitron font-bold purple-text">CWM</a>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#about" className="text-cyber-light hover:text-cyber-purple2 transition-colors">About</a>
          <a href="#teams" className="text-cyber-light hover:text-cyber-purple2 transition-colors">Teams</a>
          <a href="#courses" className="text-cyber-light hover:text-cyber-purple2 transition-colors">Courses</a>
          <a href="#content" className="text-cyber-light hover:text-cyber-purple2 transition-colors">Content</a>
          <a href="#projects" className="text-cyber-light hover:text-cyber-purple2 transition-colors">Projects</a>
          <Button 
            className="bg-gradient-purple hover:bg-gradient-purple-dark text-white"
            onClick={() => window.open("https://github.com/cyber-with-mohamed", "_blank")}
          >
            GitHub
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="p-2">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-cyber-dark border-t border-cyber-purple/20">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <a href="#about" className="text-cyber-light hover:text-cyber-purple2 transition-colors py-2" onClick={toggleMenu}>About</a>
            <a href="#teams" className="text-cyber-light hover:text-cyber-purple2 transition-colors py-2" onClick={toggleMenu}>Teams</a>
            <a href="#courses" className="text-cyber-light hover:text-cyber-purple2 transition-colors py-2" onClick={toggleMenu}>Courses</a>
            <a href="#content" className="text-cyber-light hover:text-cyber-purple2 transition-colors py-2" onClick={toggleMenu}>Content</a>
            <a href="#projects" className="text-cyber-light hover:text-cyber-purple2 transition-colors py-2" onClick={toggleMenu}>Projects</a>
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
