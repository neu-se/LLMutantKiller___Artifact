import plural = require('../../../../../../../../../subject_repositories/plural/index');

describe('plural', () => {
  it('should handle words that are the same both singular/plural', () => {
    expect(plural('tropic')).toBe('tropics');
    expect(plural('tropics')).toBe('tropics');
  });
});