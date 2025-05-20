
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import GradientButton from './GradientButton';

interface TeamCardProps {
  title: string;
  color: string;
  icon: string;
  description: string;
  features: string[];
}

const TeamCard: React.FC<TeamCardProps> = ({ 
  title, 
  color, 
  icon, 
  description, 
  features 
}) => {
  const getGradientClass = () => {
    switch (color) {
      case 'red':
        return 'from-red-600 to-red-700';
      case 'blue':
        return 'from-blue-600 to-blue-700';
      case 'purple':
        return 'from-purple-600 to-purple-700';
      default:
        return 'from-cyber-purple to-cyber-purple3';
    }
  };

  const getBorderClass = () => {
    switch (color) {
      case 'red':
        return 'border-red-500/30';
      case 'blue':
        return 'border-blue-500/30';
      case 'purple':
        return 'border-purple-500/30';
      default:
        return 'border-cyber-purple/30';
    }
  };

  return (
    <Card className={`cyber-card overflow-hidden border ${getBorderClass()} transition-all duration-300 hover:shadow-lg h-full`}>
      <div className={`h-2 w-full bg-gradient-to-r ${getGradientClass()}`}></div>
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        <div className={`p-2 rounded-lg bg-${color}-900/30`}>
          <img src={icon} alt={title} className="w-10 h-10" />
        </div>
        <h3 className="text-2xl font-bold">{title}</h3>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-cyber-light/80">{description}</p>
        
        <div>
          <h4 className="font-semibold mb-2">Key Focus Areas:</h4>
          <ul className="space-y-2">
            {features.map((feature, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <span className={`w-1.5 h-1.5 rounded-full bg-${color === 'purple' ? 'cyber-purple2' : color}-500`}></span>
                {feature}
              </li>
            ))}
          </ul>
        </div>
        
        <GradientButton 
          className={`w-full mt-4 bg-gradient-to-r ${getGradientClass()}`}
          href={`#${title.toLowerCase().replace(' ', '-')}`}
        >
          Explore {title}
        </GradientButton>
      </CardContent>
    </Card>
  );
};

export default TeamCard;
