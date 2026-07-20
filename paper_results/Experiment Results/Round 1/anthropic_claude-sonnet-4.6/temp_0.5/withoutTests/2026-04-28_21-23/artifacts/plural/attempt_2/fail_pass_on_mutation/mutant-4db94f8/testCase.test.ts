import plural, { addRule } from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural", () => {
  it("should not match rules with non-string, non-RegExp keys", () => {
    // Add a rule with a Number key
    addRule(42 as any, 'matched');
    // 'word' should not match this rule
    expect(plural('42')).not.toBe('matched');
  });
});