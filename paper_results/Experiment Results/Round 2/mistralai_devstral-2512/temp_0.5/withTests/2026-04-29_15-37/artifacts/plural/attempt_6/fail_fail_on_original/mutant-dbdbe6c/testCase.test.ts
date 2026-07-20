import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('String prototype monkey patching', () => {
  it('should throw when String.prototype.plural already exists', () => {
    // First import applies the monkey patch
    const plural1 = require("../../../../../../../../../../../subject_repositories/plural/index.js");

    // Verify the monkey patch was applied
    expect(typeof (String.prototype as any).plural).toBe('function');

    // Clear the module cache to force re-evaluation
    delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/plural/index.js")];

    // Second import should throw in mutated code (always tries to add)
    // but not in original code (checks if undefined first)
    expect(() => {
      const plural2 = require("../../../../../../../../../../../subject_repositories/plural/index.js");
    }).toThrow('Unable to add plural function to String object');
  });
});