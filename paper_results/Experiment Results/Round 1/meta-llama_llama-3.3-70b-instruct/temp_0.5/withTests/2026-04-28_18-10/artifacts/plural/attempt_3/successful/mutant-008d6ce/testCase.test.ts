import plural = require('../../../../../../../../../../../subject_repositories/plural/index.js');

describe('plural function', () => {
  it('should return the plural form of a word when the input number is not 1 and the number is not undefined', () => {
    expect(plural('test', 1)).not.toBe('tests');
    expect(plural('test', 2)).toBe('tests');
  });
});