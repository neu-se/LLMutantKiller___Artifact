import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function with undefined numeric input', () => {
  it('should return plural form when num is undefined', () => {
    expect(plural('test', undefined)).toBe('tests');
  });
});