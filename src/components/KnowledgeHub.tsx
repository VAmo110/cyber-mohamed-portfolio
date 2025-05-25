
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Search, Filter, Clock, User, Eye, Download } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: number;
  author: string;
  publishDate: string;
  views: number;
  tags: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

const articles: Article[] = [
  {
    id: '1',
    title: 'Advanced SQL Injection Techniques',
    excerpt: 'Explore sophisticated SQL injection methods including blind SQL injection, time-based attacks, and database-specific techniques.',
    category: 'Web Security',
    readTime: 15,
    author: 'Mohamed Cyber',
    publishDate: '2024-01-15',
    views: 1250,
    tags: ['SQL', 'Web Exploitation', 'OWASP'],
    difficulty: 'Advanced'
  },
  {
    id: '2',
    title: 'Red Team vs Blue Team: Understanding the Battlefield',
    excerpt: 'A comprehensive guide to offensive and defensive cybersecurity strategies and how they work together.',
    category: 'Strategy',
    readTime: 10,
    author: 'Mohamed Cyber',
    publishDate: '2024-01-12',
    views: 890,
    tags: ['Red Team', 'Blue Team', 'Strategy'],
    difficulty: 'Intermediate'
  },
  {
    id: '3',
    title: 'AI-Powered Threat Detection',
    excerpt: 'How artificial intelligence is revolutionizing cybersecurity threat detection and response systems.',
    category: 'AI Security',
    readTime: 12,
    author: 'Mohamed Cyber',
    publishDate: '2024-01-10',
    views: 2100,
    tags: ['AI', 'Machine Learning', 'Threat Detection'],
    difficulty: 'Intermediate'
  },
  {
    id: '4',
    title: 'Digital Forensics: Memory Analysis Fundamentals',
    excerpt: 'Learn the basics of memory forensics, tools like Volatility, and how to extract valuable artifacts.',
    category: 'Digital Forensics',
    readTime: 20,
    author: 'Mohamed Cyber',
    publishDate: '2024-01-08',
    views: 750,
    tags: ['Forensics', 'Memory Analysis', 'Volatility'],
    difficulty: 'Advanced'
  },
  {
    id: '5',
    title: 'Getting Started with Penetration Testing',
    excerpt: 'A beginner-friendly introduction to ethical hacking and penetration testing methodologies.',
    category: 'Penetration Testing',
    readTime: 8,
    author: 'Mohamed Cyber',
    publishDate: '2024-01-05',
    views: 1850,
    tags: ['Pentesting', 'Ethical Hacking', 'Beginner'],
    difficulty: 'Beginner'
  }
];

const KnowledgeHub: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredArticles, setFilteredArticles] = useState(articles);

  const categories = ['all', ...new Set(articles.map(article => article.category))];

  const filterArticles = () => {
    let filtered = articles;

    if (searchTerm) {
      filtered = filtered.filter(article =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(article => article.category === selectedCategory);
    }

    setFilteredArticles(filtered);
  };

  React.useEffect(() => {
    filterArticles();
  }, [searchTerm, selectedCategory]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-600/20 text-green-400 border-green-600/30';
      case 'Intermediate': return 'bg-yellow-600/20 text-yellow-400 border-yellow-600/30';
      case 'Advanced': return 'bg-red-600/20 text-red-400 border-red-600/30';
      default: return 'bg-gray-600/20 text-gray-400 border-gray-600/30';
    }
  };

  return (
    <section id="knowledge-hub" className="py-24 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="section-title">
            <span className="gradient-text">Knowledge</span> Hub
          </h2>
          <p className="text-cyber-light/80 max-w-2xl mx-auto">
            Dive deep into cybersecurity concepts, tutorials, and expert insights.
            Stay updated with the latest threats and defense strategies.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-1/4">
            <Card className="cyber-card sticky top-24">
              <CardHeader>
                <h3 className="text-lg font-bold flex items-center gap-2">
                  <Filter size={20} />
                  Filters
                </h3>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Search</label>
                  <div className="relative">
                    <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cyber-light/60" />
                    <Input
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search articles..."
                      className="pl-10 bg-secondary/50 border-cyber-purple/20"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Category</label>
                  <div className="space-y-2">
                    {categories.map(category => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`w-full text-left p-2 rounded-md transition-colors ${
                          selectedCategory === category
                            ? 'bg-cyber-purple/30 text-cyber-purple2'
                            : 'hover:bg-secondary/50 text-cyber-light/80'
                        }`}
                      >
                        {category === 'all' ? 'All Categories' : category}
                      </button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Articles Grid */}
          <div className="lg:w-3/4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredArticles.map((article, index) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="cyber-card h-full hover:shadow-xl transition-all duration-300 card-hover">
                    <CardHeader>
                      <div className="flex justify-between items-start mb-2">
                        <Badge variant="outline" className="text-xs">
                          {article.category}
                        </Badge>
                        <Badge className={`text-xs border ${getDifficultyColor(article.difficulty)}`}>
                          {article.difficulty}
                        </Badge>
                      </div>
                      <h3 className="text-lg font-bold hover:text-cyber-purple2 transition-colors">
                        {article.title}
                      </h3>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      <p className="text-cyber-light/80 text-sm leading-relaxed">
                        {article.excerpt}
                      </p>

                      <div className="flex flex-wrap gap-1">
                        {article.tags.map(tag => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="text-xs bg-secondary/30"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center justify-between text-xs text-cyber-light/60">
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1">
                            <Clock size={12} />
                            {article.readTime} min
                          </span>
                          <span className="flex items-center gap-1">
                            <Eye size={12} />
                            {article.views}
                          </span>
                        </div>
                        <span>{new Date(article.publishDate).toLocaleDateString()}</span>
                      </div>

                      <div className="flex gap-2 pt-2">
                        <Button size="sm" className="flex-1 bg-gradient-purple hover:bg-gradient-purple-dark">
                          <BookOpen size={14} className="mr-1" />
                          Read Article
                        </Button>
                        <Button size="sm" variant="outline" className="border-cyber-purple/40">
                          <Download size={14} />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {filteredArticles.length === 0 && (
              <div className="text-center py-12">
                <p className="text-cyber-light/60">No articles found matching your criteria.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default KnowledgeHub;
