import plural = require('../../../../../../../../../subject_repositories/plural/index');

describe('plural', () => {
  it('should correctly handle the plural form of a word with a custom rule', () => {
    expect(plural('criterion')).toBe('criteria');
  });
});