import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function with numeric input', () => {
  it('should return plural form when num is not 1 and not undefined', () => {
    expect(plural('test', 0)).toBe('tests');
    expect(plural('box', 2)).toBe('boxes');
  });
});