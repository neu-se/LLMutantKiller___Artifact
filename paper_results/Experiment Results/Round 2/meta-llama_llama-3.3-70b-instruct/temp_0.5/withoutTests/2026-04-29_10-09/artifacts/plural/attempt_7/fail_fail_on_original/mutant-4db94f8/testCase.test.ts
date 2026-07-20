import { plural } from './index.js';

describe('plural function', () => {
  it('should handle string rules correctly', () => {
    const word = 'cactus';
    expect(plural(word, 1)).toBe(word);
    expect(plural(word, 2)).toBe('cacti');
    expect(plural('child', 2)).toBe('children');
  });
});