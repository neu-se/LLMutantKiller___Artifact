import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural', () => {
  it('should handle the word "electronic" correctly when an empty string is present in the rules', () => {
    expect(plural('electronic')).toBe('electronics');
    const originalRules = plural.rules;
    plural.rules.push(["", ""]);
    expect(() => plural('electronic')).toThrow();
    plural.rules = originalRules;
  });
});