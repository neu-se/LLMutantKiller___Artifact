import plural = require('../../../../../../../../../subject_repositories/plural/index');

describe('plural function', () => {
  it('should correctly pluralize "dwarf" and "roof"', () => {
    expect(plural('dwarf')).toBe('dwarves');
    expect(plural('roof')).toBe('roofs');
  });
});