import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural function behavior with empty string in misc array", () => {
  it("should not treat 's' as a special case when empty string is in misc array", () => {
    // The mutation adds an empty string to the misc array, which creates a regex pattern that matches any word ending with 's'
    // This test checks if single letter 's' is incorrectly treated as a special case
    expect(plural("s")).toBe("ses");
  });
});