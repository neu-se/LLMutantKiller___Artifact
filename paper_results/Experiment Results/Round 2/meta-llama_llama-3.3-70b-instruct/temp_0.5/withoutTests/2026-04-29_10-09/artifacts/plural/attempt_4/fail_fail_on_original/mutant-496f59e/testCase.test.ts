import { plural } from '../../../../../../../../../../../subject_repositories/plural/index.js';

describe('plural function', () => {
  it('should handle regex rules correctly', () => {
    const result1 = plural('cactus', 2);
    expect(result1).toBe('cacti');
    const result2 = plural('cactus', 2);
    expect(result2).toBe('cacti');
    expect(typeof result1).toBe('string');
    expect(typeof result2).toBe('string');
  });
});