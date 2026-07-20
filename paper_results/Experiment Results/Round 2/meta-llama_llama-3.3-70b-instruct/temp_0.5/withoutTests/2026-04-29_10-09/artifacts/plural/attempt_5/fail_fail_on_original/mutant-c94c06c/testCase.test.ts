const index = require('../../../../../../../subject_repositories/plural/index.js');
const plural = index;

describe('plural function', () => {
  it('should correctly handle the plural form of "dwarf" and "roof"', () => {
    expect(plural('dwarf')).toBe('dwarves');
    expect(plural('roof')).toBe('roofs');
  });
});