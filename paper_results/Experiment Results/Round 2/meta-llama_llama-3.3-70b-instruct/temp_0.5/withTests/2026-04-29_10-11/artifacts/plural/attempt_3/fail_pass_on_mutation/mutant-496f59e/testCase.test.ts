import plural = require('../../../../../../../../../../../subject_repositories/plural/index.js');

describe('plural function', () => {
  it('should correctly handle words with a regex rule', () => {
    expect(plural('city')).toBe('cities');
  });
});