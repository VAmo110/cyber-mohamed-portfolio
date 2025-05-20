
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import GradientButton from './GradientButton';
import { Github } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  githubUrl: string;
  demoUrl?: string;
  tags: string[];
}

const ProjectCard: React.FC<ProjectCardProps> = ({ 
  title, 
  description, 
  image, 
  githubUrl, 
  demoUrl,
  tags 
}) => {
  return (
    <Card className="cyber-card overflow-hidden flex flex-col h-full">
      <div className="h-48 overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
      </div>
      
      <CardContent className="py-6 flex-grow">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-cyber-light/80 mb-4">{description}</p>
        
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, idx) => (
            <span 
              key={idx}
              className="text-xs px-2 py-1 bg-secondary/70 rounded-md"
            >
              {tag}
            </span>
          ))}
        </div>
      </CardContent>
      
      <CardFooter className="flex gap-4">
        <GradientButton 
          className="flex-1 flex items-center justify-center gap-2"
          href={githubUrl}
          target="_blank"
        >
          <Github size={18} />
          GitHub
        </GradientButton>
        
        {demoUrl && (
          <GradientButton 
            className="flex-1"
            href={demoUrl}
            target="_blank"
          >
            Live Demo
          </GradientButton>
        )}
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;
