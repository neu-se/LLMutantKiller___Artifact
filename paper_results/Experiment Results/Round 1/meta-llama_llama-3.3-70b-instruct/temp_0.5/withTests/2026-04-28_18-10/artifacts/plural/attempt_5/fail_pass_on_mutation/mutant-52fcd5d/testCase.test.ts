import plural from '../../../../../../../../../../../subject_repositories/plural/index.js';

describe('plural', () => {
  it('should handle words that are the same both singular/plural', () => {
    expect(plural('tropics')).toBe('tropics');
    expect(plural('tropic')).toBe('tropics');
  });
});