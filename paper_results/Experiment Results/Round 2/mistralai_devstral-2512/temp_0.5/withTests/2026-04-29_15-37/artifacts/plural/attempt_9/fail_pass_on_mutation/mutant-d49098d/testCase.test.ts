import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural function behavior with empty string in misc array", () => {
  it("should correctly handle words ending with 's' when empty string is in misc array", () => {
    // The mutation adds an empty string to the misc array, which creates a regex pattern that matches any word ending with 's'
    // This test checks if the empty string incorrectly causes words ending with 's' to be treated as singular
    expect(plural("test")).toBe("tests");
  });
});