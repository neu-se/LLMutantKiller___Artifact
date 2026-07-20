import { plural } from './index.js';

describe('plural', () => {
  it('should handle pluralization of words that end with "s"', () => {
    expect(plural('jitter')).toBe('jitters');
    expect(plural('jitters')).toBe('jitters');
  });
});