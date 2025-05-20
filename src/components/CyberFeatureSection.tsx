
import React, { useEffect, useRef } from 'react';
import { Shield, Terminal, Database, Lock, Server, Network, Cloud, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import GradientButton from './GradientButton';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
  delay?: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ 
  icon, 
  title, 
  description, 
  className,
  delay = 0
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-10');
          }, delay);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    if (cardRef.current) {
      observer.observe(cardRef.current);
    }
    
    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, [delay]);
  
  return (
    <div 
      ref={cardRef}
      className={cn(
        "feature-card card-hover opacity-0 translate-y-10 transition-all duration-700",
        className
      )}
    >
      <div className="mb-4 text-cyber-purple2 p-2 inline-block rounded-lg bg-cyber-purple/10">
        {icon}
      </div>
      <h4 className="text-xl font-bold mb-3">{title}</h4>
      <p className="text-cyber-light/70 mb-4">{description}</p>
    </div>
  );
};

const CyberFeatureSection = () => {
  const features = [
    {
      icon: <Shield size={28} />,
      title: "Security Assessments",
      description: "Comprehensive evaluation of your security posture with actionable recommendations."
    },
    {
      icon: <Terminal size={28} />,
      title: "Penetration Testing",
      description: "Authorized simulated attacks to identify and exploit vulnerabilities in your systems."
    },
    {
      icon: <Database size={28} />,
      title: "Security Monitoring",
      description: "Real-time threat detection and monitoring for suspicious activities."
    },
    {
      icon: <Lock size={28} />,
      title: "Incident Response",
      description: "Rapid containment, eradication, and recovery from security incidents."
    },
    {
      icon: <Server size={28} />,
      title: "Red Hat Security",
      description: "Expert guidance on securing Linux environments and Red Hat infrastructure."
    },
    {
      icon: <Network size={28} />,
      title: "Network Defense",
      description: "Advanced protection for networks against unauthorized access and attacks."
    },
    {
      icon: <Cloud size={28} />,
      title: "Cloud Security",
      description: "Securing cloud infrastructure across AWS, Azure, and Google Cloud platforms."
    },
    {
      icon: <Zap size={28} />,
      title: "Purple Team Exercises",
      description: "Collaborative security testing combining offensive and defensive perspectives."
    }
  ];

  return (
    <section id="features" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-cyber-grid opacity-5 z-0"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="section-title">
          Advanced <span className="gradient-text">Cybersecurity</span> Solutions
        </h2>
        
        <p className="text-center text-lg text-cyber-light/80 max-w-3xl mx-auto mb-12">
          Leveraging cutting-edge techniques and industry best practices to secure
          your digital assets against evolving threats in today's landscape.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={index * 100}
            />
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <GradientButton href="#contact">
            Request Security Consultation
          </GradientButton>
        </div>
      </div>
    </section>
  );
};

export default CyberFeatureSection;
