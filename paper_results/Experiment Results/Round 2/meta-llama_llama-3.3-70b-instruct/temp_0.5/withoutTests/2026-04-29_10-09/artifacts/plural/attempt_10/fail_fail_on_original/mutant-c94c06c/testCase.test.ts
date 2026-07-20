const plural = require('../../../../subject_repositories/plural/index.js');

describe('plural function', () => {
  it('should correctly handle the plural form of "roof" and "dwarf"', () => {
    expect(plural('roof')).toBe('roofs');
    expect(plural('dwarf')).toBe('dwarves');
  });
});