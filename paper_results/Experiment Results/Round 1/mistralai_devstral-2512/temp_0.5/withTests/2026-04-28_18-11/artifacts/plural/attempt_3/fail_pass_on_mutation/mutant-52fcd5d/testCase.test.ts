import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural function behavior with empty string in misc array", () => {
  it("should correctly handle words ending with 's' when empty string is in misc array", () => {
    // The mutation adds an empty string to the misc array which affects the regex pattern
    // This test checks that words ending with 's' are correctly handled
    // The mutated code will incorrectly match the empty string pattern and return the word as-is
    const result = plural("amends");
    expect(result).toBe("amends");
  });
});