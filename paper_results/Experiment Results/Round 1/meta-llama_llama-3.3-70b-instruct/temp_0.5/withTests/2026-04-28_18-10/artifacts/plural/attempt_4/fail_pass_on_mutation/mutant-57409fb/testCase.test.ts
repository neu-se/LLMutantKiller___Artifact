import plural = require('../../../../../../../../../../../subject_repositories/plural/index.js');

describe('plural function', () => {
  it('should return the singular form of a word when num is 1 and undefined', () => {
    expect(plural('cat', 1)).toBe('cat');
    expect(plural('cat')).toBe('cats');
  });
});