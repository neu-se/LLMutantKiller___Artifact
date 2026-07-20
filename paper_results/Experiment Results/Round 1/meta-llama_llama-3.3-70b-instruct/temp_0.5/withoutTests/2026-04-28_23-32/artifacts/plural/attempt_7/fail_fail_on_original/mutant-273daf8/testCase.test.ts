import plural = require("../../../../../../../../../subject_repositories/plural/index.js");

describe('plural function', () => {
  it('should handle words ending with fe or f correctly', () => {
    expect(plural('dwarf', 2)).toBe('dwarves');
    expect(plural('roof', 2)).toBe('roofs');
    expect(plural('elf', 2)).toBe('elves'); 
    expect(plural('', 2)).not.toBe('ves'); 
  });
});