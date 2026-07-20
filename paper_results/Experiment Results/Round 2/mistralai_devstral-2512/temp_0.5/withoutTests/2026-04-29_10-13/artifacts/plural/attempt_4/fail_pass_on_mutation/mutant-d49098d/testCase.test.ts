import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural function", () => {
  it("should correctly handle words that match the empty string pattern in the misc array", () => {
    // The mutation adds an empty string to the misc array which creates a regex pattern
    // that would incorrectly match and preserve empty strings
    // This test checks that empty strings are properly pluralized
    const result = plural("");
    expect(result).toBe("s");
  });
});