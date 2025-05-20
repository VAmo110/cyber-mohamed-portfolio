
import React from 'react';
import TerminalEffect from './TerminalEffect';
import GradientButton from './GradientButton';
import { Github, Linkedin, Youtube } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="min-h-[90vh] flex items-center justify-center relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-cyber-grid opacity-5 z-0"></div>
      
      <div className="container mx-auto px-4 z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="w-full lg:w-1/2 space-y-6">
            <div>
              <h3 className="text-cyber-light font-mono mb-2">Welcome to</h3>
              <h1 className="gradient-text font-orbitron">
                Cyber With<br />Mohamed
              </h1>
            </div>
            
            <TerminalEffect 
              text="Cybersecurity Expert | Red Team | Blue Team | Purple Team"
              className="text-lg md:text-xl mb-6"
            />
            
            <p className="text-cyber-light/80 text-lg">
              Specialized in cybersecurity education, penetration testing, 
              defensive security, and creating educational content for 
              the modern security professional.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-4">
              <GradientButton href="#about">
                Learn More
              </GradientButton>
              
              <div className="flex items-center gap-4">
                <a href="https://github.com/cyber-with-mohamed" target="_blank" rel="noopener noreferrer" 
                  className="bg-secondary/80 p-3 rounded-full hover:bg-cyber-purple/20 transition-colors">
                  <Github className="w-5 h-5" />
                </a>
                <a href="https://linkedin.com/in/cyber-with-mohamed" target="_blank" rel="noopener noreferrer" 
                  className="bg-secondary/80 p-3 rounded-full hover:bg-cyber-purple/20 transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="https://youtube.com/@cyberwithmohamed" target="_blank" rel="noopener noreferrer" 
                  className="bg-secondary/80 p-3 rounded-full hover:bg-cyber-purple/20 transition-colors">
                  <Youtube className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
          
          <div className="w-full lg:w-1/2 flex justify-center">
            <div className="relative">
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-cyber-purple/30 purple-glow">
                <img 
                  src="/placeholder.svg" 
                  alt="Mohamed Samir Mostafa" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-gradient-purple px-6 py-2 rounded-full purple-glow">
                <span className="font-mono text-white">cybersecurity expert</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
