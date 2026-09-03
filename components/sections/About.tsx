'use client';

import { motion } from 'framer-motion';
import { Code, Shield, Brain, Server, Terminal, User } from 'lucide-react';

const profile = {
  name: 'Vaibhav Kumar',
  title: 'Backend Developer • Cybersecurity Engineer • AI Builder',
  location: 'India',
  email: 'vaibhavkumar26412@gmail.com',
  github: 'https://github.com/vaibhav-kuma',
  linkedin: 'https://www.linkedin.com/in/vaibhav-kumar-a19a81232',
  phone: '+91 9259411659',
  bio: `I'm a software engineer specializing in building intelligent, secure, and scalable backend systems. My work sits at the intersection of cybersecurity, artificial intelligence, and distributed systems engineering.

I design and implement threat detection platforms, security automation frameworks, AI-powered modernization tools, and high-performance backend services. My approach combines deep technical expertise with a security-first mindset.`,

  domains: [
    { icon: Shield, label: 'Cybersecurity', desc: 'Threat detection, SIEM, EDR, MITRE ATT&CK, vulnerability assessment, security automation' },
    { icon: Brain, label: 'AI & ML', desc: 'LLMs, AI agents, RAG, machine learning pipelines, AI security, model deployment' },
    { icon: Server, label: 'Backend Engineering', desc: 'Distributed systems, microservices, REST/gRPC, message queues, databases, observability' },
    { icon: Code, label: 'Languages', desc: 'C++, Python, Java, JavaScript/TypeScript, Go, Rust (learning)' },
  ],

  interests: [
    'Security Operations & Automation',
    'AI Agent Architectures',
    'Legacy System Modernization',
    'Threat Intelligence Platforms',
    'Observability & Monitoring',
    'Secure Software Supply Chain',
  ],

  specializations: [
    'Security Operations Center (SOC) Platforms',
    'AI-Powered Code Transformation',
    'Real-time Threat Detection',
    'Security Data Pipelines',
    'Cloud-Native Security',
    'DevSecOps Integration',
  ],
};

export function About() {
  return (
    <section id="about" className="py-24 px-6 bg-background/50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-mono tracking-widest uppercase text-primary mb-4 block">Engineering Profile</span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Technical Identity</h2>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-1 space-y-6"
          >
            <div className="glass p-6 rounded-xl border border-white/5">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/30 flex items-center justify-center">
                  <User className="w-10 h-10 text-primary" />
                </div>
                <div>
                  <h3 className="font-mono text-lg font-semibold">{profile.name}</h3>
                  <p className="text-sm text-white/50">{profile.title}</p>
                </div>
              </div>

              <p className="text-white/70 text-sm leading-relaxed mb-6">{profile.bio}</p>

              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3 text-white/50">
                  <Terminal className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="font-mono">{profile.location}</span>
                </div>
                <div className="flex items-center gap-3 text-white/50">
                  <Terminal className="w-4 h-4 text-primary flex-shrink-0" />
                  <a href={`mailto:${profile.email}`} className="hover:text-primary transition-colors font-mono">{profile.email}</a>
                </div>
              </div>
            </div>

            {/* Specializations */}
            <div className="glass p-6 rounded-xl border border-white/5">
              <h4 className="font-mono text-sm font-semibold mb-4 flex items-center gap-2">
                <Code className="w-4 h-4" /> Specializations
              </h4>
              <ul className="space-y-2">
                {profile.specializations.map((spec, i) => (
                  <li key={i} className="text-sm text-white/60 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/50" />
                    {spec}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Domains */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 space-y-4"
          >
            <h3 className="font-mono text-sm font-semibold tracking-widest uppercase text-primary mb-6">Primary Technical Domains</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {profile.domains.map((domain, i) => (
                <motion.div
                  key={domain.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 * i }}
                  className="glass p-6 rounded-xl border border-white/5 hover:border-primary/30 transition-colors group"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <domain.icon className="w-5 h-5 text-primary" />
                    </div>
                    <h4 className="font-semibold">{domain.label}</h4>
                  </div>
                  <p className="text-sm text-white/60 leading-relaxed">{domain.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Interests */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16"
        >
          <h3 className="font-mono text-sm font-semibold tracking-widest uppercase text-primary mb-6">Engineering Interests</h3>
          <div className="flex flex-wrap gap-3">
            {profile.interests.map((interest, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.05 * i }}
                className="px-4 py-2 text-sm font-medium text-white/70 bg-white/5 border border-white/10 rounded-full hover:border-primary/30 hover:text-primary transition-all cursor-default"
              >
                {interest}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}