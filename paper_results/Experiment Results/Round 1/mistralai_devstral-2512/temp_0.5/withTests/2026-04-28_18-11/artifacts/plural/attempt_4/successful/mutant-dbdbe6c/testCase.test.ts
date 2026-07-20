const plural = require("../../../../../../../../../../../subject_repositories/plural/index.js");

describe("String prototype monkey patching", () => {
  it("should throw an error when String.prototype.plural already exists", () => {
    // First, ensure the plural function is monkey-patched
    plural.monkeyPatch();

    // Verify that String.prototype.plural exists
    expect(typeof String.prototype.plural).toBe("function");

    // Attempt to monkey patch again, which should throw an error in original code
    // but will succeed in mutated code (since condition is always true)
    expect(() => {
      plural.monkeyPatch();
    }).toThrow("Unable to add plural function to String object");
  });
});