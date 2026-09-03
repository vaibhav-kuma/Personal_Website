'use client';

import { Component, ReactNode, ErrorInfo } from 'react';
import { AlertTriangle, RefreshCw, Cpu } from 'lucide-react';
import { motion } from 'framer-motion';

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  title?: string;
  description?: string;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ error, errorInfo });
    this.props.onError?.(error, errorInfo);
    
    if (process.env.NODE_ENV === 'development') {
      console.error('[ErrorBoundary] Caught error:', error);
      console.error('[ErrorBoundary] Component stack:', errorInfo.componentStack);
    }
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass p-8 rounded-xl border border-white/5 text-center"
          role="alert"
        >
          <div className="w-16 h-16 mx-auto mb-4 bg-red-500/20 border border-red-500/30 rounded-full flex items-center justify-center">
            <AlertTriangle className="w-8 h-8 text-red-400" />
          </div>
          <h3 className="text-lg font-semibold mb-2">
            {this.props.title || '3D Visualization Error'}
          </h3>
          <p className="text-white/60 text-sm mb-6 max-w-md mx-auto">
            {this.props.description || 'The interactive 3D visualization encountered an error and could not load. The 2D fallback content is available below.'}
          </p>
          
          {process.env.NODE_ENV === 'development' && this.state.error && (
            <details className="text-left max-w-md mx-auto mb-4 p-3 bg-black/30 rounded text-xs font-mono text-red-300">
              <summary className="cursor-pointer mb-2">Error Details (Development)</summary>
              <pre className="whitespace-pre-wrap overflow-auto max-h-40">{this.state.error.message}</pre>
              {this.state.errorInfo?.componentStack && (
                <pre className="whitespace-pre-wrap overflow-auto max-h-40 mt-2 text-white/40">{this.state.errorInfo.componentStack}</pre>
              )}
            </details>
          )}

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={this.handleRetry}
              className="px-5 py-2.5 text-sm font-medium text-white bg-primary/10 border border-primary/30 rounded-lg hover:bg-primary/20 transition-all flex items-center gap-2 mx-auto"
            >
              <RefreshCw className="w-4 h-4" />
              Try Again
            </button>
            <button
              onClick={() => window.location.reload()}
              className="px-5 py-2.5 text-sm font-medium text-white/70 border border-white/10 rounded-lg hover:border-white/30 hover:text-white transition-all flex items-center gap-2 mx-auto"
            >
              <Cpu className="w-4 h-4" />
              Reload Page
            </button>
          </div>
        </motion.div>
      );
    }

    return this.props.children;
  }
}

export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  errorBoundaryProps?: Omit<ErrorBoundaryProps, 'children'>
) {
  return function WithErrorBoundary(props: P) {
    return (
      <ErrorBoundary {...errorBoundaryProps}>
        <Component {...props} />
      </ErrorBoundary>
    );
  };
}