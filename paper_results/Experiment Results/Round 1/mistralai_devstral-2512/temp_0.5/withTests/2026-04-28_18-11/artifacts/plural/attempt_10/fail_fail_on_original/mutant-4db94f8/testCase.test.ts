import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function with string rules', () => {
  it('should correctly handle string rule matching when rule[0] is a string', () => {
    // Add a string rule that should match exactly
    plural.addRule('test', 'tests');
    // Add a regex rule that would also match 'test' if type check is removed
    plural.addRule(/^test$/i, 'matched');

    // In original code, string rule should take precedence
    // In mutated code, the type check is removed so regex might match first
    expect(plural('test')).toBe('tests');
  });
});