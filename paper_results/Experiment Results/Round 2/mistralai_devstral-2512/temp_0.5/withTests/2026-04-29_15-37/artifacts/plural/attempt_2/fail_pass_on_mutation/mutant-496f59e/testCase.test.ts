import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function behavior with string rule', () => {
  it('should correctly handle string-based pluralization rules', () => {
    // Add a string-based rule where the replacement is a string (not a function)
    plural.addRule('irregular', 'regulars');

    // The original code checks if the replacement is a function before calling it
    // The mutant always tries to call it as a function, which will fail
    const result = plural('irregular');
    expect(result).toBe('regulars');
  });
});