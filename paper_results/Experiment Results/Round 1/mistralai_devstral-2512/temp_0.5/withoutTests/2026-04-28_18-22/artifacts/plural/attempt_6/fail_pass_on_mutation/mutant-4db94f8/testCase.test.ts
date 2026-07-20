import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function', () => {
  it('should correctly handle string rules with type check', () => {
    // Add a string rule that would fail if type check is removed
    plural.addRule('customword', 'customwords');
    // Test the string rule
    expect(plural('customword', 2)).toBe('customwords');
    // Test that regex rules still work
    expect(plural('box', 2)).toBe('boxes');
  });
});