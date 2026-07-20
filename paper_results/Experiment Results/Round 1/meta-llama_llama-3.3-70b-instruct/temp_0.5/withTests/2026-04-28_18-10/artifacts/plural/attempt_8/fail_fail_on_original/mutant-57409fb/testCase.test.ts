import plural = require('../../../../../../../../../../../subject_repositories/plural/index.js');

describe('plural function', () => {
  it('should return the singular form of a word when num is 1 and pluralize when num is undefined in the mutated code', () => {
    expect(plural('cat', 1)).toBe('cat');
    expect(plural('cat', undefined)).not.toBe('cats');
  });
});