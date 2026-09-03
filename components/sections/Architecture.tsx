'use client';

import { motion } from 'framer-motion';
import { Server, Database, Globe, Cpu, ArrowRight, Layers, Shield, Brain, HardDrive, Network } from 'lucide-react';
import dynamic from 'next/dynamic';
import { WebGLFallback } from '@/components/WebGLFallback';
import { ErrorBoundary } from '@/components/ErrorBoundary';

const Architecture3D = dynamic(() => import('./Architecture3D').then(mod => mod.Architecture3D), { ssr: false });

const Architecture3DWithErrorBoundary = () => (
  <ErrorBoundary
    title="Architecture Visualization Error"
    description="The 3D architecture graph failed to load. The layered 2D diagram below provides the complete architecture overview."
  >
    <Architecture3D />
  </ErrorBoundary>
);

const architectureLayers = [
  {
    id: 'client',
    label: 'Client Layer',
    icon: Globe,
    color: '#00bfff',
    components: ['Web App (React)', 'Mobile Apps', 'CLI Tools', 'API Consumers'],
    description: 'User-facing interfaces and external API consumers',
  },
  {
    id: 'edge',
    label: 'Edge & Gateway',
    icon: Shield,
    color: '#8a2be2',
    components: ['API Gateway (Kong/Envoy)', 'WAF / Rate Limiting', 'Auth (OAuth2/OIDC)', 'Load Balancer'],
    description: 'Traffic ingress, authentication, protection, and routing',
  },
  {
    id: 'services',
    label: 'Backend Services',
    icon: Server,
    color: '#50c878',
    components: ['API Services (FastAPI/Node.js)', 'Business Logic Services', 'Domain Services', 'GraphQL Federation'],
    description: 'Core application logic, domain boundaries, service mesh',
  },
  {
    id: 'intelligence',
    label: 'Intelligence Engine',
    icon: Brain,
    color: '#f59e0b',
    components: ['ML Inference Service', 'Detection Engine', 'AI Agent Orchestrator', 'RAG Pipeline', 'Feature Store'],
    description: 'AI/ML models, threat detection, agent workflows, embeddings',
  },
  {
    id: 'messaging',
    label: 'Event & Message Bus',
    icon: Network,
    color: '#ec4899',
    components: ['Kafka / Redpanda', 'Redis Streams', 'NATS', 'Event Schemas (Avro/Protobuf)'],
    description: 'Async communication, event sourcing, stream processing',
  },
  {
    id: 'data',
    label: 'Data Layer',
    icon: Database,
    color: '#00bfff',
    components: ['PostgreSQL (Primary)', 'Elasticsearch (Search/Logs)', 'Redis (Cache/Session)', 'MongoDB (Documents)', 'TimescaleDB (Metrics)'],
    description: 'Polyglot persistence for different access patterns',
  },
  {
    id: 'observability',
    label: 'Observability & Security',
    icon: Layers,
    color: '#8a2be2',
    components: ['Prometheus + Grafana', 'ELK / OpenSearch', 'Jaeger / Tempo', 'Alertmanager', 'SIEM Integration'],
    description: 'Metrics, logs, traces, alerts, and security monitoring',
  },
];

const dataFlows = [
  { from: 'client', to: 'edge', label: 'HTTPS / gRPC' },
  { from: 'edge', to: 'services', label: 'Authenticated Requests' },
  { from: 'services', to: 'intelligence', label: 'Async Inference Jobs' },
  { from: 'services', to: 'messaging', label: 'Domain Events' },
  { from: 'services', to: 'data', label: 'CRUD / Queries' },
  { from: 'intelligence', to: 'messaging', label: 'Detection Events' },
  { from: 'messaging', to: 'data', label: 'Event Persistence' },
  { from: 'messaging', to: 'observability', label: 'Metrics / Logs / Traces' },
  { from: 'data', to: 'observability', label: 'Log Shipping' },
];

export function Architecture() {
  return (
    <section id="architecture" className="py-24 px-6 bg-background/50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-mono tracking-widest uppercase text-primary mb-4 block">How I Build Systems</span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">System Architecture</h2>
          <p className="text-white/50 mt-2 max-w-2xl mx-auto">
            A representative architecture for modern distributed applications combining backend services,
            AI intelligence, event-driven messaging, and comprehensive observability.
          </p>
        </motion.div>

        {/* 3D Architecture Graph */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-16"
        >
          <WebGLFallback
            fallback={
              <div className="relative h-[500px] md:h-[600px] glass rounded-2xl border border-white/5 flex items-center justify-center">
                <div className="text-center text-white/30">
                  <Layers className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p className="text-lg font-mono">3D Architecture Graph</p>
                  <p className="text-sm mt-2 max-w-md mx-auto">
                    Animated 3D visualization showing data flowing through architecture layers.
                    Nodes represent services, edges show communication patterns. Requires WebGL support.
                  </p>
                </div>
              </div>
            }
          >
            <Architecture3DWithErrorBoundary />
          </WebGLFallback>
        </motion.div>

        {/* Architecture Diagram - 2D Representation (Accessible Fallback) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <h3 className="font-mono text-sm font-semibold tracking-widest uppercase text-primary mb-8 text-center">
            Layered Architecture Overview
          </h3>
          <div className="relative">
            {/* Layers */}
            <div className="space-y-4">
              {architectureLayers.map((layer, index) => (
                <motion.div
                  key={layer.id}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 * index }}
                  className="relative"
                >
                  <div className="flex items-center gap-4">
                    {/* Layer Box */}
                    <div className="flex-1 glass p-4 rounded-xl border border-white/5 relative overflow-hidden group">
                      {/* Left accent bar */}
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b" style={{ background: `linear-gradient(to bottom, ${layer.color}, ${layer.color}88)` }} />
                      
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${layer.color}20`, borderColor: `${layer.color}40` }}>
                          <layer.icon className="w-6 h-6" style={{ color: layer.color }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold text-lg">{layer.label}</h3>
                            <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-white/50">
                              Layer {index + 1}
                            </span>
                          </div>
                          <p className="text-white/50 text-sm mb-3">{layer.description}</p>
                          <div className="flex flex-wrap gap-2">
                            {layer.components.map((comp, i) => (
                              <span
                                key={i}
                                className="px-3 py-1 text-xs font-mono text-white/70 bg-white/5 border border-white/10 rounded hover:border-primary/30 hover:text-primary transition-all"
                              >
                                {comp}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Flow Arrow */}
                    {index < architectureLayers.length - 1 && (
                      <motion.div
                        className="w-8 flex items-center justify-center text-primary/50"
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                      >
                        <ArrowRight className="w-6 h-6" />
                      </motion.div>
                    )}
                  </div>

                  {/* Data Flow Labels */}
                  {dataFlows.filter(f => f.from === layer.id).map((flow, fi) => (
                    <motion.div
                      key={flow.to}
                      initial={{ opacity: 0, y: -10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.1 * index + 0.05 * fi }}
                      className="ml-16 mt-2 text-xs font-mono text-primary/60 flex items-center gap-1"
                    >
                      <span className="w-4 h-4 rounded-full" style={{ backgroundColor: layer.color }} />
                      {flow.label} → {architectureLayers.find(l => l.id === flow.to)?.label}
                    </motion.div>
                  ))}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Key Architectural Decisions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {[
            {
              title: 'Event-Driven Core',
              desc: 'Kafka as the central nervous system enables loose coupling, replayability, and horizontal scalability across services.',
              icon: Network,
              color: '#ec4899',
            },
            {
              title: 'Polyglot Persistence',
              desc: 'Each service uses the optimal data store: PostgreSQL for ACID, Elasticsearch for search/logs, Redis for speed, TimescaleDB for metrics.',
              icon: Database,
              color: '#00bfff',
            },
            {
              title: 'AI as a Service',
              desc: 'ML models and AI agents run as independent services with versioned APIs, feature stores, and automated retraining pipelines.',
              icon: Brain,
              color: '#f59e0b',
            },
            {
              title: 'Security by Default',
              desc: 'Zero-trust networking, mTLS between services, centralized auth at gateway, audit logging on all mutating operations.',
              icon: Shield,
              color: '#ff6b6b',
            },
            {
              title: 'Observability First',
              desc: 'OpenTelemetry instrumentation everywhere. Unified metrics (Prometheus), logs (ELK), traces (Tempo) with correlated dashboards.',
              icon: Layers,
              color: '#8a2be2',
            },
            {
              title: 'GitOps Deployment',
              desc: 'ArgoCD / Flux for continuous deployment. Infrastructure as Code (Terraform). Progressive delivery with canary analysis.',
              icon: Cpu,
              color: '#50c878',
            },
          ].map((decision, i) => (
            <motion.div
              key={decision.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 * i }}
              className="glass p-6 rounded-xl border border-white/5 hover:border-primary/30 transition-colors"
            >
              <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4" style={{ background: `${decision.color}20` }}>
                <decision.icon className="w-5 h-5" style={{ color: decision.color }} />
              </div>
              <h4 className="font-semibold mb-2">{decision.title}</h4>
              <p className="text-white/60 text-sm leading-relaxed">{decision.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}