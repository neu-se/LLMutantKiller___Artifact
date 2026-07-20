import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural function with string-based rules", () => {
  it("should correctly handle string-based rules when a non-string rule is added", () => {
    // Add a non-string rule (number) that would match if type checking is removed
    plural.addRule(0, "zero-rule");

    // Test that string rules still work correctly
    expect(plural("criterion")).toBe("criteria");
    expect(plural("bacterium")).toBe("bacteria");
    expect(plural("memo")).toBe("memos");

    // This test ensures the type checking is working by testing a word that
    // would match the number rule if type checking was removed
    expect(plural("0")).toBe("0s");
  });
});