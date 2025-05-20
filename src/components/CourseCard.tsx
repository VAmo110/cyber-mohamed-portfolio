
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import GradientButton from './GradientButton';

interface CourseCardProps {
  title: string;
  duration: string;
  summary: string;
  tags: string[];
  image: string;
  link: string;
}

const CourseCard: React.FC<CourseCardProps> = ({ 
  title, 
  duration, 
  summary, 
  tags, 
  image, 
  link 
}) => {
  return (
    <Card className="cyber-card overflow-hidden h-full flex flex-col hover:shadow-lg transition-all duration-300">
      <div className="h-48 overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
      </div>
      
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-bold">{title}</h3>
          <span className="text-sm px-3 py-1 bg-cyber-purple/20 text-cyber-purple2 rounded-full">
            {duration}
          </span>
        </div>
      </CardHeader>
      
      <CardContent className="flex-grow">
        <p className="text-cyber-light/80 mb-4">{summary}</p>
        
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
      
      <CardFooter>
        <GradientButton href={link} className="w-full" target="_blank">
          View Course
        </GradientButton>
      </CardFooter>
    </Card>
  );
};

export default CourseCard;
