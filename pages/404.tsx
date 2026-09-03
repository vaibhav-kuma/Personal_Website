import { motion } from 'framer-motion';
import Link from 'next/link';
import { Home, Search, Github } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6">
      <div className="text-center max-w-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <span className="font-mono text-8xl md:text-9xl font-bold text-primary/20">404</span>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold mb-4"
        >
          Page Not Found
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-white/50 mb-8 max-w-sm mx-auto"
        >
          The page you're looking for doesn't exist or has been moved. Let's get you back on track.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/"
            className="px-6 py-3 text-base font-medium text-white bg-primary/10 border border-primary/30 rounded-lg hover:bg-primary/20 transition-all flex items-center gap-2"
          >
            <Home className="w-5 h-5" /> Home
          </Link>
          <Link
            href="/#projects"
            className="px-6 py-3 text-base font-medium text-white/70 border border-white/10 rounded-lg hover:border-white/30 hover:text-white transition-all flex items-center gap-2"
          >
            <Github className="w-5 h-5" /> Projects
          </Link>
        </motion.div>
      </div>
    </div>
  );
}