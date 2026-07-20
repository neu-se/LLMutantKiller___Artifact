import plural from "./index.js";

describe("plural function with non-function rule", () => {
  it("should return the rule value directly when rule is not a function", () => {
    // Add a rule where the result is not a function
    plural.addRule("test", "tests");

    // Test with the exact word that matches the rule
    const result = plural("test");
    expect(result).toBe("tests");
  });
});