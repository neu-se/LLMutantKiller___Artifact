import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function', () => {
  it('should correctly handle string rules when type check is present', () => {
    // Add a string rule that would be incorrectly matched by regex if type check is removed
    plural.addRule('123', 'numbers');
    expect(plural('123', 2)).toBe('numbers');
    // Verify normal string rules still work
    expect(plural('criterion', 2)).toBe('criteria');
  });
});