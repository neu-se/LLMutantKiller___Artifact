import plural from '../../../../../../../../../../../subject_repositories/plural/index.js';

describe('plural function', () => {
  it('should handle words that end with tropic correctly', () => {
    expect(plural('tropic', 1)).toBe('tropic');
    expect(plural('tropic', 2)).toBe('tropics');
    expect(plural('tropics', 1)).toBe('tropics');
    expect(plural('tropics', 2)).toBe('tropics');
  });
});