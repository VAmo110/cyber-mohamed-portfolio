
import React from 'react';
import { Github, Linkedin, Youtube, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-secondary py-12 border-t border-cyber-purple/20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h3 className="font-orbitron text-2xl font-bold gradient-text mb-4">Cyber With Mohamed</h3>
            <p className="text-cyber-light/80 mb-6">
              Empowering cybersecurity professionals with practical knowledge, 
              training resources, and expert insights.
            </p>
            <div className="flex space-x-4">
              <a href="https://github.com/cyber-with-mohamed" target="_blank" rel="noopener noreferrer" 
                className="bg-cyber-dark/50 hover:bg-cyber-purple/30 p-3 rounded-full transition-colors">
                <Github size={18} />
              </a>
              <a href="https://linkedin.com/in/cyber-with-mohamed" target="_blank" rel="noopener noreferrer" 
                className="bg-cyber-dark/50 hover:bg-cyber-purple/30 p-3 rounded-full transition-colors">
                <Linkedin size={18} />
              </a>
              <a href="https://youtube.com/@cyberwithmohamed" target="_blank" rel="noopener noreferrer" 
                className="bg-cyber-dark/50 hover:bg-cyber-purple/30 p-3 rounded-full transition-colors">
                <Youtube size={18} />
              </a>
              <a href="mailto:contact@cyberwithmohamed.com" target="_blank" rel="noopener noreferrer" 
                className="bg-cyber-dark/50 hover:bg-cyber-purple/30 p-3 rounded-full transition-colors">
                <Mail size={18} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-4">Navigation</h4>
            <ul className="space-y-2">
              <li><a href="#about" className="text-cyber-light/80 hover:text-cyber-purple2 transition-colors">About</a></li>
              <li><a href="#teams" className="text-cyber-light/80 hover:text-cyber-purple2 transition-colors">Teams</a></li>
              <li><a href="#courses" className="text-cyber-light/80 hover:text-cyber-purple2 transition-colors">Courses</a></li>
              <li><a href="#content" className="text-cyber-light/80 hover:text-cyber-purple2 transition-colors">Content</a></li>
              <li><a href="#projects" className="text-cyber-light/80 hover:text-cyber-purple2 transition-colors">Projects</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-4">Contact</h4>
            <p className="text-cyber-light/80 mb-2">
              For business inquiries or collaboration opportunities:
            </p>
            <a href="mailto:contact@cyberwithmohamed.com" className="text-cyber-purple2 hover:underline">
              contact@cyberwithmohamed.com
            </a>
            
            <div className="mt-6">
              <a href="#newsletter" className="bg-gradient-purple hover:bg-gradient-purple-dark px-4 py-2 rounded-full text-white transition-all purple-glow">
                Subscribe to Newsletter
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-cyber-purple/20 text-center text-cyber-light/60">
          <p>© {currentYear} Cyber With Mohamed. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
