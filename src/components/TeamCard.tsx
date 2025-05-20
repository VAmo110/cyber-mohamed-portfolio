
import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import GradientButton from './GradientButton';
import { Badge } from '@/components/ui/badge';
import { Layers } from 'lucide-react';

interface TeamCardProps {
  title: string;
  color: string;
  icon: React.ReactNode;
  description: string;
  features: string[];
  tools?: string[];
  backgroundImage?: string;
}

const TeamCard: React.FC<TeamCardProps> = ({ 
  title, 
  color, 
  icon, 
  description, 
  features,
  tools = [],
  backgroundImage
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
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

  const getBackgroundStyle = () => {
    if (backgroundImage) {
      return {
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.95)), url('${backgroundImage}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      };
    }
    return {};
  };

  return (
    <Card 
      className={`cyber-card overflow-hidden border ${getBorderClass()} transition-all duration-500 hover:shadow-lg h-full transform ${isHovered ? 'scale-105' : ''}`} 
      style={getBackgroundStyle()}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`h-2 w-full bg-gradient-to-r ${getGradientClass()}`}></div>
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        <div className={`p-2 rounded-lg bg-${color === 'red' ? 'red' : color === 'blue' ? 'blue' : 'purple'}-900/30`}>
          {icon}
        </div>
        <h3 className="text-2xl font-bold">{title}</h3>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-cyber-light/80">{description}</p>
        
        <div>
          <h4 className="font-semibold mb-2 flex items-center gap-2">
            <Layers className="w-4 h-4" />
            Key Focus Areas:
          </h4>
          <ul className="space-y-2">
            {features.map((feature, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <span className={`w-1.5 h-1.5 rounded-full bg-${color === 'purple' ? 'cyber-purple2' : color}-500`}></span>
                {feature}
              </li>
            ))}
          </ul>
        </div>
        
        {tools.length > 0 && (
          <div className="mt-4">
            <h4 className="font-semibold mb-2">Tools & Technologies:</h4>
            <div className="flex flex-wrap gap-2">
              {tools.map((tool, idx) => (
                <Badge key={idx} variant="secondary" className="bg-secondary/50">
                  {tool}
                </Badge>
              ))}
            </div>
          </div>
        )}
        
        <GradientButton 
          className={`w-full mt-6 bg-gradient-to-r ${getGradientClass()} transform transition-all duration-300 ${isHovered ? 'translate-y-0' : 'translate-y-1'}`}
          href={`#${title.toLowerCase().replace(' ', '-')}-details`}
        >
          Explore {title}
        </GradientButton>
      </CardContent>
    </Card>
  );
};

export default TeamCard;
