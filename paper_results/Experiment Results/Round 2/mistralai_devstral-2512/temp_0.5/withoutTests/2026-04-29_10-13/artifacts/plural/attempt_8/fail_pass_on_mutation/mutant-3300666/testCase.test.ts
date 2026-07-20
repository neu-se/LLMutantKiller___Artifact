import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function with custom rules', () => {
  it('should correctly apply custom rules added before default rules', () => {
    // Add a custom rule that should be applied first
    plural.addRule(/test$/i, function(w) { return w + 'X' });

    // This should use our custom rule
    expect(plural('test')).toBe('testX');

    // This should still use the default rules
    expect(plural('cherry')).toBe('cherries');
  });
});