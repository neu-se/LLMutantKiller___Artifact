import { plural } from '../../../index.js';

describe('plural function', () => {
  it('should handle string rules correctly', () => {
    expect(plural('test', 1)).toBe('test');
    expect(plural('test', 2)).toBe('tests');
    expect(plural('cactus', 1)).toBe('cactus');
    expect(plural('cactus', 2)).toBe('cacti');
  });
});