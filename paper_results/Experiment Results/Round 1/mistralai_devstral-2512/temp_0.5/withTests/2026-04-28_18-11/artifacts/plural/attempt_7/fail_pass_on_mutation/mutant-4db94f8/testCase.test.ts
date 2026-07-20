import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function with string rules', () => {
  it('should correctly handle string rule matching when rule[0] is a string but type check fails', () => {
    // Add a rule with a string matcher
    plural.addRule('test', 'tests');
    // This should match the string rule in original code
    // but fail in mutated code where type check is removed
    expect(plural('test')).toBe('tests');
  });
});