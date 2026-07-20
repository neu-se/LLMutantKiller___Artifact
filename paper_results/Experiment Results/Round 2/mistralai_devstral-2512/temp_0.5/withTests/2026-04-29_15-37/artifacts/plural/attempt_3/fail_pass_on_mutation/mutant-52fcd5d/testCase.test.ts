import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural function with empty string handling", () => {
  it("should correctly handle empty string input", () => {
    // This test targets the mutation where "" was added to the misc array
    // The mutation would cause empty string to be treated as a special case
    expect(plural("")).toBe("s");
  });
});