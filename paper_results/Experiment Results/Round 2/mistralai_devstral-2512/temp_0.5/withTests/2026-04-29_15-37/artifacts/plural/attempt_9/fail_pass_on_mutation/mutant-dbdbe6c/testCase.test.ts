import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('String prototype monkey patching', () => {
  it('should not throw when String.prototype.plural is undefined', () => {
    // Ensure String.prototype.plural is undefined
    delete (String.prototype as any).plural;

    // Clear the module cache to force re-evaluation
    delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/plural/index.js")];

    // This should not throw in original code (checks if undefined)
    // but will throw in mutated code (always tries to add)
    expect(() => {
      const plural2 = require("../../../../../../../../../../../subject_repositories/plural/index.js");
    }).not.toThrow();
  });
});