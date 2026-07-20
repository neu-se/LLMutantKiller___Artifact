import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural function", () => {
  it("should correctly pluralize words ending in -s when they match specific singular forms", () => {
    // The mutation adds an empty string to the list of words that should remain unchanged in plural form
    // This test checks that the pluralization of words ending in -s works correctly for valid cases
    expect(plural("glasses")).toBe("glasses");
    expect(plural("scissors")).toBe("scissors");
    expect(plural("pliers")).toBe("pliers");
  });
});