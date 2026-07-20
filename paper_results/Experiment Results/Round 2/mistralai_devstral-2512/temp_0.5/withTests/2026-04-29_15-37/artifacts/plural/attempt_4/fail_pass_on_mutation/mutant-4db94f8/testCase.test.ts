import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function with string-based rules', () => {
  it('should correctly handle string-based rules when rule[0] is not a string', () => {
    // This test targets the mutation by adding a rule where rule[0] is not a string
    // The mutation changes the type check from 'String' to 'true', which would incorrectly match non-string rules
    plural.addRule(123, 'numbers');
    expect(plural('test')).toBe('tests');
  });
});