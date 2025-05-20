
import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import TeamSection from '@/components/TeamSection';
import CourseSection from '@/components/CourseSection';
import ContentSection from '@/components/ContentSection';
import ProjectsSection from '@/components/ProjectsSection';
import CyberFeatureSection from '@/components/CyberFeatureSection';
import ChallengesSection from '@/components/ChallengesSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import BackgroundAnimation from '@/components/BackgroundAnimation';
import CyberSecurityTips from '@/components/CyberSecurityTips';
import { useToast } from '@/hooks/use-toast';
import { Progress } from '@/components/ui/progress';

const Index = () => {
  const { toast } = useToast();
  
  // Smooth scroll function for navigation links
  useEffect(() => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const href = this.getAttribute('href');
        if (!href) return;
        
        // For the '#' link (usually home), just scroll to top
        if (href === '#') {
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
          return;
        }
        
        const target = document.querySelector(href);
        if (!target) return;

        window.scrollTo({
          top: (target as HTMLElement).offsetTop - 100,
          behavior: 'smooth'
        });
      });
    });

    return () => {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.removeEventListener('click', () => {});
      });
    };
  }, []);
  
  // Track user engagement
  const [progress, setProgress] = useState(0);
  const [visited, setVisited] = useState<Record<string, boolean>>({
    about: false,
    teams: false,
    features: false,
    courses: false,
    challenges: false,
    content: false,
    projects: false,
    contact: false
  });
  
  // Add a scrolling animation effect and section tracking
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
          
          // Track section visit
          const sectionId = entry.target.id;
          if (sectionId && !visited[sectionId]) {
            setVisited(prev => ({
              ...prev,
              [sectionId]: true
            }));
            
            // Give feedback for first visit to each section
            toast({
              title: `Exploring: ${sectionId.charAt(0).toUpperCase() + sectionId.slice(1)}`,
              description: "Unlock more content by exploring all sections",
              variant: "default"
            });
          }
          
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    
    document.querySelectorAll('section[id]').forEach(section => {
      observer.observe(section);
    });
    
    return () => {
      document.querySelectorAll('section[id]').forEach(section => {
        observer.unobserve(section);
      });
    };
  }, [visited, toast]);
  
  // Update progress based on visited sections
  useEffect(() => {
    const totalSections = Object.keys(visited).length;
    const visitedCount = Object.values(visited).filter(Boolean).length;
    
    setProgress(Math.round((visitedCount / totalSections) * 100));
  }, [visited]);

  return (
    <div className="min-h-screen text-cyber-light overflow-x-hidden">
      <Header />
      <main>
        {/* Hero section with particles background */}
        <div className="relative">
          <BackgroundAnimation type="particles" opacity={0.1} speed="slow" />
          <HeroSection />
        </div>
        
        {/* Site exploration progress */}
        <div className="fixed bottom-0 left-0 w-full z-40 px-4 pb-1 pt-8 pointer-events-none bg-gradient-to-t from-cyber-dark to-transparent">
          <div className="container mx-auto">
            <div className="flex items-center gap-3">
              <span className="text-xs text-cyber-light/60">Site Exploration:</span>
              <Progress value={progress} size="sm" className="w-40 sm:w-60" />
              <span className="text-xs text-cyber-light/60">{progress}%</span>
            </div>
          </div>
        </div>
        
        {/* About section with cyber grid background */}
        <div className="relative" id="about">
          <BackgroundAnimation type="cyber" opacity={0.05} speed="slow" />
          <AboutSection />
        </div>

        {/* Team section with matrix background */}
        <div className="relative" id="teams">
          <BackgroundAnimation type="matrix" opacity={0.05} speed="medium" />
          <TeamSection />
        </div>
        
        {/* Cyber feature section with grid background */}
        <div className="relative" id="features">
          <BackgroundAnimation type="grid" opacity={0.04} speed="medium" />
          <CyberFeatureSection />
        </div>
        
        {/* Cybersecurity tips section */}
        <section className="py-16 md:py-24 relative">
          <div className="container mx-auto px-4">
            <h2 className="section-title">
              Expert <span className="gradient-text">Security</span> Tips
            </h2>
            <CyberSecurityTips />
          </div>
        </section>
        
        {/* Course section with particles background */}
        <div className="relative" id="courses">
          <BackgroundAnimation type="particles" opacity={0.05} color="#7E69AB" speed="slow" />
          <CourseSection />
        </div>
        
        {/* Challenges section with cyber grid background */}
        <div className="relative" id="challenges">
          <BackgroundAnimation type="cyber" opacity={0.05} color="#6A0DAD" speed="medium" />
          <ChallengesSection />
        </div>
        
        {/* Content section */}
        <div className="relative" id="content">
          <BackgroundAnimation type="grid" opacity={0.04} speed="slow" />
          <ContentSection />
        </div>
        
        {/* Projects section with matrix background */}
        <div className="relative" id="projects">
          <BackgroundAnimation type="matrix" opacity={0.04} speed="medium" />
          <ProjectsSection />
        </div>
        
        {/* Contact section with particles background */}
        <div className="relative" id="contact">
          <BackgroundAnimation type="particles" opacity={0.08} speed="slow" />
          <ContactSection />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
