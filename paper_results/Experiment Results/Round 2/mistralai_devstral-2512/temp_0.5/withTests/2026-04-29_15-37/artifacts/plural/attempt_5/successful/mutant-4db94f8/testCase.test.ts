import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function with string-based rules', () => {
  it('should not match string rules when rule[0] is a number', () => {
    // This test specifically targets the mutation by adding a numeric rule
    // The mutation changes the type check from 'String' to 'true', which would incorrectly match numeric rules
    plural.addRule(123, 'numbers');
    expect(plural(123)).toBe('123s');
  });
});