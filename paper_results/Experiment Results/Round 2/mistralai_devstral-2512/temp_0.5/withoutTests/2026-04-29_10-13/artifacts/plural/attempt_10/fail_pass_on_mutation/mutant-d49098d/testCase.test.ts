import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural function", () => {
  it("should not treat empty string as part of the misc array regex pattern", () => {
    // The mutation adds an empty string to the misc array which creates a regex pattern
    // that would match empty strings and prevent them from being pluralized
    // This test verifies that empty strings are properly pluralized
    const result = plural("");
    expect(result).toBe("s");
  });
});