import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function with string rules', () => {
  it('should correctly handle string rule matching when rule[0] is a string', () => {
    // Clear existing rules to ensure predictable behavior
    const originalRules = plural.addRule;
    plural.addRule = (match, result) => {
      // Reset rules array
      const rules = [];
      return originalRules.call({ rules }, match, result);
    };

    // Add a string rule
    plural.addRule('test', 'tests');
    // Add a regex rule that would match 'test'
    plural.addRule(/test/i, 'matched');

    // In original code, string rule should match exactly
    // In mutated code, the type check is removed so it might behave differently
    expect(plural('test')).toBe('tests');
  });
});