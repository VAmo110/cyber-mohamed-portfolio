
import React, { useState } from 'react';
import CourseCard from './CourseCard';

const CourseSection = () => {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  
  const courses = [
    {
      title: "Red Hat Certified System Administrator",
      duration: "40 hours",
      summary: "Essential Linux administration skills for enterprise environments.",
      tags: ["Linux", "RHCSA", "Administration"],
      image: "/placeholder.svg",
      link: "#",
      category: "redhat"
    },
    {
      title: "Advanced Penetration Testing",
      duration: "36 hours",
      summary: "Learn advanced techniques for identifying and exploiting security vulnerabilities.",
      tags: ["Red Team", "Pentesting", "Exploitation"],
      image: "/placeholder.svg",
      link: "#",
      category: "security"
    },
    {
      title: "Security Operations Center Essentials",
      duration: "30 hours",
      summary: "Build and manage a modern SOC with effective threat detection.",
      tags: ["Blue Team", "SIEM", "Monitoring"],
      image: "/placeholder.svg",
      link: "#",
      category: "security"
    },
    {
      title: "Red Hat Automation with Ansible",
      duration: "25 hours",
      summary: "Streamline operations with powerful automation solutions.",
      tags: ["Automation", "Ansible", "DevOps"],
      image: "/placeholder.svg",
      link: "#",
      category: "redhat"
    },
    {
      title: "Cloud Security Fundamentals",
      duration: "28 hours",
      summary: "Secure cloud deployments across major providers and architectures.",
      tags: ["Cloud", "AWS", "Azure"],
      image: "/placeholder.svg",
      link: "#",
      category: "cloud"
    },
    {
      title: "MITRE ATT&CK Framework",
      duration: "20 hours",
      summary: "Apply the industry-standard framework to enhance security posture.",
      tags: ["Purple Team", "Framework", "Strategy"],
      image: "/placeholder.svg",
      link: "#",
      category: "security"
    }
  ];
  
  const filteredCourses = activeFilter === "all" 
    ? courses 
    : courses.filter(course => course.category === activeFilter);

  return (
    <section id="courses" className="py-20 bg-cyber-dark">
      <div className="container mx-auto px-4">
        <h2 className="section-title">
          <span className="gradient-text">Courses</span> & Training
        </h2>
        
        <div className="flex justify-center flex-wrap gap-4 mb-12">
          <button 
            onClick={() => setActiveFilter("all")} 
            className={`px-4 py-2 rounded-full ${
              activeFilter === "all" 
                ? "bg-gradient-purple text-white" 
                : "bg-secondary/50 hover:bg-secondary"
            }`}
          >
            All Courses
          </button>
          <button 
            onClick={() => setActiveFilter("redhat")} 
            className={`px-4 py-2 rounded-full ${
              activeFilter === "redhat" 
                ? "bg-gradient-purple text-white" 
                : "bg-secondary/50 hover:bg-secondary"
            }`}
          >
            Red Hat
          </button>
          <button 
            onClick={() => setActiveFilter("security")} 
            className={`px-4 py-2 rounded-full ${
              activeFilter === "security" 
                ? "bg-gradient-purple text-white" 
                : "bg-secondary/50 hover:bg-secondary"
            }`}
          >
            Security
          </button>
          <button 
            onClick={() => setActiveFilter("cloud")} 
            className={`px-4 py-2 rounded-full ${
              activeFilter === "cloud" 
                ? "bg-gradient-purple text-white" 
                : "bg-secondary/50 hover:bg-secondary"
            }`}
          >
            Cloud
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course, index) => (
            <CourseCard
              key={index}
              title={course.title}
              duration={course.duration}
              summary={course.summary}
              tags={course.tags}
              image={course.image}
              link={course.link}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CourseSection;
