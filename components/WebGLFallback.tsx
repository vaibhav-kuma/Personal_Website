'use client';

import { motion } from 'framer-motion';
import { Cpu, AlertTriangle, Info } from 'lucide-react';

interface WebGLFallbackProps {
  children: React.ReactNode;
  fallback: React.ReactNode;
  title?: string;
  description?: string;
}

export function WebGLFallback({
  children,
  fallback,
  title = 'WebGL Not Available',
  description = 'This interactive 3D visualization requires WebGL support. Showing alternative 2D representation.',
}: WebGLFallbackProps) {
  const [webglSupported, setWebglSupported] = React.useState<boolean | null>(null);

  React.useEffect(() => {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    setWebglSupported(!!gl);
  }, []);

  if (webglSupported === null) {
    return <div className="animate-pulse">{children}</div>;
  }

  if (!webglSupported) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="glass p-8 rounded-xl border border-white/5 text-center"
        role="alert"
      >
        <div className="w-16 h-16 mx-auto mb-4 bg-yellow-500/20 border border-yellow-500/30 rounded-full flex items-center justify-center">
          <AlertTriangle className="w-8 h-8 text-yellow-400" />
        </div>
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-white/60 text-sm mb-6 max-w-md mx-auto">{description}</p>
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white/70">
          <Info className="w-4 h-4" />
          <span>Your browser or device doesn't support WebGL. The 2D fallback provides the same information.</span>
        </div>
        {fallback}
      </motion.div>
    );
  }

  return <>{children}</>;
}

// Client-side only component for checking reduced motion
export function ReducedMotionWrapper({
  children,
  fallback,
}: {
  children: React.ReactNode;
  fallback: React.ReactNode;
}) {
  const [prefersReduced, setPrefersReduced] = React.useState(false);

  React.useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReduced(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return prefersReduced ? <>{fallback}</> : <>{children}</>;
}

import React from 'react';