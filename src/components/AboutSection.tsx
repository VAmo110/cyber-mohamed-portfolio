
import React from 'react';
import { Card } from '@/components/ui/card';

const AboutSection = () => {
  const certifications = [
    "Certified Ethical Hacker (CEH)",
    "Red Hat Certified System Administrator",
    "Offensive Security Certified Professional",
    "CompTIA Security+"
  ];

  return (
    <section id="about" className="py-20 bg-cyber-dark relative">
      <div className="container mx-auto px-4">
        <h2 className="section-title">
          About <span className="gradient-text">Mohamed</span>
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            <h3 className="text-2xl font-bold mb-4">My Journey</h3>
            <p className="text-lg text-cyber-light/80">
              Mohamed Samir Mostafa is a renowned cybersecurity expert specializing in Red Team, Blue Team, and Purple Team operations. With over a decade of experience in the information security field, he has helped organizations identify vulnerabilities, strengthen their defenses, and train security professionals.
            </p>
            <p className="text-lg text-cyber-light/80">
              As the creator of "Cyber With Mohamed," he focuses on making cybersecurity knowledge accessible through comprehensive courses, engaging YouTube content, and practical demonstrations that bridge theory and real-world application.
            </p>
            
            <h3 className="text-2xl font-bold mt-8 mb-4">Why Cyber With Mohamed?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="cyber-card">
                <h4 className="text-cyber-purple2 font-bold mb-2">Real-world Expertise</h4>
                <p>Based on active industry experience and practical scenarios.</p>
              </Card>
              <Card className="cyber-card">
                <h4 className="text-cyber-purple2 font-bold mb-2">Holistic Approach</h4>
                <p>Complete view of security from attack, defense, and collaborative perspectives.</p>
              </Card>
              <Card className="cyber-card">
                <h4 className="text-cyber-purple2 font-bold mb-2">Community Focus</h4>
                <p>Building a network of security professionals through knowledge sharing.</p>
              </Card>
              <Card className="cyber-card">
                <h4 className="text-cyber-purple2 font-bold mb-2">Continuous Learning</h4>
                <p>Regular updates reflecting the evolving threat landscape.</p>
              </Card>
            </div>
          </div>
          
          <div>
            <div className="cyber-card h-full">
              <h3 className="text-2xl font-bold mb-4">Certifications & Expertise</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-xl font-bold text-cyber-purple2 mb-2">Certifications</h4>
                  <ul className="list-disc pl-5 space-y-2">
                    {certifications.map((cert, index) => (
                      <li key={index}>{cert}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-xl font-bold text-cyber-purple2 mb-2">Expertise</h4>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Penetration Testing</span>
                        <span className="text-cyber-purple2">95%</span>
                      </div>
                      <div className="h-2 bg-secondary/50 rounded-full">
                        <div className="h-full bg-gradient-purple rounded-full w-[95%]"></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Security Operations</span>
                        <span className="text-cyber-purple2">90%</span>
                      </div>
                      <div className="h-2 bg-secondary/50 rounded-full">
                        <div className="h-full bg-gradient-purple rounded-full w-[90%]"></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Red Hat Systems</span>
                        <span className="text-cyber-purple2">85%</span>
                      </div>
                      <div className="h-2 bg-secondary/50 rounded-full">
                        <div className="h-full bg-gradient-purple rounded-full w-[85%]"></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>SIEM & Threat Analysis</span>
                        <span className="text-cyber-purple2">88%</span>
                      </div>
                      <div className="h-2 bg-secondary/50 rounded-full">
                        <div className="h-full bg-gradient-purple rounded-full w-[88%]"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
