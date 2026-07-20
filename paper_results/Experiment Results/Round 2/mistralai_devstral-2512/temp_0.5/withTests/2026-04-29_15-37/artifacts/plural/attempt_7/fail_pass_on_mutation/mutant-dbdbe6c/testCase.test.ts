import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('String prototype monkey patching', () => {
  it('should handle re-importing when String.prototype.plural exists', () => {
    // First import applies the monkey patch
    const plural1 = require("../../../../../../../../../../../subject_repositories/plural/index.js");

    // Manually add a mock plural function to String.prototype
    (String.prototype as any).plural = function() { return 'mock'; };

    // Clear the module cache to force re-evaluation
    delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/plural/index.js")];

    // Second import should not throw in original code (checks if undefined)
    // but will throw in mutated code (always tries to add)
    expect(() => {
      const plural2 = require("../../../../../../../../../../../subject_repositories/plural/index.js");
    }).not.toThrow();
  });
});