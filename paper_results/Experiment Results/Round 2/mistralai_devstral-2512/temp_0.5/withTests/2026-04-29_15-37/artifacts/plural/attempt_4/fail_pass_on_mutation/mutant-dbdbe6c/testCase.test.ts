import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('String prototype monkey patching', () => {
  it('should handle multiple imports correctly', () => {
    // First import should work fine
    const plural1 = require("../../../../../../../../../../../subject_repositories/plural/index.js");

    // Manually add the plural function to String.prototype
    (String.prototype as any).plural = function() { return 'mock'; };

    // Second import should not throw in original code (checks if undefined)
    // but will throw in mutated code (always tries to add)
    expect(() => {
      const plural2 = require("../../../../../../../../../../../subject_repositories/plural/index.js");
    }).not.toThrow();
  });
});