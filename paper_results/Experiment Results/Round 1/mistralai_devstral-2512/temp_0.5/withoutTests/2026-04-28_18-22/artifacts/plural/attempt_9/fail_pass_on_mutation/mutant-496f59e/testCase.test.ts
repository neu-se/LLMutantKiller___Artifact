import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural function with non-function rule", () => {
  it("should return the rule value directly when rule is not a function", () => {
    // Add a rule where the result is a string (not a function)
    plural.addRule("irregular", "irregulars");

    // Test with the exact word that matches the rule
    const result = plural("irregular");
    expect(result).toBe("irregulars");
  });
});