import plural = require('../../../../../../../../../../../subject_repositories/plural/index.js');

describe('plural function', () => {
  it('should return the singular form of a word when num is 1 and pluralize when num is not 1', () => {
    expect(plural('cat', 1)).toBe('cat');
    expect(plural('cat', 2)).toBe('cats');
    expect(plural('cat', undefined)).toBe('cat');
  });
});