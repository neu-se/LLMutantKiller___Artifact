import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural behavior with empty string in misc array", () => {
  it("should not treat empty string followed by 's' as special case", () => {
    // The mutation adds an empty string to the misc array which creates a regex pattern that matches empty strings
    // This test checks that the plural of "s" is handled correctly (should be "ses" in mutated version)
    expect(plural("s")).toBe("ses");
  });
});