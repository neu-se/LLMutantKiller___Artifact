import { plural } from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("String prototype monkey patching", () => {
  it("should not throw an error when monkey patching String.prototype.plural if it doesn't exist", () => {
    // Ensure the plural function is not monkey-patched initially
    delete String.prototype.plural;

    // Attempt to monkey patch, which should not throw an error
    expect(() => {
      plural.monkeyPatch();
    }).not.toThrow();
  });
});