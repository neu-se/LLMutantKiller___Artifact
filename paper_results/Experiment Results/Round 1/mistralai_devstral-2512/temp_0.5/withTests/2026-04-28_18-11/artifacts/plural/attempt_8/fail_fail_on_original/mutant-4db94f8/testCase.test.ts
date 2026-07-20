import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function with string rules', () => {
  it('should correctly handle string rule matching when rule[0] is a string but type check is bypassed', () => {
    // Add a rule with a string matcher
    plural.addRule('test', 'tests');
    // Add a rule with a non-string matcher that would match 'test' if type check is removed
    plural.addRule(/test/i, 'matched');
    // In original code, string rule should take precedence
    // In mutated code, regex rule might match first
    expect(plural('test')).toBe('tests');
  });
});