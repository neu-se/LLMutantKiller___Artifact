import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function behavior with regex rule returning non-function', () => {
  it('should correctly handle regex rules with non-function replacements', () => {
    // Add a regex rule where the replacement is a string (not a function)
    plural.addRule(/test$/i, 'replaced');

    // The original code checks if the replacement is a function before calling it
    // The mutant will try to call 'replaced' as a function, causing a TypeError
    expect(() => plural('test')).not.toThrow();
    expect(plural('test')).toBe('replaced');
  });
});