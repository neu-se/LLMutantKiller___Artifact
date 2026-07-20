import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural function", () => {
  it("should not treat empty string as a special case for pluralization", () => {
    // The mutation adds an empty string to the list of words that should remain unchanged
    // This test checks that an empty string is pluralized normally (by adding 's')
    expect(plural("")).toBe("s");
  });
});