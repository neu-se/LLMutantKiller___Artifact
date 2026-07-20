import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural function", () => {
  it("should correctly pluralize words ending with 's' that are in the misc array", () => {
    // Test a word that appears after the empty string in the mutated array
    // The mutation adds an empty string which might affect the regex pattern matching
    const result = plural("tropic");
    expect(result).toBe("tropics");
  });
});