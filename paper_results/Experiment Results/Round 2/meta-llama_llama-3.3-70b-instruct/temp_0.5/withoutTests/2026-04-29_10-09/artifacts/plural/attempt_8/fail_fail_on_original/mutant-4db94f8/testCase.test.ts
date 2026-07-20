import { plural } from '../../../../../../../../subject_repositories/plural/index.js';

describe('plural function', () => {
  it('should handle string rules correctly', () => {
    expect(plural('cactus', 2)).toBe('cacti');
    expect(plural('child', 2)).toBe('children');
    expect(plural('foot', 2)).toBe('feet');
    expect(plural('tooth', 2)).toBe('teeth');
    expect(plural('man', 2)).toBe('men');
    expect(plural('woman', 2)).toBe('women');
    expect(plural('criterion', 2)).toBe('criteria');
  });
});