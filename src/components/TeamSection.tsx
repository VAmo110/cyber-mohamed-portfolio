
import React from 'react';
import TeamCard from './TeamCard';

const TeamSection = () => {
  const teams = [
    {
      title: "Red Team",
      color: "red",
      icon: "/placeholder.svg", // Replace with actual icon
      description: "Offensive security specialists focused on identifying vulnerabilities through simulated attacks and penetration testing.",
      features: [
        "Penetration Testing Labs",
        "Offensive Security Skills",
        "Kali Linux Demos",
        "Exploit Development"
      ]
    },
    {
      title: "Blue Team",
      color: "blue",
      icon: "/placeholder.svg", // Replace with actual icon
      description: "Defensive security experts specializing in detection, incident response, and maintaining security controls.",
      features: [
        "Defense Tools & Strategies",
        "SIEM/SOC Dashboards",
        "Incident Response Playbooks",
        "Threat Hunting Techniques"
      ]
    },
    {
      title: "Purple Team",
      color: "purple",
      icon: "/placeholder.svg", // Replace with actual icon
      description: "Collaborative security approach combining offensive and defensive perspectives for comprehensive protection.",
      features: [
        "Attack/Defense Simulations",
        "Collaboration Frameworks",
        "MITRE ATT&CK Mappings",
        "Security Assessment Workflows"
      ]
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teams.map((team, index) => (
            <TeamCard
              key={index}
              title={team.title}
              color={team.color}
              icon={team.icon}
              description={team.description}
              features={team.features}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
