import { describe, it, expect } from 'vitest';
import { formatDate, formatRelativeTime, truncate, slugify, cn, debounce, throttle, getInitials, calculateReadingTime } from './utils';

describe('formatDate', () => {
  it('formats date string to readable format', () => {
    const result = formatDate('2024-01-15');
    expect(result).toContain('2024');
    expect(result).toContain('Jan');
    expect(result).toContain('15');
  });

  it('accepts custom options', () => {
    const result = formatDate('2024-01-15', { year: 'numeric', month: 'long' });
    expect(result).toContain('2024');
    expect(result).toContain('January');
  });
});

describe('formatRelativeTime', () => {
  it('returns "just now" for very recent dates', () => {
    const now = new Date();
    expect(formatRelativeTime(now.toISOString())).toBe('just now');
  });

  it('returns minutes ago', () => {
    const fiveMinAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString();
    expect(formatRelativeTime(fiveMinAgo)).toBe('5m ago');
  });

  it('returns hours ago', () => {
    const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString();
    expect(formatRelativeTime(twoHoursAgo)).toBe('2h ago');
  });

  it('returns days ago', () => {
    const threeDaysAgo = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString();
    expect(formatRelativeTime(threeDaysAgo)).toBe('3d ago');
  });

  it('returns weeks ago', () => {
    const twoWeeksAgo = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString();
    expect(formatRelativeTime(twoWeeksAgo)).toBe('2w ago');
  });
});

describe('truncate', () => {
  it('returns short text unchanged', () => {
    expect(truncate('hello', 10)).toBe('hello');
  });

  it('truncates long text with ellipsis', () => {
    expect(truncate('hello world', 8)).toBe('hello...');
  });

  it('handles exact length', () => {
    expect(truncate('hello', 5)).toBe('hello');
  });
});

describe('slugify', () => {
  it('converts string to slug', () => {
    expect(slugify('Hello World')).toBe('hello-world');
  });

  it('removes special characters', () => {
    expect(slugify('Hello, World!')).toBe('hello-world');
  });

  it('handles multiple spaces and hyphens', () => {
    expect(slugify('hello   world---test')).toBe('hello-world-test');
  });

  it('trims leading/trailing hyphens', () => {
    expect(slugify('---hello world---')).toBe('hello-world');
  });
});

describe('cn (className utility)', () => {
  it('combines string classes', () => {
    expect(cn('foo', 'bar')).toBe('foo bar');
  });

  it('filters out falsy values', () => {
    expect(cn('foo', false, 'bar', undefined, null)).toBe('foo bar');
  });

  it('handles object input', () => {
    expect(cn('foo', { bar: true, baz: false })).toBe('foo bar');
  });

  it('handles mixed input', () => {
    expect(cn('foo', { bar: true }, null, 'baz', { qux: true })).toBe('foo bar baz qux');
  });
});

describe('debounce', () => {
  it('delays function execution', () => {
    let count = 0;
    const increment = debounce(() => { count++; }, 50);
    increment();
    increment();
    increment();
    expect(count).toBe(0);
  });
});

describe('throttle', () => {
  it('limits function calls', () => {
    let count = 0;
    const increment = throttle(() => { count++; }, 50);
    increment();
    increment();
    increment();
    expect(count).toBeGreaterThanOrEqual(1);
  });
});

describe('getInitials', () => {
  it('returns initials from full name', () => {
    expect(getInitials('Vaibhav Kumar')).toBe('VK');
  });

  it('handles single name', () => {
    expect(getInitials('Vaibhav')).toBe('V');
  });

  it('handles multiple names', () => {
    expect(getInitials('John Ronald Reuel Tolkien')).toBe('JR');
  });
});

describe('calculateReadingTime', () => {
  it('calculates reading time for text', () => {
    const text = 'word '.repeat(400);
    const minutes = calculateReadingTime(text, 200);
    expect(minutes).toBe(2);
  });

  it('returns 1 minute for short text', () => {
    const text = 'word '.repeat(50);
    const minutes = calculateReadingTime(text, 200);
    expect(minutes).toBe(1);
  });

  it('handles empty text', () => {
    expect(calculateReadingTime('')).toBe(0);
  });
});