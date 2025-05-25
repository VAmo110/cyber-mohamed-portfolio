
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BackgroundAnimation from '@/components/BackgroundAnimation';
import { Terminal, Shield, AlertTriangle, FileWarning, Check, CheckCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TerminalEffect from '@/components/TerminalEffect';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import GradientButton from '@/components/GradientButton';

interface SimulationStep {
  id: number;
  content: string;
  options?: {
    text: string;
    nextStep: number;
    correct?: boolean;
    explanation?: string;
  }[];
  isDecision?: boolean;
  isTerminal?: boolean;
}

const penetrationTestingSimulation: SimulationStep[] = [
  {
    id: 1,
    content: "Welcome to the Penetration Testing Simulation. You've been hired to perform a security assessment on TargetCorp's network infrastructure. Where would you like to begin?",
    options: [
      { text: "Perform reconnaissance with OSINT tools", nextStep: 2, correct: true },
      { text: "Immediately attempt to exploit potential vulnerabilities", nextStep: 3, correct: false },
      { text: "Request admin credentials from the client", nextStep: 4, correct: false }
    ],
    isDecision: true
  },
  {
    id: 2,
    content: "Good choice! You begin gathering information using passive techniques. After using tools like Shodan, social media analysis, and DNS enumeration, you discover several potential entry points including an outdated web application. What's your next move?",
    options: [
      { text: "Perform port scanning and service enumeration", nextStep: 5, correct: true },
      { text: "Attempt SQL injection on the web application", nextStep: 6, correct: false },
      { text: "Report findings to the client and conclude the test", nextStep: 7, correct: false }
    ],
    isDecision: true
  },
  {
    id: 3,
    content: "Without proper reconnaissance, your exploit attempts lack necessary information. You trigger intrusion detection systems and your activities are blocked. The client is alerted to unauthorized attempts.",
    options: [
      { text: "Start over with proper reconnaissance", nextStep: 1, correct: true }
    ],
    isTerminal: true
  },
  {
    id: 4,
    content: "The client reminds you that requesting admin credentials defeats the purpose of a penetration test, which is to identify vulnerabilities through simulated attacks. They ask you to follow proper methodology.",
    options: [
      { text: "Restart with proper methodology", nextStep: 1, correct: true }
    ],
    isTerminal: true
  },
  {
    id: 5,
    content: "Your port scans reveal several services including an unpatched SSH server (CVE-2020-14145), an outdated CMS, and a misconfigured API endpoint. What's your approach?",
    options: [
      { text: "Create a detailed attack plan and continue with vulnerability validation", nextStep: 8, correct: true },
      { text: "Immediately exploit the SSH vulnerability", nextStep: 9, correct: false },
      { text: "Focus only on the CMS vulnerabilities", nextStep: 10, correct: false }
    ],
    isDecision: true
  },
  {
    id: 6,
    content: "Without proper enumeration, your SQL injection attempts are ineffective. You need more information about the database structure and application architecture.",
    options: [
      { text: "Go back and perform proper enumeration", nextStep: 5, correct: true }
    ],
    isTerminal: true
  },
  {
    id: 7,
    content: "Your assessment is incomplete. The client expects a thorough penetration test that includes enumeration, vulnerability assessment, exploitation, and post-exploitation phases.",
    options: [
      { text: "Restart and follow complete methodology", nextStep: 1, correct: true }
    ],
    isTerminal: true
  },
  {
    id: 8,
    content: "Excellent approach! After validating vulnerabilities, you identify that the API endpoint has an authentication bypass vulnerability. You successfully gain access to the system with limited privileges. What's your next step?",
    options: [
      { text: "Document the access and attempt privilege escalation", nextStep: 11, correct: true },
      { text: "Exfiltrate sensitive data immediately", nextStep: 12, correct: false },
      { text: "Declare the test complete and report findings", nextStep: 13, correct: false }
    ],
    isDecision: true
  },
  {
    id: 9,
    content: "The SSH vulnerability doesn't provide system access as expected. It appears the system has been partially patched. You should take a more comprehensive approach.",
    options: [
      { text: "Return to planning stage", nextStep: 5, correct: true }
    ],
    isTerminal: true
  },
  {
    id: 10,
    content: "While you find some CMS vulnerabilities, your narrow focus means you miss critical issues in other systems. A comprehensive approach is needed.",
    options: [
      { text: "Broaden your assessment approach", nextStep: 5, correct: true }
    ],
    isTerminal: true
  },
  {
    id: 11,
    content: "You discover a kernel exploit that works on the target system. After careful testing, you successfully escalate to root privileges. You now have full control of the server. What do you do?",
    options: [
      { text: "Document access, collect evidence, and avoid making changes", nextStep: 14, correct: true },
      { text: "Install a permanent backdoor for future access", nextStep: 15, correct: false },
      { text: "Delete logs to hide your activities", nextStep: 16, correct: false }
    ],
    isDecision: true
  },
  {
    id: 12,
    content: "Exfiltrating data without client authorization exceeds the scope of your penetration test and raises legal concerns. The client notices unusual data transfers and terminates the test.",
    options: [
      { text: "Restart with proper methodology", nextStep: 1, correct: true }
    ],
    isTerminal: true
  },
  {
    id: 13,
    content: "Your report is incomplete. You've found initial access but haven't determined the full impact of the vulnerabilities or potential data exposure.",
    options: [
      { text: "Continue the assessment", nextStep: 11, correct: true }
    ],
    isTerminal: true
  },
  {
    id: 14,
    content: "Congratulations! You've successfully completed the penetration test. You provided the client with detailed documentation of vulnerabilities, including the authentication bypass and privilege escalation issues. Your report includes screenshots, steps to reproduce, and remediation recommendations. The client commends your professional approach.",
    isTerminal: true
  },
  {
    id: 15,
    content: "Installing unauthorized backdoors is unethical and likely illegal. This violates the penetration testing agreement and could result in legal consequences. The test is terminated.",
    options: [
      { text: "Restart with proper methodology", nextStep: 1, correct: true }
    ],
    isTerminal: true
  },
  {
    id: 16,
    content: "Deleting logs is unethical and destroys evidence the client needs to understand their security posture. This violates the penetration testing agreement and best practices. The test is terminated.",
    options: [
      { text: "Restart with proper methodology", nextStep: 1, correct: true }
    ],
    isTerminal: true
  }
];

const defensiveSimulation: SimulationStep[] = [
  {
    id: 1,
    content: "Welcome to the Blue Team Defense Simulation. You're the security analyst on duty when alerts start triggering. Your SIEM shows multiple failed login attempts from different geographic locations against your company's VPN. What's your first response?",
    options: [
      { text: "Immediately block all international IP addresses", nextStep: 2, correct: false },
      { text: "Analyze the login patterns and affected accounts", nextStep: 3, correct: true },
      { text: "Reset passwords for all user accounts", nextStep: 4, correct: false }
    ],
    isDecision: true
  },
  {
    id: 2,
    content: "Blocking all international IPs causes service disruptions for legitimate remote employees and partners. Your hasty response created business impact without properly analyzing the threat.",
    options: [
      { text: "Take a more measured approach", nextStep: 1, correct: true }
    ],
    isTerminal: true
  },
  {
    id: 3,
    content: "Good choice! Your analysis reveals that 5 executive accounts are being targeted with password spraying attacks. The attempts are coming from IP addresses associated with known threat actors. What's your next step?",
    options: [
      { text: "Implement temporary geo-blocking and notify the security team", nextStep: 5, correct: true },
      { text: "Contact the executives to verify their login attempts", nextStep: 6, correct: false },
      { text: "Wait and collect more data before taking action", nextStep: 7, correct: false }
    ],
    isDecision: true
  },
  {
    id: 4,
    content: "Mass password resets create significant disruption and help desk load without properly analyzing the threat. Some executives can't access critical systems during an important business transaction.",
    options: [
      { text: "Take a more targeted approach", nextStep: 1, correct: true }
    ],
    isTerminal: true
  },
  {
    id: 5,
    content: "You implement temporary blocks on the suspicious IPs and notify the security team. Shortly after, you detect a successful login to the CFO's email account from an unusual location. What do you do?",
    options: [
      { text: "Isolate the account, terminate the session, and begin incident response", nextStep: 8, correct: true },
      { text: "Monitor the account activity to gather intelligence", nextStep: 9, correct: false },
      { text: "Contact the CFO directly to confirm their location", nextStep: 10, correct: false }
    ],
    isDecision: true
  },
  {
    id: 6,
    content: "While you're trying to contact executives, one account is compromised. The attacker begins accessing sensitive financial documents before you can respond.",
    options: [
      { text: "Take immediate containment actions", nextStep: 5, correct: true }
    ],
    isTerminal: true
  },
  {
    id: 7,
    content: "While gathering more data, an executive account is compromised and the attacker establishes persistence by creating a new admin account. The delay has allowed the attack to progress.",
    options: [
      { text: "Begin incident response immediately", nextStep: 5, correct: true }
    ],
    isTerminal: true
  },
  {
    id: 8,
    content: "Good response! You isolate the account, terminate all sessions, and initiate incident response. Your team discovers that the attacker was attempting to access merger documents. What's your next action?",
    options: [
      { text: "Perform forensic analysis while continuing to monitor for additional compromise", nextStep: 11, correct: true },
      { text: "Declare the incident resolved and restore normal access", nextStep: 12, correct: false },
      { text: "Shut down all executive access until Monday", nextStep: 13, correct: false }
    ],
    isDecision: true
  },
  {
    id: 9,
    content: "While monitoring, the attacker exfiltrates sensitive financial documents and installs a backdoor. Allowing malicious activity to continue has increased the damage.",
    options: [
      { text: "Take immediate containment actions", nextStep: 8, correct: true }
    ],
    isTerminal: true
  },
  {
    id: 10,
    content: "The CFO confirms they aren't accessing the system. By the time you take action, the attacker has already exfiltrated data and moved laterally to other systems.",
    options: [
      { text: "Begin proper incident response", nextStep: 8, correct: true }
    ],
    isTerminal: true
  },
  {
    id: 11,
    content: "Your forensic analysis reveals the attack originated from a phishing email. The attacker was targeting merger information but was contained before causing significant damage. What do you implement to prevent future attacks?",
    options: [
      { text: "Enhance email security, implement MFA for all accounts, and conduct security awareness training", nextStep: 14, correct: true },
      { text: "Block all international email", nextStep: 15, correct: false },
      { text: "Disable executive email accounts and switch to an alternate system", nextStep: 16, correct: false }
    ],
    isDecision: true
  },
  {
    id: 12,
    content: "Without proper forensic analysis, you miss identifying how the attacker gained access and what systems were compromised. Three days later, a similar attack occurs against other executives.",
    options: [
      { text: "Perform proper incident response", nextStep: 8, correct: true }
    ],
    isTerminal: true
  },
  {
    id: 13,
    content: "The excessive response causes business disruption during critical end-of-quarter operations. The executive team overrides your decision due to business impact.",
    options: [
      { text: "Take a more balanced approach", nextStep: 8, correct: true }
    ],
    isTerminal: true
  },
  {
    id: 14,
    content: "Congratulations! Your measured response and comprehensive security improvements effectively contain the incident and prevent similar future attacks. The executive team commends your team's response. Your post-incident review leads to security improvements across the organization.",
    isTerminal: true
  },
  {
    id: 15,
    content: "Blocking all international email causes significant business disruption without addressing the root cause. Legitimate business communications are affected, and the solution is quickly reversed.",
    options: [
      { text: "Implement more targeted security controls", nextStep: 11, correct: true }
    ],
    isTerminal: true
  },
  {
    id: 16,
    content: "The alternative system lacks security controls and integration capabilities. Executives find workarounds that introduce even more security risks.",
    options: [
      { text: "Develop a more comprehensive security approach", nextStep: 11, correct: true }
    ],
    isTerminal: true
  }
];

const InteractiveExperience = () => {
  const [activeTab, setActiveTab] = useState('red-team');
  const [step, setStep] = useState(1);
  const [history, setHistory] = useState<number[]>([1]);
  const [score, setScore] = useState(0);
  const [maxScore, setMaxScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);
  const [commandInput, setCommandInput] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const { toast } = useToast();
  
  // Get current scenario
  const getCurrentScenario = () => {
    return activeTab === 'red-team' 
      ? penetrationTestingSimulation 
      : defensiveSimulation;
  };
  
  // Get current step
  const getCurrentStep = () => {
    const scenario = getCurrentScenario();
    return scenario.find(s => s.id === step) || scenario[0];
  };
  
  // Handle option selection
  const handleOptionSelect = (nextStep: number, correct?: boolean) => {
    if (correct !== undefined) {
      if (correct) {
        setScore(prev => prev + 10);
        toast({
          title: "Good choice!",
          description: "That's the correct approach in this situation.",
          variant: "default",
        });
      } else {
        toast({
          title: "Not ideal",
          description: "There's a better approach in this situation.",
          variant: "default",
        });
      }
    }
    
    setStep(nextStep);
    setHistory(prev => [...prev, nextStep]);
    
    const currentStep = getCurrentScenario().find(s => s.id === nextStep);
    if (currentStep?.isTerminal && currentStep.id === 14) {
      setCompleted(true);
      setMaxScore(prev => Math.max(prev, score + 10));
      
      setTimeout(() => {
        setShowCertificate(true);
      }, 2000);
    }
  };
  
  // Handle terminal command input
  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commandInput.trim()) return;
    
    setCommandHistory(prev => [...prev, `$ ${commandInput}`]);
    
    // Simple command processor
    if (commandInput.toLowerCase().includes('help')) {
      setCommandHistory(prev => [...prev, "Available commands: help, clear, restart, info, score"]);
    } else if (commandInput.toLowerCase().includes('clear')) {
      setCommandHistory([]);
    } else if (commandInput.toLowerCase().includes('restart')) {
      setCommandHistory(prev => [...prev, "Restarting simulation..."]);
      setStep(1);
      setHistory([1]);
    } else if (commandInput.toLowerCase().includes('info')) {
      setCommandHistory(prev => [...prev, `Current simulation: ${activeTab === 'red-team' ? 'Penetration Testing' : 'Blue Team Defense'}`]);
    } else if (commandInput.toLowerCase().includes('score')) {
      setCommandHistory(prev => [...prev, `Current score: ${score} points`]);
    } else if (commandInput.toLowerCase().includes('scan') || commandInput.toLowerCase().includes('nmap')) {
      setCommandHistory(prev => [...prev, "Scanning target systems...", "PORT   STATE SERVICE", "22/tcp open  ssh", "80/tcp open  http", "443/tcp open  https", "3306/tcp open  mysql"]);
    } else if (commandInput.toLowerCase().includes('exploit') || commandInput.toLowerCase().includes('attack')) {
      setCommandHistory(prev => [...prev, "Attempt to exploit target...", "Checking for vulnerabilities...", "Warning: Ensure you have proper authorization before proceeding with exploitation."]);
    } else {
      setCommandHistory(prev => [...prev, `Command not recognized: ${commandInput}`]);
    }
    
    setCommandInput('');
  };
  
  // Reset simulation when changing tabs
  useEffect(() => {
    setStep(1);
    setHistory([1]);
    setScore(0);
    setCompleted(false);
    setShowCertificate(false);
    setCommandHistory([]);
  }, [activeTab]);
  
  // Calculate progress percentage
  const getProgressPercentage = () => {
    const totalSteps = activeTab === 'red-team' ? 14 : 14; // Adjust based on "success" paths
    const currentProgress = Math.min(history.length - 1, totalSteps);
    return Math.round((currentProgress / totalSteps) * 100);
  };
  
  const currentStep = getCurrentStep();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow bg-cyber-dark relative">
        <BackgroundAnimation type={activeTab === 'red-team' ? 'matrix' : 'cyber'} opacity={0.05} />
        
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Interactive Cybersecurity <span className="gradient-text">Experience</span>
            </h1>
            <p className="text-cyber-light/70 max-w-3xl mx-auto">
              Put your cybersecurity knowledge to the test with our interactive simulations. 
              Choose between offensive and defensive scenarios to learn practical skills.
            </p>
          </div>
          
          <Tabs 
            value={activeTab} 
            onValueChange={setActiveTab}
            className="w-full max-w-6xl mx-auto"
          >
            <TabsList className="w-full mb-8 bg-secondary/50">
              <TabsTrigger value="red-team" className="flex-1 py-3">
                <div className="flex items-center justify-center gap-2">
                  <Terminal size={20} />
                  <span>Red Team: Penetration Testing</span>
                </div>
              </TabsTrigger>
              <TabsTrigger value="blue-team" className="flex-1 py-3">
                <div className="flex items-center justify-center gap-2">
                  <Shield size={20} />
                  <span>Blue Team: Defense Simulation</span>
                </div>
              </TabsTrigger>
            </TabsList>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Simulation Controls */}
              <div className="order-2 lg:order-1 space-y-6">
                {/* Progress card */}
                <Card className="border-cyber-purple/20 bg-secondary/30">
                  <CardContent className="p-6 space-y-5">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Simulation Progress</h3>
                      <Progress value={getProgressPercentage()} showValue size="sm" />
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Current Score</h3>
                      <div className="flex items-center gap-2">
                        <Progress value={(score / 100) * 100} indicatorClassName="bg-gradient-to-r from-green-500 to-cyber-purple2" showValue size="sm" />
                        <span className="text-cyber-light/70">{score} pts</span>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Best Score</h3>
                      <Badge variant="outline" className="text-cyber-purple2 text-lg">
                        {maxScore} pts
                      </Badge>
                    </div>
                    
                    <div className="pt-2">
                      <Button 
                        variant="outline" 
                        className="w-full border-cyber-purple/30 hover:bg-cyber-purple/20"
                        onClick={() => {
                          setStep(1);
                          setHistory([1]);
                          setScore(0);
                          setCompleted(false);
                          setShowCertificate(false);
                        }}
                      >
                        Restart Simulation
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Terminal Card */}
                <Card className="border-cyber-purple/20 bg-secondary/30 min-h-[320px]">
                  <CardContent className="p-4">
                    <div className="bg-cyber-dark/80 rounded-md p-2 h-64 overflow-y-auto font-mono text-sm mb-3">
                      <div className="text-green-400 mb-2">
                        # CyberSecurity Simulation Terminal
                      </div>
                      {commandHistory.map((cmd, i) => (
                        <div key={i} className={`${cmd.startsWith('$') ? 'text-cyber-purple2' : 'text-cyber-light/80'} mb-1`}>
                          {cmd}
                        </div>
                      ))}
                    </div>
                    
                    <form onSubmit={handleCommandSubmit} className="flex items-center gap-2">
                      <span className="text-cyber-purple2 font-mono">$</span>
                      <input
                        type="text"
                        value={commandInput}
                        onChange={(e) => setCommandInput(e.target.value)}
                        className="flex-1 bg-transparent border-b border-cyber-purple/30 focus:outline-none focus:border-cyber-purple2 font-mono text-sm py-1"
                        placeholder="Type a command..."
                      />
                    </form>
                  </CardContent>
                </Card>
              </div>
              
              {/* Main simulation content */}
              <div className="lg:col-span-2 order-1 lg:order-2">
                <Card className="cyber-card min-h-[500px] flex flex-col">
                  <CardContent className="p-6 flex-grow flex flex-col">
                    {showCertificate ? (
                      <div className="text-center flex-grow flex flex-col items-center justify-center space-y-8">
                        <div className="border-4 border-cyber-purple/30 p-8 rounded-lg shadow-lg max-w-md w-full mx-auto neo-blur bg-cyber-dark/70">
                          <div className="border-2 border-cyber-purple/20 p-6 rounded-lg">
                            <h2 className="text-2xl font-orbitron text-cyber-purple2 mb-4">Certificate of Achievement</h2>
                            <div className="mb-6">
                              <Check size={50} className="mx-auto text-green-500" />
                            </div>
                            <p className="text-lg mb-2">Successfully Completed</p>
                            <h3 className="text-xl font-bold mb-4">
                              {activeTab === 'red-team' 
                                ? 'Penetration Testing Simulation' 
                                : 'Blue Team Defense Simulation'}
                            </h3>
                            <p className="mb-4">Score: <span className="text-cyber-purple2 font-bold">{score} / 100</span></p>
                            <p className="text-sm text-cyber-light/60">Cyber With Mohamed</p>
                          </div>
                        </div>
                        
                        <div className="flex gap-4 flex-wrap justify-center">
                          <Button
                            variant="outline"
                            onClick={() => {
                              setShowCertificate(false);
                              setStep(1);
                              setHistory([1]);
                              setCompleted(false);
                            }}
                          >
                            Try Again
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => setActiveTab(activeTab === 'red-team' ? 'blue-team' : 'red-team')}
                          >
                            Try Other Simulation
                          </Button>
                          <GradientButton as={Link} to="/challenges">
                            Explore CTF Challenges
                          </GradientButton>
                        </div>
                      </div>
                    ) : (
                      <>
                        {/* Scenario heading */}
                        <div className="mb-6">
                          <Badge className="mb-2">
                            {activeTab === 'red-team' ? 'Penetration Testing' : 'Blue Team Defense'}
                          </Badge>
                          <h2 className="text-2xl font-bold">
                            {activeTab === 'red-team' 
                              ? 'Corporate Network Assessment' 
                              : 'Security Incident Response'}
                          </h2>
                        </div>
                        
                        {/* Scenario content */}
                        <div className="mb-6 flex-grow">
                          <div className="p-4 bg-cyber-dark/60 rounded-lg border border-cyber-purple/10 mb-6">
                            <TerminalEffect
                              text={currentStep.content}
                              speed={5}
                              className="leading-relaxed"
                            />
                          </div>
                          
                          {/* Navigation history */}
                          <div className="flex flex-wrap gap-2 mb-4">
                            {history.map((stepId, index) => (
                              <Badge 
                                key={index} 
                                variant="outline"
                                className={index === history.length - 1 ? "border-cyber-purple2 text-cyber-purple2" : ""}
                              >
                                Step {stepId}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        {/* Decision options */}
                        {currentStep.options && (
                          <div className="space-y-3">
                            <h3 className="font-semibold text-lg">
                              {currentStep.isDecision ? "What will you do?" : "Next steps:"}
                            </h3>
                            {currentStep.options.map((option, index) => (
                              <Button
                                key={index}
                                className="w-full justify-start text-left h-auto py-3 bg-secondary/60 hover:bg-cyber-purple/20 border border-cyber-purple/10"
                                onClick={() => handleOptionSelect(option.nextStep, option.correct)}
                              >
                                {option.text}
                              </Button>
                            ))}
                          </div>
                        )}
                        
                        {/* Terminal state with no options */}
                        {currentStep.isTerminal && !currentStep.options && (
                          <div className="mt-auto text-center">
                            {currentStep.id === 14 ? (
                              <div className="space-y-4">
                                <div className="flex items-center justify-center text-green-500">
                                  <CheckCircle size={60} />
                                </div>
                                <h3 className="text-xl font-bold text-green-500">Mission Successful!</h3>
                                <p className="text-cyber-light/80">
                                  You've successfully completed the {activeTab === 'red-team' ? 'penetration test' : 'security incident response'} 
                                  with professional methodology.
                                </p>
                                <Button onClick={() => setShowCertificate(true)}>
                                  View Certificate
                                </Button>
                              </div>
                            ) : (
                              <Button
                                onClick={() => {
                                  setStep(1);
                                  setHistory([1]);
                                }}
                              >
                                Try Again
                              </Button>
                            )}
                          </div>
                        )}
                      </>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
            
            <div className="mt-16">
              <Card className="border-cyber-purple/20 bg-secondary/30">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Want to test your skills in real challenges?</h3>
                  <p className="mb-6 text-cyber-light/80">
                    Put your knowledge to the test with our collection of cybersecurity CTF challenges across various categories.
                  </p>
                  <div className="flex justify-center">
                    <GradientButton as={Link} to="/challenges">
                      Explore CTF Challenges
                    </GradientButton>
                  </div>
                </CardContent>
              </Card>
            </div>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default InteractiveExperience;
