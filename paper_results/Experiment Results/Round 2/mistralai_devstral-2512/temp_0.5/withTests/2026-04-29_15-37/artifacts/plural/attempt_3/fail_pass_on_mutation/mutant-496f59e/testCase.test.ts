import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function behavior with non-function rule', () => {
  it('should handle non-function rule values correctly', () => {
    // Add a rule with a non-function value that should be returned directly
    plural.addRule('special', 'special-plural');

    // The original code will return 'special-plural' directly
    // The mutant will try to call 'special-plural' as a function, causing an error
    expect(plural('special')).toBe('special-plural');
  });
});