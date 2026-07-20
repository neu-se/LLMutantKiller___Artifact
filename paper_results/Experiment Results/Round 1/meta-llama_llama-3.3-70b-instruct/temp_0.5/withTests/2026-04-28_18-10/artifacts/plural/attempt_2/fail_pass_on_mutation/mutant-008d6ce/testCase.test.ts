import plural = require('../../../../../../../../../../../subject_repositories/plural/index.js');

describe('plural function', () => {
  it('should return the singular form of a word when the input number is 1', () => {
    expect(plural('test', 1)).toBe('test');
  });
});