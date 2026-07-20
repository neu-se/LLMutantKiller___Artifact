import plural = require('../../../../../../../../../../../subject_repositories/plural/index.js');

describe('plural function', () => {
  it('should return the plural form of a word', () => {
    expect(plural('test', 1)).toBe('test');
    expect(plural('test', 2)).toBe('tests');
  });
});