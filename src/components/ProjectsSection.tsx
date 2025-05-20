
import React from 'react';
import ProjectCard from './ProjectCard';

const ProjectsSection = () => {
  const projects = [
    {
      title: "Automated Vulnerability Scanner",
      description: "Python-based tool for scanning and identifying web application vulnerabilities with customizable rulesets.",
      image: "/placeholder.svg",
      githubUrl: "https://github.com/cyber-with-mohamed/vuln-scanner",
      demoUrl: "#",
      tags: ["Python", "Security", "Red Team"]
    },
    {
      title: "SIEM Dashboard",
      description: "Custom SOC dashboard for threat visualization with real-time alerts and incident response workflows.",
      image: "/placeholder.svg",
      githubUrl: "https://github.com/cyber-with-mohamed/siem-dashboard",
      tags: ["ELK Stack", "JavaScript", "Blue Team"]
    },
    {
      title: "Attack Simulation Framework",
      description: "Purple team framework for running controlled attack simulations against defensive measures.",
      image: "/placeholder.svg",
      githubUrl: "https://github.com/cyber-with-mohamed/attack-sim",
      demoUrl: "#",
      tags: ["Python", "MITRE ATT&CK", "Purple Team"]
    },
    {
      title: "Red Hat Automation Playbooks",
      description: "Collection of Ansible playbooks for automating common security configurations and hardening measures.",
      image: "/placeholder.svg",
      githubUrl: "https://github.com/cyber-with-mohamed/ansible-security",
      tags: ["Ansible", "Red Hat", "Automation"]
    }
  ];

  return (
    <section id="projects" className="py-20 bg-cyber-dark">
      <div className="container mx-auto px-4">
        <h2 className="section-title">
          <span className="gradient-text">Labs</span> & Projects
        </h2>
        
        <p className="text-center text-lg text-cyber-light/80 max-w-3xl mx-auto mb-12">
          Explore practical security projects, tools, and lab environments created to demonstrate 
          cybersecurity concepts and provide hands-on learning opportunities.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              title={project.title}
              description={project.description}
              image={project.image}
              githubUrl={project.githubUrl}
              demoUrl={project.demoUrl}
              tags={project.tags}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
