import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useDebounce, useInView, useMediaQuery, useWebGL, useReducedMotion } from './hooks';

describe('useDebounce', () => {
  it('returns initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('initial', 500));
    expect(result.current).toBe('initial');
  });

  it('debounces value updates', () => {
    vi.useFakeTimers();
    const { result, rerender } = renderHook(({ value }) => useDebounce(value, 500), {
      initialProps: { value: 'initial' },
    });

    rerender({ value: 'updated' });
    expect(result.current).toBe('initial');

    act(() => {
      vi.advanceTimersByTime(500);
    });
    expect(result.current).toBe('updated');

    vi.useRealTimers();
  });
});

describe('useMediaQuery', () => {
  it('returns false when no match', () => {
    const { result } = renderHook(() => useMediaQuery('(max-width: 768px)'));
    expect(result.current).toBe(false);
  });
});

describe('useWebGL', () => {
  it('returns boolean or null', () => {
    const { result } = renderHook(() => useWebGL());
    expect([true, false, null]).toContain(result.current);
  });
});

describe('useReducedMotion', () => {
  it('returns boolean', () => {
    const { result } = renderHook(() => useReducedMotion());
    expect(typeof result.current).toBe('boolean');
  });
});

describe('useInView', () => {
  it('returns ref and isInView state', () => {
    const { result } = renderHook(() => useInView<HTMLDivElement>());
    expect(result.current[0]).toHaveProperty('current');
    expect(typeof result.current[1]).toBe('boolean');
  });
});