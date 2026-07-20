import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural module', () => {
  it('should handle multiple module loads correctly', () => {
    // First load
    expect(plural('apple', 2)).toBe('apples');

    // Clear cache and load again
    const modulePath = require.resolve("../../../../../../../../../../../subject_repositories/plural/index.js");
    delete require.cache[modulePath];

    // Second load should work in original code (checks if already defined)
    // but will fail in mutated code (tries to redefine)
    expect(() => {
      require("../../../../../../../../../../../subject_repositories/plural/index.js");
    }).not.toThrow();
  });
});