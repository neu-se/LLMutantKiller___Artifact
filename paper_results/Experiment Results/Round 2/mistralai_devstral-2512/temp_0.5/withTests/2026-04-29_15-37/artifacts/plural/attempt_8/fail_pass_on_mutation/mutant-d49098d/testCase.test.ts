import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural function behavior with empty string in misc array", () => {
  it("should not match empty string pattern for regular words", () => {
    // The mutation adds an empty string to the misc array, which creates a regex pattern that matches any word ending with 's'
    // This test checks if regular words ending with 's' are incorrectly treated as singular
    expect(plural("bus")).toBe("buses");
  });
});