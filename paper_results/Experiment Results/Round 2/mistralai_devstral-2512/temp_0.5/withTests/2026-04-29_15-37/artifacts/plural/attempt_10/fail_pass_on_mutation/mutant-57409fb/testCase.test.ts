import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function with numeric input', () => {
  it('should return plural form when num is undefined (implicit)', () => {
    // This test specifically checks the behavior when num is undefined
    // The mutation changes the condition from (num !== 1 || num === undefined)
    // to (num !== 1 || false), which should break this case
    expect(plural('test')).toBe('tests');
  });
});