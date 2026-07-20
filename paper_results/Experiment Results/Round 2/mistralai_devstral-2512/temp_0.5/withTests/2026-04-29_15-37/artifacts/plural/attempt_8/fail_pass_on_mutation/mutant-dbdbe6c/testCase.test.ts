import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('String prototype monkey patching', () => {
  it('should detect when String.prototype.plural is already defined', () => {
    // First import applies the monkey patch
    const plural1 = require("../../../../../../../../../../../subject_repositories/plural/index.js");

    // Manually add a mock plural function to String.prototype
    (String.prototype as any).plural = function() { return 'mock'; };

    // Clear the module cache to force re-evaluation
    delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/plural/index.js")];

    // Second import should throw in mutated code (always tries to add)
    // but not in original code (checks if undefined first)
    let errorThrown = false;
    try {
      const plural2 = require("../../../../../../../../../../../subject_repositories/plural/index.js");
    } catch (e) {
      errorThrown = true;
    }
    expect(errorThrown).toBe(false);
  });
});