import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function', () => {
  it('should correctly handle string rules when type check is present', () => {
    // Add a string rule that would be incorrectly matched by regex if type check is removed
    plural.addRule('test', 'special');
    // Add a regex rule that would match the same word if type check is removed
    plural.addRule(/test/i, 'regexresult');
    // This should use the string rule in original code (last added rule takes precedence)
    expect(plural('test', 2)).toBe('special');
  });
});