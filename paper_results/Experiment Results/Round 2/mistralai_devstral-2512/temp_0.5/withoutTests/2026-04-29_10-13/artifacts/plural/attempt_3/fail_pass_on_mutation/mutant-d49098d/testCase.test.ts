import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural function", () => {
  it("should not treat empty string as a special case in pluralization", () => {
    // The mutation adds an empty string to the misc array which creates a regex pattern
    // that would match empty strings, causing them to remain unchanged
    // This test verifies that empty strings are properly pluralized by adding 's'
    const result = plural("");
    expect(result).toBe("s");
  });
});