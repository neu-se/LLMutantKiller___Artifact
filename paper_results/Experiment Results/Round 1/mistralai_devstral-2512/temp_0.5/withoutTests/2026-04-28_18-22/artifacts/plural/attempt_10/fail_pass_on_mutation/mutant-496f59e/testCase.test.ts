import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural function with string rule", () => {
  it("should return the string rule value when rule is a string", () => {
    // Add a string-based rule
    plural.addRule("box", "boxes");

    // Test with the exact word that matches the string rule
    const result = plural("box");
    expect(result).toBe("boxes");
  });
});