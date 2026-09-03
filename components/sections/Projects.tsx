'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Github, ExternalLink, ChevronRight, Shield, Brain, Server, Network, Code, Code2 } from 'lucide-react';
import { featuredProjects, secondaryProjects, Project } from '@/data/projects';
import dynamic from 'next/dynamic';
import { WebGLFallback } from '@/components/WebGLFallback';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { getProjectIcon, getProjectColor, VisualizationType } from '@/data/visualization';

const Projects3D = dynamic(() => import('./Projects3D').then(mod => mod.Projects3D), { ssr: false });

const Projects3DWithErrorBoundary = () => (
  <ErrorBoundary
    title="Projects Visualization Error"
    description="The 3D projects universe failed to load. The project cards below provide full access to all case studies."
  >
    <Projects3D />
  </ErrorBoundary>
);

export function Projects() {
  return (
    <section id="projects" className="py-24 px-6 bg-background/50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-mono tracking-widest uppercase text-primary mb-4 block">Repository Universe</span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Featured Projects</h2>
          <p className="text-white/50 mt-2 max-w-2xl mx-auto">
            Selected repositories representing core expertise in cybersecurity, AI, and backend engineering.
            Each project is an interactive 3D visualization — hover to explore, click for full case study.
          </p>
        </motion.div>

        {/* 3D Universe */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <WebGLFallback
            fallback={
              <div className="relative h-[500px] md:h-[600px] glass rounded-2xl border border-white/5 flex items-center justify-center">
                <div className="text-center text-white/30">
                  <Network className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p className="text-lg font-mono">3D Repository Universe</p>
                  <p className="text-sm mt-2 max-w-md mx-auto">
                    Interactive WebGL visualization showing projects as interconnected nodes in a digital ecosystem.
                    Requires WebGL support.
                  </p>
                </div>
              </div>
            }
          >
            <Projects3DWithErrorBoundary />
          </WebGLFallback>
        </motion.div>

        {/* Featured Projects Grid (2D Fallback & Accessible) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h3 className="font-mono text-sm font-semibold tracking-widest uppercase text-primary mb-8 flex items-center gap-2">
            <Shield className="w-4 h-4" /> Featured Engineering Work
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </motion.div>

        {/* Secondary Projects */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-24"
        >
          <h3 className="font-mono text-sm font-semibold tracking-widest uppercase text-secondary mb-8 flex items-center gap-2">
            <Code className="w-4 h-4" /> Additional Repositories
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {secondaryProjects.map((project, index) => (
              <SecondaryProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>

          <div className="text-center mt-8">
            <a
              href="https://github.com/vaibhav-kuma"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-white/70 border border-white/10 rounded-lg hover:border-white/30 hover:text-white transition-all"
            >
              View All on GitHub
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const Icon = getProjectIcon(project.visualizationType as VisualizationType);
  const projectColor = getProjectColor(project.visualizationType as VisualizationType);

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: 0.1 * index }}
      className="glass p-6 rounded-xl border border-white/5 hover:border-primary/30 transition-all group relative overflow-hidden"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter') window.location.href = `/projects/${project.slug}`; }}
      role="button"
      aria-label={`View ${project.name} case study`}
    >
      {/* Visualization Type Indicator */}
      <div className="absolute top-4 right-4 w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <Icon className="w-5 h-5 text-primary" />
      </div>

      <div className="flex items-start gap-3 mb-4">
        <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-lg truncate">{project.name}</h4>
          <span className="text-xs font-mono text-primary/70">{project.id}</span>
        </div>
      </div>

      <p className="text-white/60 text-sm leading-relaxed mb-4 line-clamp-3">{project.description}</p>

      {/* Tech Stack */}
      <div className="flex flex-wrap gap-2 mb-4">
        {project.technologies.slice(0, 6).map((tech) => (
          <span
            key={tech}
            className="px-2 py-1 text-xs font-mono text-white/50 bg-white/5 border border-white/10 rounded hover:border-primary/30 hover:text-primary transition-all"
          >
            {tech}
          </span>
        ))}
        {project.technologies.length > 6 && (
          <span className="px-2 py-1 text-xs font-mono text-white/40 bg-white/5 border border-white/10 rounded">
            +{project.technologies.length - 6} more
          </span>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 pt-4 border-t border-white/5">
        <Link
          href={`/projects/${project.slug}`}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-primary/10 border border-primary/30 rounded-lg hover:bg-primary/20 transition-all group"
        >
          Case Study
          <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 text-white/50 hover:text-primary transition-colors"
          aria-label={`View ${project.name} on GitHub`}
        >
          <Github className="w-5 h-5" />
        </a>
      </div>
    </motion.article>
  );
}

function SecondaryProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: 0.05 * index }}
      className="glass p-4 rounded-lg border border-white/5 hover:border-white/10 transition-all group"
    >
      <div className="flex items-start gap-3 mb-3">
        <div className="w-10 h-10 rounded-lg bg-secondary/10 border border-secondary/20 flex items-center justify-center flex-shrink-0">
          <Code className="w-5 h-5 text-secondary" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-medium truncate">{project.name}</h4>
          <span className="text-xs font-mono text-secondary/70">{project.language}</span>
        </div>
      </div>
      <p className="text-white/50 text-sm line-clamp-2 mb-3">{project.description}</p>
      <div className="flex items-center gap-2 flex-wrap">
        {project.technologies.slice(0, 4).map((tech) => (
          <span key={tech} className="px-2 py-0.5 text-xs font-mono text-white/40 bg-white/5 border border-white/10 rounded">
            {tech}
          </span>
        ))}
      </div>
      <div className="flex items-center gap-2 mt-3 pt-3 border-t border-white/5">
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-medium text-white/50 hover:text-primary transition-colors flex items-center gap-1"
        >
          <Github className="w-3.5 h-3.5" /> Code
        </a>
      </div>
    </motion.article>
  );
}