import plural = require('../../../../../../../../../subject_repositories/plural/index.js');

describe('plural library', () => {
  it('should correctly pluralize "dwarf"', () => {
    expect(plural('dwarf')).toBe('dwarves');
  });
});