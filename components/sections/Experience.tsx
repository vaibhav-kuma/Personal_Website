'use client';

import { motion } from 'framer-motion';
import { GraduationCap, Briefcase, Trophy, Code2, BookOpen, Award } from 'lucide-react';

const timelineItems = [
  {
    year: '2024',
    period: 'Present',
    type: 'project',
    title: 'SOC_plateform',
    organization: 'Independent Project',
    description: 'Full-featured Security Operations Center platform with AI-driven threat detection, automated response, and real-time monitoring.',
    technologies: ['Python', 'FastAPI', 'React', 'Kubernetes', 'Elasticsearch', 'Kafka'],
    icon: Code2,
    color: '#00bfff',
    link: '/projects/soc-platform',
  },
  {
    year: '2024',
    period: 'Present',
    type: 'project',
    title: 'legacy-lift-ai',
    organization: 'Independent Project',
    description: 'AI agent pipeline for automated legacy code analysis, refactoring, and modernization to cloud-native architectures.',
    technologies: ['Python', 'LLMs', 'LangChain', 'FastAPI', 'React', 'PostgreSQL'],
    icon: Code2,
    color: '#8a2be2',
    link: '/projects/legacy-lift-ai',
  },
  {
    year: '2023',
    period: '2024',
    type: 'project',
    title: 'VADT',
    organization: 'Independent Project',
    description: 'Host-based threat detection agent with MITRE ATT&CK mapping, process monitoring, and Splunk integration.',
    technologies: ['Python', 'Flask', 'React', 'MongoDB', 'Splunk', 'Docker'],
    icon: Code2,
    color: '#ff6b6b',
    link: '/projects/vadt',
  },
  {
    year: '2023',
    period: '2023',
    type: 'project',
    title: 'DarkExposure',
    organization: 'Independent Project',
    description: 'Attack surface management platform with asset discovery, vulnerability correlation, and threat intelligence enrichment.',
    technologies: ['Python', 'FastAPI', 'React', 'PostgreSQL', 'Elasticsearch', 'GraphQL'],
    icon: Code2,
    color: '#f59e0b',
    link: '/projects/dark-exposure',
  },
  {
    year: '2023',
    period: '2023',
    type: 'project',
    title: 'Threat Detection Monitoring Dashboard',
    organization: 'Independent Project',
    description: 'Converged observability platform unifying metrics, logs, and security events with ML-based anomaly detection.',
    technologies: ['Python', 'Kafka', 'Elasticsearch', 'Prometheus', 'Grafana', 'React'],
    icon: Code2,
    color: '#ec4899',
    link: '/projects/threat-detection-monitoring-dashboard',
  },
  {
    year: '2022',
    period: '2023',
    type: 'education',
    title: 'Bachelor of Technology in Computer Science',
    organization: 'University Name',
    description: 'Focus on distributed systems, cybersecurity, and machine learning. Final year project: "AI-Powered Threat Detection System".',
    technologies: ['C++', 'Python', 'Linux', 'Network Security', 'ML'],
    icon: GraduationCap,
    color: '#00bfff',
  },
  {
    year: '2021',
    period: '2022',
    type: 'internship',
    title: 'Software Engineering Intern',
    organization: 'Tech Company',
    description: 'Built backend services for security monitoring platform. Implemented log ingestion pipeline processing 100k+ events/sec.',
    technologies: ['Java', 'Spring Boot', 'Kafka', 'Elasticsearch', 'Docker'],
    icon: Briefcase,
    color: '#8a2be2',
  },
  {
    year: '2021',
    period: '2021',
    type: 'competition',
    title: 'Capture The Flag (CTF) Competition',
    organization: 'National Cybersecurity Competition',
    description: 'Team ranked top 10 nationally. Specialized in reverse engineering, binary exploitation, and forensic challenges.',
    technologies: ['Reverse Engineering', 'Binary Exploitation', 'Forensics', 'Cryptography'],
    icon: Trophy,
    color: '#f59e0b',
  },
  {
    year: '2020',
    period: '2021',
    type: 'certification',
    title: 'AWS Certified Solutions Architect – Associate',
    organization: 'Amazon Web Services',
    description: 'Validated expertise in designing distributed systems on AWS with focus on security, reliability, and cost optimization.',
    technologies: ['AWS', 'Architecture', 'Security', 'Networking'],
    icon: Award,
    color: '#ec4899',
  },
];

// Group by year for timeline
const groupedByYear = timelineItems.reduce((acc, item) => {
  if (!acc[item.year]) acc[item.year] = [];
  acc[item.year].push(item);
  return acc;
}, {} as Record<string, typeof timelineItems>);

export function Experience() {
  const years = Object.keys(groupedByYear).sort((a, b) => parseInt(b) - parseInt(a));

  return (
    <section id="experience" className="py-24 px-6 bg-background/50">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-mono tracking-widest uppercase text-primary mb-4 block">Timeline</span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Experience & Achievements</h2>
          <p className="text-white/50 mt-2">
            Professional journey, key projects, education, and recognition. Only factual, verifiable information included.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/50 via-transparent to-primary/50" />

          {years.map((year, yearIndex) => (
            <motion.div
              key={year}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * yearIndex }}
              className="mb-12"
            >
              {/* Year Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl glass border border-white/10 flex items-center justify-center flex-shrink-0 relative z-10">
                  <span className="font-mono text-xl font-bold text-primary">{year}</span>
                </div>
                <div className="flex-1 h-0.5 bg-white/10" />
              </div>

              {/* Items for this year */}
              <div className="space-y-6 ml-20">
                {groupedByYear[year].map((item, itemIndex) => (
                  <motion.div
                    key={`${year}-${itemIndex}`}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.1 * yearIndex + 0.05 * itemIndex }}
                    className="relative group"
                  >
                    {/* Timeline Dot */}
                    <div className="absolute left-[-28px] top-2 w-4 h-4 rounded-full border-3 flex-shrink-0 z-10" style={{ 
                      backgroundColor: item.color,
                      borderColor: item.color 
                    }} />

                    {/* Card */}
                    <div className="glass p-5 rounded-xl border border-white/5 hover:border-primary/30 transition-colors relative">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${item.color}20` }}>
                          <item.icon className="w-5 h-5" style={{ color: item.color }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 flex-wrap mb-2">
                            <h3 className="font-semibold text-lg">{item.title}</h3>
                            <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-white/50 capitalize">{item.type}</span>
                          </div>
                          <p className="text-white/50 text-sm mb-1">{item.organization}</p>
                          <p className="text-white/60 text-sm leading-relaxed mb-3">{item.description}</p>
                          <div className="flex flex-wrap gap-2">
                            {item.technologies.slice(0, 5).map((tech, ti) => (
                              <span key={ti} className="px-2 py-0.5 text-xs font-mono text-white/50 bg-white/5 border border-white/10 rounded hover:border-primary/30 hover:text-primary transition-all">
                                {tech}
                              </span>
                            ))}
                            {item.technologies.length > 5 && (
                              <span className="px-2 py-0.5 text-xs font-mono text-white/40 bg-white/5 border border-white/10 rounded">
                                +{item.technologies.length - 5} more
                              </span>
                            )}
                          </div>
                          {item.link && (
                            <motion.a
                              href={item.link}
                              className="inline-flex items-center gap-1 mt-3 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                              whileHover={{ x: 4 }}
                            >
                              View Details
                              <Code2 className="w-3.5 h-3.5" />
                            </motion.a>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}

          {/* End of Timeline */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 * years.length }}
            className="text-center py-8"
          >
            <div className="w-12 h-12 rounded-full border-2 border-primary/30 flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-6 h-6 text-primary/50" />
            </div>
            <p className="text-white/40 text-sm font-mono">Continuously Learning & Building</p>
          </motion.div>
        </div>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 p-4 glass rounded-xl border border-white/5 text-center"
        >
          <p className="text-xs text-white/40 font-mono">
            This timeline contains factual information based on publicly available data and self-reported projects.
            No fabricated employment, clients, certifications, or awards are included.
            Specific details (company names, university) are placeholders and should be replaced with verified information.
          </p>
        </motion.div>
      </div>
    </section>
  );
}