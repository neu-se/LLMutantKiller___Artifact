import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural function", () => {
  it("should correctly pluralize words that appear after empty string in misc array", () => {
    // The mutation adds an empty string to the misc array which affects the regex pattern
    // This test checks a word that appears after the empty string in the mutated array
    const result = plural("tropic");
    expect(result).toBe("tropics");
  });
});