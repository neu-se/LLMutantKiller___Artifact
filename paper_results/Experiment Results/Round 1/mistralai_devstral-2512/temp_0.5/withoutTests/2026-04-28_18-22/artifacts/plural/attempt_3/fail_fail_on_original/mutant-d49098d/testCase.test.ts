import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural function", () => {
  it("should correctly handle words that end with 's' and match the mutation pattern", () => {
    // The mutation adds an empty string to the list of words that should remain unchanged
    // This creates a regex pattern that would incorrectly match any word ending with 's'
    // when preceded by certain patterns, causing incorrect pluralization
    expect(plural("s")).toBe("s");
  });
});