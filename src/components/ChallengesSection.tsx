
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import GradientButton from './GradientButton';
import { Badge } from '@/components/ui/badge';
import { Flag, Terminal, Trophy, Timer } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TerminalEffect from './TerminalEffect';

interface ChallengeProps {
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Expert';
  category: string;
  description: string;
  points: number;
  completions: number;
  link: string;
}

const ChallengeCard: React.FC<ChallengeProps> = ({
  title,
  difficulty,
  category,
  description,
  points,
  completions,
  link
}) => {
  const difficultyColor = {
    Easy: 'bg-green-600/30 text-green-400',
    Medium: 'bg-yellow-600/30 text-yellow-400',
    Hard: 'bg-orange-600/30 text-orange-400',
    Expert: 'bg-red-600/30 text-red-400'
  }[difficulty];
  
  return (
    <Card className="cyber-card overflow-hidden h-full flex flex-col card-hover">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-bold">{title}</h3>
          <Badge className={difficultyColor}>
            {difficulty}
          </Badge>
        </div>
        <Badge variant="outline" className="w-fit">
          {category}
        </Badge>
      </CardHeader>
      
      <CardContent className="flex-grow">
        <p className="text-cyber-light/80 mb-4">{description}</p>
        
        <div className="flex justify-between text-sm text-cyber-light/70">
          <div className="flex items-center">
            <Trophy size={16} className="mr-1 text-cyber-purple2" />
            <span>{points} pts</span>
          </div>
          <div className="flex items-center">
            <Flag size={16} className="mr-1 text-cyber-purple2" />
            <span>{completions} solves</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter>
        <GradientButton href={link} className="w-full" target="_blank">
          <Terminal size={16} />
          <span>Start Challenge</span>
        </GradientButton>
      </CardFooter>
    </Card>
  );
};

const ChallengesSection = () => {
  const [activeTab, setActiveTab] = useState('web');
  
  const challenges = {
    web: [
      {
        title: "SQL Injection Lab",
        difficulty: "Medium" as const,
        category: "Web Exploitation",
        description: "Practice SQL injection techniques to bypass login screens and extract sensitive data from vulnerable databases.",
        points: 250,
        completions: 142,
        link: "#"
      },
      {
        title: "XSS Challenge",
        difficulty: "Easy" as const,
        category: "Web Exploitation",
        description: "Identify and exploit cross-site scripting vulnerabilities to execute JavaScript in victims' browsers.",
        points: 150,
        completions: 218,
        link: "#"
      },
      {
        title: "API Security",
        difficulty: "Hard" as const,
        category: "Web Exploitation",
        description: "Discover and exploit vulnerabilities in a RESTful API including authentication bypass and privilege escalation.",
        points: 350,
        completions: 87,
        link: "#"
      },
    ],
    network: [
      {
        title: "Packet Analysis",
        difficulty: "Medium" as const,
        category: "Network",
        description: "Analyze captured network traffic to identify malicious activities and extract hidden data.",
        points: 200,
        completions: 156,
        link: "#"
      },
      {
        title: "Network Pivoting",
        difficulty: "Hard" as const,
        category: "Network",
        description: "Navigate through multiple network segments by leveraging compromised hosts as pivot points.",
        points: 300,
        completions: 92,
        link: "#"
      },
    ],
    crypto: [
      {
        title: "RSA Cracking",
        difficulty: "Expert" as const,
        category: "Cryptography",
        description: "Break weak RSA implementations by exploiting common vulnerabilities in key generation and padding.",
        points: 450,
        completions: 47,
        link: "#"
      },
      {
        title: "Hash Collision",
        difficulty: "Medium" as const,
        category: "Cryptography",
        description: "Generate hash collisions and understand the implications for cryptographic security.",
        points: 250,
        completions: 124,
        link: "#"
      },
    ],
    forensics: [
      {
        title: "Memory Analysis",
        difficulty: "Hard" as const,
        category: "Digital Forensics",
        description: "Extract evidence from memory dumps to reconstruct attacker activities and recover artifacts.",
        points: 350,
        completions: 76,
        link: "#"
      },
      {
        title: "File Carving",
        difficulty: "Medium" as const,
        category: "Digital Forensics",
        description: "Recover deleted files and hidden data from disk images using forensic techniques.",
        points: 250,
        completions: 103,
        link: "#"
      },
    ]
  };

  return (
    <section id="challenges" className="py-24 bg-cyber-dark relative overflow-hidden">
      <div className="absolute inset-0 matrix-bg opacity-5 z-0"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="section-title">
          <span className="gradient-text">CTF</span> Challenges
        </h2>
        
        <div className="max-w-2xl mx-auto mb-10">
          <TerminalEffect 
            text="Test your skills with real-world cybersecurity challenges across different categories. Each challenge simulates actual attack vectors and defense scenarios from the field."
            speed={20}
            className="text-center"
          />
        </div>
        
        <div className="cyber-card animate-float mb-12">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center">
              <Trophy size={24} className="text-cyber-purple2 mr-3" />
              <h3 className="text-xl font-bold">Weekly CTF Competition</h3>
            </div>
            
            <div className="flex items-center text-cyber-light/80">
              <Timer size={20} className="mr-2" />
              <span>Next challenge starts in: 2d 14h 22m</span>
            </div>
            
            <GradientButton>
              Join Competition
            </GradientButton>
          </div>
        </div>
        
        <Tabs 
          defaultValue="web" 
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full max-w-5xl mx-auto"
        >
          <div className="flex justify-center mb-8">
            <TabsList className="bg-secondary/50">
              <TabsTrigger value="web" className="text-lg px-8 py-2">
                Web
              </TabsTrigger>
              <TabsTrigger value="network" className="text-lg px-8 py-2">
                Network
              </TabsTrigger>
              <TabsTrigger value="crypto" className="text-lg px-8 py-2">
                Crypto
              </TabsTrigger>
              <TabsTrigger value="forensics" className="text-lg px-8 py-2">
                Forensics
              </TabsTrigger>
            </TabsList>
          </div>
          
          {Object.entries(challenges).map(([category, items]) => (
            <TabsContent key={category} value={category} className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {items.map((challenge, index) => (
                  <ChallengeCard
                    key={index}
                    {...challenge}
                  />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default ChallengesSection;
