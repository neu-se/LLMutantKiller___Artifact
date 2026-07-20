const plural = require("../../../../../../../../../../../subject_repositories/plural/index.js");

describe("String prototype monkey patching", () => {
  it("should successfully monkey patch String.prototype.plural when it doesn't exist", () => {
    // Ensure the plural function is not monkey-patched initially
    delete String.prototype.plural;

    // Attempt to monkey patch, which should not throw an error
    expect(() => {
      plural.monkeyPatch();
    }).not.toThrow();

    // Verify that String.prototype.plural now exists and works
    expect(typeof String.prototype.plural).toBe("function");
    expect("test".plural()).toBe("tests");
  });
});