'use client';

import { motion } from 'framer-motion';
import { Code, Server, Shield, Brain, Database, Cloud, Terminal } from 'lucide-react';
import dynamic from 'next/dynamic';
import { WebGLFallback } from '@/components/WebGLFallback';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { skillCategories, type SkillCategory } from '@/data/skills';

const Skills3D = dynamic(() => import('./Skills3D').then(mod => mod.Skills3D), { ssr: false });

const Skills3DWithErrorBoundary = () => (
  <ErrorBoundary
    title="Skills Visualization Error"
    description="The 3D skills constellation failed to load. The interactive 2D skills grid below provides the same information."
  >
    <Skills3D />
  </ErrorBoundary>
);

export function Skills() {
  const [hoveredSkill, setHoveredSkill] = React.useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);

  return (
    <section id="skills" className="py-24 px-6 bg-background/50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-mono tracking-widest uppercase text-primary mb-4 block">Technology Constellation</span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Technical Expertise</h2>
          <p className="text-white/50 mt-2 max-w-2xl mx-auto">
            Interactive visualization of skills organized by domain. Hover a technology to see related skills and projects.
          </p>
        </motion.div>

        {/* 3D Constellation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-16"
        >
          <WebGLFallback
            fallback={
              <div className="glass p-8 rounded-xl border border-white/5 text-center">
                <Terminal className="w-8 h-8 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">3D Technology Constellation</h3>
                <p className="text-white/50 text-sm max-w-xl mx-auto">
                  An interactive 3D visualization showing technologies as interconnected nodes.
                  Hover a node to highlight connections and related projects. Requires WebGL support.
                </p>
              </div>
            }
          >
            <Skills3DWithErrorBoundary />
          </WebGLFallback>
        </motion.div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12" role="tablist" aria-label="Skill categories">
          {skillCategories.map((cat, i) => (
            <button
              key={cat.category}
              role="tab"
              aria-selected={selectedCategory === cat.category || (!selectedCategory && i === 0)}
              onClick={() => setSelectedCategory(selectedCategory === cat.category ? null : cat.category)}
              className={`px-5 py-2 text-sm font-medium rounded-full transition-all ${
                selectedCategory === cat.category || (!selectedCategory && i === 0)
                  ? `bg-[${cat.color}]/20 border border-[${cat.color}]/40 text-[${cat.color}]`
                  : 'bg-white/5 border border-white/10 text-white/60 hover:border-white/30 hover:text-white'
              }`}
            >
              {cat.category}
            </button>
          ))}
        </div>

        {/* Skills Grid (2D Fallback & Accessible) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillCategories
              .filter((cat) => !selectedCategory || cat.category === selectedCategory)
              .map((cat) => (
                <motion.div
                  key={cat.category}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  className="glass p-6 rounded-xl border border-white/5"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-lg bg-[${cat.color}]/10 border border-[${cat.color}]/20 flex items-center justify-center">
                      <cat.icon className="w-5 h-5" style={{ color: cat.color }} />
                    </div>
                    <h3 className="font-semibold">{cat.category}</h3>
                  </div>

                  <div className="space-y-3">
                    {cat.skills.map((skill) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3 }}
                        className="group relative"
                        onMouseEnter={() => setHoveredSkill(skill.name)}
                        onMouseLeave={() => setHoveredSkill(null)}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-white/90 tech-mono">{skill.name}</span>
                          <span className="text-xs text-white/40 tech-mono">{skill.proficiency}%</span>
                        </div>
                        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full rounded-full"
                            style={{ background: `linear-gradient(90deg, ${cat.color}, ${cat.color}dd)` }}
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.proficiency}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                          />
                        </div>
                        {/* Project tags on hover */}
                        {hoveredSkill === skill.name && skill.projects.length > 0 && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="absolute bottom-full left-0 mb-2 px-3 py-2 text-xs text-white/80 bg-background/95 border border-white/10 rounded-lg shadow-lg whitespace-nowrap z-10 tech-mono"
                          >
                            Projects: {skill.projects.join(', ')}
                          </motion.div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

import React from 'react';