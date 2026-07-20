import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural function", () => {
  it("should not treat empty string as a special case when followed by 's'", () => {
    // The mutation adds an empty string to the list, creating a regex pattern
    // that would match any word ending with 's' when preceded by nothing
    // This test checks that the word "s" itself is pluralized correctly
    expect(plural("s")).toBe("ses");
  });
});