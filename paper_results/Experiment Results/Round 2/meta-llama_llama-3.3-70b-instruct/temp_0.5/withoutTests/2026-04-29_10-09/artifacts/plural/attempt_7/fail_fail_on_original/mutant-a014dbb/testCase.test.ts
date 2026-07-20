const plural = require('../../../../../../../subject_repositories/plural/index.js');

describe('plural function', () => {
  it('should correctly pluralize "dwarf"', () => {
    const originalResult = plural('dwarf', 2);
    expect(originalResult).toBe('dwarfs');
    expect(plural(originalResult, 1)).toBe('dwarf');
  });
});