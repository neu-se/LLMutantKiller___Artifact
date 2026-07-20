import plural = require('../../../../../../../../../subject_repositories/plural/index');

describe('plural library', () => {
  it('should correctly pluralize words that end with "f" or "fe"', () => {
    expect(plural('wolf')).toBe('wolves');
    expect(plural('dwarf')).toBe('dwarfs');
  });
});