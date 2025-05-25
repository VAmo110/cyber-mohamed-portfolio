
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Star, Award, Zap, Target, Shield } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

interface UserStats {
  level: number;
  xp: number;
  totalXp: number;
  challenges: number;
  badges: string[];
  rank: string;
}

const badges = [
  { id: 'first_challenge', name: 'First Blood', icon: Trophy, description: 'Complete your first challenge' },
  { id: 'web_expert', name: 'Web Warrior', icon: Shield, description: 'Master 5 web exploitation challenges' },
  { id: 'crypto_master', name: 'Crypto Master', icon: Star, description: 'Solve 5 cryptography challenges' },
  { id: 'forensics_ace', name: 'Digital Detective', icon: Target, description: 'Complete 5 forensics challenges' },
  { id: 'speed_demon', name: 'Speed Demon', icon: Zap, description: 'Solve a challenge in under 5 minutes' },
  { id: 'perfectionist', name: 'Perfectionist', icon: Award, description: 'Solve 10 challenges without hints' },
];

const GamificationSystem: React.FC = () => {
  const [userStats, setUserStats] = useState<UserStats>({
    level: 7,
    xp: 2450,
    totalXp: 3000,
    challenges: 23,
    badges: ['first_challenge', 'web_expert', 'speed_demon'],
    rank: 'Elite Hacker'
  });

  const xpToNextLevel = 3000 - userStats.xp;
  const progressPercentage = (userStats.xp / userStats.totalXp) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="cyber-card p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold">Your Progress</h3>
        <Badge className="bg-gradient-purple text-white px-3 py-1">
          {userStats.rank}
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="bg-secondary/30 border-cyber-purple/20">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-cyber-purple2">{userStats.level}</div>
            <div className="text-sm text-cyber-light/70">Level</div>
          </CardContent>
        </Card>

        <Card className="bg-secondary/30 border-cyber-purple/20">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-cyber-purple2">{userStats.xp}</div>
            <div className="text-sm text-cyber-light/70">XP Points</div>
          </CardContent>
        </Card>

        <Card className="bg-secondary/30 border-cyber-purple/20">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-cyber-purple2">{userStats.challenges}</div>
            <div className="text-sm text-cyber-light/70">Challenges</div>
          </CardContent>
        </Card>
      </div>

      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-cyber-light/70">Progress to Level {userStats.level + 1}</span>
          <span className="text-sm text-cyber-purple2">{xpToNextLevel} XP needed</span>
        </div>
        <Progress value={progressPercentage} className="h-3" />
      </div>

      <div>
        <h4 className="text-lg font-semibold mb-4">Achievements</h4>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {badges.map((badge) => {
            const isUnlocked = userStats.badges.includes(badge.id);
            const IconComponent = badge.icon;
            
            return (
              <motion.div
                key={badge.id}
                whileHover={{ scale: 1.05 }}
                className={`p-3 rounded-lg border text-center transition-all ${
                  isUnlocked 
                    ? 'bg-cyber-purple/20 border-cyber-purple/40 text-cyber-light' 
                    : 'bg-secondary/20 border-secondary/40 text-cyber-light/40'
                }`}
              >
                <IconComponent 
                  size={24} 
                  className={`mx-auto mb-2 ${isUnlocked ? 'text-cyber-purple2' : 'text-cyber-light/40'}`} 
                />
                <div className="text-xs font-medium">{badge.name}</div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default GamificationSystem;
