import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function', () => {
  it('should fail when string rule type check is mutated', () => {
    // Add a string rule that would match a regex pattern if type check is removed
    plural.addRule('test', 'special');
    // This should use the string rule in original code
    expect(plural('test', 2)).toBe('special');
    // Verify regex rules still work
    expect(plural('box', 2)).toBe('boxes');
  });
});