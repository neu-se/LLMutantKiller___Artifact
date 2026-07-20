import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('String prototype monkey patching', () => {
  it('should throw when attempting to re-patch String.prototype.plural', () => {
    // First import applies the monkey patch
    const plural1 = require("../../../../../../../../../../../subject_repositories/plural/index.js");

    // Verify the monkey patch was applied
    const testString = 'test' as any;
    expect(typeof testString.plural).toBe('function');

    // Clear the module cache to force re-evaluation
    delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/plural/index.js")];

    // Second import should throw in mutated code (always tries to add)
    // but not in original code (checks if undefined first)
    expect(() => {
      const plural2 = require("../../../../../../../../../../../subject_repositories/plural/index.js");
    }).toThrow('Unable to add plural function to String object');
  });
});