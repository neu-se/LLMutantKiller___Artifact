import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural function with words ending in 's'", () => {
  it("should correctly pluralize words ending with 's' when not in special cases", () => {
    // This test targets the mutation where "" was added to the misc array
    // The mutation would cause "bus" to match the empty string pattern incorrectly
    expect(plural("bus")).toBe("buses");
  });
});