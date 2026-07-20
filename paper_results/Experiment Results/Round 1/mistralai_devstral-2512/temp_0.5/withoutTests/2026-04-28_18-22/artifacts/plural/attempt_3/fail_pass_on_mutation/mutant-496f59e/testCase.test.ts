import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural function with string rule", () => {
  it("should return the string rule value when rule is a string", () => {
    // Add a string-based rule
    plural.addRule("octopus", "octopi");

    // Test with the exact word that matches the string rule
    const result = plural("octopus");
    expect(result).toBe("octopi");
  });
});