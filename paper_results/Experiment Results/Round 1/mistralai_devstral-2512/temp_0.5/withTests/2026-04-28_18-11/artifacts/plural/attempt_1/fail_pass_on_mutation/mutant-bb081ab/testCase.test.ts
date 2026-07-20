import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function behavior with non-regex rules', () => {
  it('should correctly handle string-based rules', () => {
    // Add a string-based rule that will trigger the mutated code path
    plural.addRule('test', 'tests');
    // The mutation changes the behavior when rule[0] is not a RegExp
    // This test ensures the string-based rule is processed correctly
    expect(plural('test')).toBe('tests');
  });
});