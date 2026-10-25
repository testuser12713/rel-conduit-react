import { describe, it, expect } from 'vitest';
import { formatReadingTime } from './readingTime';

describe('formatReadingTime', () => {
  it('formats an integer reading time', () => {
    expect(formatReadingTime(3)).toBe('3 min read');
  });

  it('formats a single minute without a plural case', () => {
    expect(formatReadingTime(1)).toBe('1 min read');
  });

  it('returns null for a missing value', () => {
    expect(formatReadingTime(undefined)).toBeNull();
    expect(formatReadingTime(null)).toBeNull();
  });

  it('returns null for zero', () => {
    expect(formatReadingTime(0)).toBeNull();
  });

  it('returns null for a numeric string', () => {
    expect(formatReadingTime('3')).toBeNull();
  });

  it('returns null for a non-integer number', () => {
    expect(formatReadingTime(2.5)).toBeNull();
  });
});
