import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function with numeric parameter', () => {
  it('should return singular form when num is 1 and undefined is not considered', () => {
    expect(plural('test', 1)).toBe('test');
    expect(plural('test', undefined)).toBe('tests');
  });
});