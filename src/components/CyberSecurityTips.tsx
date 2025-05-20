
import React, { useState, useEffect } from 'react';
import { Shield, AlertTriangle, Lock, Eye, Webhook, Bug, Fingerprint, Wifi, Key } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import TerminalEffect from './TerminalEffect';

interface Tip {
  id: number;
  icon: React.ReactNode;
  title: string;
  content: string;
  category: 'basic' | 'intermediate' | 'advanced';
  badgeColor: string;
  readTime: string;
}

const tips: Tip[] = [
  {
    id: 1,
    icon: <Shield className="h-6 w-6" />,
    title: "Use Multi-Factor Authentication",
    content: "Always enable MFA/2FA where available. This adds an additional layer of protection beyond your password. Even if your password is compromised, attackers still need the second factor (often your mobile device) to gain access.",
    category: 'basic',
    badgeColor: 'bg-green-600/30 text-green-400',
    readTime: '1 min'
  },
  {
    id: 2,
    icon: <Lock className="h-6 w-6" />,
    title: "Password Manager Best Practices",
    content: "Use a reputable password manager to generate and store strong, unique passwords. Create a complex master password that's memorable to you but difficult for others to guess. Regularly audit your stored passwords and enable biometric authentication if available.",
    category: 'intermediate',
    badgeColor: 'bg-yellow-600/30 text-yellow-400',
    readTime: '2 min'
  },
  {
    id: 3, 
    icon: <Eye className="h-6 w-6" />,
    title: "Spot Phishing Attacks",
    content: "Examine email sender addresses carefully, not just the display name. Be suspicious of urgent requests, especially those involving credentials or payments. Hover over links before clicking to preview the actual URL. When in doubt, contact the supposed sender through a known, official channel.",
    category: 'basic',
    badgeColor: 'bg-green-600/30 text-green-400',
    readTime: '3 min'
  },
  {
    id: 4,
    icon: <Webhook className="h-6 w-6" />,
    title: "Network Segmentation",
    content: "Implement network segmentation to isolate critical systems and limit lateral movement. Use VLANs, firewalls, and access control lists to create security zones. Follow the principle of least privilege when granting access between segments.",
    category: 'advanced',
    badgeColor: 'bg-red-600/30 text-red-400',
    readTime: '4 min'
  },
  {
    id: 5,
    icon: <Bug className="h-6 w-6" />,
    title: "Zero-Day Vulnerability Defense",
    content: "Implement defense-in-depth strategies to mitigate unknown vulnerabilities. Use network behavior analysis to detect anomalous activities. Deploy runtime application self-protection (RASP) and web application firewalls (WAF) for critical services.",
    category: 'advanced',
    badgeColor: 'bg-red-600/30 text-red-400',
    readTime: '3 min'
  },
  {
    id: 6,
    icon: <Fingerprint className="h-6 w-6" />,
    title: "Digital Forensics Basics",
    content: "Always maintain chain of custody when collecting digital evidence. Use write blockers when creating forensic images. Document each step of your investigation and maintain hashes to prove evidence integrity.",
    category: 'intermediate',
    badgeColor: 'bg-yellow-600/30 text-yellow-400',
    readTime: '3 min'
  },
  {
    id: 7,
    icon: <Wifi className="h-6 w-6" />,
    title: "Secure Your Home Network",
    content: "Change default router credentials and enable WPA3 encryption if available. Use a guest network for IoT devices and visitors. Consider using DNS filtering to block malicious websites and regularly update your router's firmware.",
    category: 'basic',
    badgeColor: 'bg-green-600/30 text-green-400',
    readTime: '2 min'
  },
  {
    id: 8,
    icon: <Key className="h-6 w-6" />,
    title: "Public Key Infrastructure",
    content: "Understand certificate authorities and certificate validation. Implement proper certificate lifecycle management including rotation and revocation. Use extended validation certificates for sensitive applications and services.",
    category: 'advanced',
    badgeColor: 'bg-red-600/30 text-red-400',
    readTime: '4 min'
  },
];

const CyberSecurityTips = () => {
  const [activeTip, setActiveTip] = useState<Tip>(tips[0]);
  const [progress, setProgress] = useState(0);
  const [readTips, setReadTips] = useState<number[]>([]);
  
  useEffect(() => {
    // Calculate progress
    const newProgress = Math.round((readTips.length / tips.length) * 100);
    setProgress(newProgress);
  }, [readTips]);
  
  const handleTipClick = (tip: Tip) => {
    setActiveTip(tip);
    if (!readTips.includes(tip.id)) {
      setReadTips([...readTips, tip.id]);
    }
  };
  
  return (
    <div className="cyber-card p-6 mt-8">
      <div className="mb-6">
        <h3 className="text-xl font-bold mb-2">Cybersecurity Knowledge Base</h3>
        <p className="text-cyber-light/70 mb-4">
          Expand your cybersecurity knowledge with these essential tips and best practices
        </p>
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <Progress value={progress} showValue size="sm" />
          </div>
          <span className="text-sm text-cyber-light/70">
            {readTips.length} of {tips.length} tips read
          </span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="space-y-3 lg:col-span-1 order-2 lg:order-1">
          {tips.map((tip) => (
            <div 
              key={tip.id}
              onClick={() => handleTipClick(tip)}
              className={`p-3 rounded-lg cursor-pointer transition-all duration-300 flex items-center gap-3 ${
                activeTip.id === tip.id 
                  ? 'bg-cyber-purple/20 border border-cyber-purple/30' 
                  : 'bg-secondary/30 hover:bg-secondary/50'
              } ${readTips.includes(tip.id) ? 'border-l-4 border-l-cyber-purple2' : ''}`}
            >
              <div className="text-cyber-purple2">
                {tip.icon}
              </div>
              <div className="flex-1">
                <h4 className="font-medium">{tip.title}</h4>
                <div className="flex items-center gap-2 mt-1">
                  <Badge className={tip.badgeColor}>
                    {tip.category}
                  </Badge>
                  <span className="text-xs text-cyber-light/60">{tip.readTime} read</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <Card className="lg:col-span-2 order-1 lg:order-2 border-cyber-purple/20 bg-secondary/30">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-cyber-purple/10 text-cyber-purple2">
                  {activeTip.icon}
                </div>
                <h3 className="text-xl font-bold">{activeTip.title}</h3>
              </div>
              <Badge className={activeTip.badgeColor}>
                {activeTip.category}
              </Badge>
            </div>
            
            <div className="space-y-4 mt-4">
              <TerminalEffect 
                text={activeTip.content}
                speed={10}
                className="text-cyber-light/90 leading-relaxed"
              />
            </div>
          </CardContent>
          <CardFooter className="bg-secondary/50 p-4 border-t border-cyber-purple/10">
            <div className="flex items-center justify-between w-full text-sm">
              <span className="text-cyber-light/60">Tip #{activeTip.id} of {tips.length}</span>
              <Badge variant="outline" className="text-cyber-purple2">
                {activeTip.readTime} read
              </Badge>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default CyberSecurityTips;
