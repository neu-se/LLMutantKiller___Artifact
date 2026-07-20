import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function with string rules', () => {
  it('should correctly handle string rule matching when rule[0] is a boolean', () => {
    // Add a rule with a boolean as the matcher (which should not match)
    plural.addRule(true, 'matched');
    expect(plural('true')).toBe('trues');
  });
});