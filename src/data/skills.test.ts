import { describe, it, expect } from 'vitest';
import { skillCategories } from './skills';

describe('skillCategories data', () => {
  it('exports an array of skill categories', () => {
    expect(Array.isArray(skillCategories)).toBe(true);
    expect(skillCategories.length).toBeGreaterThan(0);
  });

  it('each category has required fields', () => {
    skillCategories.forEach((category) => {
      expect(category).toHaveProperty('category');
      expect(category).toHaveProperty('icon');
      expect(category).toHaveProperty('color');
      expect(category).toHaveProperty('skills');
      expect(typeof category.category).toBe('string');
      expect(typeof category.color).toBe('string');
      expect(Array.isArray(category.skills)).toBe(true);
    });
  });

  it('each skill has valid proficiency between 0 and 100', () => {
    skillCategories.forEach((category) => {
      category.skills.forEach((skill) => {
        expect(skill.proficiency).toBeGreaterThanOrEqual(0);
        expect(skill.proficiency).toBeLessThanOrEqual(100);
        expect(typeof skill.name).toBe('string');
        expect(Array.isArray(skill.projects)).toBe(true);
      });
    });
  });

  it('includes core skill categories', () => {
    const categoryNames = skillCategories.map((c) => c.category);
    expect(categoryNames).toContain('Programming Languages');
    expect(categoryNames).toContain('Backend Engineering');
    expect(categoryNames).toContain('Cybersecurity');
    expect(categoryNames).toContain('AI & ML');
  });

  it('color values are valid hex codes', () => {
    const hexColorRegex = /^#[0-9A-Fa-f]{6}$/;
    skillCategories.forEach((category) => {
      expect(category.color).toMatch(hexColorRegex);
    });
  });
});