import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function', () => {
  it('should fail when string rule type check is mutated', () => {
    // Add a string rule that conflicts with a regex pattern
    plural.addRule('box', 'specialboxes');
    // This should use the string rule in original code
    expect(plural('box', 2)).toBe('specialboxes');
    // Verify regex rules still work for other cases
    expect(plural('fox', 2)).toBe('foxes');
  });
});