import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function with numeric input', () => {
  it('should return plural form when num is 0', () => {
    expect(plural('test', 0)).toBe('tests');
  });
});