import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function with numeric input', () => {
  it('should return plural form when num is not provided (undefined)', () => {
    expect(plural('test')).toBe('tests');
  });
});