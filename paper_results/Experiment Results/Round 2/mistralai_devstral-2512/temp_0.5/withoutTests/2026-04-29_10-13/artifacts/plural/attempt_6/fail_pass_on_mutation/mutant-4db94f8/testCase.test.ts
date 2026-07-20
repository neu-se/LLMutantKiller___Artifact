import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural function with string-based rules", () => {
  it("should correctly handle string-based rules when a number is passed as the rule match", () => {
    // Add a rule with a number as the match (which should be ignored in original code)
    plural.addRule(123, "number-rule");

    // Test that string rules still work correctly
    expect(plural("criterion")).toBe("criteria");
    expect(plural("bacterium")).toBe("bacteria");

    // In mutated code, the type check is removed, so the number rule might incorrectly match
    // when the word is "123" (though this is unlikely in normal usage)
    // This test ensures the type checking is working as expected
    expect(plural("123")).toBe("123s");
  });
});