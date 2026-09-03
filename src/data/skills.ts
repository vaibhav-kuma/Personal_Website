import { Code, Server, Shield, Brain, Database, Cloud } from 'lucide-react';

export interface Skill {
  name: string;
  proficiency: number;
  projects: string[];
}

export interface SkillCategory {
  category: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  color: string;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    category: 'Programming Languages',
    icon: Code,
    color: '#00bfff',
    skills: [
      { name: 'C++', proficiency: 90, projects: ['SOC_plateform', 'VADT'] },
      { name: 'Python', proficiency: 95, projects: ['SOC_plateform', 'legacy-lift-ai', 'VADT', 'DarkExposure', 'Threat-Detection-Monitoring-Dashboard'] },
      { name: 'Java', proficiency: 80, projects: ['legacy-lift-ai'] },
      { name: 'JavaScript/TypeScript', proficiency: 90, projects: ['SOC_plateform', 'legacy-lift-ai', 'VADT', 'DarkExposure', 'Threat-Detection-Monitoring-Dashboard'] },
      { name: 'Go', proficiency: 70, projects: [] },
      { name: 'Rust', proficiency: 50, projects: [] },
    ],
  },
  {
    category: 'Backend Engineering',
    icon: Server,
    color: '#8a2be2',
    skills: [
      { name: 'FastAPI', proficiency: 90, projects: ['SOC_plateform', 'VADT'] },
      { name: 'Flask', proficiency: 85, projects: ['VADT', 'DarkExposure'] },
      { name: 'Node.js', proficiency: 85, projects: ['SOC_plateform', 'legacy-lift-ai'] },
      { name: 'REST APIs', proficiency: 95, projects: ['All'] },
      { name: 'gRPC', proficiency: 75, projects: [] },
      { name: 'GraphQL', proficiency: 70, projects: [] },
    ],
  },
  {
    category: 'Cybersecurity',
    icon: Shield,
    color: '#ff6b6b',
    skills: [
      { name: 'Threat Detection', proficiency: 95, projects: ['SOC_plateform', 'VADT', 'Threat-Detection-Monitoring-Dashboard'] },
      { name: 'SIEM', proficiency: 90, projects: ['SOC_plateform', 'Threat-Detection-Monitoring-Dashboard'] },
      { name: 'EDR', proficiency: 85, projects: ['SOC_plateform'] },
      { name: 'MITRE ATT&CK', proficiency: 90, projects: ['VADT', 'SOC_plateform'] },
      { name: 'Vulnerability Assessment', proficiency: 85, projects: ['DarkExposure'] },
      { name: 'Security Automation', proficiency: 90, projects: ['SOC_plateform', 'legacy-lift-ai'] },
    ],
  },
  {
    category: 'AI & ML',
    icon: Brain,
    color: '#50c878',
    skills: [
      { name: 'Machine Learning', proficiency: 85, projects: ['legacy-lift-ai', 'SOC_plateform'] },
      { name: 'LLMs', proficiency: 90, projects: ['legacy-lift-ai'] },
      { name: 'AI Agents', proficiency: 85, projects: ['legacy-lift-ai'] },
      { name: 'RAG', proficiency: 80, projects: ['legacy-lift-ai'] },
      { name: 'AI Security', proficiency: 75, projects: [] },
      { name: 'MLOps', proficiency: 70, projects: [] },
    ],
  },
  {
    category: 'Databases & Search',
    icon: Database,
    color: '#f59e0b',
    skills: [
      { name: 'PostgreSQL', proficiency: 90, projects: ['SOC_plateform', 'legacy-lift-ai'] },
      { name: 'MongoDB', proficiency: 85, projects: ['VADT', 'DarkExposure'] },
      { name: 'Elasticsearch', proficiency: 90, projects: ['SOC_plateform', 'Threat-Detection-Monitoring-Dashboard'] },
      { name: 'Redis', proficiency: 85, projects: ['SOC_plateform', 'legacy-lift-ai'] },
      { name: 'Kafka', proficiency: 85, projects: ['SOC_plateform', 'Threat-Detection-Monitoring-Dashboard'] },
    ],
  },
  {
    category: 'Infrastructure & DevOps',
    icon: Cloud,
    color: '#ec4899',
    skills: [
      { name: 'Docker', proficiency: 95, projects: ['All'] },
      { name: 'Kubernetes', proficiency: 85, projects: ['SOC_plateform', 'legacy-lift-ai'] },
      { name: 'Prometheus/Grafana', proficiency: 85, projects: ['Threat-Detection-Monitoring-Dashboard'] },
      { name: 'CI/CD', proficiency: 90, projects: ['All'] },
      { name: 'Cloud (AWS/GCP)', proficiency: 80, projects: ['legacy-lift-ai', 'SOC_plateform'] },
      { name: 'Terraform', proficiency: 70, projects: [] },
    ],
  },
];