import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function with numeric parameter', () => {
  it('should handle undefined num parameter correctly', () => {
    expect(plural('test', undefined)).toBe('tests');
    expect(plural('box', undefined)).toBe('boxes');
    expect(plural('child', undefined)).toBe('children');
  });
});