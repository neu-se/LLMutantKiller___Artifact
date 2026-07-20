import plural from "./index.js";

describe("plural monkey patching", () => {
  it("should correctly pluralize words when called as a string method", () => {
    // First ensure the monkey patch is applied
    require("./index.js").monkeyPatch();

    // Test the monkey-patched method
    const result = "test".plural(2);
    expect(result).toBe("tests");
  });
});