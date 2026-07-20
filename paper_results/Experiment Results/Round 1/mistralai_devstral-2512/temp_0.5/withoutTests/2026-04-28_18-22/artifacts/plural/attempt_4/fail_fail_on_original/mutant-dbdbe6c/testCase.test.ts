import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural module', () => {
  it('should prevent duplicate String prototype extension', () => {
    // First load extends String.prototype
    expect(plural('test', 2)).toBe('tests');

    // Clear module cache and try to load again
    const modulePath = require.resolve("../../../../../../../../../../../subject_repositories/plural/index.js");
    delete require.cache[modulePath];

    // This should throw in original code (plural already defined)
    // but will succeed in mutated code (condition always true)
    expect(() => {
      require("../../../../../../../../../../../subject_repositories/plural/index.js");
    }).toThrow('Unable to add plural function to String object');
  });
});