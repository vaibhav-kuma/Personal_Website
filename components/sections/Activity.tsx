'use client';

import { motion } from 'framer-motion';
import { Github, Star, GitBranch, Code2, Calendar, Clock } from 'lucide-react';

// Mock data - in production, this would come from GitHub API
const githubStats = {
  totalRepos: 47,
  totalStars: 128,
  totalForks: 34,
  totalCommits: 1247,
  primaryLanguages: [
    { name: 'Python', percentage: 42, color: '#3776AB' },
    { name: 'TypeScript', percentage: 28, color: '#3178C6' },
    { name: 'JavaScript', percentage: 15, color: '#F7DF1E' },
    { name: 'Java', percentage: 8, color: '#ED8B00' },
    { name: 'C++', percentage: 5, color: '#00599C' },
    { name: 'Rust', percentage: 2, color: '#DEA584' },
  ],
  recentActivity: [
    { repo: 'SOC_plateform', action: 'Pushed commit', description: 'Add ML-based anomaly detection module', time: '2 hours ago', type: 'commit' },
    { repo: 'legacy-lift-ai', action: 'Opened PR', description: 'Implement code generation agent with self-critique', time: '5 hours ago', type: 'pr' },
    { repo: 'VADT', action: 'Released v1.2.0', description: 'Add Splunk HEC integration and MITRE mapping', time: '1 day ago', type: 'release' },
    { repo: 'DarkExposure', action: 'Pushed commit', description: 'Improve asset graph query performance', time: '2 days ago', type: 'commit' },
    { repo: 'Threat-Detection-Monitoring-Dashboard', action: 'Merged PR', description: 'Add Grafana dashboard provisioning', time: '3 days ago', type: 'pr' },
    { repo: 'sec-automation', action: 'Created repo', description: 'Security automation scripts collection', time: '1 week ago', type: 'repo' },
  ],
  topRepositories: [
    { name: 'SOC_plateform', stars: 42, forks: 12, language: 'Python', description: 'Security Operations Center platform' },
    { name: 'legacy-lift-ai', stars: 35, forks: 8, language: 'Python', description: 'AI-powered legacy modernization' },
    { name: 'VADT', stars: 28, forks: 7, language: 'Python', description: 'Vulnerability Assessment & Detection Toolkit' },
    { name: 'DarkExposure', stars: 15, forks: 4, language: 'Python', description: 'Threat intelligence platform' },
    { name: 'Threat-Detection-Monitoring-Dashboard', stars: 8, forks: 3, language: 'Python', description: 'Observability & threat detection dashboard' },
  ],
};

export function Activity() {
  return (
    <section id="activity" className="py-24 px-6 bg-background/50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12"
        >
          <div>
            <span className="text-xs font-mono tracking-widest uppercase text-primary mb-4 block">Engineering Activity</span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">GitHub Overview</h2>
          </div>
          <a
            href="https://github.com/vaibhav-kuma"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white/70 border border-white/10 rounded-lg hover:border-white/30 hover:text-white transition-all"
          >
            <Github className="w-4 h-4" />
            View Full Profile
          </a>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
        >
          <StatCard icon={Code2} value={githubStats.totalRepos} label="Repositories" color="#00bfff" />
          <StatCard icon={Star} value={githubStats.totalStars} label="Total Stars" color="#f59e0b" />
          <StatCard icon={GitBranch} value={githubStats.totalForks} label="Total Forks" color="#8a2be2" />
          <StatCard icon={Calendar} value={githubStats.totalCommits.toLocaleString()} label="Commits (Year)" color="#50c878" />
        </motion.div>

        {/* Languages & Recent Activity */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Languages */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass p-6 rounded-xl border border-white/5"
          >
            <h3 className="font-mono text-sm font-semibold tracking-widest uppercase text-primary mb-6 flex items-center gap-2">
              <Code2 className="w-4 h-4" /> Primary Languages
            </h3>
            <div className="space-y-4">
              {githubStats.primaryLanguages.map((lang, i) => (
                <motion.div
                  key={lang.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.05 * i }}
                  className="group"
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded" style={{ backgroundColor: lang.color }} />
                      <span className="text-sm font-medium text-white/90">{lang.name}</span>
                    </div>
                    <span className="text-xs font-mono text-white/50">{lang.percentage}%</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: lang.color }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${lang.percentage}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="glass p-6 rounded-xl border border-white/5"
          >
            <h3 className="font-mono text-sm font-semibold tracking-widest uppercase text-primary mb-6 flex items-center gap-2">
              <Clock className="w-4 h-4" /> Recent Activity
            </h3>
            <div className="space-y-4">
              {githubStats.recentActivity.map((activity, i) => {
                const ActivityIcon = getActivityIcon(activity.type);
                return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.05 * i }}
                  className="flex items-start gap-3 p-3 bg-white/5 rounded-lg border border-white/5 hover:border-white/10 transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: getActivityColor(activity.type) + '20' }}>
                    <ActivityIcon className="w-4 h-4" style={{ color: getActivityColor(activity.type) }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono text-xs text-primary">{activity.repo}</span>
                      <span className="text-xs text-white/40 px-2 py-0.5 bg-white/5 rounded">{activity.action}</span>
                      <span className="text-xs text-white/30">{activity.time}</span>
                    </div>
                    <p className="text-sm text-white/60 mt-1 truncate">{activity.description}</p>
                  </div>
                </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Top Repositories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12"
        >
          <h3 className="font-mono text-sm font-semibold tracking-widest uppercase text-primary mb-6">Top Repositories</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {githubStats.topRepositories.map((repo, i) => (
              <motion.article
                key={repo.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.05 * i }}
                className="glass p-5 rounded-xl border border-white/5 hover:border-primary/30 transition-colors"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <h4 className="font-semibold truncate">{repo.name}</h4>
                  <span className="text-xs font-mono text-white/40">{repo.language}</span>
                </div>
                <p className="text-white/50 text-sm line-clamp-2 mb-4">{repo.description}</p>
                <div className="flex items-center gap-4 text-xs text-white/40">
                  <span className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5" /> {repo.stars}
                  </span>
                  <span className="flex items-center gap-1">
                    <GitBranch className="w-3.5 h-3.5" /> {repo.forks}
                  </span>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function StatCard({ icon: IconComponent, value, label, color }: { icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>; value: number | string; label: string; color: string }) {
  return (
    <div className="glass p-6 rounded-xl border border-white/5 text-center relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: `linear-gradient(to bottom right, ${color}20, transparent)` }} />
      <div className="relative z-10">
        <IconComponent className="w-8 h-8 mx-auto mb-3" style={{ color }} />
        <div className="text-3xl md:text-4xl font-bold font-mono text-white mb-1">{value}</div>
        <div className="text-xs font-mono tracking-widest uppercase text-white/50">{label}</div>
      </div>
    </div>
  );
}

function getActivityColor(type: string): string {
  switch (type) {
    case 'commit': return '#00bfff';
    case 'pr': return '#8a2be2';
    case 'release': return '#50c878';
    case 'repo': return '#f59e0b';
    default: return '#00bfff';
  }
}

function getActivityIcon(type: string) {
  switch (type) {
    case 'commit': return Code2;
    case 'pr': return Github;
    case 'release': return Star;
    case 'repo': return Code2;
    default: return Code2;
  }
}