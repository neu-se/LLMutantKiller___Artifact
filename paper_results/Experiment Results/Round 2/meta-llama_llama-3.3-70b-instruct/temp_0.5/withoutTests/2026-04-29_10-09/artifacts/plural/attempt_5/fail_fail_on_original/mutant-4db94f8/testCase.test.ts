import { plural } from './index.js';

describe('plural function', () => {
  it('should handle string rules correctly', () => {
    expect(plural('criterion', 2)).toBe('criteria');
    expect(plural('bacterium', 2)).toBe('bacteria');
    expect(plural('test', 2)).toBe('tests');
    expect(plural('cactus', 2)).toBe('cacti');
    expect(plural('person', 2)).toBe('people');
    expect(plural('child', 2)).toBe('children');
  });
});