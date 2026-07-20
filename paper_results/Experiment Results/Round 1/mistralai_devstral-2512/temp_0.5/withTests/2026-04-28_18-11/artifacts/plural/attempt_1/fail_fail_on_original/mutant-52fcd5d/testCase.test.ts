import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural function behavior with empty string in misc array", () => {
  it("should correctly handle words ending with 's' when empty string is in misc array", () => {
    // This test targets the mutation where an empty string "" was added to the misc array
    // The original code should not be affected by this, but the mutated code will incorrectly
    // match the empty string pattern and return the word as-is instead of adding 's'
    const result = plural("s");
    expect(result).toBe("ss");
  });
});