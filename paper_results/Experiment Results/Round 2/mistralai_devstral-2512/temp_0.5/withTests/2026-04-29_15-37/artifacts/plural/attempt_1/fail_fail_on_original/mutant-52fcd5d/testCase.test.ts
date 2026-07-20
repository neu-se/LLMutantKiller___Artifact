import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural function behavior with empty string in misc array", () => {
  it("should correctly handle words ending with 's' when empty string is in misc array", () => {
    // This test targets the mutation where "" was added to the misc array
    // The original code should not be affected by this, but the mutated code
    // will incorrectly match empty strings in the regex pattern
    expect(plural("s")).toBe("s");
  });
});