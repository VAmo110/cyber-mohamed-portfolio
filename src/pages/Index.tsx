
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
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
import EnhancedBackgroundAnimation from '@/components/EnhancedBackgroundAnimation';
import CyberSecurityTips from '@/components/CyberSecurityTips';
import GamificationSystem from '@/components/GamificationSystem';
import CyberAssistant from '@/components/CyberAssistant';
import CyberTerminal from '@/components/CyberTerminal';
import KnowledgeHub from '@/components/KnowledgeHub';
import { useToast } from '@/hooks/use-toast';
import { Progress } from '@/components/ui/progress';
import { useInView } from 'react-intersection-observer';

const Index = () => {
  const { toast } = useToast();
  
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
    knowledge: false,
    contact: false
  });

  // Intersection observers for sections
  const [aboutRef, aboutInView] = useInView({ threshold: 0.3 });
  const [teamsRef, teamsInView] = useInView({ threshold: 0.3 });
  const [featuresRef, featuresInView] = useInView({ threshold: 0.3 });
  const [coursesRef, coursesInView] = useInView({ threshold: 0.3 });
  const [challengesRef, challengesInView] = useInView({ threshold: 0.3 });
  const [contentRef, contentInView] = useInView({ threshold: 0.3 });
  const [projectsRef, projectsInView] = useInView({ threshold: 0.3 });
  const [knowledgeRef, knowledgeInView] = useInView({ threshold: 0.3 });
  const [contactRef, contactInView] = useInView({ threshold: 0.3 });

  // Track section visits
  useEffect(() => {
    const sections = {
      about: aboutInView,
      teams: teamsInView,
      features: featuresInView,
      courses: coursesInView,
      challenges: challengesInView,
      content: contentInView,
      projects: projectsInView,
      knowledge: knowledgeInView,
      contact: contactInView
    };

    Object.entries(sections).forEach(([section, inView]) => {
      if (inView && !visited[section]) {
        setVisited(prev => ({
          ...prev,
          [section]: true
        }));

        toast({
          title: `Section Unlocked: ${section.charAt(0).toUpperCase() + section.slice(1)}`,
          description: "Keep exploring to unlock achievements!",
          variant: "default"
        });
      }
    });
  }, [aboutInView, teamsInView, featuresInView, coursesInView, challengesInView, contentInView, projectsInView, knowledgeInView, contactInView, visited, toast]);

  // Update progress based on visited sections
  useEffect(() => {
    const totalSections = Object.keys(visited).length;
    const visitedCount = Object.values(visited).filter(Boolean).length;
    setProgress(Math.round((visitedCount / totalSections) * 100));
  }, [visited]);

  // Smooth scroll function for navigation links
  useEffect(() => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const href = this.getAttribute('href');
        if (!href) return;
        
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

  return (
    <motion.div 
      className="min-h-screen text-cyber-light overflow-x-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <Header />
      <main>
        {/* Hero section with enhanced particles background */}
        <motion.div 
          className="relative"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <EnhancedBackgroundAnimation type="particles" className="opacity-20" />
          <HeroSection />
        </motion.div>
        
        {/* Site exploration progress */}
        <div className="fixed bottom-0 left-0 w-full z-40 px-4 pb-1 pt-8 pointer-events-none bg-gradient-to-t from-cyber-dark/90 to-transparent">
          <div className="container mx-auto">
            <motion.div 
              className="flex items-center gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              <span className="text-xs text-cyber-light/60">Exploration Progress:</span>
              <Progress value={progress} className="w-40 sm:w-60 h-2" />
              <span className="text-xs text-cyber-light/60">{progress}%</span>
            </motion.div>
          </div>
        </div>
        
        {/* Gamification sidebar */}
        <div className="fixed left-4 top-1/2 transform -translate-y-1/2 z-30 hidden xl:block">
          <GamificationSystem />
        </div>

        {/* Terminal access button */}
        <div className="fixed top-20 right-4 z-30">
          <CyberTerminal />
        </div>
        
        {/* About section */}
        <motion.div 
          ref={aboutRef}
          className="relative" 
          id="about"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <EnhancedBackgroundAnimation type="cyber" className="opacity-10" />
          <AboutSection />
        </motion.div>

        {/* Team section */}
        <motion.div 
          ref={teamsRef}
          className="relative" 
          id="teams"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <TeamSection />
        </motion.div>
        
        {/* Cyber feature section */}
        <motion.div 
          ref={featuresRef}
          className="relative" 
          id="features"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <CyberFeatureSection />
        </motion.div>
        
        {/* Cybersecurity tips section */}
        <motion.section 
          className="py-16 md:py-24 relative"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="container mx-auto px-4">
            <h2 className="section-title">
              Expert <span className="gradient-text">Security</span> Tips
            </h2>
            <CyberSecurityTips />
          </div>
        </motion.section>
        
        {/* Course section */}
        <motion.div 
          ref={coursesRef}
          className="relative" 
          id="courses"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <CourseSection />
        </motion.div>
        
        {/* Challenges section */}
        <motion.div 
          ref={challengesRef}
          className="relative" 
          id="challenges"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <ChallengesSection />
        </motion.div>

        {/* Knowledge Hub section */}
        <motion.div 
          ref={knowledgeRef}
          className="relative"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <KnowledgeHub />
        </motion.div>
        
        {/* Content section */}
        <motion.div 
          ref={contentRef}
          className="relative" 
          id="content"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <ContentSection />
        </motion.div>
        
        {/* Projects section */}
        <motion.div 
          ref={projectsRef}
          className="relative" 
          id="projects"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <ProjectsSection />
        </motion.div>
        
        {/* Contact section */}
        <motion.div 
          ref={contactRef}
          className="relative" 
          id="contact"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <ContactSection />
        </motion.div>
      </main>
      
      <Footer />
      
      {/* AI Assistant */}
      <CyberAssistant />
    </motion.div>
  );
};

export default Index;
