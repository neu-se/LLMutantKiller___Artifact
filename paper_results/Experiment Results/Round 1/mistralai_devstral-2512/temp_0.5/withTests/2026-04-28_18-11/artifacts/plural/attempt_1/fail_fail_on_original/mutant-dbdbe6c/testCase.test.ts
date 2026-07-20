import plural from "./index.js";

describe("String prototype monkey patching", () => {
  it("should throw an error when attempting to monkey patch String.prototype.plural if it already exists", () => {
    // First, ensure the plural function is monkey-patched
    plural.monkeyPatch();

    // Verify that String.prototype.plural exists
    expect(typeof String.prototype.plural).toBe("function");

    // Attempt to monkey patch again, which should throw an error
    expect(() => {
      plural.monkeyPatch();
    }).toThrow("Unable to add plural function to String object");
  });
});