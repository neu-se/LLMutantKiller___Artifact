import plural from '../../../../../../../../../../../subject_repositories/plural/index.js';

describe('plural function', () => {
  it('should handle words that end with "tropic" and have a specific rule for "tropic" and empty string in misc array correctly', () => {
    expect(plural('tropic', 2)).toBe('tropics');
    expect(plural('tropic', 1)).toBe('tropic');
    expect(plural('odd', 2)).toBe('odds');
    expect(plural('odd', 1)).toBe('odd');
    expect(plural('tropics', 2)).toBe('tropics');
    expect(plural('tropics', 1)).toBe('tropics');
    expect(plural('', 2)).not.toBe('');
  });
});