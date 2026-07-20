import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('String prototype monkey patching', () => {
  it('should prevent duplicate monkey patching', () => {
    // First import applies the monkey patch
    const plural1 = require("../../../../../../../../../../../subject_repositories/plural/index.js");

    // Manually add the plural function to String.prototype to simulate it already existing
    (String.prototype as any).plural = function() { return 'already patched'; };

    // Clear the module cache to force re-evaluation
    delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/plural/index.js")];

    // Second import should not throw in original code (checks if undefined)
    // but will throw in mutated code (always tries to add)
    expect(() => {
      const plural2 = require("../../../../../../../../../../../subject_repositories/plural/index.js");
    }).not.toThrow();
  });
});