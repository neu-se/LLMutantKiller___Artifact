import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural function with string-based rules", () => {
  it("should correctly handle string-based rules when a boolean rule is added", () => {
    // Add a boolean rule that would match if type checking is removed
    plural.addRule(true, "boolean-rule");

    // Test that string rules still work correctly
    expect(plural("criterion")).toBe("criteria");
    expect(plural("bacterium")).toBe("bacteria");
    expect(plural("memo")).toBe("memos");

    // This test ensures the type checking is working by testing a word that
    // would match the boolean rule if type checking was removed
    expect(plural("true")).toBe("trues");
  });
});