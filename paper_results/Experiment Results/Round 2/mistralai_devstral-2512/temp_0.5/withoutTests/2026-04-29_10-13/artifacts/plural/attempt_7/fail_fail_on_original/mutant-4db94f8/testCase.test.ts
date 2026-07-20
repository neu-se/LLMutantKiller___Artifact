import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural function with string-based rules", () => {
  it("should correctly handle string-based rules when a regex pattern matches the same word", () => {
    // Add a regex rule that would match the same word as a string rule
    plural.addRule(/memo/i, "regex-memo");

    // The string rule should take precedence in the original code
    expect(plural("memo")).toBe("memos");

    // Test other string rules to ensure they still work
    expect(plural("criterion")).toBe("criteria");
    expect(plural("bacterium")).toBe("bacteria");
  });
});