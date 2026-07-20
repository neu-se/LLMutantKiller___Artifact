import plural = require('../../../../../../../../../../../subject_repositories/plural/index.js');

describe('plural function', () => {
  it('should return the correct plural form for a word with a count of 2', () => {
    expect(plural('test', 2)).toBe('tests');
  });
});