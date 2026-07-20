import plural from '../../../../../../../../../../../subject_repositories/plural/index.js';

describe('plural function', () => {
  it('should handle empty string correctly', () => {
    expect(plural('', 2)).toBe('s');
    expect(plural('tropic', 2)).toBe('tropics');
    expect(plural('', 1)).toBe('');
  });
});