import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural module', () => {
  it('should prevent duplicate String prototype extension', () => {
    // First load extends String.prototype
    expect(plural('test', 2)).toBe('tests');

    // Clear cache and try to load again
    const modulePath = require.resolve("../../../../../../../../../../../subject_repositories/plural/index.js");
    delete require.cache[modulePath];

    // This should NOT throw in original code (checks if already defined)
    // but WILL throw in mutated code (tries to redefine)
    expect(() => {
      require("../../../../../../../../../../../subject_repositories/plural/index.js");
    }).not.toThrow();
  });
});