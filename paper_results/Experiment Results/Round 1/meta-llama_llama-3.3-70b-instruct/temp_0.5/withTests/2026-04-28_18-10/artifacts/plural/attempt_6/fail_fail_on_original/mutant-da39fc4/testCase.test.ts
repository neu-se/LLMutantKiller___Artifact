const plural = require('../../../../../../../../../subject_repositories/plural/index');

describe('plural function', () => {
  it('should correctly pluralize "wolf"', () => {
    expect(plural('wolf')).toBe('wolves');
  });
});