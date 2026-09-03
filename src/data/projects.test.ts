import { describe, it, expect } from 'vitest';
import { projects, featuredProjects, secondaryProjects, getProjectBySlug } from './projects';

describe('projects data', () => {
  it('exports an array of projects', () => {
    expect(Array.isArray(projects)).toBe(true);
    expect(projects.length).toBeGreaterThan(0);
  });

  it('each project has required fields', () => {
    projects.forEach((project) => {
      expect(project).toHaveProperty('id');
      expect(project).toHaveProperty('name');
      expect(project).toHaveProperty('slug');
      expect(project).toHaveProperty('description');
      expect(project).toHaveProperty('longDescription');
      expect(project).toHaveProperty('category');
      expect(project).toHaveProperty('priority');
      expect(project).toHaveProperty('featured');
      expect(project).toHaveProperty('visualizationType');
      expect(project).toHaveProperty('technologies');
      expect(project).toHaveProperty('githubUrl');
      expect(project).toHaveProperty('updatedAt');
    });
  });

  it('all slugs are unique', () => {
    const slugs = projects.map((p) => p.slug);
    const uniqueSlugs = new Set(slugs);
    expect(uniqueSlugs.size).toBe(slugs.length);
  });

  it('all githubUrls are valid', () => {
    projects.forEach((project) => {
      expect(project.githubUrl).toMatch(/^https:\/\/github\.com\//);
    });
  });

  it('priority values are positive numbers', () => {
    projects.forEach((project) => {
      expect(project.priority).toBeGreaterThan(0);
    });
  });

  it('category values are valid', () => {
    const validCategories = ['featured', 'secondary'];
    projects.forEach((project) => {
      expect(validCategories).toContain(project.category);
    });
  });
});

describe('featuredProjects', () => {
  it('only includes featured projects', () => {
    featuredProjects.forEach((project) => {
      expect(project.featured).toBe(true);
      expect(project.category).toBe('featured');
    });
  });

  it('is sorted by priority', () => {
    for (let i = 0; i < featuredProjects.length - 1; i++) {
      expect(featuredProjects[i].priority).toBeLessThanOrEqual(featuredProjects[i + 1].priority);
    }
  });
});

describe('secondaryProjects', () => {
  it('only includes non-featured projects', () => {
    secondaryProjects.forEach((project) => {
      expect(project.featured).toBe(false);
      expect(project.category).toBe('secondary');
    });
  });

  it('is sorted by priority', () => {
    for (let i = 0; i < secondaryProjects.length - 1; i++) {
      expect(secondaryProjects[i].priority).toBeLessThanOrEqual(secondaryProjects[i + 1].priority);
    }
  });
});

describe('getProjectBySlug', () => {
  it('returns project for valid slug', () => {
    const project = getProjectBySlug('soc-platform');
    expect(project).toBeDefined();
    expect(project?.slug).toBe('soc-platform');
  });

  it('returns undefined for invalid slug', () => {
    const project = getProjectBySlug('non-existent-slug');
    expect(project).toBeUndefined();
  });
});