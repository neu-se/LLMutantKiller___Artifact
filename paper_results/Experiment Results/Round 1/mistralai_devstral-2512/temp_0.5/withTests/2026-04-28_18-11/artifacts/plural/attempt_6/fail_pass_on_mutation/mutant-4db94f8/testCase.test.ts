import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function with string rules', () => {
  it('should correctly handle string rule matching when rule[0] is a string', () => {
    // Add a rule with a string matcher that should match exactly
    plural.addRule('custom', 'customs');
    expect(plural('custom')).toBe('customs');
  });
});