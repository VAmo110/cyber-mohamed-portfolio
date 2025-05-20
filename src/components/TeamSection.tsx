
import React from 'react';
import TeamCard from './TeamCard';
import { Shield, Lock, ShieldCheck } from 'lucide-react';
import GradientButton from './GradientButton';
import { Link } from 'react-router-dom';

const TeamSection = () => {
  const teams = [
    {
      title: "Red Team",
      color: "red",
      icon: <Shield className="w-10 h-10 text-red-500" />,
      description: "Offensive security specialists focused on identifying vulnerabilities through simulated attacks and penetration testing.",
      features: [
        "Advanced Penetration Testing Labs",
        "Exploit Development Workshops",
        "Social Engineering Techniques",
        "OWASP Top 10 Challenges"
      ],
      tools: ["Metasploit", "Burp Suite", "Kali Linux", "Cobalt Strike"],
      backgroundImage: "/red-team-bg.jpg"
    },
    {
      title: "Blue Team",
      color: "blue",
      icon: <ShieldCheck className="w-10 h-10 text-blue-500" />,
      description: "Defensive security experts specializing in detection, incident response, and maintaining security controls.",
      features: [
        "SOC Operations & SIEM Mastery",
        "Threat Hunting Techniques",
        "Incident Response Playbooks",
        "Security Hardening Guides"
      ],
      tools: ["Splunk", "ELK Stack", "Wireshark", "Snort IDS"],
      backgroundImage: "/blue-team-bg.jpg"
    },
    {
      title: "Purple Team",
      color: "purple",
      icon: <Lock className="w-10 h-10 text-purple-500" />,
      description: "Collaborative security approach combining offensive and defensive perspectives for comprehensive protection.",
      features: [
        "Attack/Defense Simulations",
        "Breach & Attack Simulation (BAS)",
        "MITRE ATT&CK Framework Integration",
        "Security Controls Validation"
      ],
      tools: ["Atomic Red Team", "Caldera", "PurpleSharp", "Prelude Operator"],
      backgroundImage: "/purple-team-bg.jpg"
    }
  ];

  return (
    <section id="teams" className="py-20 bg-gradient-terminal">
      <div className="container mx-auto px-4">
        <h2 className="section-title">
          Security <span className="gradient-text">Teams</span>
        </h2>
        
        <p className="text-center text-lg text-cyber-light/80 max-w-3xl mx-auto mb-12">
          Explore the three specialized security domains where Mohamed provides expertise, 
          training, and practical knowledge for comprehensive cybersecurity mastery.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teams.map((team, index) => (
            <TeamCard
              key={index}
              title={team.title}
              color={team.color}
              icon={team.icon}
              description={team.description}
              features={team.features}
              tools={team.tools}
              backgroundImage={team.backgroundImage}
            />
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <GradientButton as={Link} to="/teams" className="text-lg">
            Explore Security Teams
          </GradientButton>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
