import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function with string rules', () => {
  it('should correctly handle string rule matching when rule[0] is a number', () => {
    // Add a rule with a numeric string as the matcher
    plural.addRule('123', '456');
    expect(plural('123')).toBe('456');
  });
});