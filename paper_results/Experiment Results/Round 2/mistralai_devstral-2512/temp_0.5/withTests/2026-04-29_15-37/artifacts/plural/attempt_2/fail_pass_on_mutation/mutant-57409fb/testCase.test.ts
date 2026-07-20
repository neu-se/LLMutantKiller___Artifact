import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function with numeric input', () => {
  it('should return plural form when num is not 1', () => {
    expect(plural('test', 2)).toBe('tests');
  });
});