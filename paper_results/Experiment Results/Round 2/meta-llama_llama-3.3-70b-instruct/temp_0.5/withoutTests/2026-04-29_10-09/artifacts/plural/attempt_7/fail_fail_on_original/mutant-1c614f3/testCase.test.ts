const plural = require('../../../../subject_repositories/plural/index.js');

describe('plural', () => {
  it('should correctly handle the plural form of a word that has a custom rule', () => {
    expect(plural('cactus', 2)).toBe('cacti');
    expect(plural('focus', 2)).toBe('foci');
    expect(plural('fungus', 2)).toBe('fungi');
    expect(plural('criterion', 2)).toBe('criteria');
    expect(plural('', 2)).not.toBe(''); // This should fail in the mutated code
  });
});