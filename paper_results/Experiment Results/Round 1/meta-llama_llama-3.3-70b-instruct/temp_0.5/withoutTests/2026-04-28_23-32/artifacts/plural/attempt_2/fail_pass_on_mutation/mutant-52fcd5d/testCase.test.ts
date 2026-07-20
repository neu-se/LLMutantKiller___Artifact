import plural from '../../../../../../../../../../../subject_repositories/plural/index.js';

describe('plural function', () => {
  it('should handle words that end with tropic correctly', () => {
    expect(plural('tropic', 2)).toBe('tropics');
  });
});