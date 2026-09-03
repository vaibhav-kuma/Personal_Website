import { describe, it, expect } from 'vitest';
import {
  visualizationConfig,
  getVisualizationConfig,
  getProjectColor,
  getProjectIcon,
  getProjectGeometry,
  getProjectLabel,
} from './visualization';
import { Shield, Brain, Network, Server, Code2 } from 'lucide-react';

describe('visualizationConfig', () => {
  it('exports config for all visualization types', () => {
    expect(visualizationConfig['security-core']).toBeDefined();
    expect(visualizationConfig['ai-engine']).toBeDefined();
    expect(visualizationConfig['threat-radar']).toBeDefined();
    expect(visualizationConfig['threat-network']).toBeDefined();
    expect(visualizationConfig['monitoring-grid']).toBeDefined();
    expect(visualizationConfig['default']).toBeDefined();
  });

  it('each config has required fields', () => {
    Object.values(visualizationConfig).forEach((config) => {
      expect(config).toHaveProperty('color');
      expect(config).toHaveProperty('icon');
      expect(config).toHaveProperty('geometry');
      expect(config).toHaveProperty('label');
    });
  });

  it('all colors are valid hex codes', () => {
    const hexColorRegex = /^#[0-9A-Fa-f]{6}$/;
    Object.values(visualizationConfig).forEach((config) => {
      expect(config.color).toMatch(hexColorRegex);
    });
  });
});

describe('getVisualizationConfig', () => {
  it('returns config for valid type', () => {
    const config = getVisualizationConfig('security-core');
    expect(config.color).toBe('#ff6b6b');
    expect(config.icon).toBe(Shield);
  });

  it('returns default config for unknown type', () => {
    const config = getVisualizationConfig('unknown' as never);
    expect(config).toEqual(visualizationConfig.default);
  });
});

describe('getProjectColor', () => {
  it('returns correct color for security-core', () => {
    expect(getProjectColor('security-core')).toBe('#ff6b6b');
  });

  it('returns correct color for ai-engine', () => {
    expect(getProjectColor('ai-engine')).toBe('#8a2be2');
  });

  it('returns default color for unknown type', () => {
    expect(getProjectColor('unknown' as never)).toBe('#00bfff');
  });
});

describe('getProjectIcon', () => {
  it('returns correct icon for security-core', () => {
    expect(getProjectIcon('security-core')).toBe(Shield);
  });

  it('returns correct icon for ai-engine', () => {
    expect(getProjectIcon('ai-engine')).toBe(Brain);
  });

  it('returns default icon for unknown type', () => {
    expect(getProjectIcon('unknown' as never)).toBe(Code2);
  });
});

describe('getProjectGeometry', () => {
  it('returns correct geometry for each type', () => {
    expect(getProjectGeometry('security-core')).toBe('octahedron');
    expect(getProjectGeometry('ai-engine')).toBe('tetrahedron');
    expect(getProjectGeometry('threat-radar')).toBe('cone');
    expect(getProjectGeometry('threat-network')).toBe('icosahedron');
    expect(getProjectGeometry('monitoring-grid')).toBe('box');
  });
});

describe('getProjectLabel', () => {
  it('returns correct label for each type', () => {
    expect(getProjectLabel('security-core')).toBe('Security Core');
    expect(getProjectLabel('ai-engine')).toBe('AI Engine');
    expect(getProjectLabel('threat-radar')).toBe('Threat Radar');
    expect(getProjectLabel('threat-network')).toBe('Threat Network');
    expect(getProjectLabel('monitoring-grid')).toBe('Monitoring Grid');
  });
});