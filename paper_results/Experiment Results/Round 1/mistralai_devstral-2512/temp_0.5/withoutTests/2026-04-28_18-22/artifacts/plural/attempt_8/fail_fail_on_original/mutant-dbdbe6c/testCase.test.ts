import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural module', () => {
  it('should detect String prototype extension conflict', () => {
    // First load extends String.prototype
    expect(plural('test', 2)).toBe('tests');

    // Manually add plural to String.prototype to simulate conflict
    String.prototype.plural = function() { return 'conflict'; };

    // Clear cache and try to load again
    const modulePath = require.resolve("../../../../../../../../../../../subject_repositories/plural/index.js");
    delete require.cache[modulePath];

    // This should throw in original code (plural already defined)
    // but will not throw in mutated code (condition always true)
    expect(() => {
      require("../../../../../../../../../../../subject_repositories/plural/index.js");
    }).toThrow('Unable to add plural function to String object');
  });
});