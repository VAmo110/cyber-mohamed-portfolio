
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import VideoCard from './VideoCard';

const ContentSection = () => {
  const [activeTab, setActiveTab] = useState<string>("videos");
  const [activeFilter, setActiveFilter] = useState<string>("all");
  
  const videos = [
    {
      title: "Understanding SIEM Implementation for Small Businesses",
      thumbnail: "/placeholder.svg",
      date: "May 15, 2025",
      duration: "15:24",
      embedUrl: "https://youtube.com/watch?v=example1",
      category: "Blue Team"
    },
    {
      title: "Kali Linux: Essential Tools for Penetration Testing",
      thumbnail: "/placeholder.svg",
      date: "May 10, 2025",
      duration: "22:38",
      embedUrl: "https://youtube.com/watch?v=example2",
      category: "Red Team"
    },
    {
      title: "Collaborative Security: Purple Team Exercises",
      thumbnail: "/placeholder.svg",
      date: "May 5, 2025",
      duration: "18:52",
      embedUrl: "https://youtube.com/watch?v=example3",
      category: "Purple Team"
    },
    {
      title: "Cloud Security Architecture Design Principles",
      thumbnail: "/placeholder.svg",
      date: "April 28, 2025",
      duration: "24:15",
      embedUrl: "https://youtube.com/watch?v=example4",
      category: "Blue Team"
    },
    {
      title: "Advanced Web Application Penetration Testing",
      thumbnail: "/placeholder.svg",
      date: "April 22, 2025",
      duration: "31:07",
      embedUrl: "https://youtube.com/watch?v=example5",
      category: "Red Team"
    },
    {
      title: "MITRE ATT&CK Framework for Security Teams",
      thumbnail: "/placeholder.svg",
      date: "April 15, 2025",
      duration: "27:19",
      embedUrl: "https://youtube.com/watch?v=example6",
      category: "Purple Team"
    }
  ];
  
  const podcasts = [
    {
      title: "Episode 12: The Future of Threat Intelligence",
      thumbnail: "/placeholder.svg",
      date: "May 18, 2025",
      duration: "45:33",
      embedUrl: "https://youtube.com/watch?v=podcast1",
      category: "Industry Trends"
    },
    {
      title: "Episode 11: Interview with CISO of Tech Corp",
      thumbnail: "/placeholder.svg",
      date: "May 4, 2025",
      duration: "52:14",
      embedUrl: "https://youtube.com/watch?v=podcast2",
      category: "Interviews"
    },
    {
      title: "Episode 10: Ransomware Response Strategies",
      thumbnail: "/placeholder.svg",
      date: "April 20, 2025",
      duration: "48:29",
      embedUrl: "https://youtube.com/watch?v=podcast3",
      category: "Incident Response"
    },
    {
      title: "Episode 9: Security Certifications Worth Pursuing",
      thumbnail: "/placeholder.svg",
      date: "April 6, 2025",
      duration: "55:41",
      embedUrl: "https://youtube.com/watch?v=podcast4",
      category: "Career Growth"
    }
  ];
  
  const getFilteredContent = () => {
    const content = activeTab === "videos" ? videos : podcasts;
    return activeFilter === "all" 
      ? content 
      : content.filter(item => item.category === activeFilter);
  };
  
  const getUniqueCategories = () => {
    const content = activeTab === "videos" ? videos : podcasts;
    return ["all", ...Array.from(new Set(content.map(item => item.category)))];
  };

  return (
    <section id="content" className="py-20 bg-gradient-terminal">
      <div className="container mx-auto px-4">
        <h2 className="section-title">
          Educational <span className="gradient-text">Content</span>
        </h2>
        
        <Tabs 
          defaultValue="videos" 
          onValueChange={(value) => {
            setActiveTab(value);
            setActiveFilter("all");
          }}
          className="w-full max-w-5xl mx-auto"
        >
          <div className="flex justify-center mb-8">
            <TabsList className="bg-secondary/50">
              <TabsTrigger value="videos" className="text-lg px-8 py-2">
                YouTube Insights
              </TabsTrigger>
              <TabsTrigger value="podcasts" className="text-lg px-8 py-2">
                Podcasts
              </TabsTrigger>
            </TabsList>
          </div>
          
          <div className="flex justify-center flex-wrap gap-4 mb-8">
            {getUniqueCategories().map((category, idx) => (
              <button 
                key={idx}
                onClick={() => setActiveFilter(category)} 
                className={`px-4 py-2 rounded-full ${
                  activeFilter === category 
                    ? "bg-gradient-purple text-white" 
                    : "bg-secondary/50 hover:bg-secondary"
                }`}
              >
                {category === "all" ? "All" : category}
              </button>
            ))}
          </div>
          
          <TabsContent value="videos" className="mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {getFilteredContent().map((video, index) => (
                <VideoCard
                  key={index}
                  title={video.title}
                  thumbnail={video.thumbnail}
                  date={video.date}
                  duration={video.duration}
                  embedUrl={video.embedUrl}
                  category={video.category}
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="podcasts" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {getFilteredContent().map((podcast, index) => (
                <VideoCard
                  key={index}
                  title={podcast.title}
                  thumbnail={podcast.thumbnail}
                  date={podcast.date}
                  duration={podcast.duration}
                  embedUrl={podcast.embedUrl}
                  category={podcast.category}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default ContentSection;
