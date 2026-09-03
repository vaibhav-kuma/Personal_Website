import { Shield, Brain, Network, Server, Code2 } from 'lucide-react';

export type VisualizationType = 
  | 'security-core' 
  | 'ai-engine' 
  | 'threat-radar' 
  | 'threat-network' 
  | 'monitoring-grid' 
  | 'default';

export interface VisualizationConfig {
  color: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  geometry: string;
  label: string;
}

export const visualizationConfig: Record<VisualizationType, VisualizationConfig> = {
  'security-core': {
    color: '#ff6b6b',
    icon: Shield,
    geometry: 'octahedron',
    label: 'Security Core',
  },
  'ai-engine': {
    color: '#8a2be2',
    icon: Brain,
    geometry: 'tetrahedron',
    label: 'AI Engine',
  },
  'threat-radar': {
    color: '#00bfff',
    icon: Network,
    geometry: 'cone',
    label: 'Threat Radar',
  },
  'threat-network': {
    color: '#f59e0b',
    icon: Network,
    geometry: 'icosahedron',
    label: 'Threat Network',
  },
  'monitoring-grid': {
    color: '#50c878',
    icon: Server,
    geometry: 'box',
    label: 'Monitoring Grid',
  },
  'default': {
    color: '#00bfff',
    icon: Code2,
    geometry: 'sphere',
    label: 'Project',
  },
};

export function getVisualizationConfig(type: VisualizationType): VisualizationConfig {
  return visualizationConfig[type] || visualizationConfig.default;
}

export function getProjectColor(type: VisualizationType): string {
  return getVisualizationConfig(type).color;
}

export function getProjectIcon(type: VisualizationType) {
  return getVisualizationConfig(type).icon;
}

export function getProjectGeometry(type: VisualizationType): string {
  return getVisualizationConfig(type).geometry;
}

export function getProjectLabel(type: VisualizationType): string {
  return getVisualizationConfig(type).label;
}