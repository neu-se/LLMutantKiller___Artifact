import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural function with words matching empty string pattern", () => {
  it("should correctly pluralize words that would match empty string in regex", () => {
    // This test targets the mutation where "" was added to the misc array
    // The mutation creates a regex pattern that would match "s" (empty string + s)
    // This should fail on mutated code because "s" would be treated as a special case
    expect(plural("s")).toBe("ses");
  });
});