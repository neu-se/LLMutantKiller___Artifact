import { plural } from './index.js';

describe('plural', () => {
  it('should handle pluralization of words that end with "s"', () => {
    expect(plural('')).not.toBe('s'); // This should pass on the original code and fail on the mutated code
  });
});