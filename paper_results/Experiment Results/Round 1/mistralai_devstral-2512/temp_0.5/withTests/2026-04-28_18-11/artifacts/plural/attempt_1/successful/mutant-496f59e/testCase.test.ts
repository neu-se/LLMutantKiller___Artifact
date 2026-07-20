import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function with regex rule', () => {
  it('should correctly apply regex-based pluralization rules', () => {
    // This test specifically targets the mutation by using a rule that returns a string (not a function)
    // The mutation changes the condition from checking type to always true
    // This will cause the function to try to call a string as a function in the mutated version
    plural.addRule(/test$/i, 'tested');

    // This should work in original (returns 'tested') but fail in mutated version
    // because the mutated code tries to call the string 'tested' as a function
    expect(() => {
      const result = plural('test');
      // In original: returns 'tested' (string replacement)
      // In mutated: tries to call 'tested' as function, which throws TypeError
    }).not.toThrow();

    // Verify the actual result for original code
    expect(plural('test')).toBe('tested');
  });
});