
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar } from 'lucide-react';

interface VideoCardProps {
  title: string;
  thumbnail: string;
  date: string;
  duration: string;
  embedUrl: string;
  category: string;
}

const VideoCard: React.FC<VideoCardProps> = ({ 
  title, 
  thumbnail, 
  date, 
  duration,
  embedUrl,
  category
}) => {
  return (
    <Card className="cyber-card overflow-hidden hover:shadow-lg transition-all duration-300">
      <div className="relative">
        <div className="relative h-48 overflow-hidden">
          <img 
            src={thumbnail} 
            alt={title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 text-xs rounded">
            {duration}
          </div>
          <div className="absolute top-2 left-2 bg-gradient-purple text-white px-2 py-1 text-xs rounded">
            {category}
          </div>
        </div>
        
        <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 bg-black/60 transition-opacity duration-300">
          <button 
            onClick={() => window.open(embedUrl, '_blank')}
            className="w-12 h-12 bg-cyber-purple rounded-full flex items-center justify-center text-white"
            aria-label="Play video"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
          </button>
        </div>
      </div>
      
      <CardContent className="pt-4">
        <h3 className="font-bold text-lg mb-2 line-clamp-2">{title}</h3>
        
        <div className="flex items-center text-sm text-cyber-light/70">
          <Calendar size={14} className="mr-1" />
          <span>{date}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default VideoCard;
