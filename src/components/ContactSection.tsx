
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import GradientButton from './GradientButton';
import { useToast } from '@/components/ui/use-toast';
import { Mail, MessageSquare, Github, Linkedin, Youtube } from 'lucide-react';
import { cn } from '@/lib/utils';
import TerminalEffect from './TerminalEffect';

const ContactSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Message Sent",
        description: "Thanks for reaching out! I'll get back to you soon.",
      });
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 matrix-bg opacity-5 z-0"></div>
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="section-title">
          Get in <span className="gradient-text">Touch</span>
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mt-12">
          <div className="cyber-card">
            <div className="flex items-center mb-6">
              <MessageSquare className="text-cyber-purple2 mr-3" size={28} />
              <h3 className="text-2xl font-bold">Send a Message</h3>
            </div>
            
            <TerminalEffect 
              text="Connect with me for cybersecurity collaboration, training inquiries, or speaking opportunities."
              speed={30}
              className="mb-6"
            />
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block mb-2 text-sm">Name</label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="bg-secondary/50 border-cyber-purple/20 text-cyber-light"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm">Email</label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="bg-secondary/50 border-cyber-purple/20 text-cyber-light"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="block mb-2 text-sm">Subject</label>
                <Input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="bg-secondary/50 border-cyber-purple/20 text-cyber-light"
                  placeholder="How can I help you?"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block mb-2 text-sm">Message</label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="bg-secondary/50 border-cyber-purple/20 text-cyber-light min-h-[150px]"
                  placeholder="Tell me about your project or inquiry..."
                />
              </div>
              
              <GradientButton 
                type="submit" 
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </GradientButton>
            </form>
          </div>
          
          <div className="space-y-8">
            <div className="cyber-card">
              <div className="flex items-center mb-4">
                <Mail className="text-cyber-purple2 mr-3" size={24} />
                <h4 className="text-xl">Contact Information</h4>
              </div>
              
              <div className="space-y-4 pl-9">
                <p><span className="text-cyber-light/70">Email:</span> contact@cyberwithmohamed.com</p>
                <p><span className="text-cyber-light/70">Location:</span> Cairo, Egypt</p>
                <p><span className="text-cyber-light/70">Available for:</span> Training, Consultation, Speaking</p>
              </div>
            </div>
            
            <div className="cyber-card">
              <div className="flex items-center mb-4">
                <MessageSquare className="text-cyber-purple2 mr-3" size={24} />
                <h4 className="text-xl">Connect With Me</h4>
              </div>
              
              <div className="flex flex-wrap gap-4 justify-center mt-6">
                <SocialButton 
                  icon={<Github size={24} />}
                  label="GitHub"
                  href="https://github.com/cyber-with-mohamed"
                />
                <SocialButton 
                  icon={<Linkedin size={24} />}
                  label="LinkedIn"
                  href="https://linkedin.com/in/cyber-with-mohamed"
                />
                <SocialButton 
                  icon={<Youtube size={24} />}
                  label="YouTube"
                  href="https://youtube.com/@cyberwithmohamed"
                />
              </div>
            </div>
            
            <div className="cyber-card animate-float">
              <h4 className="text-xl mb-4">Book a Session</h4>
              <p className="mb-4 text-cyber-light/80">
                Need personalized guidance for your cybersecurity career or project? 
                Schedule a one-on-one virtual session.
              </p>
              <GradientButton 
                className="w-full" 
                href="https://calendly.com/cyberwithmohamed/consultation"
                target="_blank"
              >
                Book Consultation
              </GradientButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

interface SocialButtonProps {
  icon: React.ReactNode;
  label: string;
  href: string;
}

const SocialButton: React.FC<SocialButtonProps> = ({ icon, label, href }) => {
  return (
    <a 
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group flex items-center gap-2 px-4 py-3 rounded-full",
        "bg-secondary/70 hover:bg-cyber-purple/30 transition-all duration-300",
        "text-cyber-light hover:text-white"
      )}
    >
      <span className="icon-glow">{icon}</span>
      <span>{label}</span>
    </a>
  );
};

export default ContactSection;
