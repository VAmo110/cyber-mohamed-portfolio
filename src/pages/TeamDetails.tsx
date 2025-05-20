
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import GradientButton from '@/components/GradientButton';
import TerminalEffect from '@/components/TerminalEffect';
import { Shield, ShieldCheck, Lock, Bug, Database, Server } from 'lucide-react';

const TeamDetails = () => {
  return (
    <div className="min-h-screen text-cyber-light overflow-x-hidden">
      <Header />
      <main>
        <section id="team-details" className="py-24 bg-cyber-dark relative overflow-hidden">
          <div className="absolute inset-0 matrix-bg opacity-5 z-0"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <h1 className="section-title mb-16">
              Security <span className="gradient-text">Team Details</span>
            </h1>
            
            <Tabs defaultValue="red-team" className="w-full">
              <div className="flex justify-center mb-10">
                <TabsList className="bg-secondary/50 p-1">
                  <TabsTrigger value="red-team" className="text-lg px-8 py-3 gap-2 flex items-center">
                    <Shield className="w-5 h-5 text-red-500" />
                    Red Team
                  </TabsTrigger>
                  <TabsTrigger value="blue-team" className="text-lg px-8 py-3 gap-2 flex items-center">
                    <ShieldCheck className="w-5 h-5 text-blue-500" />
                    Blue Team
                  </TabsTrigger>
                  <TabsTrigger value="purple-team" className="text-lg px-8 py-3 gap-2 flex items-center">
                    <Lock className="w-5 h-5 text-purple-500" />
                    Purple Team
                  </TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="red-team">
                <div className="cyber-card overflow-hidden" style={{
                  backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.95)), url('/red-team-bg.jpg')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}>
                  <div className="flex items-center mb-6">
                    <div className="p-3 rounded-full bg-red-900/30 mr-4">
                      <Shield className="w-8 h-8 text-red-500" />
                    </div>
                    <h2 className="text-3xl font-bold">Red Team Operations</h2>
                  </div>
                  
                  <TerminalEffect 
                    text="Red Team operations involve simulating real-world attacks to identify security weaknesses before malicious actors can exploit them. This offensive security approach helps organizations strengthen their defenses through practical assessment."
                    speed={15}
                    className="mb-8"
                  />
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    <div>
                      <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <Bug className="w-5 h-5 text-red-500" />
                        Core Methodologies
                      </h3>
                      
                      <ul className="space-y-3 mb-8">
                        <li className="flex gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2"></span>
                          <div>
                            <span className="font-bold">MITRE ATT&CK Framework</span> - Systematic approach following established attack patterns
                          </div>
                        </li>
                        <li className="flex gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2"></span>
                          <div>
                            <span className="font-bold">Advanced Persistent Threat (APT) Simulation</span> - Mimicking sophisticated adversaries
                          </div>
                        </li>
                        <li className="flex gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2"></span>
                          <div>
                            <span className="font-bold">Social Engineering</span> - Testing human vulnerabilities through phishing and other techniques
                          </div>
                        </li>
                        <li className="flex gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2"></span>
                          <div>
                            <span className="font-bold">Physical Security Testing</span> - Evaluating on-premises security controls
                          </div>
                        </li>
                      </ul>
                      
                      <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <Server className="w-5 h-5 text-red-500" />
                        Recommended Tools
                      </h3>
                      
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Tool</TableHead>
                            <TableHead>Purpose</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell className="font-medium">Metasploit</TableCell>
                            <TableCell>Exploitation framework</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Cobalt Strike</TableCell>
                            <TableCell>C2 framework & post-exploitation</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Burp Suite Pro</TableCell>
                            <TableCell>Web application security testing</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Bloodhound</TableCell>
                            <TableCell>Active Directory attack path analysis</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <Database className="w-5 h-5 text-red-500" />
                        Training Resources
                      </h3>
                      
                      <div className="space-y-4 mb-8">
                        <div className="p-4 bg-secondary/30 rounded-lg border border-red-500/20">
                          <h4 className="font-bold">OSCP Certification</h4>
                          <p className="text-sm">Industry standard for offensive security professionals</p>
                        </div>
                        <div className="p-4 bg-secondary/30 rounded-lg border border-red-500/20">
                          <h4 className="font-bold">Red Hat Enterprise Linux Security</h4>
                          <p className="text-sm">Understanding target systems and privilege escalation</p>
                        </div>
                        <div className="p-4 bg-secondary/30 rounded-lg border border-red-500/20">
                          <h4 className="font-bold">Web Application Exploitation</h4>
                          <p className="text-sm">OWASP Top 10 vulnerabilities and exploitation techniques</p>
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-bold mb-4">Red Team Labs</h3>
                      
                      <div className="space-y-4">
                        <div className="p-4 bg-secondary/30 rounded-lg border border-red-500/20">
                          <div className="flex justify-between items-start">
                            <h4 className="font-bold">Active Directory Lab</h4>
                            <span className="text-xs bg-red-500/20 px-2 py-1 rounded">Advanced</span>
                          </div>
                          <p className="text-sm mb-2">Simulated enterprise environment for domain privilege escalation</p>
                          <GradientButton variant="secondary" className="w-full" size="sm">Access Lab</GradientButton>
                        </div>
                        <div className="p-4 bg-secondary/30 rounded-lg border border-red-500/20">
                          <div className="flex justify-between items-start">
                            <h4 className="font-bold">Web Exploitation Lab</h4>
                            <span className="text-xs bg-red-500/20 px-2 py-1 rounded">Intermediate</span>
                          </div>
                          <p className="text-sm mb-2">DVWA and custom vulnerable web applications</p>
                          <GradientButton variant="secondary" className="w-full" size="sm">Access Lab</GradientButton>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="blue-team">
                <div className="cyber-card overflow-hidden" style={{
                  backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.95)), url('/blue-team-bg.jpg')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}>
                  <div className="flex items-center mb-6">
                    <div className="p-3 rounded-full bg-blue-900/30 mr-4">
                      <ShieldCheck className="w-8 h-8 text-blue-500" />
                    </div>
                    <h2 className="text-3xl font-bold">Blue Team Operations</h2>
                  </div>
                  
                  <TerminalEffect 
                    text="Blue Team operations focus on defensive security measures, including monitoring, detection, and incident response. These specialists work to prevent breaches and mitigate damage when incidents occur."
                    speed={15}
                    className="mb-8"
                  />
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    <div>
                      <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <Bug className="w-5 h-5 text-blue-500" />
                        Core Methodologies
                      </h3>
                      
                      <ul className="space-y-3 mb-8">
                        <li className="flex gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2"></span>
                          <div>
                            <span className="font-bold">Security Monitoring</span> - Continuous monitoring of systems and networks
                          </div>
                        </li>
                        <li className="flex gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2"></span>
                          <div>
                            <span className="font-bold">Incident Response</span> - Systematic approach to handling security breaches
                          </div>
                        </li>
                        <li className="flex gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2"></span>
                          <div>
                            <span className="font-bold">Threat Hunting</span> - Proactive search for threats that evade existing security solutions
                          </div>
                        </li>
                        <li className="flex gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2"></span>
                          <div>
                            <span className="font-bold">Digital Forensics</span> - Analysis of incidents to determine impact and origin
                          </div>
                        </li>
                      </ul>
                      
                      <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <Server className="w-5 h-5 text-blue-500" />
                        Recommended Tools
                      </h3>
                      
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Tool</TableHead>
                            <TableHead>Purpose</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell className="font-medium">Splunk</TableCell>
                            <TableCell>SIEM solution for log analysis</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">ELK Stack</TableCell>
                            <TableCell>Open-source log management</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Wireshark</TableCell>
                            <TableCell>Network protocol analyzer</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Volatility</TableCell>
                            <TableCell>Memory forensics framework</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <Database className="w-5 h-5 text-blue-500" />
                        Training Resources
                      </h3>
                      
                      <div className="space-y-4 mb-8">
                        <div className="p-4 bg-secondary/30 rounded-lg border border-blue-500/20">
                          <h4 className="font-bold">Blue Team Level 1 Certification</h4>
                          <p className="text-sm">Foundation in defensive security operations</p>
                        </div>
                        <div className="p-4 bg-secondary/30 rounded-lg border border-blue-500/20">
                          <h4 className="font-bold">SANS SEC504: Hacker Tools & Techniques</h4>
                          <p className="text-sm">Understanding attacker methodology to improve defense</p>
                        </div>
                        <div className="p-4 bg-secondary/30 rounded-lg border border-blue-500/20">
                          <h4 className="font-bold">Security Operations Center (SOC) Training</h4>
                          <p className="text-sm">Monitoring and incident response in enterprise environments</p>
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-bold mb-4">Blue Team Labs</h3>
                      
                      <div className="space-y-4">
                        <div className="p-4 bg-secondary/30 rounded-lg border border-blue-500/20">
                          <div className="flex justify-between items-start">
                            <h4 className="font-bold">SIEM Workshop</h4>
                            <span className="text-xs bg-blue-500/20 px-2 py-1 rounded">Advanced</span>
                          </div>
                          <p className="text-sm mb-2">Hands-on lab for building detection rules and dashboards</p>
                          <GradientButton variant="secondary" className="w-full" size="sm">Access Lab</GradientButton>
                        </div>
                        <div className="p-4 bg-secondary/30 rounded-lg border border-blue-500/20">
                          <div className="flex justify-between items-start">
                            <h4 className="font-bold">Incident Response Simulation</h4>
                            <span className="text-xs bg-blue-500/20 px-2 py-1 rounded">Intermediate</span>
                          </div>
                          <p className="text-sm mb-2">Live incident response scenarios with guided playbooks</p>
                          <GradientButton variant="secondary" className="w-full" size="sm">Access Lab</GradientButton>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="purple-team">
                <div className="cyber-card overflow-hidden" style={{
                  backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.95)), url('/purple-team-bg.jpg')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}>
                  <div className="flex items-center mb-6">
                    <div className="p-3 rounded-full bg-purple-900/30 mr-4">
                      <Lock className="w-8 h-8 text-purple-500" />
                    </div>
                    <h2 className="text-3xl font-bold">Purple Team Operations</h2>
                  </div>
                  
                  <TerminalEffect 
                    text="Purple Team operations bridge the gap between offensive (Red) and defensive (Blue) security approaches, fostering collaboration and knowledge sharing for comprehensive security improvement."
                    speed={15}
                    className="mb-8"
                  />
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    <div>
                      <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <Bug className="w-5 h-5 text-purple-500" />
                        Core Methodologies
                      </h3>
                      
                      <ul className="space-y-3 mb-8">
                        <li className="flex gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2"></span>
                          <div>
                            <span className="font-bold">Collaborative Exercises</span> - Red and Blue teams working together on security scenarios
                          </div>
                        </li>
                        <li className="flex gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2"></span>
                          <div>
                            <span className="font-bold">Continuous Feedback Loop</span> - Iterative process of attack, defend, analyze, improve
                          </div>
                        </li>
                        <li className="flex gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2"></span>
                          <div>
                            <span className="font-bold">Control Validation</span> - Testing security controls against specific attack techniques
                          </div>
                        </li>
                        <li className="flex gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2"></span>
                          <div>
                            <span className="font-bold">Knowledge Transfer</span> - Sharing tactics and techniques between teams
                          </div>
                        </li>
                      </ul>
                      
                      <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <Server className="w-5 h-5 text-purple-500" />
                        Recommended Tools
                      </h3>
                      
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Tool</TableHead>
                            <TableHead>Purpose</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell className="font-medium">Atomic Red Team</TableCell>
                            <TableCell>Test security controls</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Caldera</TableCell>
                            <TableCell>Automated adversary emulation</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">PurpleSharp</TableCell>
                            <TableCell>Adversary simulation for defenders</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Attack IQ</TableCell>
                            <TableCell>Security control validation</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <Database className="w-5 h-5 text-purple-500" />
                        Training Resources
                      </h3>
                      
                      <div className="space-y-4 mb-8">
                        <div className="p-4 bg-secondary/30 rounded-lg border border-purple-500/20">
                          <h4 className="font-bold">SANS SEC599: Purple Team Tactics</h4>
                          <p className="text-sm">Collaborative defensive and offensive security approaches</p>
                        </div>
                        <div className="p-4 bg-secondary/30 rounded-lg border border-purple-500/20">
                          <h4 className="font-bold">MITRE ATT&CK Defender</h4>
                          <p className="text-sm">Framework-based approach to threat detection and response</p>
                        </div>
                        <div className="p-4 bg-secondary/30 rounded-lg border border-purple-500/20">
                          <h4 className="font-bold">Breach & Attack Simulation Training</h4>
                          <p className="text-sm">Automated security validation techniques</p>
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-bold mb-4">Purple Team Labs</h3>
                      
                      <div className="space-y-4">
                        <div className="p-4 bg-secondary/30 rounded-lg border border-purple-500/20">
                          <div className="flex justify-between items-start">
                            <h4 className="font-bold">ATT&CK Matrix Workshop</h4>
                            <span className="text-xs bg-purple-500/20 px-2 py-1 rounded">Advanced</span>
                          </div>
                          <p className="text-sm mb-2">Mapping techniques and building detection strategies</p>
                          <GradientButton variant="secondary" className="w-full" size="sm">Access Lab</GradientButton>
                        </div>
                        <div className="p-4 bg-secondary/30 rounded-lg border border-purple-500/20">
                          <div className="flex justify-between items-start">
                            <h4 className="font-bold">Collaborative Security Exercise</h4>
                            <span className="text-xs bg-purple-500/20 px-2 py-1 rounded">Intermediate</span>
                          </div>
                          <p className="text-sm mb-2">Joint attack and defense scenarios with real-time feedback</p>
                          <GradientButton variant="secondary" className="w-full" size="sm">Access Lab</GradientButton>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default TeamDetails;
