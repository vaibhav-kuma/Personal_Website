'use client';

import { ArrowRight, Github, FileText, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { WebGLFallback } from '@/components/WebGLFallback';
import { ErrorBoundary } from '@/components/ErrorBoundary';

// Lazy-load the 3D canvas to improve initial page load
const HeroCanvas = dynamic(
  () => import('./HeroCanvas').then(mod => mod.HeroCanvas),
  { ssr: false, loading: () => null }
);

const HeroCanvasWithErrorBoundary = () => (
  <ErrorBoundary
    title="Hero Visualization Error"
    description="The 3D hero visualization failed to load. This may be due to WebGL compatibility or resource constraints."
  >
    <HeroCanvas />
  </ErrorBoundary>
);

export function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 3D Background with WebGL Fallback */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <WebGLFallback
          fallback={
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white/20">
                <svg className="w-24 h-24 mx-auto mb-4 opacity-30" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="16" cy="16" r="12" stroke="currentColor" stroke-width="1.5" fill="none"/>
                  <circle cx="16" cy="16" r="7" stroke="currentColor" stroke-width="1" fill="none" stroke-dasharray="4 4"/>
                  <path d="M16 8V16L20 20" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <p className="text-sm font-mono">3D Visualization</p>
                <p className="text-xs mt-1">WebGL required for interactive experience</p>
              </div>
            </div>
          }
        >
          <HeroCanvasWithErrorBoundary />
        </WebGLFallback>
      </div>

      {/* Gradient Overlay for Readability */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-background/90 via-background/70 to-background/90" />

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Name */}
          <h1 className="font-mono text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6">
            VAIBHAV KUMAR
          </h1>

          {/* Title */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-xl md:text-2xl lg:text-3xl text-white/70 font-light tracking-wide mb-8 max-w-3xl mx-auto"
          >
            Backend Developer • Cybersecurity Engineer • AI Builder
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            Building intelligent systems at the intersection of AI, cybersecurity, and backend engineering.
            Specializing in threat detection, security automation, AI agents, and distributed systems.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href="#projects"
              className="group px-8 py-4 text-base font-medium text-white bg-primary/10 border border-primary/30 rounded-lg hover:bg-primary/20 transition-all flex items-center gap-2"
            >
              View Projects
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="https://github.com/vaibhav-kuma"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 text-base font-medium text-white/70 border border-white/10 rounded-lg hover:border-white/30 hover:text-white transition-all flex items-center gap-2"
            >
              <Github className="w-5 h-5" /> GitHub
            </a>
            <a
              href="/resume.pdf"
              className="px-8 py-4 text-base font-medium text-white/70 border border-white/10 rounded-lg hover:border-white/30 hover:text-white transition-all flex items-center gap-2"
            >
              <FileText className="w-5 h-5" /> Resume
            </a>
            <a
              href="#contact"
              className="px-8 py-4 text-base font-medium text-white/70 border border-white/10 rounded-lg hover:border-white/30 hover:text-white transition-all flex items-center gap-2"
            >
              Let's Connect
              <ExternalLink className="w-5 h-5" />
            </a>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30"
          aria-hidden="true"
        >
          <span className="text-xs font-mono tracking-widest uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-6 bg-gradient-to-b from-primary to-transparent rounded-full"
          />
        </motion.div>
      </div>
    </section>
  );
}