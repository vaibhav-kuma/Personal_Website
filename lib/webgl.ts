/**
 * WebGL Detection and Capability Utilities
 */

export interface WebGLCapabilities {
  webgl: boolean;
  webgl2: boolean;
  maxTextureSize: number;
  maxVertexAttribs: number;
  maxVaryingVectors: number;
  maxFragmentUniformVectors: number;
  renderer: string;
  vendor: string;
  version: string;
  shadingLanguageVersion: string;
}

export function detectWebGL(): WebGLCapabilities | null {
  if (typeof window === 'undefined') {
    return null;
  }

  const canvas = document.createElement('canvas');
  const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
  const gl2 = canvas.getContext('webgl2');

  if (!gl) {
    return {
      webgl: false,
      webgl2: false,
      maxTextureSize: 0,
      maxVertexAttribs: 0,
      maxVaryingVectors: 0,
      maxFragmentUniformVectors: 0,
      renderer: 'none',
      vendor: 'none',
      version: 'none',
      shadingLanguageVersion: 'none',
    };
  }

  const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
  const renderer = debugInfo ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) : 'unknown';
  const vendor = debugInfo ? gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL) : 'unknown';

  return {
    webgl: true,
    webgl2: !!gl2,
    maxTextureSize: gl.getParameter(gl.MAX_TEXTURE_SIZE),
    maxVertexAttribs: gl.getParameter(gl.MAX_VERTEX_ATTRIBS),
    maxVaryingVectors: gl.getParameter(gl.MAX_VARYING_VECTORS),
    maxFragmentUniformVectors: gl.getParameter(gl.MAX_FRAGMENT_UNIFORM_VECTORS),
    renderer,
    vendor,
    version: gl.getParameter(gl.VERSION),
    shadingLanguageVersion: gl.getParameter(gl.SHADING_LANGUAGE_VERSION),
  };
}

export function getRecommendedPixelRatio(): number {
  if (typeof window === 'undefined') return 1;

  const capabilities = detectWebGL();
  if (!capabilities || !capabilities.webgl) return 1;

  // Reduce pixel ratio on low-end devices
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  const isLowEnd = capabilities.maxTextureSize < 4096 || capabilities.maxVertexAttribs < 16;

  if (isMobile || isLowEnd) {
    return Math.min(window.devicePixelRatio, 1.5);
  }

  return Math.min(window.devicePixelRatio, 2);
}

export function shouldReduceComplexity(): boolean {
  if (typeof window === 'undefined') return false;

  const capabilities = detectWebGL();
  if (!capabilities || !capabilities.webgl) return true;

  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isLowEnd = capabilities.maxTextureSize < 4096 || capabilities.maxVertexAttribs < 16;

  return isMobile || prefersReducedMotion || isLowEnd;
}

export function getOptimalParticleCount(baseCount: number): number {
  const capabilities = detectWebGL();
  if (!capabilities || !capabilities.webgl) return 0;

  if (shouldReduceComplexity()) {
    return Math.floor(baseCount * 0.3);
  }

  // Scale based on GPU capability
  const textureFactor = Math.min(capabilities.maxTextureSize / 8192, 1);
  const attribFactor = Math.min(capabilities.maxVertexAttribs / 32, 1);
  const factor = Math.min(textureFactor, attribFactor);

  return Math.floor(baseCount * factor);
}