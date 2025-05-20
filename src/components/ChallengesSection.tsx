
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import GradientButton from './GradientButton';
import { Badge } from '@/components/ui/badge';
import { Flag, Terminal, Trophy, Timer, Bug, Database, Server, Shield, Lock } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TerminalEffect from './TerminalEffect';
import { Textarea } from '@/components/ui/textarea';

interface ChallengeProps {
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Expert';
  category: string;
  description: string;
  points: number;
  completions: number;
  link: string;
  deadline?: string;
  hint?: string;
}

const ChallengeCard: React.FC<ChallengeProps> = ({
  title,
  difficulty,
  category,
  description,
  points,
  completions,
  link,
  deadline,
  hint
}) => {
  const [showHint, setShowHint] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  const difficultyColor = {
    Easy: 'bg-green-600/30 text-green-400',
    Medium: 'bg-yellow-600/30 text-yellow-400',
    Hard: 'bg-orange-600/30 text-orange-400',
    Expert: 'bg-red-600/30 text-red-400'
  }[difficulty];

  const categoryIcon = {
    'Web Exploitation': <Bug className="h-4 w-4" />,
    'Network': <Server className="h-4 w-4" />,
    'Cryptography': <Lock className="h-4 w-4" />,
    'Digital Forensics': <Shield className="h-4 w-4" />,
    'Reverse Engineering': <Database className="h-4 w-4" />
  }[category] || <Flag className="h-4 w-4" />;
  
  return (
    <Card 
      className={`cyber-card overflow-hidden h-full flex flex-col card-hover transform transition-all duration-300 ${isHovered ? 'scale-105' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-bold">{title}</h3>
          <Badge className={difficultyColor}>
            {difficulty}
          </Badge>
        </div>
        <Badge variant="outline" className="w-fit flex items-center gap-1">
          {categoryIcon}
          {category}
        </Badge>
      </CardHeader>
      
      <CardContent className="flex-grow">
        <p className="text-cyber-light/80 mb-4">{description}</p>
        
        {deadline && (
          <div className="flex items-center text-sm text-cyber-light/70 mb-3">
            <Timer size={16} className="mr-1 text-cyber-purple2" />
            <span>Deadline: {deadline}</span>
          </div>
        )}
        
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
        
        {hint && showHint && (
          <div className="mt-3 p-2 bg-secondary/50 rounded-md border border-cyber-purple/20">
            <p className="text-sm text-cyber-light/90"><span className="text-cyber-purple2 font-bold">Hint:</span> {hint}</p>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="flex gap-2 flex-wrap">
        <GradientButton href={link} className="flex-1" target="_blank">
          <Terminal size={16} />
          <span>Start Challenge</span>
        </GradientButton>
        
        {hint && (
          <GradientButton 
            onClick={() => setShowHint(!showHint)} 
            variant="secondary" 
            className="w-auto"
          >
            {showHint ? 'Hide Hint' : 'Get Hint'}
          </GradientButton>
        )}
      </CardFooter>
    </Card>
  );
};

const ChallengesSection = () => {
  const [activeTab, setActiveTab] = useState('web');
  const [timeLeft, setTimeLeft] = useState({ days: 2, hours: 14, minutes: 22 });
  const [flagSubmission, setFlagSubmission] = useState('');
  
  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59 };
        }
        return { days: 0, hours: 0, minutes: 0 };
      });
    }, 60000); // update every minute
    
    return () => clearInterval(timer);
  }, []);
  
  const challenges = {
    web: [
      {
        title: "SQLi Masterclass",
        difficulty: "Medium" as const,
        category: "Web Exploitation",
        description: "Bypass authentication and extract sensitive data from a vulnerable e-commerce database. Requires knowledge of UNION-based and blind SQL injection techniques.",
        points: 250,
        completions: 142,
        link: "#",
        deadline: "May 25, 2025",
        hint: "Look for WHERE clause vulnerabilities in the login form."
      },
      {
        title: "XSS Playground",
        difficulty: "Easy" as const,
        category: "Web Exploitation",
        description: "Identify and exploit cross-site scripting vulnerabilities to steal cookies and execute JavaScript in victims' browsers on a social media simulation.",
        points: 150,
        completions: 218,
        link: "#",
        hint: "Check for unfiltered input in the comment section."
      },
      {
        title: "JWT Breaker",
        difficulty: "Hard" as const,
        category: "Web Exploitation",
        description: "Analyze and exploit weaknesses in JWT authentication implementation, including signature verification bypass and privilege escalation.",
        points: 350,
        completions: 87,
        link: "#",
        deadline: "May 30, 2025",
        hint: "Try modifying the algorithm header parameter."
      },
    ],
    network: [
      {
        title: "Packet Detective",
        difficulty: "Medium" as const,
        category: "Network",
        description: "Analyze captured PCAP files to identify malicious activities, data exfiltration attempts, and extract hidden data from network traffic.",
        points: 200,
        completions: 156,
        link: "#",
        deadline: "May 28, 2025",
        hint: "Look for unusual DNS queries with encoded payloads."
      },
      {
        title: "Lateral Movement Lab",
        difficulty: "Hard" as const,
        category: "Network",
        description: "Navigate through a simulated corporate network by leveraging compromised hosts as pivot points. Discover credentials and access the final target.",
        points: 300,
        completions: 92,
        link: "#",
        hint: "SSH tunneling and port forwarding will be essential."
      },
      {
        title: "Firewall Bypass Challenge",
        difficulty: "Expert" as const,
        category: "Network",
        description: "Develop techniques to bypass a sophisticated next-gen firewall using various evasion methods and protocol manipulation.",
        points: 400,
        completions: 45,
        link: "#",
        deadline: "June 1, 2025",
      },
    ],
    crypto: [
      {
        title: "RSA Cryptanalysis",
        difficulty: "Expert" as const,
        category: "Cryptography",
        description: "Break weak RSA implementations by exploiting common vulnerabilities in key generation, padding schemes, and implementation flaws.",
        points: 450,
        completions: 47,
        link: "#",
        hint: "Look for small public exponents and shared prime factors."
      },
      {
        title: "Hash Collision Factory",
        difficulty: "Medium" as const,
        category: "Cryptography",
        description: "Generate practical hash collisions and understand the implications for cryptographic security in real-world applications.",
        points: 250,
        completions: 124,
        link: "#",
        deadline: "May 26, 2025",
      },
      {
        title: "Block Cipher Analysis",
        difficulty: "Hard" as const,
        category: "Cryptography",
        description: "Analyze and exploit weaknesses in block cipher implementations including padding oracle attacks and mode-specific vulnerabilities.",
        points: 350,
        completions: 76,
        link: "#",
        hint: "CBC mode implementation has padding vulnerabilities."
      },
    ],
    forensics: [
      {
        title: "Memory Forensics Challenge",
        difficulty: "Hard" as const,
        category: "Digital Forensics",
        description: "Extract evidence from memory dumps to reconstruct attacker activities, recover encryption keys, and identify malware artifacts.",
        points: 350,
        completions: 76,
        link: "#",
        deadline: "May 29, 2025",
        hint: "Use Volatility framework to analyze process artifacts."
      },
      {
        title: "Disk Image Investigation",
        difficulty: "Medium" as const,
        category: "Digital Forensics",
        description: "Recover deleted files, hidden data, and analyze filesystem artifacts from a disk image to solve a simulated cybercrime case.",
        points: 250,
        completions: 103,
        link: "#",
        hint: "Check alternate data streams and file slack space."
      },
      {
        title: "Steganography Master",
        difficulty: "Easy" as const,
        category: "Digital Forensics",
        description: "Discover hidden messages and files concealed within images, audio files, and documents using various steganography techniques.",
        points: 150,
        completions: 187,
        link: "#",
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
          <div className="flex flex-col md:flex-row items-center justify-between flex-wrap gap-4">
            <div className="flex items-center">
              <Trophy size={24} className="text-cyber-purple2 mr-3" />
              <h3 className="text-xl font-bold">Weekly CTF Competition</h3>
            </div>
            
            <div className="flex items-center text-cyber-light/80">
              <Timer size={20} className="mr-2" />
              <span>Next challenge starts in: {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m</span>
            </div>
            
            <GradientButton>
              Join Competition
            </GradientButton>
          </div>
          
          <div className="mt-6 p-4 bg-secondary/30 rounded-lg border border-cyber-purple/20">
            <h4 className="text-lg font-semibold mb-2">Current Flag Submission</h4>
            <div className="flex gap-3">
              <Textarea 
                className="flex-1"
                placeholder="Enter your flag here (e.g., flag{s0m3_v4lue})"
                value={flagSubmission}
                onChange={(e) => setFlagSubmission(e.target.value)}
              />
              <GradientButton className="whitespace-nowrap">
                Submit Flag
              </GradientButton>
            </div>
          </div>
        </div>
        
        <Tabs 
          defaultValue="web" 
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full max-w-6xl mx-auto"
        >
          <div className="flex justify-center mb-8">
            <TabsList className="bg-secondary/50">
              <TabsTrigger value="web" className="text-lg px-8 py-2 flex items-center gap-2">
                <Bug size={16} />
                Web
              </TabsTrigger>
              <TabsTrigger value="network" className="text-lg px-8 py-2 flex items-center gap-2">
                <Server size={16} />
                Network
              </TabsTrigger>
              <TabsTrigger value="crypto" className="text-lg px-8 py-2 flex items-center gap-2">
                <Lock size={16} />
                Crypto
              </TabsTrigger>
              <TabsTrigger value="forensics" className="text-lg px-8 py-2 flex items-center gap-2">
                <Shield size={16} />
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
        
        <div className="mt-16 text-center">
          <h3 className="text-xl font-bold mb-4">CTF Leaderboard</h3>
          <div className="cyber-card overflow-hidden inline-block">
            <table className="min-w-full divide-y divide-cyber-purple/20">
              <thead className="bg-secondary/50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-cyber-light/70 uppercase tracking-wider">Rank</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-cyber-light/70 uppercase tracking-wider">Username</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-cyber-light/70 uppercase tracking-wider">Points</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-cyber-light/70 uppercase tracking-wider">Challenges</th>
                </tr>
              </thead>
              <tbody className="bg-secondary/30 divide-y divide-cyber-purple/10">
                <tr className="hover:bg-cyber-purple/10">
                  <td className="px-6 py-4 whitespace-nowrap text-sm">1</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">CyberNinja</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-cyber-purple2">2,450</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">8</td>
                </tr>
                <tr className="hover:bg-cyber-purple/10">
                  <td className="px-6 py-4 whitespace-nowrap text-sm">2</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">H4ckM4ster</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-cyber-purple2">2,100</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">7</td>
                </tr>
                <tr className="hover:bg-cyber-purple/10">
                  <td className="px-6 py-4 whitespace-nowrap text-sm">3</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">ByteWizard</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-cyber-purple2">1,950</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">6</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChallengesSection;
