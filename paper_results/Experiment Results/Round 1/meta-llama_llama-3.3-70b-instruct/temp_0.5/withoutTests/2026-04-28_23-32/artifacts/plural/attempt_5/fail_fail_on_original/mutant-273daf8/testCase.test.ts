import plural = require("../../../../../../../../../subject_repositories/plural/index.js");

describe('plural function', () => {
  it('should handle words ending with fe or f correctly', () => {
    expect(plural('dwarf', 2)).toBe('dwarves');
    expect(plural('roof', 2)).toBe('roofs');
    expect(plural('wolf', 2)).toBe('wolves'); // This should pass on the original code
    expect(plural('wolf', 2)).not.toBe('wolfs'); // This should pass on the original code and fail on the mutated code
  });
});