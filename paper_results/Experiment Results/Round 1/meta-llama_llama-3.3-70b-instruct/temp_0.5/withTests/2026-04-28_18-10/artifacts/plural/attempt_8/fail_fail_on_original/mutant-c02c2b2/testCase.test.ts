const plural = require('../../../../subject_repositories/plural/index.js');

describe('plural function', () => {
  it('should return the singular form when the input number is 1 and plural form when the input number is not 1', () => {
    expect(plural('test', 1)).toBe('test');
    expect(plural('test', 2)).toBe('tests');
    expect(plural('test', undefined)).toBe('tests');
  });
});