import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural function", () => {
  it("should correctly pluralize words ending with 's' when they are not in the special cases list", () => {
    // The mutation adds an empty string to the list, which creates a regex pattern
    // that would incorrectly match words ending with 's' when preceded by nothing
    // This test checks that normal words ending with 's' are still pluralized correctly
    expect(plural("bus")).toBe("buses");
  });
});