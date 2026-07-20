import plural = require('../../../../../../../../../subject_repositories/plural/index.js');

describe('plural function', () => {
  it('should return the singular form of a word when the provided number is 1', () => {
    expect(plural('cat', 1)).toBe('cat');
    expect(plural('cat', undefined)).toBe('cats');
  });
});