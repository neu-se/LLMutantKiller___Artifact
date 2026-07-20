const plural = require("../../../../../../../../../subject_repositories/plural/index.js");

describe('plural function', () => {
  it('should correctly handle the plural form of "dwarf"', () => {
    expect(plural('dwarf')).toBe('dwarves');
  });
});