import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural function behavior with empty string in misc array", () => {
  it("should correctly handle empty string input", () => {
    // The mutation adds an empty string to the misc array which affects the regex pattern
    // This test checks that empty string input is handled correctly
    // The mutated code will incorrectly match the empty string pattern
    const result = plural("");
    expect(result).toBe("s");
  });
});